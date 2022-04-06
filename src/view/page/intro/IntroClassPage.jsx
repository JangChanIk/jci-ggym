import React from 'react';
import { ContainerDiv, FormDiv, HeaderDiv } from '../../../styles/FromStyle';
import Class from '../../component/intro/Class';


const IntroClassPage = () => {
  return (
    <ContainerDiv>
      <HeaderDiv>
        <h1 style={{marginLeft:"10px"}}>프로그램 소개</h1>
      </HeaderDiv>
      <FormDiv style={{ textAlign: "center" }}>
        <Class/>
      </FormDiv>
    </ContainerDiv>  
  );
};

export default IntroClassPage;