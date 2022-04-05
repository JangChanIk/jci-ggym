import React from 'react';
import NoticeDetailPage from './notice/NoticeDetailPage';
import ReviewDetailPage from './review/ReviewDetailPage';
import FaqDetailPage from './faq/FaqDetailPage';
import TransDetailPage from './trans/TransDetailPage';
import QnADetailPage from './qna/QnADetailPage';

const BoardDetailPage = () => {
  const search = window.location.search;
  const id = search.split('&').filter((item)=>{return item.match('id')})[0]?.split('=')[1];
  const bno = search.split('&').filter((item)=>{return item.match('bno')})[0]?.split('=')[1];

  const boardDetail = () => {
    if(id==='notice') {
      return <NoticeDetailPage id={id} bno={bno}/>
    } else if(id==='review') {
      return <ReviewDetailPage id={id} bno={bno}/>
    } else if(id==='faq') {
      return <FaqDetailPage id={id} bno={bno}/>
    } else if(id==='trans') {
      return <TransDetailPage id={id} bno={bno}/>
    } else if(id==='qna') {
      return <QnADetailPage id={id} bno={bno}/>
    }
  }

  return (
    boardDetail()
  );
};

export default BoardDetailPage;