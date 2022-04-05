import React from 'react';
import ReviewListPage from './review/ReviewListPage';
import FaqListPage from './faq/FaqListPage';
import NoticeListPage from './notice/NoticeListPage';
import QnAListPage from './qna/QnAListPage';
import TransListPage from './trans/TransListPage';

const BoardListPage = () => {

  const search = window.location.search;
  const id = search.split('&').filter((item)=>{return item.match('id')})[0]?.split('=')[1];
  const page = search.split('&').filter((item)=>{return item.match('page')})[0]?.split('=')[1];


  const boardList = () => {
    if(id==='notice') {
      return <NoticeListPage id={id} page={page}/>
    } else if(id==='review') {
      return <ReviewListPage id={id} page={page}/>
    } else if(id==='faq') {
      return <FaqListPage id={id} page={page}/>
    } else if(id==='trans') {
      return <TransListPage id={id} page={page}/>
    } else if(id==='qna') {
      return <QnAListPage id={id} page={page}/>
    }
  }

  return (
    boardList()
  );
};

export default BoardListPage;