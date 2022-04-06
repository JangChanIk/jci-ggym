import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { boardListDB } from '../../../../service/dbLogic';
import moment from 'moment';
import 'moment/locale/ko';
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from '../../../../styles/FromStyle';
import MyPagination from '../../../component/MyPagination';
import SearchBar from '../../../component/board/SearchBar';

const FaqListPage = ({id, page}) => {

  const navigate = useNavigate();
  const [rno,setRno] = useState([]);
  const [listBody,setListBody] = useState([]);
  const search = decodeURIComponent(useLocation().search);

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
      setRno(Number.parseInt(res.data.shift()?.RNO));
      res.data.forEach((item) => {
        let date = item.MASTER_DATE;
        if(moment().format('YYYY-MM-DD')!==date.split(' ')[0]){
          const temp = date.split(' ')[0].split('-');
          date = temp[1]+"-"+temp[2];
        }else{
          const temp = date.split(' ')[1].split(':');
          date = temp[0]+":"+temp[1];
        }
        const obj = {
          bno : item.MASTER_BNO,
          title: item.MASTER_TITLE,
          writer: item.MEM_NICKNAME,
          date: date,
          hit: item.MASTER_HIT,
          file: item.FILE
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
      <tr key={index} onClick={()=>{navigate(`/board/detail?id=${id}&bno=${listItem.bno}&page=${page}`)}}>
        { Object.keys(listItem).map((key, index) => (
          key==='file'?
          null
          :
          key==='date'?
          <td key={index} style={{fontSize:'15px', textAlign: 'center'}}>{listItem[key]}</td>
          :
          key==='title'?
          <td key={index}>
            {isNaN(listItem.file)&&<span><i style={{width:"15px", height:"15px"}} className={"fas fa-file-lines"}></i></span>}
            {!isNaN(listItem.file)&&<span><i style={{width:"15px", height:"15px"}} className={"fas fa-image"}></i></span>}
            &nbsp;&nbsp;{listItem[key]}</td>
          :
          <td key={index} style={{textAlign: 'center'}}>{listItem[key]}</td>
        )) }
      </tr>
    )
  })



  return (
    <>
      <ContainerDiv>
        <HeaderDiv>
          <h3 style={{marginLeft:"10px"}}>FAQ 게시판</h3>
        </HeaderDiv>
        <FormDiv>
          <div>
            <div style={{display:"flex", justifyContent:"flex-end", height:"40px"}}>
              {
                sessionStorage.getItem('auth')==='3'&&
                <BButton style={{width:"80px", height:"38px"}} onClick={()=>{navigate(`/board/write?id=${id}`)}}>글쓰기</BButton>
              }
            </div>
            <Table responsive hover style={{minWidth:"800px"}}>
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
    </>
  );
};

export default FaqListPage;