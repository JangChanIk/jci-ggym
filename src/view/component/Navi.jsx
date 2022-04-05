import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BButton } from '../../styles/FromStyle';
import { useSelector } from 'react-redux';
import { logout } from '../../service/firebase/authLogic';

const Navi = ({textStyle}) => {
  // const param = useLocation();
  const userAuth = useSelector(state => state.userAuth);
  const param = useLocation().search.split("&")[0].split("=")[1];
  const path = useLocation().pathname;
  const navigate = useNavigate();
  // console.log(param)

  return(
    <>
      <Nav variant="info" className="me-auto">
        <NavDropdown title={<span style={textStyle}>피트니스</span>}>
          <LinkContainer to={"/intro/gym"}>
            <NavDropdown.Item>피트니스 소개</NavDropdown.Item>
          </LinkContainer>  
          <LinkContainer to={"/intro/teacher"}>
            <NavDropdown.Item>강사소개</NavDropdown.Item>
          </LinkContainer>  
          <LinkContainer to={"/intro/class"}>
            <NavDropdown.Item>프로그램</NavDropdown.Item>
          </LinkContainer>  
          <LinkContainer to={"/intro/location"}>
            <NavDropdown.Item>매장위치</NavDropdown.Item>
          </LinkContainer>  
        </NavDropdown>
        <NavDropdown title={<span style={textStyle}>커뮤니티</span>}>
          <LinkContainer active={path==="/board/list"&&param==="notice"?true:false} to={"/board/list?id=notice&page=1"}>
            <NavDropdown.Item>공지사항</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer active={path==="/board/list"&&param==="trans"?true:false} to={"/board/list?id=trans&page=1"}>
            <NavDropdown.Item>이용권양도</NavDropdown.Item>
          </LinkContainer>  
          <LinkContainer active={path==="/board/list"&&param==="review"?true:false} to={"/board/list?id=review&page=1"}>
            <NavDropdown.Item>헬스후기</NavDropdown.Item>
          </LinkContainer>  
          <LinkContainer active={path==="/board/list"&&param==="qna"?true:false} to={"/board/list?id=qna&page=1"}>
            <NavDropdown.Item>1:1문의(QnA)</NavDropdown.Item>
          </LinkContainer>  
          <LinkContainer active={path==="/board/list"&&param==="faq"?true:false} to={"/board/list?id=faq&page=1"}>
            <NavDropdown.Item>자주하는질문(FAQ)</NavDropdown.Item>
          </LinkContainer>  
        </NavDropdown>
        <NavDropdown title={<span style={textStyle}>이용권</span>}>
          <LinkContainer to={"/pass/info"}>
            <NavDropdown.Item>이용권안내</NavDropdown.Item>
          </LinkContainer>  
          <LinkContainer to={"/pass/buy"}>
            <NavDropdown.Item>이용권구매</NavDropdown.Item>
          </LinkContainer>  
        </NavDropdown>
        <NavDropdown title={<span style={textStyle}>수업</span>}>
          <LinkContainer to={"/class/appointment"}>
            <NavDropdown.Item>수업예약</NavDropdown.Item>
          </LinkContainer>  
          <LinkContainer to={"/class/schedule"}>
            <NavDropdown.Item>수업일정</NavDropdown.Item>
          </LinkContainer>  
        </NavDropdown>
      </Nav>      
      {
        sessionStorage.getItem('email') ?
        <>
          {
            sessionStorage.getItem('nickname') ?
            <Nav>
              <NavDropdown title={<span style={textStyle}>{sessionStorage.getItem('nickname')}님</span>}>
                <LinkContainer to={"/myInfo"}>
                  <NavDropdown.Item>내 정보</NavDropdown.Item>
                </LinkContainer>  
                { sessionStorage.getItem('auth')==='1'&&
                  <LinkContainer to={"/myInfo/payList"}>
                    <NavDropdown.Item>구매한 이용권</NavDropdown.Item>
                  </LinkContainer>  
                }
                { sessionStorage.getItem('auth')!=='2'&&
                  <LinkContainer active={path==="/myInfo/post"?true:false} to={
                    sessionStorage.getItem('auth')==='1'?"/myInfo/post?id=trans&page=1":"/myInfo/post?id=notice&page=1"}>
                    <NavDropdown.Item>내 게시글</NavDropdown.Item>
                  </LinkContainer>  
                }
              </NavDropdown>
            </Nav>
            : <></>
          }
          <BButton style={{marginTop:"5px"}}
            onClick={()=> { logout(userAuth.auth); navigate('/'); window.location.reload();}}>
            로그아웃
          </BButton>
        </>
        :
        <>
          <LinkContainer to="/login" style={textStyle}>
            <NavDropdown.Item>로그인</NavDropdown.Item>
          </LinkContainer>  
          <LinkContainer to="/login/signup" style={textStyle}>
            <NavDropdown.Item>회원가입</NavDropdown.Item>
          </LinkContainer>
        </>
      }
    </>
  );
}

export default Navi;