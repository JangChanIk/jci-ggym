import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToastMsg } from '../../../../redux/toastStatus/action';
import { boardDetailDB, commentDeleteDB, commentInsertDB, commentUpdateDB, kakaoPayReadyDB} from '../../../../service/dbLogic';
import '../../../../styles/boardDetail.css'
import { BButton, ContainerDiv, FormDiv, HeaderDiv, SpanA } from '../../../../styles/FromStyle';
import BoardHeader from '../../../component/board/BoardHeader';  
import PassTable from '../../../component/pass/PassTable';

const TransDetailPage = ({id, bno}) => {

  const [detail, setDetail] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cmtDetail,setCmtDetail] = useState([]); 
  const [comment,setComment] = useState('');
  const [selectPass, setSelectPass] = useState({});

  const [updComment,setUpdComment] = useState('');
  const [cmtUpdate,setCmtUpdate] = useState([]); 
  
  useEffect(() => {
    const boardDetail = async() => {
      const board = {
        id: id,
        BNO : bno
      }
      const res = await boardDetailDB(board);
      const bTemp = res.data.shift();
      setDetail({
        TITLE : bTemp.TRANSB_TITLE,
        BNO : bTemp.TRANSB_BNO,
        CONTENT : bTemp.TRANSB_CONTENT,
        MEM_NICKNAME : bTemp.MEM_NICKNAME,
        MEM_NO : bTemp.MEM_NO,
        DATE : bTemp.TRANSB_DATE,
        HIT : bTemp.TRANSB_HIT,
        COMMENT : res.data[0].COMMENT.length,
        STATUS : bTemp.TRANSB_STATUS
      });
      setCmtUpdate(new Array(res.data[0].COMMENT.length));
      setSelectPass({
        PASS_CNT: bTemp.PASS_CNT,
        PASS_SDAY: bTemp.PASS_SDAY,
        PASS_EDAY: bTemp.PASS_EDAY,
        PASS_NO: bTemp.PASS_NO,
        PROD_NAME: bTemp.PROD_NAME,
        PASS_TYPE: bTemp.PASS_TYPE,
      });
      const cTemp = res.data.shift();
      if(cTemp.COMMENT){
        let comments = [];
        cTemp.COMMENT.forEach((item)=>{
          comments.push(item);
        })
        setCmtDetail(comments);
      }
      console.log(bTemp);
      console.log(cTemp);
    }
    boardDetail();
  },[setDetail, setCmtDetail,setCmtUpdate, setSelectPass, id , bno])

  const commentInsert = async() => {
    if(!comment) return dispatch(setToastMsg("댓글을 작성해주세요."))
    const cmt = {
      id : id,
      BNO : bno,
      TC_WRITER : sessionStorage.getItem('nickname'),
      TC_COMMENT : comment,
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
      TC_COMMENT : updComment
    }
    await commentUpdateDB(cmt);
    window.location.reload();
    dispatch(setToastMsg("댓글이 수정되었습니다."));
  }



  const payment = async(item) => {

    const buyList = [
      {
        MEM_NO : sessionStorage.getItem('no'),
        PROD_TYPE : 2,
        PROD_NO : 11,
      }
    ];

    const kakao = await kakaoPayReadyDB(buyList);
    console.log(kakao);
    sessionStorage.setItem('KAKAOPAYURL', kakao.data.NEXT_REDIRECT_PC_URL);
    sessionStorage.setItem('ORDER_NO', kakao.data.ORDER_NO);
    sessionStorage.setItem('PAY_NO', kakao.data.PAY_NO);
    sessionStorage.setItem('PASS_NO', selectPass.PASS_NO);
    sessionStorage.setItem('TRANS_MEM_NO', item.MEM_NO);
    sessionStorage.setItem('BNO', detail.BNO);
    navigate('/pay/ready');

  }


  return (
    <ContainerDiv>
      <HeaderDiv>
        <h3 style={{marginLeft:"10px"}}>양도 게시글</h3>
      </HeaderDiv>
      <FormDiv>
        <BoardHeader detail={detail} id={id} bno={bno}/>
        <section style={{minHeight: '400px'}}>
          <div dangerouslySetInnerHTML={{__html:detail.CONTENT}}></div>
        </section>
        <hr style={{height:"2px"}}/>
        <div style={{display:'block', border:'1px solid lightGray', borderRadius:'10px', minHeight:'60px', padding:'5px'}}>
          <h4 style={{textAlign:"left", padding: "2px 5px 2px 5px"}}>양도할 이용권 정보</h4>
          <PassTable myPass={[selectPass]} index={selectPass.PASS_TYPE} />
        </div>
        <hr style={{height:"2px"}}/>
        <div>
          {
            (detail.STATUS===0&&sessionStorage.getItem('auth')==='1')&&
            <>
              <h3>댓글작성</h3>
              <div style={{display:'flex'}}>
                <textarea style={{width:'100%', resize:'none', border:'1px solid lightgray', borderRadius:'10px',padding:'5px'}}
                  onChange={(e)=>{setComment(e.target.value)}}
                />
                <BButton style={{height:'60px', marginLeft:'10px'}} onClick={()=>{commentInsert()}}>작성</BButton>
              </div>
            </>
          }
          <div>
            {cmtDetail.map((item, index)=>(
              <div key={index} style={{margin:'10px 0px 10px 0px'}}>
                <div style={{display: 'flex', justifyContent:"space-between", fontSize: '13px', marginBottom:'5px'}}>
                  <div style={{display:'flex', flexDirection:'column'}}>
                    <span style={{marginRight:'10px'}}>작성자 : {item.TC_WRITER}</span>
                    <span>작성일 : {item.TC_DATE}</span>
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
                    defaultValue={item.TC_COMMENT} readOnly={!cmtUpdate[index]}  onChange={(e)=>{setUpdComment(e.target.value)}}
                    />
                  {
                    cmtUpdate[index]&&<BButton style={{height:'60px', marginLeft:'10px'}} onClick={()=>{commentUpdate(item)}}>수정</BButton>
                  }
                  {
                    (detail.STATUS===0&&JSON.stringify(detail.MEM_NO)===sessionStorage.getItem('no')&&
                    JSON.stringify(item.MEM_NO)!==sessionStorage.getItem('no'))&&
                    <BButton style={{height:'60px', marginLeft:'10px'}} onClick={()=>{payment(item)}}>양도</BButton>
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

export default TransDetailPage;