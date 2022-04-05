import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';


const MyFilter = ({types, type, id, title, handleTitle}) => {

  const navigate = useNavigate();
  const location = useLocation();
  const search = decodeURIComponent(useLocation().search);


  const setPath = (oldItem, newItem, key) => {
    let path;
    path = location.pathname+`${search.split('&').filter((item)=>{return item.match('id')})}&page=1&${key}=${newItem}`
    // if (search.match(key)){
    //   path = location.pathname+search.replace(`&${key}=${oldItem}`,`&${key}=${newItem}`)
    // } else{
    //   path = location.pathname+location.search+`&${key}=${newItem}`
    // }
    console.log(path)
    return path;
  }
  

  const setMypostPath = (newItem) => {
    let path;
    console.log(newItem);
    if(newItem==='양도') newItem = 'trans';
    else if(newItem==='리뷰') newItem = 'review';
    else if(newItem==='문의') newItem = 'qna';
    else if(newItem==='공지') newItem = 'notice';
    else if(newItem==='FAQ') newItem = 'faq';
    path = location.pathname+`?id=${newItem}&page=1`;
    console.log(path);
    return path;
  };


  return (
    <DropdownButton variant="" title={title} style={{border: '1px solid lightgray', borderRadius:'5px', height:'38px'}}>
      { 
        types.map((element, index)=>(
          <Dropdown.Item as="button" key={index} onClick={()=>{
            if(type){ 
              if(id==="mypost") navigate(setMypostPath(element)); 
              else navigate(setPath(title,element,id)); 
            }
            handleTitle(element); 
          }}>
            {element}
          </Dropdown.Item>
        )) 
      }
    </DropdownButton>
  );
};

export default MyFilter;