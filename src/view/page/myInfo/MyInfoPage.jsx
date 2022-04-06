import {useState, React } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setToastMsg } from '../../../redux/toastStatus/action';
import { recertification } from '../../../service/firebase/authLogic';
import { BButton, ContainerDiv, MyInput, MyLabel, PwEye } from '../../../styles/FromStyle';
import Signup from '../../component/login/Signup';


const MyInfoPage = () => {

  const userAuth = useSelector(state => state.userAuth);
  const dispatch = useDispatch();

  const [passwordType, setPasswordType] = useState({
    type:'password',
    visible:false
  });
  const [pwd, setPwd] = useState('');
  const [isPwChecked, setIsPwChecked] = useState(false);



  const passwordView = (e) => {
    const id = e.currentTarget.id;
    if(id==="password") {
      if(!passwordType.visible) {
        setPasswordType({...passwordType, type: 'text', visible: true});
      } else {
        setPasswordType({...passwordType, type: 'password', visible: false});
      }
    }
  };


  const reAuth = async() => {
    console.log(pwd)
    try {
      const result = await recertification(userAuth.auth, pwd);
      if(result){
        setIsPwChecked(true);
      }
    } catch (error) {
      dispatch(setToastMsg(error));
    }

  }



  return (
    isPwChecked?
      <Signup update={true}></Signup>
    :
    <ContainerDiv>
      <Card style={{width:"90%", maxWidth:"600px", marginTop:'100px'}}>
        <Card.Header style={{display:"flex", justifyContent:"center"}}>
          <h3>비밀번호 확인</h3>
        </Card.Header>
        <Card.Body>
          <form style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems: 'center'}}>
            <span style={{margin: '10px 0px 30px 0px'}}>회원님의 정보를 보호하기 위해 비밀번호를 다시 확인합니다.</span>
            <MyLabel htmlFor="password"> 비밀번호
              <input hidden="hidden" />
              <MyInput type={passwordType.type} id="password" name="mem_password" autoComplete="off" placeholder="비밀번호를 입력해주세요."
                onChange={(e)=>setPwd(e.target.value)}/>
              <div id="password" onClick={(e)=> {passwordView(e)}} style={{color: `${passwordType.visible?"gray":"lightgray"}`}}>
                <PwEye className="fa fa-eye fa-lg"></PwEye>
              </div>
            </MyLabel>
          </form>
        </Card.Body>
        <Card.Footer>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <BButton type="button" style={{width:"150px", height:"48px"}} onClick={()=>{reAuth()}}>확인</BButton>
          </div>
        </Card.Footer>
      </Card>
    </ContainerDiv>
  );
};

export default MyInfoPage;