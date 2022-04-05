import React, { useCallback, useEffect, useRef, useState } from 'react';
import { boardInsertDB, payListDB } from '../../../../service/dbLogic';
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from '../../../../styles/FromStyle';
import QuillEditor from '../../../component/board/QuillEditor';
import { useDispatch } from 'react-redux';
import { setToastMsg } from '../../../../redux/toastStatus/action';
import PassAccodion from '../../../component/pass/PassAccordion';
import PassTable from '../../../component/pass/PassTable';

const TransWritePage = ({id}) => {

  const[title, setTitle]= useState('');
  const[content, setContent]= useState('');
  const [myPass, setMyPass] = useState([]);
  const [selectPass, setSelectPass] = useState({});
  const quillRef = useRef();
  const dispatch = useDispatch();



  const handleSelectPass = useCallback((value) => {
    console.log(value);
    setSelectPass(value);
  },[]);


  const handleContent = useCallback((value) => {
    console.log(value);
    setContent(value);
  },[]);


  const handleTitle = useCallback((e) => {
    setTitle(e);
  },[]);



  useEffect(() => {
    const passList = async() => {
      const mem_no = { 
        MEM_NO : sessionStorage.getItem('no'),
        TYPE : 0
      };
      const res = await payListDB(mem_no);
      console.log(res); 
      setMyPass(res.data);
    }
    passList();
  },[setMyPass])




  const boardInsert = async() => {
    if(title.trim()===''||content.trim()==='') {
      return dispatch(setToastMsg("게시글이 작성되지 않았습니다."));
    }
    if(!selectPass.PASS_NO) {
      return dispatch(setToastMsg("양도할 이용권을 선택해주세요."));
    }
    const board = {
      id : id,
      TRANSB_TITLE : title,
      TRANSB_CONTENT : content,
      PASS_NO : selectPass.PASS_NO,
    }
    const res = await boardInsertDB(board);
    if(!res.data) return dispatch(setToastMsg("게시판 입력에 실패했습니다."));
    window.location.replace(`/board/list?id=${id}&page=1`);

  }


  return (
    <>
      <ContainerDiv>
        <HeaderDiv>
          <h3>양도 글작성</h3>
        </HeaderDiv>
        <FormDiv>
          <div style={{width:"100%", maxWidth:"2000px"}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'10px'}}>
              <h2>제목</h2> 
              <div style={{display: 'flex'}}>
                <BButton onClick={()=>{boardInsert()}}>글쓰기</BButton>
              </div>
            </div>
            <input id="dataset-title" type="text" maxLength="50" placeholder="제목을 입력하세요."
            style={{width:"100%",height:'40px' , border:'1px solid lightGray'}} onChange={(e)=>{handleTitle(e.target.value)}}/>
            <hr style={{margin:'10px 0px 10px 0px'}}/>
            <h3>상세내용</h3>
            <QuillEditor value={content} handleContent={handleContent} quillRef={quillRef} trans={true}/>
          </div>
          <div style={{display:'block', border:'1px solid lightGray', borderRadius:'10px', minHeight:'60px', padding:'5px', marginBottom:'40px'}}>
            <h4 style={{textAlign:"left", padding: "2px 5px 2px 5px"}}>양도할 이용권 정보</h4>
            <PassTable myPass={[selectPass]} index={selectPass.PASS_TYPE} />
          </div>
          <PassAccodion myPass={myPass} click={true} handleSelectPass={handleSelectPass}/>
        </FormDiv>
      </ContainerDiv>
    </>
  );

};

export default TransWritePage;