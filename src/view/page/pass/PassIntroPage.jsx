import React from 'react';
import styled from 'styled-components';
import { BButton, ContainerDiv } from '../../../styles/FromStyle';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';



export const STYLEDBUTTON2 = styled.button`
  background-color: ${(props) => (props.gray ? "gray" : "rgb(254, 139, 121)")};
  color: white;
  padding: 0.5em 1em;
  margin-bottom: 20px;
  border-radius: 4px;
  border: none;
  @media (min-width: 800px) {
  }
`;

const PassIntroPage = () => {

  const navigate = useNavigate();


  return (
    <ContainerDiv>
      <Card className="text-center" style={{width:"90%", maxWidth:"1200px"}}>
        <Card.Header>
          <h3>이용권 안내</h3>
        </Card.Header>
        <Card.Body>
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
            <span style={{fontSize:'30px'}}>헬스 패키지</span>
            <img style={{width:"100%"}} src="image/회원권2.png" alt="1234" border="0"/>
            <span style={{fontSize:'30px'}}>수업 패키지</span>
            <img style={{width:"100%"}} src="image/GX_수정본.png" alt="123" border="0"/>
          </div>
        </Card.Body>
        <Card.Footer>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <BButton style={{width:"150px", height:"48px"}} onClick={()=>{navigate('/pass/buy')}}>이용권 구매</BButton>
          </div>
        </Card.Footer>
      </Card>
    </ContainerDiv>
  );
};

export default PassIntroPage;