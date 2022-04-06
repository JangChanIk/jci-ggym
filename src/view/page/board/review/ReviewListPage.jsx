import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { boardListDB } from '../../../../service/dbLogic';
import moment from 'moment';
import 'moment/locale/ko';
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from '../../../../styles/FromStyle';
import MyPagination from '../../../component/MyPagination';
import SearchBar from '../../../component/board/SearchBar';


const ReviewListPage = ({id, page}) => {

  const navigate = useNavigate();
  const search = decodeURIComponent(useLocation().search);
  const [rno,setRno] = useState([]);
  const [listBody,setListBody] = useState([]);
  
  useEffect(() => {
    const boardList = async() =>{
      const condition = search.split('&').filter((item)=>{return item.match('condition')})[0]?.split('=')[1];
      const content = search.split('&').filter((item)=>{return item.match('content')})[0]?.split('=')[1];
      const board = {
        id: id,
        page: page,
        condition: condition,
        content: content,
      }
      const res = await boardListDB(board);
      console.log(res);
      const list = [];
      const datas = res.data;
      setRno(Number.parseInt(datas?.shift()?.RNO));
      datas.forEach((item) => {
        let date = item.REVIEW_DATE;
        if(moment().format('YYYY-MM-DD')!==date.split(' ')[0]){
          const temp = date.split(' ')[0].split('-');
          date = temp[1]+"-"+temp[2];
        }else{
          const temp = date.split(' ')[1].split(':');
          date = temp[0]+":"+temp[1];
        }
        const obj = {
          bno : item.REVIEW_BNO,
          title: item.REVIEW_TITLE,
          writer: item.MEM_NICKNAME,
          no: item.MEM_NO,
          date: date,
          hit: item.REVIEW_HIT,
          comment: item.COMM_NO,
        };
        list.push(obj);
      })
      setListBody(list);
    }
    boardList();
  },[setListBody, setRno, id,  page, search]);


  const listHeaders = ["글번호","제목", "작성자", "등록일", "조회수"];
  const HeaderWd = ["10%","60%", "10%", "10%", "10%"];


  const listHeadersElements = listHeaders.map((listHeader, index) => 
  listHeader==='제목'?
    <th key={index} style={{width:HeaderWd[index], paddingLeft:"40px"}}>{listHeader}</th>
    :
    <th key={index} style={{width:HeaderWd[index],textAlign: 'center'}}>{listHeader}</th>
  )



  const listItemsElements = listBody.map((listItem, index) => {
    return (
      <tr key={index} onClick={()=>{navigate(`/board/detail?id=${id}&bno=${listItem.bno}&page=${page}`);}}>
          <td key={1} style={{textAlign: 'center'}}>{listItem.bno}</td> 
          <td key={2}>            
            {isNaN(listItem.file)&&<span><i style={{width:"15px", height:"15px"}} className={"fas fa-file-lines"}></i></span>}
            {!isNaN(listItem.file)&&<span><i style={{width:"15px", height:"15px"}} className={"fas fa-image"}></i></span>}
            &nbsp;&nbsp;{listItem.title}
            {listItem.comment&&<span style={{fontWeight:"bold"}}>&nbsp;[{listItem.comment}]</span>}</td>
          <td key={5} style={{textAlign: 'center'}}>{listItem.writer}</td> 
          <td key={6} style={{fontSize:'15px', textAlign: 'center'}}>{listItem.date}</td>
          <td key={7} style={{textAlign: 'center'}}>{listItem.hit}</td>
      </tr>
    )
  })




  return (
    <ContainerDiv>
      <HeaderDiv>
        <h3 style={{marginLeft:"10px"}}>리뷰 게시판</h3>
      </HeaderDiv>
      <FormDiv>
        <div>
          <div style={{display:"flex", justifyContent:"flex-end", height:"40px"}}>
            {
              sessionStorage.getItem('auth')==='1'&&
              <BButton style={{width:"80px", height:"38px"}} onClick={()=>{navigate(`/board/write?id=${id}`)}}>글쓰기</BButton>
            }
          </div>
          <Table responsive hover style={{minWidth:"700px"}}>
            <thead>
              <tr>
                {listHeadersElements}
              </tr>
            </thead>
            <tbody>
              {listItemsElements}
            </tbody>
          </Table>
        </div>
        <div style={{margin:"10px", display:"flex",flexDirection:"column" ,alignItems:"center" , justifyContent:"center" , width:"100%"}}>
          <MyPagination id={id} rno={rno} page={page} path={'/board/list'}/>
          <SearchBar id={id}/>
        </div>
      </FormDiv>
    </ContainerDiv>
  );
};

export default ReviewListPage;