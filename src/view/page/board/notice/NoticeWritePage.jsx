import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToastMsg } from '../../../../redux/toastStatus/action';
import { boardInsertDB } from '../../../../service/dbLogic';
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from '../../../../styles/FromStyle';
import BoardFileInsert from '../../../component/board/BoardFileInsert';
import QuillEditor from '../../../component/board/QuillEditor';


const NoticeWritePage = ({id}) => {

  const[title, setTitle]= useState('');
  const[content, setContent]= useState('');
  const[files, setFiles]= useState([]);
  const dispatch = useDispatch();
  
  const quillRef = useRef();
  
  useEffect(() => {
    for(let i=0; i<files.length; i++){
      if(!content.match(files[i].split(' | ')[0])){
        console.log(files);
        setFiles(files.filter(file=>file!==files[i]));
      }
    }
  },[content, setFiles, files]);
  


  const handleContent = useCallback((value) => {
    console.log(value);
    setContent(value);
  },[]);


  const handleFiles = useCallback((value) => {
    setFiles([...files, value]);
  },[files]);


  const handleTitle = useCallback((e) => {
    setTitle(e);
  },[]);

  const boardInsert = async() => {
    if(title.trim()===''||content.trim()===''||!id) return dispatch(setToastMsg("게시글이 작성되지 않았습니다."));
    const board = {
      id : id,
      MASTER_TITLE : title,
      MASTER_CONTENT : content,
      MEM_NO : sessionStorage.getItem('no'),
      fileNames : files,
    }
    const res = await boardInsertDB(board);
    if(!res.data) return dispatch(setToastMsg("게시판 입력에 실패했습니다."));
    window.location.replace(`/board/list?id=${id}&page=1`);

  }


  return (
    <>
      <ContainerDiv>
        <HeaderDiv>
          <h3 style={{marginLeft:"10px"}}>공지사항 글작성</h3>
        </HeaderDiv>
        <FormDiv>
          <div style={{width:"100%", maxWidth:"2000px"}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'10px'}}>
              <h2>제목</h2> 
              <BButton onClick={()=>{boardInsert()}}>글쓰기</BButton>
            </div>
            <input id="dataset-title" type="text" maxLength="50" placeholder="제목을 입력하세요."
              style={{width:"100%",height:'40px' , border:'1px solid lightGray'}} onChange={(e)=>{handleTitle(e.target.value)}}/>
            <hr style={{margin:'10px 0px 10px 0px'}}/>
            <h3>상세내용</h3>
            <QuillEditor value={content} handleContent={handleContent} quillRef={quillRef} files={files} handleFiles={handleFiles}/>
            <BoardFileInsert files={files}/>
          </div>
        </FormDiv>
      </ContainerDiv>
    </>
  );

};

export default NoticeWritePage;