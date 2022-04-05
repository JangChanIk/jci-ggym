import React, { useState, useEffect, useRef, useCallback } from 'react';
import { boardDetailDB, boardUpdateDB } from '../../../../service/dbLogic';
import QuillEditor from '../../../component/board/QuillEditor';
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from '../../../../styles/FromStyle';
import BoardFileInsert from '../../../component/board/BoardFileInsert';
import { useDispatch } from 'react-redux';
import { setToastMsg } from '../../../../redux/toastStatus/action';
import { useNavigate } from 'react-router-dom';


const NoticeUpdatePage = ({id, bno}) => {
  
  const[title, setTitle]= useState('');
  const[content, setContent]= useState('');
  const[files, setFiles]= useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quillRef = useRef();


  useEffect(() => {
    for(let i=0; i<files.length; i++){
      if(!content.match(files[i].split(' | ')[0])){
        console.log(files);
        setFiles(files.filter(file=>file!==files[i]));
      }
    }
    
  },[content, setFiles, files]);

  useEffect(() => {
    const boardDetail = async() => {
      const board = {
        id: id, 
        BNO: bno
      }
      const res = await boardDetailDB(board);
      console.log(res);
      if(JSON.stringify(res.data[0].MEM_NO)!==sessionStorage.getItem('no')) {
        navigate(`/board/list?id=${id}&page=1`);
        return dispatch(setToastMsg("작성자가 아닙니다."));
      }
      const fileNames = [];
      res.data?.forEach((data, index) => {
        if(index===0){ 
          setTitle(data.MASTER_TITLE); 
          setContent(data.MASTER_CONTENT);  
        } else {
          fileNames.push(data.FILE_NAME);
        }        
      })
      if(fileNames){setFiles(fileNames);}
    }
    boardDetail();
  },[setFiles, setTitle, setContent, id, bno, navigate, dispatch]);
  

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

  const boardUpdate = async() => {
    if(title.trim()===''||content.trim()===''||!id) return dispatch(setToastMsg("게시글이 작성되지 않았습니다."));
    const board = {
      id : id,
      BNO : bno,
      MASTER_TITLE : title,
      MASTER_CONTENT : content,
      fileNames : files,
      MEM_NO : sessionStorage.getItem('no'),
    }
    const res = await boardUpdateDB(board);
    if(!res.data) return dispatch(setToastMsg("게시판 업로드에 실패했습니다."));
    window.location.replace(`/board/list?id=${id}&page=1`);
  }



  return (
    <>
      <ContainerDiv>
        <HeaderDiv>
          <h3 style={{marginLeft:"10px"}}>공지사항 글수정</h3>
        </HeaderDiv>
        <FormDiv>
          <div style={{width:"100%", maxWidth:"2000px"}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'10px'}}>
                <h2>제목</h2> 
                <BButton onClick={()=>{boardUpdate()}}>글쓰기</BButton>
            </div>
            <input id="dataset-title" type="text" placeholder="제목을 입력하세요." defaultValue={title}
              style={{width:"100%",height:'40px' , border:'1px solid lightGray'}} onChange={(e)=>{handleTitle(e.target.value)}}/>
            <hr />
            <h3 style={{textAlign:"left", marginBottom:'10px'}}>상세내용</h3>
            <QuillEditor value={content} handleContent={handleContent} quillRef={quillRef} files={files} handleFiles={handleFiles}/>
            <BoardFileInsert files={files}/>
          </div>
        </FormDiv>
      </ContainerDiv>
    </>
  );
};

export default NoticeUpdatePage;