import React from 'react';
import { ContainerDiv, FormDiv, HeaderDiv } from '../../../styles/FromStyle';
import Teacher from '../../component/intro/Teacher';


const IntroTeacherPage = () => {
  return (
    <ContainerDiv>
      <HeaderDiv>
        <h1 style={{marginLeft:"10px"}}>강사 소개</h1>
      </HeaderDiv>
      <FormDiv>
        <Teacher/>
      </FormDiv>
    </ContainerDiv>
  );
};

export default IntroTeacherPage;