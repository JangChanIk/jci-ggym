import React from 'react';
import { Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const MyDiv = styled.div`
  color: white; 
  height: 100%;
  width: 100%;
  text-align: center;
  text-justify: center;
`;

const MyI = styled.i`
  color: white;
  margin-right: 10px;
  margin-left: 10px;
  
`;

const MyFooter = styled.div`
  width:100%;
  color: white;
  background-color: rgb(105, 175, 245);
  height: 70px;
  position : relative;
  transform : translateY(-100%);
  font-size: 20px;
`;



const Footer = () => {
  return(
  <MyFooter>
    <Navbar style={{padding:"0px"}} variant="dark">
      <MyDiv>
        <div className="contact__links">
          <a className="link" href="https://github.com/JangChanIk/MyWeb" target="_blank" rel="noopener noreferrer">
            <MyI className="fab fa-github"></MyI>
          </a>
          <a className="link" href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=browny0129@naver.com" target="_blank" rel="noopener noreferrer">
            <MyI className="fas fa-envelope"></MyI>
          </a>
        </div>
        <span style={{fontSize:"16px", fontWeight:"bold"}}>2022 KH정보교육원 장찬익 - All rights reserved</span>
      </MyDiv>
    </Navbar>
  </MyFooter>
  )
}


export default Footer;