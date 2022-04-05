import React from 'react';
import NoticeUpdatePage from './notice/NoticeUpdatePage';
import ReviewUpdatePage from './review/ReviewUpdatePage';
import FaqUpdatePage from './faq/FaqUpdatePage';
import TransUpdatePage from './trans/TransUpdatePage';
import QnAUpdatePage from './qna/QnAUpdatePage';

const BoardUpdatePage = () => {

  const search = window.location.search;
  const id = search.split('&').filter((item)=>{return item.match('id')})[0]?.split('=')[1];
  const bno = search.split('&').filter((item)=>{return item.match('bno')})[0]?.split('=')[1];

  const boardUpdate = () => {
    if(id==='notice') {
      return <NoticeUpdatePage id={id} bno={bno}/>
    } else if(id==='review') {
      return <ReviewUpdatePage id={id} bno={bno}/>
    } else if(id==='faq') {
      return <FaqUpdatePage id={id} bno={bno}/>
    } else if(id==='trans') {
      return <TransUpdatePage id={id} bno={bno}/>
    } else if(id==='qna') {
      return <QnAUpdatePage id={id} bno={bno}/>
    }
  }

  return (
    boardUpdate()
  );
};

export default BoardUpdatePage;