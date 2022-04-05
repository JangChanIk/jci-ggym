import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setToastMsg } from "../../../redux/toastStatus/action";
import { memberListDB } from "../../../service/dbLogic";
import { LoginForm, MyH1, MyInput, MyLabel, SubmitButton } from "../../../styles/FromStyle";

const FindEmailPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const[submitBtn, setSubmitBtn] = useState({
    disabled: true,
    bgColor: 'rgb(175, 210, 244)',
    hover: false
  });

  const toggleHover = () => {
    if(submitBtn.hover){
      setSubmitBtn({...submitBtn, hover: false, bgColor: 'rgb(105, 175, 245)'});
    } else {
      setSubmitBtn({...submitBtn, hover: true, bgColor: 'rgb(72, 145, 218)'});
    }
  }

  const [memInfo, setMemInfo] = useState({
    name: "",
    hp: "",
  });


  useEffect(()=> {
    if(memInfo.name&&memInfo.hp){ 
      setSubmitBtn({disabled:false, bgColor: 'rgb(105, 175, 245)'});
    } else {
      setSubmitBtn({disabled:true, bgColor: 'rgb(175, 210, 244)'});
    }
  },[memInfo]);


  const changeMemInfo = (e) => {
    const id = e.currentTarget.id;
    const value = e.target.value;
    setMemInfo({...memInfo, [id]: value});
  }


  const find = async() => {
    const member = {
      MEM_NAME : memInfo.name,
      MEM_TEL : memInfo.hp,
      type : 'email',
    }
    try {
      const res = await memberListDB(member);
      console.log(res);
      if(res.data.length===0) {return dispatch(setToastMsg("일치하는 아이디가 없습니다."));}
      let msg = '회원님의 이메일 목록입니다.';
      Object.keys(res.data).forEach((key)=> {
        msg+=`\n[ ${res.data[key]} ]`;
      })
      dispatch(setToastMsg(msg));
      navigate('/login');
    } catch (error) {
      dispatch(setToastMsg(error+": DB 오류입니다."));
    }
  }


  return (
      <LoginForm>
        <MyH1>이메일 찾기</MyH1>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',Content: 'center', marginTop: '20px', width:"100%"}}>
          <MyLabel> 이름
            <MyInput type="text" id="name" placeholder="이름을 입력해주세요." 
            onChange={(e)=>{changeMemInfo(e);}}/>
          </MyLabel>
          <MyLabel> 전화번호
            <MyInput type="number" id="hp" placeholder="전화번호를 입력해주세요." 
            onChange={(e)=>{changeMemInfo(e);}} />
          </MyLabel>
          <SubmitButton type="button"  disabled={submitBtn.disabled} style={{backgroundColor:submitBtn.bgColor }}
                onClick={()=>{find();}} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
                  찾기
          </SubmitButton>
        </div>
      </LoginForm>
  );
};

export default FindEmailPage;