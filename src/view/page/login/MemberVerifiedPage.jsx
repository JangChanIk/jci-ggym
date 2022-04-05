import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToastMsg } from '../../../redux/toastStatus/action';
import { memberUpdateDB } from '../../../service/dbLogic';
import { logout } from '../../../service/firebase/authLogic';
import { SignupForm, MyButton} from '../../../styles/FromStyle';
const MemberVerifiedPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.userAuth);

  const updateStatus = async() => {
    //const user = await onAuthChange(userAuth.auth);
    const member = {
      MEM_NO : sessionStorage.getItem('no'),
      MEM_STATUS : 1,
    }
    const res = await memberUpdateDB(member);
    console.log(res)
    if(res.data!==1||!res) return dispatch(setToastMsg("인증실패!"));
    dispatch(setToastMsg("관리자의 인증이 필요하지만 인증되었습니다."));
    sessionStorage.clear()
    navigate('/');
  }

  const out = async() => {
    await logout(userAuth.auth);
    navigate('/');
  }


  return (
    <>
      <SignupForm style={{marginTop : '100px'}}>
        <h4>{sessionStorage.getItem('nickname')} 선생님의 이메일은 아직 사용할 수 없습니다.</h4>
        <p>
          관리자의 인증을 대기중입니다.
        </p>
        <div style={{display: 'flex', width: '50%', justifyContent: 'space-between'}}>
          <MyButton type="button" style={{height: '40px', width:'90px'}} onClick={()=>{ updateStatus(); }} variant="secondary">바로 인증</MyButton>
          <MyButton type="button" style={{height: '40px', width:'90px'}} onClick={()=>{ navigate('/'); window.location.reload();}} variant="secondary">완료</MyButton>
          <MyButton type="button" style={{height: '40px', width:'90px'}} onClick={()=>{ out(); }} variant="secondary">로그아웃</MyButton>
        </div>
      </SignupForm>
    </>
  );
};

export default MemberVerifiedPage;