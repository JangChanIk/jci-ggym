import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const MyPagination = ({id, rno, page, path}) => {


  const [pages, setPages] = useState([]); 
  const [totalPage, setTotalPage] = useState(); 
  const search = window.location.search;
  const condition = search.split('&').filter((item)=>{return item.match('condition')})[0]?.split('=')[1];
  const content = search.split('&').filter((item)=>{return item.match('content')})[0]?.split('=')[1];

  useEffect(() => {
    const row = [];
    const paging = (Math.floor(page/5)===0?1:((page%5===0?page-4:Math.floor(page/5)*5+1)));
    for(let i=paging; i<=(rno%10===0?rno/10:rno/10+1)&&i<=paging+4; i++){ 
      row.push(i); 
    }
    setTotalPage(Math.floor(rno%10===0?rno/10:rno/10+1));
    setPages(row);
  },[id, rno, page]);

  
  

  return (
    <div>
      <Pagination>
      {
        page>5 &&
        <>
            <LinkContainer to={path+`?id=${id}&page=1`
              +((condition&&content)?`&condition=${condition}&content=${content}`:'')}>
              <Pagination.First/>
            </LinkContainer>
            <LinkContainer to={path+`?id=${id}&page=${(Math.floor(page%5)===0?(Math.floor(page/5)*5)-9:(Math.floor(page/5)*5)-4)}`
              +((condition&&content)?`&condition=${condition}&content=${content}`:'')}>
              <Pagination.Prev/>
            </LinkContainer> 
        </>
      }
        {
          pages.map((item)=>(
            <LinkContainer to={path+`?id=${id}&page=${item}`
              +((condition&&content)?`&condition=${condition}&content=${content}`:'')} key={item}>
              <Pagination.Item active={item===Number.parseInt(page)&&true} key={item}>
                {item}
              </Pagination.Item>
            </LinkContainer>
          ))
        }
      {
        page<Math.floor((totalPage-1)/5)*5+1&&
        <>
          <LinkContainer to={path+`?id=${id}&page=${
            (Math.floor(page%5)===0?(Math.floor(page/5)*5)+1:(Math.floor(page/5)*5)+6)}`
            +((condition&&content)?`&condition=${condition}&content=${content}`:'')}>
            <Pagination.Next/>
          </LinkContainer>  
          <LinkContainer to={path+`?id=${id}&page=${totalPage}`}>
            <Pagination.Last/>
          </LinkContainer>  
        </>
      }
      </Pagination>
    </div>
  );
};

export default MyPagination;