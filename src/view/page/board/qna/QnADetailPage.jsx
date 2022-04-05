import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToastMsg } from '../../../../redux/toastStatus/action';
import { boardDetailDB, commentInsertDB, commentUpdateDB } from '../../../../service/dbLogic';
import '../../../../styles/boardDetail.css'
import { BButton, ContainerDiv, FormDiv, HeaderDiv, QnACommentArea } from '../../../../styles/FromStyle';
import BoardFileDetail from '../../../component/board/BoardFileDetail';
import BoardHeader from '../../../component/board/BoardHeader';  
import { useNavigate } from 'react-router-dom';

const QnADetailPage = ({id, bno}) => {

  const [detail, setDetail] = useState({});
  const [cmtDetail,setCmtDetail] = useState({}); 
  const [comment,setComment] = useState();
  const[files, setFiles]= useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const boardDetail = async() => {
      const board = {
        id: id,
        BNO : bno
      }
      const res = await boardDetailDB(board);
      const bTemp = res.data.shift();
      if(Boolean(bTemp.QNA_SECRET)){
        if(sessionStorage.getItem('auth')!=='3'&&sessionStorage.getItem('no')!==JSON.stringify(bTemp.MEM_NO)) {
          navigate(`/board/list?id=${id}&page=1`);
          return dispatch(setToastMsg("권한이 없습니다.")); 
        }
      }
      setDetail({
        TITLE : bTemp.QNA_TITLE,
        CONTENT : bTemp.QNA_CONTENT,
        MEM_NICKNAME : bTemp.MEM_NICKNAME,
        MEM_NO : bTemp.MEM_NO,
        DATE : bTemp.QNA_DATE,
        HIT : bTemp.QNA_HIT,
        SECRET : Boolean(bTemp.QNA_SECRET),
        TYPE : bTemp.QNA_TYPE,
      });
      const cTemp = res.data.shift();
      if(cTemp.COMMENT[0]){
        setCmtDetail({
          COMM_NO : cTemp.COMMENT[0].COMM_NO,
          WRITER : cTemp.COMMENT[0].QC_WRITER,
          COMMENT : cTemp.COMMENT[0].QC_COMMENT,
          MEM_NO : cTemp.COMMENT[0].MEM_NO,
          DATE : cTemp.COMMENT[0].QC_DATE,
        });
      }
      console.log(cTemp);
      console.log(bTemp);
      if(res.data.length>0){
        setFiles(res.data);
      }
    }
    boardDetail();
  },[setDetail, setCmtDetail, setFiles, id , bno, dispatch, navigate])


  const commentInsert = async() => {
    if(!comment) return dispatch(setToastMsg("답변을 작성해주세요."))
    const cmt = {
      id : id,
      BNO : bno,
      QC_WRITER : sessionStorage.getItem('nickname'),
      QC_COMMENT : comment,
    }
    await commentInsertDB(cmt);
    window.location.reload();
    dispatch(setToastMsg("답변이 등록되었습니다."));
  }


  const commentUpdate = async() => {
    if(!comment||comment===cmtDetail.COMMENT) return dispatch(setToastMsg("답변을 수정해주세요."));
    const cmt = {
      id : id,
      QC_WRITER : sessionStorage.getItem('nickname'),
      QC_COMMENT : comment,
      CNO : cmtDetail.COMM_NO,
    }
    await commentUpdateDB(cmt);
    window.location.reload();
    dispatch(setToastMsg("답변이 수정되었습니다."));
  }
  
  return (
    <ContainerDiv>
      <HeaderDiv>
        <h3 style={{marginLeft:"10px"}}>QnA 게시글</h3>
      </HeaderDiv>
      <FormDiv>
        <BoardHeader detail={detail} id={id} bno={bno}/>
        <section style={{minHeight: '400px'}}>
          <div dangerouslySetInnerHTML={{__html:detail.CONTENT}}></div>
        </section>
        <BoardFileDetail files={files}/>
        <hr style={{height:"2px"}}/>
        <div>
          <div style={{display:"flex" ,justifyContent:"space-between", marginBottom:'10px'}}>
            <div  style={{display:"flex"}}>
              <h1>답변&nbsp;</h1>
              {cmtDetail.COMMENT
                ?
                  <div style={{display:"flex" , flexDirection:"column", fontSize: '14px'}}>
                    <span>답변일 : {cmtDetail.DATE}</span>
                    <span>답변자 : {cmtDetail.WRITER}</span>
                  </div>
                :
                  <h1>대기중</h1>
              }
            </div>
            {(sessionStorage.getItem('auth')!=='3')
              ?
              null
              :
              (!cmtDetail.COMMENT)?
              <BButton onClick={()=>{commentInsert()}}>답변</BButton>
              :
              <BButton onClick={()=>{commentUpdate()}}>수정</BButton>
            }
          </div>
          <QnACommentArea defaultValue={cmtDetail.COMMENT} readOnly={!(sessionStorage.getItem('auth')==='3')}
            onChange={(e)=>{setComment(e.target.value)}}/>
        </div>
      </FormDiv>
    </ContainerDiv>
  );
};

export default QnADetailPage;