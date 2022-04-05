import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BButton } from '../../../styles/FromStyle'
import MyFilter from '../MyFilter';

const SearchBar = ({id}) => {
  
  const[content, setContent]= useState('');
  const[types]= useState(['제목','내용','작성자']);
  const location = useLocation();
  const search = decodeURIComponent(location.search);
  const navigate = useNavigate();
  
  const[tTitle, setTTitle]= useState('제목');

  const handleTTitle = useCallback((e) => {
    setTTitle(e);
  },[]) 

  useEffect(() => {
    search.split('&').forEach((item)=>{
      if(item.match('condition')){ 
        console.log(item)
        setTTitle(item.split('=')[1]); 
      }
    });
  },[search, setTTitle])


  const setPath = () => {
    let path;
    console.log(tTitle, content)
    console.log(`&${search.split('&').filter((item)=>{return item.match('condition')})}&${search.split('&').filter((item)=>{return item.match('content')})}`)
    if (search.match('condition')){
      path = location.pathname+
      search.replace(
        `&${search.split('&').filter((item)=>{return item.match('condition')})}&${search.split('&').filter((item)=>{return item.match('content')})}`,
        `&condition=${tTitle}&content=${content}`
        ).replace(`&${search.split('&').filter((item)=>{return item.match('page')})}`,'&page=1')
      } else{
        path = location.pathname+search+`&condition=${tTitle}&content=${content}`
      }
      console.log(path)
    return path;
  }


  

  return (
    <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
      <MyFilter types={types} title={tTitle} id={"condition"} handleTitle={handleTTitle}/>
      <input type="text" value={content} style={{maxWidth: "600px", width: "40%", height:"40px",
        margin: "0px 10px 0px 10px", border:"1px solid lightgray", borderRadius:"10px"}}
        onChange={(e)=>{setContent(e.target.value);}}
        />
      <BButton style={{width: "70px", height:'40px', marginRight:"10px"}} onClick={()=>{navigate(setPath())}}>검색</BButton>
      <BButton style={{width: "70px", height:'40px'}} onClick={()=>{navigate(`/board/list?id=${id}&page=1`); setContent('');}}>초기화</BButton>
    </div>
  );
};

export default SearchBar;