/* global daum */
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToastMsg } from '../../../redux/toastStatus/action';
import { memberInsertDB, memberListDB, memberUpdateDB, reSignUserDB } from '../../../service/dbLogic';
import { linkEmail, logout, onAuthChange, reSignUser, signupEmail, updatePwd } from '../../../service/firebase/authLogic';
import { checkPassword, validateBirthdate, validateEmail, validateHp, validateName, validateNickname, validatePassword } from '../../../service/validateLogic';
import { SignupForm, MyH1, MyInput, MyLabel,  MyLabelAb, SubmitButton, MyButton, PwEye, WarningButton} from '../../../styles/FromStyle';

const Signup = ({update}) => {


  const userAuth = useSelector(state => state.userAuth);
  const dispatch = useDispatch();
  const type = window.location.search.split('&')[0].split('=')[1];
  const [reSignCheck, setReSignCheck] = useState(false);
  const navigate = useNavigate();

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


  const[post, setPost] = useState({
    post: "",
    postDetail: "",
    postNum: ""
  })

  const [memInfo, setMemInfo] = useState({
    email: "",
    password: "",
    password2: "",
    name: "",
    birthday: "",
    hp: "",
    nickname: "",
    gender: "없음"
  });

  const [comment, setComment] = useState({
    email: "",
    password: "",
    password2: "",
    name: "",
    birthday: "",
    hp: "",
    nickname: ""
  });

  const [star,setStar] = useState({
    email: "*",
    password: "*",
    password2: "*",
    name: "*",
    hp: "*",
    nickname: "*",
    birthday: "*"
  })


  const [passwordType, setPasswordType] = useState([
    {
      type:'password',
      visible:false
    },
    {
      type:'password',
      visible:false
    }
  ]);


  const [googleEmail, setGoogleEmail] = useState('');


  useEffect(()=> {
    let check = true;
    Object.keys(star).forEach((key)=>{
      if(star[key]==='*') check = false;
    })
    if(check){ 
      setSubmitBtn({disabled:false, bgColor: 'rgb(105, 175, 245)'});
    } else {
      setSubmitBtn({disabled:true, bgColor: 'rgb(175, 210, 244)'});
    }
  },[star]);


  useEffect(()=> {
    if(update){
      setTimeout(()=>{window.location.reload()}, 1800000);
    }
  },[update])


  useEffect(()=> {
    const onAuth = async() => {
      const user = await onAuthChange(userAuth.auth) ;
      if(user&&!update){
        setGoogleEmail(user.email);
        setStar({
          email: "",
          password: "*",
          password2: "*",
          name: "*",
          hp: "*",
          nickname: "*",
          birthday: "*"
        });
        setMemInfo({
          email: user.email,
          password: "",
          password2: "",
          name: "",
          hp: "",
          nickname: "",
          birthday: "",
          gender:"없음"
        });
      }
    };
    onAuth();
  },[setGoogleEmail,setStar,setMemInfo, userAuth.auth, update]);


  useEffect(() => {
    const memberDetail = async() =>{
      const member = {
        MEM_NO : sessionStorage.getItem('no'),
      }
      const res = await memberListDB(member);
      console.log(res.data[0])
      setGoogleEmail(res.data[0].MEM_EMAIL);
      const b = res.data[0].MEM_BIRTHDAY.split('-');
      setStar({
        email: "",
        name: "",
        hp: "",
        nickname: "",
        birthday: ""
      });
      setMemInfo({
        email: res.data[0].MEM_EMAIL,
        name: res.data[0].MEM_NAME,
        hp: res.data[0].MEM_TEL,
        nickname: res.data[0].MEM_NICKNAME,
        birthday: b[0]+''+b[1]+''+b[2],
        gender: res.data[0].MEM_GENDER
      });
      setPost({
        post: res.data[0].MEM_ADDR,
        postDetail: res.data[0].MEM_ADDR_DTL,
        postNum: res.data[0].MEM_ZIPCODE
      })
    }
    if(update){
      memberDetail();
    }
  },[update,setStar,setMemInfo,setGoogleEmail,setPost])


  const passwordView = (e) => {
    const id = e.currentTarget.id;
    if(id==="password") {
      if(!passwordType[0].visible) {
        setPasswordType([{type: 'text', visible: true},passwordType[1]]);
      } else {
        setPasswordType([{type: 'password', visible: false},passwordType[1]]);
      }
    } else if(id==="password2") {
      if(!passwordType[1].visible) {
        setPasswordType([passwordType[0],{type: 'text', visible: true}]);
      } else {
        setPasswordType([passwordType[0],{type: 'password', visible: false}]);
      }
    }
  }

  const changeMemInfo = (e) => {
    const id = e.currentTarget.id;
    const value = e.target.value;
    setMemInfo({...memInfo, [id]: value});
  }

  const overlap = async(key) => {
    try {
      if(comment[key]!=="중복확인을 해주세요."){
        return
      }

      let params;
      if(key==='email'){
        params = { MEM_EMAIL: memInfo[key], type : 'overlap' }
      } else {
        params = { MEM_NICKNAME: memInfo[key], type : 'overlap' }
      }
      console.log(params);
      let response = {data : 0};
      if(!(sessionStorage.getItem('nickname')===memInfo[key]&&key==='nickname')){
        response = await memberListDB(params);
      }
      console.log(response);
      if(response.data===1){
        setComment({...comment, [key]:`해당 ${key==='email'?'이메일':'닉네임'}은 사용할 수 없습니다.`});
        dispatch(setToastMsg(`해당 ${key==='email'?'이메일':'닉네임'}은 사용할 수 없습니다.`));
        setStar({...star, [key]:"*"});
      } else if(response.data===0) {
        setComment({...comment, [key]:`해당 ${key==='email'?'이메일':'닉네임'}은 사용할 수 있습니다.`});
        dispatch(setToastMsg(`해당 ${key==='email'?'이메일':'닉네임'}은 사용할 수 있습니다.`));        
        setStar({...star, [key]:""});
      }
      
    } catch (error) {
      console.error(error);
    }
    
  } 

  const validate = (key, e) => {
    let result;
    if(key==='email'){
      result = validateEmail(e); 
    } else if(key==='nickname'){
      result = validateNickname(e); 
    } else if(key==='password'){
      result = validatePassword(e); 
    } else if(key==='password2'){
      result = checkPassword(memInfo.password, e); 
    } else if(key==='name'){
      result = validateName(e); 
    } else if(key==='hp'){
      result = validateHp(e); 
    } else if(key==='birthday'){
      result = validateBirthdate(e); 
    } 
    setComment({...comment, [key]: result}); 
    if(result){
      if(result===' '&&update){
        setStar({...star, [key]:""});
      } else {
        setStar({...star, [key]:"*"});
      }
    }else {
      setStar({...star, [key]:""});
    }
  }

  const openZipcode = () => {
    new daum.Postcode({
      oncomplete: function(data) {
        let addr = ''; 
        if (data.userSelectedType === 'R') { 
          addr = data.roadAddress;
        } else { 
          addr = data.jibunAddress;
        }
        setPost({...post, postNum:data.zonecode, post:addr}) ;
        document.getElementById("post").value = addr;
        document.getElementById("postDetail").focus();
      }
    }).open();
  }

  const signUpdate = async() => {
    try{
      const b = memInfo.birthday;
      let birthday = ""; 
      if(b!==""){
        birthday = b.slice(0,4) + '-' + b.slice(4, 6) + '-' + b.slice(6,8);
      }

      const datas = {
        MEM_NO: sessionStorage.getItem('no'),
        MEM_NAME: memInfo.name,
        MEM_BIRTHDAY: birthday,
        MEM_TEL: memInfo.hp,
        MEM_NICKNAME: memInfo.nickname,
        MEM_ZIPCODE: post.postNum,
        MEM_ADDR: post.post,
        MEM_ADDR_DTL: post.postDetail,
        MEM_GENDER: memInfo.gender
      }
      console.log(datas)
      const response = await memberUpdateDB(datas);

      if(response.data!==1) {
      return dispatch(setToastMsg("DB 오류: 관리자에게 연락바랍니다."));
    }
      sessionStorage.clear();
      navigate('/');
      return dispatch(setToastMsg("정보가 변경되었습니다."));
    } catch (error) {
      dispatch(setToastMsg(error+" 오류: 관리자에게 연락바랍니다."));
    }

  }

  const pwdUpdate = async() => {
    if(memInfo.password&&memInfo.password2){
      if(!star.password&&!star.password2){
        await updatePwd(userAuth.auth, memInfo.password);
        await logout(userAuth.auth);
        navigate('/');
        return dispatch(setToastMsg("비밀번호가 변경되었습니다! 다시 로그인해주세요"));
      } else return dispatch(setToastMsg("요구사항에 맞춰주세요."));
    } else return dispatch(setToastMsg("비밀번호를 입력해주세요."));
  }


  const signup = async() => {
    try {

      let uid;

      if(googleEmail){
        uid = await linkEmail(userAuth.auth, memInfo);
      } else {
        uid = await signupEmail(userAuth.auth, memInfo);
      }

      console.log(uid);
      //const pwd = pwdEncrypt(memInfo.password);
      const b = memInfo.birthday;
      let birthday = ""; 
      if(b!==""){
        birthday = b.slice(0,4) + '-' + b.slice(4, 6) + '-' + b.slice(6,8);
      }

      const datas = {
        MEM_UID: uid,
        MEM_NAME: memInfo.name,
        MEM_EMAIL: memInfo.email,
        MEM_BIRTHDAY: birthday,
        MEM_TEL: memInfo.hp,
        MEM_NICKNAME: memInfo.nickname,
        MEM_ZIPCODE: post.postNum,
        MEM_ADDR: post.post,
        MEM_ADDR_DTL: post.postDetail,
        MEM_AUTH: (type==='member'?1:2),
        MEM_GENDER: memInfo.gender
      }
      console.log(datas)
      const response = await memberInsertDB(datas);

      if(response.data!==1) {
      return dispatch(setToastMsg("DB 오류: 관리자에게 연락바랍니다."));
    }
      sessionStorage.clear();
      navigate('/');
      return dispatch(setToastMsg("회원가입되었습니다. 감사합니다."));
      
    } catch (error) {
      dispatch(setToastMsg(error+" 오류: 관리자에게 연락바랍니다."));
    }

  }
  
  const checkboxLable = ['없음','남자','여자']

  const Checkbox = checkboxLable.map((item, index) => (
    <Form.Check inline label={item} value={item} name="group1" type='radio' checked={memInfo.gender===item?true:false} readOnly
    id={`inline-radio-${item}`} key={index} onClick={(e)=> {setMemInfo({...memInfo, gender: e.target.value})}}/>
  ))


  const reSignAuth = async() => {
    if(!reSignCheck) return dispatch(setToastMsg("탈퇴 동의에 체크해주세요"));
    try {
      await reSignUserDB({MEM_NO: sessionStorage.getItem('no')});
      await reSignUser(userAuth.auth);
      navigate('/');
      dispatch(setToastMsg("탈퇴되었습니다."));
    } catch (error) {
      dispatch(setToastMsg("오류입니다."));
    }
  }
  

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{display: 'flex', width:"100%"}}>
        <SignupForm  suggested={false}>
          <MyH1>{update?'내 정보수정':'회원가입'}</MyH1>
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            <div style={{padding: '30px 30px 0px 30px'}}>
              { googleEmail
                ?
                <>
                  <MyLabel> 이메일 
                    <MyInput type="email" id="email" defaultValue={googleEmail} disabled={true} />
                  </MyLabel>
                </>
                :
                <div style={{display: 'flex' , flexWrap: 'wrap'}}>
                  <MyLabel> 이메일 <span style={{color:"red"}}>{star.email}</span>
                    <MyInput type="email" id="email" placeholder="이메일를 입력해주세요." 
                    onChange={(e)=>{changeMemInfo(e); validate('email', e);}}/>
                    <MyLabelAb>{comment.email}</MyLabelAb>
                  </MyLabel>
                  <MyButton type="button" onClick={()=>{overlap('email');}}>중복확인</MyButton>
                </div>
              }
              <div style={{display: 'flex'}}>
                <MyLabel> 닉네임 <span style={{color:"red"}}>{star.nickname}</span>
                  <MyInput type="text" id="nickname" defaultValue={memInfo.nickname} placeholder="닉네임을 입력해주세요." 
                  onChange={(e)=>{changeMemInfo(e); validate('nickname', e);}}/>
                  <MyLabelAb>{comment.nickname}</MyLabelAb>
                </MyLabel>
                <MyButton type="button" onClick={()=>{overlap('nickname')}}>중복확인</MyButton>
              </div>
              <MyLabel> 비밀번호 <span style={{color:"red"}}>{star.password}</span>
                <MyInput type={passwordType[0].type} id="password" autoComplete="off" placeholder="비밀번호를 입력해주세요." 
                onKeyUp={(e)=>{setComment({...comment, password2: checkPassword(e.target.value,memInfo.password2)});}} 
                onChange={(e)=>{changeMemInfo(e);  validate('password', e);}}/>
                <div id="password" onClick={(e)=> {passwordView(e)}} style={{color: `${passwordType[0].visible?"gray":"lightgray"}`}}>
                  <PwEye className="fa fa-eye fa-lg"></PwEye>
                </div>
                <MyLabelAb>{comment.password}</MyLabelAb>
              </MyLabel>
              <MyLabel> 비밀번호 확인 <span style={{color:"red"}}>{star.password2}</span>
                <MyInput type={passwordType[1].type} id="password2"  autoComplete="off" placeholder="비밀번호를 한번 더 입력해주세요."
                onChange={(e)=>{changeMemInfo(e); validate('password2', e.target.value)}}/>
                <div id="password2" onClick={(e)=> {passwordView(e)}} style={{color: `${passwordType[1].visible?"gray":"lightgray"}`}}>
                  <PwEye className="fa fa-eye fa-lg"></PwEye>
                </div>
                <MyLabelAb>{comment.password2}</MyLabelAb>
              </MyLabel> 
              { update&&
                <MyButton type="button" style={{width:"275px", height:"48px"}} onClick={()=>{pwdUpdate()}}>비밀번호 변경</MyButton>
              }         
            </div>

            <div style={{padding: '30px 30px 0px 30px'}}>
              <MyLabel> 이름 <span style={{color:"red"}}>{star.name}</span>
                <MyInput type="text" id="name" defaultValue={memInfo.name} placeholder="이름을 입력해주세요." 
                onChange={(e)=>{changeMemInfo(e); validate('name', e);}}/>
                <MyLabelAb>{comment.name}</MyLabelAb>
              </MyLabel>
              <MyLabel> 전화번호 <span style={{color:"red"}}>{star.hp}</span>
                <MyInput type="text" id="hp" defaultValue={memInfo.hp} placeholder="전화번호를 입력해주세요." 
                onChange={(e)=>{changeMemInfo(e); validate('hp', e);}} />
                <MyLabelAb>{comment.hp}</MyLabelAb>
              </MyLabel>

              <MyLabel> 생년월일 <span style={{color:"red"}}>{star.birthday}</span>
                <MyInput type="text" id="birthday" defaultValue={memInfo.birthday} placeholder="생년월일을 입력해주세요." 
                onChange={(e)=>{changeMemInfo(e); validate('birthday', e);}}/>
                <MyLabelAb>{comment.birthday}</MyLabelAb>
              </MyLabel>
              <div style={{display: 'flex'}}>
                <MyLabel> 주소
                  <MyInput type="text" id="post" defaultValue={post.post} readOnly placeholder="주소검색을 해주세요."/>
                </MyLabel>
                <MyButton type="button" onClick={()=>{openZipcode()}}>주소검색</MyButton>
              </div>
              <MyLabel> 상세주소
                <MyInput type="text" id="postDetail" defaultValue={post.postDetail} readOnly={post.post?false:true}
                onChange={(e)=>{setPost({...post, postDetail : e.target.value})}}/>
              </MyLabel>
            </div>
          </div>
          <MyLabel style={{margin:0}}> 성별
            <div style={{marginTop:10}} key={`inline-radio`} className="mb-3">
              {Checkbox}
            </div>
          </MyLabel>
            <SubmitButton type="button" disabled={submitBtn.disabled} style={{backgroundColor:submitBtn.bgColor }}
            onClick={()=>{if(update){signUpdate()}else{signup()}}} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
              {update?'수정하기':'가입하기'}
            </SubmitButton>
          { update&&
            <>
              <Form.Check type={'checkbox'} id={'checkbox'} name={'checkbox'} style={{margin:'5px'}}
              label={`정말로 탈퇴하시겠나요?`} onChange={()=>{setReSignCheck(!reSignCheck)}}/>
              <WarningButton type="button" onClick={()=>{reSignAuth()}}>
                계정탈퇴
              </WarningButton>
            </>
          }  
        </SignupForm>
      </div>
    </div>
  );
};

export default Signup;