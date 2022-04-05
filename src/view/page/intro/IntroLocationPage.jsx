import React from 'react';
import { ContainerDiv, FormDiv, HeaderDiv } from '../../../styles/FromStyle';
import KAKAOMap from '../../component/intro/KAKAOMap';

const IntroLocationPage = () => {
  return (
    <ContainerDiv>
      <HeaderDiv>
        <h1 style={{marginLeft:"10px"}}>매장위치</h1>
      </HeaderDiv>
      <FormDiv>
        <KAKAOMap />
      </FormDiv>
    </ContainerDiv>
  );
};

export default IntroLocationPage;