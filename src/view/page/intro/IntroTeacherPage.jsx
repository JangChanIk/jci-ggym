import React from 'react';
import { ContainerDiv, FormDiv, HeaderDiv } from '../../../styles/FromStyle';


const IntroTeacherPage = () => {
  return (
    <ContainerDiv>
      <HeaderDiv>
        <h1 style={{marginLeft:"10px"}}>강사 소개</h1>
      </HeaderDiv>
      <FormDiv>
        <div style={{ textAlign: "center" }}>
          <img
            className="teacher"
            src="https://i.ibb.co/KKmDRyC/11111.png"
            alt="Third slide"
          />
          <img
            className="teacher"
            src="https://i.ibb.co/kmfZx00/2222222.png" 
            alt="Third slide"
          />
        </div>
      </FormDiv>
    </ContainerDiv>
  );
};

export default IntroTeacherPage;