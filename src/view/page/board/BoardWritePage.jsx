import React from 'react';
import NoticeWritePage from './notice/NoticeWritePage';
import ReviewWritePage from './review/ReviewWritePage';
import FaqWritePage from './faq/FaqWritePage';
import TransWritePage from './trans/TransWritePage';
import QnAWrtiePage from './qna/QnAWritePage';
import { setToastMsg } from '../../../redux/toastStatus/action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BoardWritePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = window.location.search;
  const id = search.split('&').filter((item)=>{return item.match('id')})[0]?.split('=')[1];


  const boardWrite = () => {
    if(id==='notice'&&sessionStorage.getItem('auth')==='3') {
      return <NoticeWritePage id={id}/>
    } else if(id==='review'&&sessionStorage.getItem('auth')==='1') {
      return <ReviewWritePage id={id}/>
    } else if(id==='faq'&&sessionStorage.getItem('auth')==='3') {
      return <FaqWritePage id={id}/>
    } else if(id==='trans'&&sessionStorage.getItem('auth')==='1') {
      return <TransWritePage id={id}/>
    } else if(id==='qna'&&sessionStorage.getItem('auth')==='1') {
      return <QnAWrtiePage id={id}/>
    } else {
      navigate(`/board/list?id=${id}&page=1`);
      dispatch(setToastMsg("권한이 없습니다."));
      return <></>
    }
  }

  return (
    boardWrite()
  );
};

export default BoardWritePage;