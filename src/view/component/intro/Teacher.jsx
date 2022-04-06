import React from 'react';
import { Table } from 'react-bootstrap';

const Teacher = () => {
  return (
    <div>
      <div style={{display:"flex", flexDirection:"column", textAlign:"center"}}>
        <div style={{display: "flex", flexWrap: "wrap",width: "100%", justifyContent:"space-around"}}>
          <img
            className="teacher"
            src="https://i.ibb.co/L57XJxW/300bfa7886681c96e0bf1cb486d30389.jpg" 
            alt="Third slide" style={{maxWidth:"500px", width:"100%", borderRadius:"20px", marginBottom:"40px"}}
          />
          <Table responsive style={{tableLayout: 'fixed', maxWidth:"500px", width:"100%"}}>
            <thead>
              <tr><th style={{fontSize:'32px'}}>Trainer - FRANK</th></tr>
            </thead>
            <tbody>
              <tr><td>NASM-CPT (미국공인자격증)</td></tr>
              <tr><td>NSCA KOREA PERSONAL TRAINER 자격증</td></tr>
              <tr><td>생활체육 스포츠 지도사 2급 (보디빌딩)</td></tr>
              <tr><td>Jump Sports Instructor</td></tr>
              <tr><td>대한 적십자사 인명 구조 자격증</td></tr>
              <tr><td>경기대학교 체육학과 졸업</td></tr>
            </tbody>
          </Table>
        </div>
        <div style={{display: "flex", flexWrap: "wrap",width: "100%", justifyContent:"space-around"}}>
          <img
            className="teacher"
            src="https://i.ibb.co/bRCrC5W/dc38eaf88de57efae42f02a2a2684835.jpg" 
            alt="Third slide" style={{maxWidth:"500px", width:"100%", borderRadius:"20px", marginBottom:"40px"}}
          />
          <Table responsive style={{tableLayout: 'fixed', maxWidth:"500px", width:"100%"}}>
            <thead>
              <tr><th style={{fontSize:'32px'}}>Trainer - GRACE</th></tr>
            </thead>
            <tbody>
              <tr><td>NASM-CPT (미국공인자격증)</td></tr>
              <tr><td>NSCA KOREA PERSONAL TRAINER 자격증</td></tr>
              <tr><td>생활체육 스포츠 지도사 2급 (보디빌딩)</td></tr>
              <tr><td>국제 퍼스널트레이너 과정 교육이수</td></tr>
              <tr><td>Jump Sports Instructor</td></tr>
              <tr><td>대한 적십자사 인명 구조 자격증</td></tr>
              <tr><td>경기대학교 체육학과 졸업</td></tr>
            </tbody>
          </Table>
        </div>
        <div style={{display: "flex", flexWrap: "wrap", margin:"40px 0px 40px 0px", justifyContent:"space-around"}}>
          <img
            className="teacher"
            src="https://i.ibb.co/Fg9Tckz/897822b86c79c2d777a5c114045a51af.jpg"
            alt="Third slide" style={{maxWidth:"500px", width:"100%", borderRadius:"20px", marginBottom:"40px"}}
          />
          <Table responsive style={{tableLayout: 'fixed', maxWidth:"500px", width:"100%"}}>
            <thead>
              <tr><th style={{fontSize:'32px'}}>Trainer - PAUL</th></tr>
            </thead>
            <tbody>
              <tr><td>NASM-CPT (미국공인자격증)</td></tr>
              <tr><td>NSCA KOREA PERSONAL TRAINER 자격증</td></tr>
              <tr><td>KPFA 메디컬 트레이닝 과정 수료</td></tr>
              <tr><td>적십자 인명구조</td></tr>
              <tr><td>생활체육 스포츠 지도사 2급 (보디빌딩)</td></tr>
              <tr><td>Jump Sports Instructor</td></tr>
              <tr><td>대한 적십자사 인명 구조 자격증</td></tr>
              <tr><td>경기대학교 체육학과 졸업</td></tr>
            </tbody>
          </Table>
        </div>
        <div style={{display: "flex", flexWrap: "wrap", margin:"40px 0px 0px 0px", justifyContent:"space-around"}}>
          <img
            className="teacher"
            src="https://i.ibb.co/2hVVxzW/e0ff0505f133b2a6c350e1530ee50eea.jpg" 
            alt="Third slide" style={{maxWidth:"500px", width:"100%", borderRadius:"20px", marginBottom:"40px"}}
          />
          <Table responsive style={{tableLayout: 'fixed', maxWidth:"500px", width:"100%"}}>
            <thead>
              <tr><th style={{fontSize:'32px'}}>Trainer - RAYMOND</th></tr>
            </thead>
            <tbody>
              <tr><td>NASM-CPT (미국공인자격증)</td></tr>
              <tr><td>NSCA KOREA PERSONAL TRAINER 자격증</td></tr>
              <tr><td>생활체육 스포츠 지도사 2급 (보디빌딩)</td></tr>
              <tr><td>Jump Sports Instructor</td></tr>
              <tr><td>대한 적십자사 인명 구조 자격증</td></tr>
              <tr><td>스킨스쿠버 다이브마스터 등 8개과정</td></tr>
              <tr><td>경기대학교 체육학과 졸업</td></tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Teacher;