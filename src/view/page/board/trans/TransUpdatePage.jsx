import React, { useCallback, useEffect, useRef, useState } from 'react';
import { boardDetailDB, boardUpdateDB } from '../../../../service/dbLogic';
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from '../../../../styles/FromStyle';
import QuillEditor from '../../../component/board/QuillEditor';
import { useDispatch } from 'react-redux';
import { setToastMsg } from '../../../../redux/toastStatus/action';
import PassTable from '../../../component/pass/PassTable';
import { useNavigate } from 'react-router-dom';

const TransUpdatePage = ({id, bno}) => {


  const[title, setTitle]= useState('');
  const[content, setContent]= useState('');
  const [selectPass, setSelectPass] = useState({});
  const quillRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleContent = useCallback((value) => {
    console.log(value);
    setContent(value);
  },[]);


  const handleTitle = useCallback((e) => {
    setTitle(e);
  },[]);


  useEffect(() => {
    const boardDetail = async() => {
      const board = {
        id: id, 
        BNO: bno
      }
      const res = await boardDetailDB(board);
      console.log(res);
      if(JSON.stringify(res.data[0].MEM_NO)!==sessionStorage.getItem('no')) {
        navigate(`/board/list?id=${id}&page=1`);
        return dispatch(setToastMsg("작성자가 아닙니다."));
      }
      setTitle(res.data[0].TRANSB_TITLE); 
      setContent(res.data[0].TRANSB_CONTENT);
      setSelectPass({
        PROD_NAME: res.data[0].PROD_NAME,
        PASS_NO: res.data[0].PASS_NO,
        PASS_TYPE: res.data[0].PASS_TYPE,
        PASS_SDAY: res.data[0].PASS_SDAY,
        PASS_EDAY: res.data[0].PASS_EDAY,
        PASS_CNT: res.data[0].PASS_CNT,
      });
    }
    boardDetail();
  },[setTitle, setContent, setSelectPass, id, bno, navigate, dispatch]);


  const boardUpdate = async() => {
    if(title.trim()===''||content.trim()==='') {
      return dispatch(setToastMsg("게시글이 작성되지 않았습니다."));
    }
    if(!selectPass.PASS_NO) {
      return dispatch(setToastMsg("양도할 이용권을 선택해주세요."));
    }
    const board = {
      id : id,
      PASS_NO : selectPass.PASS_NO,
      TRANSB_TITLE : title,
      TRANSB_CONTENT : content,
    }
    const res = await boardUpdateDB(board);
    if(!res.data) return dispatch(setToastMsg("게시판 입력에 실패했습니다."));
    window.location.replace(`/board/list?id=${id}&page=1`);

  }


  return (
    <>
      <ContainerDiv>
        <HeaderDiv>
          <h3>양도 글수정</h3>
        </HeaderDiv>
        <FormDiv>
          <div style={{width:"100%", maxWidth:"2000px"}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'10px'}}>
              <h2>제목</h2> 
              <div style={{display: 'flex'}}>
                <BButton onClick={()=>{boardUpdate()}}>글수정</BButton>
              </div>
            </div>
            <input id="dataset-title" type="text" maxLength="50" placeholder="제목을 입력하세요." defaultValue={title}
            style={{width:"100%",height:'40px' , border:'1px solid lightGray'}} onChange={(e)=>{handleTitle(e.target.value)}}/>
            <hr style={{margin:'10px 0px 10px 0px'}}/>
            <h3>상세내용</h3>
            <QuillEditor value={content} handleContent={handleContent} quillRef={quillRef} trans={true}/>
          </div>
          <div style={{display:'block', border:'1px solid lightGray', borderRadius:'10px', minHeight:'60px', padding:'5px', marginBottom:'40px'}}>
            <h4 style={{textAlign:"left", padding: "2px 5px 2px 5px"}}>양도할 이용권 정보</h4>
            <PassTable myPass={[selectPass]} index={selectPass.PASS_TYPE} />
          </div>
        </FormDiv>
      </ContainerDiv>
    </>
  );
};

export default TransUpdatePage;