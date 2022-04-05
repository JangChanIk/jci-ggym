import React from 'react';
import { ContainerDiv, FormDiv, HeaderDiv } from '../../../styles/FromStyle';


const IntroClassPage = () => {
  return (
    <ContainerDiv>
      <HeaderDiv>
        <h1 style={{marginLeft:"10px"}}>프로그램 소개</h1>
      </HeaderDiv>
      <FormDiv style={{ textAlign: "center" }}>
        <div style={{ margin: "20px 0px 20px 0px"}}>
          <img
            className="programimg"
            src="https://i.ibb.co/ZHxRGpp/Spin-Cycle-Indoor-Cycling-Class-at-a-Gym.jpg" 
            alt="Spin-Cycle-Indoor-Cycling-Class-at-a-Gym"
            style={{maxWidth:"600px", width:"100%", borderRadius:"20px"}}
          />
          <div style={{ margin: "20px 0px 20px 0px"}}>
            <div style={{ fontSize:"36px"}}>스피닝</div>
            스피닝은 신나는 음악에 맞춰 상체는 상, 하, 좌, 우 웨이브 등으로 움직여주고<br/>
            하체는 안장에 앉거나 스탠딩 자세로 변형을 주어 팔, 다리, 복부, 허리, 힙등 여러 부위에 효과를 주는 힘들지만<br/>
            효과는 아주 좋은 유산소 운동입니다
          </div>
        </div>
        <div style={{ margin: "20px 0px 20px 0px"}}>
          <img
            className="programimg"
            src="https://i.ibb.co/F7JPZ6g/2.jpg"
            alt="diet"
            style={{maxWidth:"600px", width:"100%", borderRadius:"20px"}}
          />
          <div style={{ margin: "20px 0px 20px 0px"}}>
            <div style={{ fontSize:"36px"}}>요가</div>
            요가는 몸을 유연하게 만드는 것 외에도 균형감각 향상에 도움이 되며<br/>
            집중력 강화 및 소화 개선, 자세 교정, 혈액순환 개선 등 다양한 효과 얻을 수 있습니다.
          </div>
        </div>
        <div style={{ margin: "20px 0px 20px 0px"}}>
          <img
            className="programimg"
            src="https://i.ibb.co/N7ygTK4/5c0dd08d338b0.jpg"
            alt="diet"
            style={{maxWidth:"600px", width:"100%", borderRadius:"20px"}}
          />
          <div style={{ margin: "20px 0px 20px 0px"}}>
            <div style={{ fontSize:"36px"}}>필라테스</div>
            필라테스는 몸의 유연성을 길러주는 요가와 근육을 부드럽게 풀어주는 스트레칭,<br/> 
            그리고 근육의 힘을 키우는 웨이트 트레이닝의 장점만을 모아놓은 운동입니다.<br/>
            요가처럼 스트레칭을 많이 하지만 근력 운동이 함께되어 다이어트는 물론<br/>
            자세나 체형 교정에도 효과가 좋은 운동입니다.
          </div>
        </div>
      </FormDiv>
    </ContainerDiv>  
  );
};

export default IntroClassPage;