import React from 'react';
import { useNavigate } from 'react-router-dom';
import { boardDeleteDB } from '../../../service/dbLogic';
import { BButton } from '../../../styles/FromStyle';

const BoardHeader = ({detail, id, bno}) => {

  const navigate = useNavigate();
  
  const boardDelete = async() => {
    const board = {
      id: id,
      BNO : bno
    }
    boardDeleteDB(board);
    window.location.replace(`/board/list?id=${id}&page=1`);
  }


  return (
    <div>
      <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
        <div style={{display: 'flex', justifyContent:"space-between"}}>
          <div style={{overflow: "auto"}}>
            <span style={{marginBottom:'15px', fontSize: "30px", display:"block"}}>
              {detail.TITLE}
            </span>
          </div>
          {
            (sessionStorage.getItem('no')===JSON.stringify(detail.MEM_NO)||sessionStorage.getItem('auth')==='3')&&
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <BButton style={{margin:'0px 10px 0px 10px'}} onClick={()=>{navigate(`/board/update?id=${id}&bno=${bno}`)}}>
                수정
              </BButton>
              <BButton onClick={()=>{boardDelete()}}>
                삭제
              </BButton>
            </div>
          }
        </div>
        <div style={{display: 'flex', fontSize: '14px', height:'22px'}}>
          {detail.TYPE&&<span>카테고리 : {detail.TYPE}&nbsp;</span>}
          {detail.SECRET&&<span><i className="fas fa-lock"></i></span>}
          {detail.STATUS===0?<span>상태 : 양도중</span>:detail.STATUS===1?<span>상태 : 양도완료</span>:<></>}
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px'}}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <span>작성자 : {detail.MEM_NICKNAME}</span>
            <span>작성일 : {detail.DATE}</span>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', marginRight:'10px'}}>
            <div style={{display: 'flex'}}>
              <span style={{marginRight:'5px'}}>조회수 :</span>
              <div style={{display: 'flex', justifyContent: 'flex-end', width:'30px'}}>{detail.HIT}</div>
            </div>
            <div style={{display: 'flex'}}>
              {detail.COMMENT?<>
                <span style={{marginRight:'5px'}}>댓글수 :</span>
                <div style={{display: 'flex', justifyContent: 'flex-end', width:'30px'}}>{detail.COMMENT}</div>
              </>:<></>}
            </div>
          </div>
        </div>
      </div>
      <hr style={{height: '2px'}}/>
    </div>
  );
};

export default BoardHeader;