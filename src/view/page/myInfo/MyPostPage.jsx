import React, { useState, useEffect } from 'react';
import MyPagination from '../../component/MyPagination';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { boardListDB } from '../../../service/dbLogic';
import moment from 'moment';
import 'moment/locale/ko';
import { ContainerDiv, FormDiv, HeaderDiv } from '../../../styles/FromStyle';
import MyFilter from '../../component/MyFilter';
import SearchBar from '../../component/board/SearchBar';


const MyPostsPage = () => {

  const navigate = useNavigate();

  const search = decodeURIComponent(window.location.search);

  const[tTitle, setTTitle]= useState('');
  const handleTTitle = (e) => {
    setTTitle(e);
  } 

  const [id,setId] = useState('');
  const [page,setPage] = useState('');
  const [rno,setRno] = useState(0);
  const [listBody,setListBody] = useState([]);
  const[types, setTypes]= useState([]);
  

  useEffect(() => {
    const setDate = (date) => {
      if(moment().format('YYYY-MM-DD')!==date.split(' ')[0]){
        const temp = date.split(' ')[0].split('-');
        return date = temp[1]+"-"+temp[2];
      }else{
        const temp = date.split(' ')[1].split(':');
        return date = temp[0]+":"+temp[1];
      }
    }
    const boardList = async() =>{
      let type;
      const id = search.split('&').filter((item)=>{return item.match('id')})[0]?.split('=')[1];
      const page = search.split('&').filter((item)=>{return item.match('page')})[0]?.split('=')[1];
      const condition = search.split('&').filter((item)=>{return item.match('condition')})[0]?.split('=')[1];
      const content = search.split('&').filter((item)=>{return item.match('content')})[0]?.split('=')[1];
      
      if(id==='trans') type = '양도';
      else if(id==='review') type = '리뷰';
      else if(id==='qna') type = '문의';
      else if(id==='notice') type = '공지';
      else if(id==='faq') type = 'FAQ';

      if(sessionStorage.getItem('auth')==='1'){
        setTypes(['양도','리뷰','문의']);
      } else if(sessionStorage.getItem('auth')==='3') {
        setTypes(['공지','FAQ']);
      }
      setTTitle(type);

      setId(id);
      setPage(page);

      const board = {
        id: id,
        page: page,
        condition : condition,
        content: content,
        MEM_NO : sessionStorage.getItem('no'),
      }
      const res = await boardListDB(board);
      console.log(res);
      const list = [];
      const datas = res.data;
      setRno(Number.parseInt(datas.shift()?.RNO));

      let date;
      let obj;

      if(id==='qna') {
        datas.forEach((item) => {
          date = setDate(item.QNA_DATE);
          obj = {
            bno : item.QNA_BNO,
            title: item.QNA_TITLE,
            writer: item.MEM_NICKNAME,
            no: item.MEM_NO,
            date: date,
            hit: item.QNA_HIT,
            file: item.FILE,
            comment: item.COMM_NO,
            type: item.QNA_TYPE,
            secret: Boolean(item.QNA_SECRET),
          };
          list.push(obj);
        })
      }
      else if(id==='review') {
        datas.forEach((item) => {
          date = setDate(item.REVIEW_DATE);
          obj = {
            bno : item.REVIEW_BNO,
            title: item.REVIEW_TITLE,
            writer: item.MEM_NICKNAME,
            no: item.MEM_NO,
            date: date,
            hit: item.REVIEW_HIT,
            file: item.FILE,
            comment: item.COMM_NO,
            REVIEW: item.STAR,
          }
          list.push(obj);
        });
      } 
      else if(id==='trans') {
        datas.forEach((item) => {  
          date = setDate(item.TRANSB_DATE);
          obj = {
            bno : item.TRANSB_BNO,
            title: item.TRANSB_TITLE,
            writer: item.MEM_NICKNAME,
            no: item.MEM_NO,
            date: date,
            hit: item.TRANSB_HIT,
            comment: item.COMM_NO,
          }
          list.push(obj);
        });
      } else if(id==='notice') {
        datas.forEach((item) => {  
          date = setDate(item.MASTER_DATE);
          obj = {
            bno : item.MASTER_BNO,
            title: item.MASTER_TITLE,
            writer: item.MEM_NICKNAME,
            no: item.MEM_NO,
            date: date,
            hit: item.MASTER_HIT,
          }
          list.push(obj);
        });
      } else if(id==='faq') {
        datas.forEach((item) => {  
          date = setDate(item.MASTER_DATE);
          obj = {
            bno : item.MASTER_BNO,
            title: item.MASTER_TITLE,
            writer: item.MEM_NICKNAME,
            no: item.MEM_NO,
            date: date,
            hit: item.MASTER_HIT,
          }
          list.push(obj);
        });
      }
      setListBody(list);
    } 
    boardList();
  },[setListBody, setRno, setId, setTTitle, search]);


  const listHeaders = ["글번호","제목", "작성자", "등록일", "조회수"];
  const HeaderWd = ["10%","60%", "10%", "10%", "10%"];


  const listHeadersElements = listHeaders.map((listHeader, index) => 
  listHeader==='제목'?
    <th key={index} style={{width:HeaderWd[index]}}>{listHeader}</th>
    :
    <th key={index} style={{width:HeaderWd[index],textAlign: 'center'}}>{listHeader}</th>
  )

  const listItemsElements = listBody.map((listItem, index) => {
    return (
      <tr key={index} onClick={()=>{navigate(`/board/detail?id=${id}&bno=${listItem.bno}&page=1`)}}>
        { Object.keys(listItem).map((key, index) => (
          key==='secret'||key==='type'||key==='no'||key==='file'||key==='comment'? null
          :
          key==='date'?
          <td key={index} style={{fontSize:'15px', textAlign: 'center'}}>{listItem[key]}</td>
          :
          key==='title'?
          <td key={index}>{listItem[key]}
            {listItem.star&&<span>&nbsp;&nbsp;{[...Array(listItem.star)].map(() => (<i className="fas fa-star"></i>))}</span>}
            {listItem.secret&&<span>&nbsp;&nbsp;<i className="fas fa-lock"></i></span>}
            {listItem.file&&<span>&nbsp;&nbsp;<i className="fas fa-image"></i></span>}
            {id==='qna'&&(listItem.comment?<span style={{fontWeight:"bold"}}>&nbsp;&nbsp;[답변완료]</span>:<span>&nbsp;&nbsp;[미답변]</span>)}
            {((id==='trans'||id==='review'))&&<span>&nbsp;&nbsp;[{listItem.comment||'0'}]</span>}</td>
          :
          <td key={index} style={{textAlign: 'center'}}>{listItem[key]}</td>
        ))}  
      </tr>
    )
  })



  return (
    <ContainerDiv>
      <HeaderDiv>
        <h3 style={{marginLeft:"10px"}}>내 게시판</h3>
      </HeaderDiv>
      <FormDiv>
        <div>
          <div style={{display:"flex", justifyContent:"space-between", height:"40px"}}>
            <MyFilter title={tTitle} types={types} handleTitle={handleTTitle} type={true} id={"mypost"}/>
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

export default MyPostsPage;