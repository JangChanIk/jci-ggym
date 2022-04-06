import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setToastMsg } from '../../../redux/toastStatus/action';
import { attendInsertDB } from '../../../service/dbLogic';
import { BButton, ContainerDiv, MyInput, MyLabel } from '../../../styles/FromStyle';

const AttendPage = () => {

  const dispatch = useDispatch();

  const [user, setUser] = useState({
    passEmail: "",
    classEmail: ""
  });

  const attend = async(email, pass_type) => {
    if(!email) dispatch(setToastMsg("이메일을 적어주세요."));
    const user = {
      MEM_EMAIL : email,
      PASS_TYPE : pass_type
    }; 
    try {
      const result = await attendInsertDB(user);
      console.log(result)
      //window.location.reload();
      if(result.data===-1){
        dispatch(setToastMsg("일치하는 이용권이 없습니다."));
      } else if(result.data===-2){
        dispatch(setToastMsg("이미 출석처리 되었습니다."));
      } else if(result.data){
        dispatch(setToastMsg(result.data+"회원님 환영합니다. 출석처리 되었습니다."));
      }
    } catch (error) {
      dispatch(setToastMsg("오류"));
    } finally {
      setUser({
        passEmail: "",
        classEmail: ""
      })
    }
  }

  return (
    <ContainerDiv style={{ paddingTop: '20vh', margin:'0px'}}>
      <Card style={{ justifyContent: 'center', width:"90%", minHeight: '600px', maxWidth: '1200px'}}>
        <Card.Header>
          <h1 style={{textAlign: 'center'}}>GGYM</h1>
        </Card.Header>
        <Card.Body>
          <div style={{display: 'flex', flexWrap:'wrap', justifyContent: 'space-around', height:"auto"}}>
            <div style={{display: 'flex',flexDirection: 'column', height: '200px',justifyContent: 'space-around', margin: '80px'}}>
              <h2 style={{textAlign: 'center'}}>헬스장 출석</h2>
                  <MyLabel htmlFor="email"> 이메일     
                    <div style={{display: 'flex'}}>
                      <MyInput type="email" id="email" name="mem_email" placeholder="이메일를 입력해주세요." value={user.passEmail} 
                        onChange={(e)=>{setUser({...user, passEmail: e.target.value})}}/>   
                      <BButton onClick={()=>{attend(user.passEmail,0)}} style={{marginLeft: '20px'}}>출석</BButton>
                    </div>
                  </MyLabel>
            </div>
            <div style={{display: 'flex',flexDirection: 'column', height: '200px',justifyContent: 'space-around', margin: '80px'}}>
              <h2 style={{textAlign: 'center'}}>수업 출석</h2> 
              <MyLabel htmlFor="email"> 이메일     
                <div style={{display: 'flex'}}>
                  <MyInput type="email" id="email" name="mem_email" placeholder="이메일를 입력해주세요." value={user.classEmail}
                    onChange={(e)=>{setUser({...user, classEmail: e.target.value})}}/>   
                  <BButton onClick={()=>{attend(user.classEmail,1)}} style={{marginLeft: '20px'}}>출석</BButton>
                </div>
              </MyLabel>
            </div>
          </div>
        </Card.Body>
      </Card>
    </ContainerDiv>
  );
};

export default AttendPage;