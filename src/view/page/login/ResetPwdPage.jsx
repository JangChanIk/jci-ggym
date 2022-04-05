import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setToastMsg } from "../../../redux/toastStatus/action";
import { memberListDB } from "../../../service/dbLogic";
import { sendResetpwEmail } from "../../../service/firebase/authLogic";
import { LoginForm, MyH1, MyInput, MyLabel, SubmitButton } from "../../../styles/FromStyle";


const ResetPwdPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.userAuth);
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
    email: ""
  });

  useEffect(()=> {
    if(memInfo.email&&memInfo.hp&&memInfo.name){ 
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

  const send = async () => {
    const member = {
      MEM_NAME : memInfo.name,
      MEM_TEL : memInfo.hp,
      MEM_EMAIL : memInfo.email,
      type : 'overlap',
    }
    const res = await memberListDB(member);
    if(res.data!==1) return dispatch(setToastMsg("일치하는 아이디가 없습니다."));
    try {
      const msg = await sendResetpwEmail(userAuth.auth, memInfo.email);
      dispatch(setToastMsg(msg));
      navigate('/login');
    } catch (error) {
      dispatch(setToastMsg(error+": 메일전송 오류입니다."));
    }

  }



  return (
    <LoginForm>
      <MyH1>비밀번호 변경</MyH1>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',Content: 'center', marginTop: '20px', width:"100%"}}>
        <MyLabel> 이름 
          <MyInput type="text" id="name" placeholder="이름을 입력해주세요." 
          onChange={(e)=>{changeMemInfo(e);}}/>
        </MyLabel>
        <MyLabel> 전화번호
          <MyInput type="number" id="hp" placeholder="전화번호를 입력해주세요." 
          onChange={(e)=>{changeMemInfo(e);}} />
        </MyLabel>
        <MyLabel> 이메일
          <MyInput type="email" id="email" placeholder="이메일를 입력해주세요." 
          onChange={(e)=>{changeMemInfo(e);}}/>
        </MyLabel>
        <SubmitButton type="button"  disabled={submitBtn.disabled} style={{backgroundColor:submitBtn.bgColor }}
          onClick={()=>{send()}} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
            메일 전송
        </SubmitButton>
      </div>
    </LoginForm>
  );
};

export default ResetPwdPage;