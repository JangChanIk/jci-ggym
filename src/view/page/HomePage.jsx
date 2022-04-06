import React from 'react';
import { Table } from 'react-bootstrap';
import { ContainerDiv, FormDiv, HeaderDiv } from '../../styles/FromStyle';
import Class from '../component/intro/Class';
import KAKAOMap from '../component/intro/KAKAOMap';
import Teacher from '../component/intro/Teacher';


const HomePage = () => {
  return (
    <ContainerDiv>
      <HeaderDiv>
        <h1 style={{marginLeft:"10px"}}>홈페이지</h1>
      </HeaderDiv>
      <FormDiv style={{textAlign: 'center'}}>
        <Teacher/>
        <hr style={{height:"2px"}}/>
        <Class/>
        <hr style={{height:"2px"}}/>
        <KAKAOMap/>
        <hr style={{height:"2px"}}/>
        <Table responsive style={{minWidth:"700px"}}>
          <tbody  style={{border:"1px solid lightgray"}}>
            <tr>
              <td style={{borderRight:"1px solid lightgray"}}>주소</td>
              <td>서울특별시 강남구 테헤란로 10길 9 그랑프리빌딩 4F, 5F, 7F (T: 1544-9970 / F: 02-501-8570)</td>
            </tr>
            <tr>
              <td style={{borderRight:"1px solid lightgray"}}>버스</td>
              <td>
                역삼역.포스코P&S타워 정류장<br/>
                지선 146/740/341/360  간선 1100/1700/2000/7007/8001
              </td>
            </tr>
            <tr>
              <td  style={{borderRight:"1px solid lightgray"}}>지하철</td>
              <td>지하철 2호선 역삼역 3번출구 100m</td>
            </tr>
          </tbody>
        </Table>
      </FormDiv>
    </ContainerDiv>
  );
};

export default HomePage;