import React, { useState, useEffect, useCallback } from 'react';
import { Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { boardListDB } from '../../../../service/dbLogic';
import moment from 'moment';
import 'moment/locale/ko';
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from '../../../../styles/FromStyle';
import MyPagination from '../../../component/MyPagination';
import MyFilter from '../../../component/MyFilter';
import { useDispatch } from 'react-redux';
import { setToastMsg } from '../../../../redux/toastStatus/action';
import SearchBar from '../../../component/board/SearchBar';


const QnAListPage = ({id, page}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = decodeURIComponent(useLocation().search);
  
  const [rno,setRno] = useState([]);
  const [listBody,setListBody] = useState([]);
  const[types]= useState(['전체','일반','결제','양도','회원','수업']);
  const [tTitle, setTTitle] = useState('전체') 

  const handleTTitle = useCallback((element) => {
    setTTitle(element);
  },[]);


  useEffect(() => {
    const boardList = async() =>{
      const condition = search.split('&').filter((item)=>{return item.match('condition')})[0]?.split('=')[1];
      const content = search.split('&').filter((item)=>{return item.match('content')})[0]?.split('=')[1];
      const qna_type = search.split('&').filter((item)=>{return item.match('qna_type')})[0]?.split('=')[1];
      setTTitle(qna_type||'전체');
      const board = {
        id: id,
        page: page,
        QNA_TYPE: qna_type,
        condition: condition,
        content: content,
      }
      const res = await boardListDB(board);
      console.log(res);
      const list = [];
      const datas = res.data;
      setRno(Number.parseInt(datas.shift()?.RNO));
      datas.forEach((item) => {
        let date = item.QNA_DATE;
        if(moment().format('YYYY-MM-DD')!==date.split(' ')[0]){
          const temp = date.split(' ')[0].split('-');
          date = temp[1]+"-"+temp[2];
        }else{
          const temp = date.split(' ')[1].split(':');
          date = temp[0]+":"+temp[1];
        }
        const obj = {
          bno : item.QNA_BNO,
          type: item.QNA_TYPE,
          title: item.QNA_TITLE,
          writer: item.MEM_NICKNAME,
          no: item.MEM_NO,
          date: date,
          hit: item.QNA_HIT,
          secret: Boolean(item.QNA_SECRET),
          file: item.FILE,
          comment: item.COMM_NO,
        };
        list.push(obj);
      })
      setListBody(list);
    }
    boardList();
  },[setListBody, setRno, setTTitle, id,  page, search]);

  
  const getAuth = (listItem) => {
    if(listItem.secret===false){
      navigate(`/board/detail?id=${id}&bno=${listItem.bno}&page=${page}`);
    } else {
      if(sessionStorage.getItem('auth')==='3'||sessionStorage.getItem('no')===JSON.stringify(listItem.no)) {
        navigate(`/board/detail?id=${id}&bno=${listItem.bno}&page=${page}`);
      } else {
        return dispatch(setToastMsg("권한이 없습니다.")); 
      }
    }
  }


  
  const listHeaders = ["글번호","분류","제목", "작성자", "등록일", "조회수"];
  const HeaderWd = ["8%","8%","50%", "12%", "12%", "10%"];


  const listHeadersElements = listHeaders.map((listHeader, index) => 
  listHeader==='제목'?
    <th key={index} style={{width:HeaderWd[index], paddingLeft:"40px"}}>{listHeader}</th>
    :
    <th key={index} style={{width:HeaderWd[index],textAlign: 'center'}}>{listHeader}</th>
  )

  const listItemsElements = listBody.map((listItem, index) => {
    return (
      <tr key={index} onClick={()=>{getAuth(listItem)}}>
        { Object.keys(listItem).map((key, index) => (
          key==='secret'||key==='no'||key==='file'||key==='comment'? null
          :
          key==='date'?
          <td key={index} style={{fontSize:'15px', textAlign: 'center'}}>{listItem[key]}</td>
          :
          key==='title'?
          <td key={index}>
            {<span><i style={{width:"15px", height:"15px"}} className={!listItem.file?"fas fa-file-lines":"fas fa-image"}></i></span>}
            &nbsp;&nbsp;{listItem[key]}
            {listItem.comment?<span style={{fontWeight:"bold"}}>&nbsp;&nbsp;[답변완료]</span>:<span>&nbsp;&nbsp;[미답변]</span>}
            {listItem.secret&&<span>&nbsp;&nbsp;<i className="fas fa-lock"></i></span>}</td>
          :
          <td key={index} style={{textAlign: 'center'}}>{listItem[key]}</td>
        ))}  
      </tr>
    )
  })



  return (
    <>
      <ContainerDiv>
        <HeaderDiv>
          <h3 style={{marginLeft:"10px"}}>QnA 게시판</h3>
        </HeaderDiv>
        <FormDiv>
          <div>
            <div style={{display:"flex", justifyContent:"space-between", height:"40px"}}>
              <MyFilter types={types} type={true} id={"qna_type"} title={tTitle} handleTitle={handleTTitle}/>
              {
                sessionStorage.getItem('auth')==='1'&&
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

export default QnAListPage;