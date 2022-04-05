import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { onAuthChange } from './service/firebase/authLogic';
import { useDispatch, useSelector } from 'react-redux';
import { memberListDB } from './service/dbLogic';
import { setToastMsg } from './redux/toastStatus/action';
import Header from './view/component/Header';
import Footer from './view/component/Footer';
import HomePage from './view/page/HomePage'
import IntroGymPage from './view/page/intro/IntroGymPage'
import IntroTeacherPage from './view/page/intro/IntroTeacherPage'
import IntroClassPage from './view/page/intro/IntroClassPage'
import IntroLocationPage from './view/page/intro/IntroLocationPage'
import PassIntroPage from './view/page/pass/PassIntroPage';
import PassBuyPage from './view/page/pass/PassBuyPage';
import ClassUploadPage from './view/page/class/ClassUploadPage';
import ClassAppointmentPage from './view/page/class/ClassAppointmentPage'
import ClassSchedulePage from './view/page/class/ClassSchedulePage'
import LoginPage from './view/page/login/LoginPage'
import SignupPage from './view/page/login/SignupPage'
import FindEmailPage from './view/page/login/FindEmailPage'
import ResetPwdPage from './view/page/login/ResetPwdPage'
import MyInfoPage from './view/page/myInfo/MyInfoPage'
import PayListPage from './view/page/myInfo/PayListPage'
import MyPostPage from './view/page/myInfo/MyPostPage';
import EmailVerifiedPage from './view/page/login/EmailVerifiedPage';
import BoardListPage from './view/page/board/BoardListPage';
import BoardWritePage from './view/page/board/BoardWritePage';
import BoardDetailPage from './view/page/board/BoardDetailPage';
import BoardUpdatePage from './view/page/board/BoardUpdatePage';
import PayReadyPage from './view/page/pay/PayReadyPage';
import PayCancel from './view/page/pay/PayCancel';
import PayFail from './view/page/pay/PayFail';
import MemberVerifiedPage from './view/page/login/MemberVerifiedPage';
import Toast from './view/component/Toast';
import TransferInfoPage from './view/page/pay/TransferInfoPage';
import TransferSuccess from './view/page/pay/TransferSuccess';
import PassSuccess from './view/page/pay/PassSuccess';
import PassInfoPage from './view/page/pay/PassInfoPage';


const App = () => {

  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const userAuth = useSelector(state => state.userAuth);
  const toastStatus = useSelector(state => state.toastStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(pathname);
    const asyncDB = async() => {
      const ssg = sessionStorage;
      const user = await onAuthChange(userAuth.auth);
      console.log(user);
      if(user){
        ssg.setItem('email', user.email);
        if(ssg.getItem('auth')===null||!ssg.getItem('auth')){
          const res = await memberListDB({MEM_UID : user.uid, type: 'auth'});
          console.log(res);
          if(res.data){
            ssg.setItem('nickname', res.data.MEM_NICKNAME);
            ssg.setItem('status', res.data.MEM_STATUS);
            ssg.setItem('auth', res.data.MEM_AUTH);
            ssg.setItem('no', res.data.MEM_NO);
            navigate('/');
            return;
          }
        }
        if(!ssg.getItem('auth')) {
          if(pathname!=='/login/signup') {
            dispatch(setToastMsg('해당 구글 계정은 회원가입 대상입니다. 회원가입 부탁드립니다.'));
            navigate('/login/signup');
            
          }
        } else if(!user.emailVerified){
          if(pathname!=='/login/emailVerified') {
            navigate('/login/emailVerified');
          }
        } else if(ssg.getItem('status')==='0'){
          if(pathname!=='/login/memberVerified') {
            navigate('/login/memberVerified');
          }
        }
      } else {
        if(ssg.getItem('email')) {
          ssg.clear();
          window.location.reload();
        }
      }
    };
    asyncDB()
  }, [pathname,dispatch, userAuth.auth, navigate]);

  return (
    <div style={{height: "100vh"}}>
      {toastStatus.status&&<Toast/>}
      {/* <ManagerHeader /> */}
      <div style={{height: 'auto', minHeight: '100%', paddingBottom: '70px'}}>
        {
          (pathname.match('/pay/transferSuccess')||pathname.match('/pay/passSuccess')||pathname.match('/pay/fail')||pathname.match('/pay/cancel'))||
          <Header/>
        }
        <Routes>
          {/* home */}
          <Route path="/" exact={true} element={<HomePage/>} />
          {/* intro */}
          <Route path="/intro/gym" exact={true} element={<IntroGymPage/>} />
          <Route path="/intro/teacher" exact={true} element={<IntroTeacherPage/>} />
          <Route path="/intro/class" exact={true} element={<IntroClassPage/>} />
          <Route path="/intro/location" exact={true} element={<IntroLocationPage/>} />
          {/* board */}
          <Route path="/board/list/*" element={<BoardListPage/>} />
          <Route path="/board/write/*" element={<BoardWritePage/>} />
          <Route path="/board/detail/*" element={<BoardDetailPage/>} />
          <Route path="/board/update/*" element={<BoardUpdatePage/>} />
          {/* pass */}
          <Route path="/pass/info" exact={true} element={<PassIntroPage/>} />
          <Route path="/pass/buy" exact={true} element={<PassBuyPage/>} />
          {/* pay */}
          <Route path="/pay/ready" exact={true} element={<PayReadyPage/>} />
          <Route path="/pay/transferSuccess" exact={true} element={<TransferSuccess/>} />
          <Route path="/pay/passSuccess" exact={true} element={<PassSuccess/>} />
          <Route path="/pay/transferInfo" exact={true} element={<TransferInfoPage/>} />
          <Route path="/pay/passInfo" exact={true} element={<PassInfoPage/>} />
          <Route path="/pay/fail" exact={true} element={<PayFail/>} />
          <Route path="/pay/cancel" exact={true} element={<PayCancel/>} />
          {/* class */}
          <Route path="/class/upload" exact={true} element={<ClassUploadPage/>} />
          <Route path="/class/appointment" exact={true} element={<ClassAppointmentPage/>} />
          <Route path="/class/schedule" exact={true} element={<ClassSchedulePage/>} />
          {/* login */}
          <Route path="/login" exact={true} element={<LoginPage/>} />
          <Route path="/login/emailVerified" exact={true} element={<EmailVerifiedPage/>} />
          <Route path="/login/memberVerified" exact={true} element={<MemberVerifiedPage/>} />
          <Route path="/login/signup" exact={true} element={<SignupPage/>} />
          <Route path="/login/findEmail" exact={true} element={<FindEmailPage/>} />
          <Route path="/login/resetPwd" exact={true} element={<ResetPwdPage/>} />
          {/* myInfo */}
          <Route path="/myInfo" exact={true} element={<MyInfoPage/>} />
          <Route path="/myInfo/payList" exact={true} element={<PayListPage/>} />
          <Route path="/myInfo/post" exact={true} element={<MyPostPage/>} />
          {/* mgmt */}
          <Route path="/mgmt/product/list" exact={true} element={null} />
          <Route path="/mgmt/product/update" exact={true} element={null} />
          <Route path="/mgmt/income/list" exact={true} element={null} />
          <Route path="/mgmt/member/list" exact={true} element={null} />
          <Route path="/mgmt/teacher/list" exact={true} element={null} />
        </Routes> 
      </div>
      {
        (pathname.match('/pay/transferSuccess')||pathname.match('/pay/passSuccess')||pathname.match('/pay/fail')||pathname.match('/pay/cancel'))||
        <Footer />    
      }
    </div>
  );
};

export default App;