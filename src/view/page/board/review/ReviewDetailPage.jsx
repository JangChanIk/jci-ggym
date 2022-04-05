import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToastMsg } from '../../../../redux/toastStatus/action';
import { boardDetailDB, commentDeleteDB, commentInsertDB, commentUpdateDB } from '../../../../service/dbLogic';
import '../../../../styles/boardDetail.css'
import { BButton, ContainerDiv, FormDiv, HeaderDiv, SpanA } from '../../../../styles/FromStyle';
import BoardFileDetail from '../../../component/board/BoardFileDetail';
import BoardHeader from '../../../component/board/BoardHeader';  
import { useNavigate } from 'react-router-dom';

const ReviewDetailPage = ({id, bno}) => {

  const [detail, setDetail] = useState({});
  const [cmtDetail,setCmtDetail] = useState([]); 
  const [comment,setComment] = useState();
  const [updComment,setUpdComment] = useState('');
  const [cmtUpdate,setCmtUpdate] = useState([]); 
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
      setDetail({
        TITLE : bTemp.REVIEW_TITLE,
        CONTENT : bTemp.REVIEW_CONTENT,
        MEM_NICKNAME : bTemp.MEM_NICKNAME,
        MEM_NO : bTemp.MEM_NO,
        DATE : bTemp.REVIEW_DATE,
        COMMENT : res.data[0].COMMENT.length,
        HIT : bTemp.REVIEW_HIT,
      });
      setCmtUpdate(new Array(res.data[0].COMMENT.length));
      const cTemp = res.data.shift();
      if(cTemp.COMMENT){
        let comments = [];
        cTemp.COMMENT.forEach((item)=>{
          comments.push(item);
        })
        setCmtDetail(comments);
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
    if(!comment) return dispatch(setToastMsg("댓글을 작성해주세요."))
    const cmt = {
      id : id,
      BNO : bno,
      RC_WRITER : sessionStorage.getItem('nickname'),
      RC_COMMENT : comment,
    }
    await commentInsertDB(cmt);
    window.location.reload();
    dispatch(setToastMsg("댓글이 등록되었습니다."));
  }

  const commentDelete = async(item) => {
    const cmt = {
      id : id,
      CNO : item.COMM_NO,
    }
    await commentDeleteDB(cmt);
    window.location.reload();
    dispatch(setToastMsg("댓글이 삭제되었습니다."));
  }


  const commentChange = async(index) => {
    console.log(index)
    const arr = new Array(cmtUpdate.length);
    arr[index] = true;
    setCmtUpdate(arr);
  }


  const commentUpdate = async(item) => {
    const cmt = {
      id : id,
      CNO : item.COMM_NO,
      RC_COMMENT : updComment
    }
    await commentUpdateDB(cmt);
    window.location.reload();
    dispatch(setToastMsg("댓글이 수정되었습니다."));
  }

  
  return (
    <ContainerDiv>
      <HeaderDiv>
        <h3 style={{marginLeft:"10px"}}>헬스리뷰 게시글</h3>
      </HeaderDiv>
      <FormDiv>
        <BoardHeader detail={detail} id={id} bno={bno}/>
        <section style={{minHeight: '400px'}}>
          <div dangerouslySetInnerHTML={{__html:detail.CONTENT}}></div>
        </section>
        <BoardFileDetail files={files}/>
        <hr style={{height:"2px"}}/>
        <div>
          <h3>댓글작성</h3>
          <div style={{display:'flex'}}>
            <textarea style={{width:'100%', resize:'none', border:'1px solid lightgray', borderRadius:'10px',padding:'5px'}}
              onChange={(e)=>{setComment(e.target.value)}}
            />
            <BButton style={{height:'60px', marginLeft:'10px'}} onClick={()=>{commentInsert()}}>작성</BButton>
          </div>
          <div>
            {cmtDetail.map((item, index)=>(
              <div key={index} style={{margin:'10px 0px 10px 0px'}}>
                <div style={{display: 'flex', justifyContent:"space-between", fontSize: '13px', marginBottom:'5px'}}>
                  <div style={{display:'flex', flexDirection:'column'}}>
                    <span style={{marginRight:'10px'}}>작성자 : {item.RC_WRITER}</span>
                    <span>작성일 : {item.RC_DATE}</span>
                  </div>
                  {
                    (sessionStorage.getItem('no')===JSON.stringify(item.MEM_NO)||sessionStorage.getItem('auth')==='3')&&
                    <div style={{display: 'flex', alignItems: 'end'}}>
                      <SpanA onClick={()=>{commentChange(index)}}>수정</SpanA>
                      <span>&nbsp;|&nbsp;</span>
                      <SpanA onClick={()=>{commentDelete(item)}}>삭제</SpanA>
                    </div>
                  }
                </div>
                <div style={{display: 'flex'}}>
                  <textarea style={{width:'100%', resize:'none', border:'1px solid lightgray', borderRadius:'10px',padding:'5px'}}
                    defaultValue={item.RC_COMMENT} readOnly={!cmtUpdate[index]}  onChange={(e)=>{setUpdComment(e.target.value)}}
                  />
                  {
                    cmtUpdate[index]&&<BButton style={{height:'60px', marginLeft:'10px'}} onClick={()=>{commentUpdate(item)}}>수정</BButton>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </FormDiv>
    </ContainerDiv>
  );
};

export default ReviewDetailPage;