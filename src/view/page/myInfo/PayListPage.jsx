import React, { useEffect, useState } from 'react';
import { Accordion, Table } from 'react-bootstrap';
import { ContainerDiv, FormDiv, HeaderDiv } from '../../../styles/FromStyle';
import { myPassListDB } from '../../../service/dbLogic';
import moment from 'moment';

const PayListPage = () => {

  const [myPass, setMyPass] = useState([]);
  const [expiredPass, setExpiredPass] = useState([]);

  useEffect(() => {
    const payList = async() => {
      const payInfo = { 
        MEM_NO : sessionStorage.getItem('no'),
      };
      const res = await myPassListDB(payInfo);
      console.log(res); 
      if(res.data){
        const pass = [];
        const enpiredpass = [];

        res.data.forEach((item)=>{
          if(item.PASS_STATUS < 0){
            enpiredpass.push(item);
          } else {
            pass.push(item);
          }
        })
        setMyPass(pass);
        setExpiredPass(enpiredpass);
      }
    }
    payList();
  },[setMyPass, setExpiredPass])




  const passHeaders = ["상품번호","상품이름","남은횟수","시작일","만료일","결제일","결제금액"];
  const passHeaderWd = ["10%", "20%" , "10%", "15%", "15%", "15%", "15%"];

  const classHeaders = ["상품번호","상품이름","남은횟수","시작일","만료일","결제일","결제금액"];
  const classHeaderWd = ["10%", "20%" , "10%", "15%", "15%", "15%", "15%"];


  const listHeadersElements = (listHeaders, HeaderWd) => listHeaders.map((listHeader, index) => 
    listHeader==='상품이름'?
    <th key={index} style={{width:HeaderWd[index]}}>{listHeader}</th>
    :
    <th key={index} style={{width:HeaderWd[index],textAlign: 'center'}}>{listHeader}</th>
  )


  const listItemsElements = (listBody, type) => listBody.map((listItem, index) => {
    return (
      type===listItem.PASS_TYPE&&
      <tr key={index}>
        <td key={1} style={{textAlign: 'center'}}>{listItem.PASS_NO}</td>
        <td key={2}>
          {listItem.PROD_NAME==='양도권'?'양도받은 이용권':listItem.PROD_NAME}
          {listItem.PASS_STATUS===-1&&<span>&nbsp;&nbsp;[기간만료]</span>}
          {listItem.PASS_STATUS===-2&&<span>&nbsp;&nbsp;[양도]</span>}
        </td>
        { listItem.PASS_TYPE===0&&<td key={3} style={{textAlign: 'center'}}>{moment(listItem.PASS_EDAY).diff(listItem.PASS_SDAY, 'days')}일</td> }  
        { listItem.PASS_TYPE===1&&<td key={4} style={{textAlign: 'center'}}>{listItem.PASS_CNT}회</td> }
        <td key={5} style={{textAlign: 'center'}}>{listItem.PASS_SDAY}</td>
        <td key={6} style={{textAlign: 'center'}}>{listItem.PASS_EDAY}</td>
        <td key={7} style={{textAlign: 'center'}}>{listItem.PAY_DATE?.split(' ')[0]||'없음'}</td>
        <td key={8} style={{textAlign: 'center'}}>{listItem.PAY_PRICE||'0'}원</td>
      </tr>
    )
  })



  return (
    <ContainerDiv>
      <HeaderDiv>
        <h3 style={{marginLeft:"10px"}}>{sessionStorage.getItem('nickname')}회원님이 보유중인 이용권</h3>
      </HeaderDiv>
      <FormDiv>
        <div style={{minHeight:"600px"}}>
          {['헬스 회원권','수업 횟수권'].map((item, index)=>(
            <div key={index} style={{padding:"10px"}}>
              <h3 style={{marginBottom:"20px"}}>{item}</h3>
              <Table responsive style={{minWidth:"1100px"}}>
                <thead>
                  <tr>
                    {listHeadersElements(passHeaders, passHeaderWd)}
                  </tr>
                </thead>
                <tbody>
                  {listItemsElements(myPass, index)}
                </tbody>
              </Table>
            </div>
          ))}
        </div>
        <Accordion style={{padding:"10px"}}>
          {['만료된 헬스 회원권','만료된 수업 횟수권'].map((item, index)=>(
            <Accordion.Item key={index} eventKey={index}>
              <Accordion.Header>{item}</Accordion.Header>
              <Accordion.Body>
                <Table responsive style={{minWidth:"1100px"}}>
                  <thead>
                    <tr>
                      {index===0&&listHeadersElements(passHeaders, passHeaderWd)}
                      {index===1&&listHeadersElements(classHeaders, classHeaderWd)}
                    </tr>
                  </thead>
                  <tbody>
                    {listItemsElements(expiredPass, index)}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </FormDiv>
    </ContainerDiv>
  );
};

export default PayListPage;