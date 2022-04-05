import React from 'react';
import { Card } from 'react-bootstrap';
import { ContainerDiv } from '../../../styles/FromStyle';

const PayReadyPage = () => {

  return (
    <ContainerDiv>
      <Card className="text-center" style={{width:"90%", maxWidth:"1200px"}}>
        <Card.Header>
          <h3>결제 페이지</h3>
        </Card.Header>
        <Card.Body>
          <iframe src={sessionStorage.getItem("KAKAOPAYURL")} title="Kakaopay" width="500px" height="500px">카카오페이 결제창</iframe>
        </Card.Body>
      </Card>
    </ContainerDiv>
  );
};

export default PayReadyPage;