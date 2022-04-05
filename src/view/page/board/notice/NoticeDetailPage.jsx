import React, { useState, useEffect } from 'react';
import { boardDetailDB } from '../../../../service/dbLogic';
import '../../../../styles/boardDetail.css'
import { ContainerDiv, FormDiv, HeaderDiv } from '../../../../styles/FromStyle';
import BoardFileDetail from '../../../component/board/BoardFileDetail';
import BoardHeader from '../../../component/board/BoardHeader';  



const NoticeDetailPage = ({id, bno}) => {
  
  const [detail, setDetail] = useState({});
  const[files, setFiles]= useState([]);

  useEffect(() => {
    const boardDetail = async() => {
      const board = {
        id: id,
        BNO : bno
      }
      const res = await boardDetailDB(board);
      const temp = res.data.shift();
      console.log(temp);
      setDetail({
        TITLE : temp.MASTER_TITLE,
        CONTENT : temp.MASTER_CONTENT,
        MEM_NICKNAME : temp.MEM_NICKNAME,
        MEM_NO : temp.MEM_NO,
        DATE : temp.MASTER_DATE,
        HIT : temp.MASTER_HIT,
      });
      if(res.data.length>0){
        setFiles(res.data);
      }
    }
    boardDetail();
  },[setDetail,setFiles , id , bno])



  return (
    <>
      <ContainerDiv>
        <HeaderDiv>
          <h3 style={{marginLeft:"10px"}}>공지사항 게시글</h3>
        </HeaderDiv>
        <FormDiv>
          <BoardHeader detail={detail} id={id} bno={bno}/>
          <section style={{minHeight: '400px'}}>
            <div dangerouslySetInnerHTML={{__html:detail.CONTENT}}></div>
          </section>
          <BoardFileDetail files={files}/>
        </FormDiv>
      </ContainerDiv>
    </>
  );
};

export default NoticeDetailPage;