import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { payListDB } from '../../../service/dbLogic';
import { BButton, ContainerDiv } from '../../../styles/FromStyle';

const TransferInfoPage = () => {

  const search = useLocation().search;
  const [payInfo, setPayInfo] = useState([
    {
    }
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPayInfo = async() => {
      const state = search.split('&').filter((item)=>{return item.match('state')})[0]?.split('=')[1];
      const pay_no = search.split('&').filter((item)=>{return item.match('pay_no')})[0]?.split('=')[1];
      if(state==='success') {
        const info = {
          MEM_NO : sessionStorage.getItem('no'),
          PAY_NO : pay_no
        }
        const res = await payListDB(info);
        console.log(res.data);
        setPayInfo(res.data);
      }else if(state==='fail') {
        setPayInfo('결제실패');
      }else if(state==='cancel') {
        setPayInfo('결제취소');
      }
    }
    getPayInfo();
  },[setPayInfo, search])
  
  const getTotal = () => {
    let total=0;
    payInfo.forEach((order)=> {total+=(order.PAY_PRICE)}) 
    return total
  }


  return (
    <>
      {
        payInfo==='결제실패'||payInfo==='결제취소'||payInfo[0].PAY_NO===''
        ?
        <ContainerDiv>
          <Card className="text-center" style={{width:"90%", maxWidth:"1200px"}}>
            <Card.Header>
              <h3>{payInfo}</h3>
            </Card.Header>
            <Card.Body>
              {payInfo}입니다.
            </Card.Body>
            <Card.Footer>
              <BButton style={{width:"150px", height:"48px"}} onClick={()=>{navigate('/')}}>홈으로</BButton>
            </Card.Footer>
          </Card>
        </ContainerDiv>
        :
        <ContainerDiv>
          <Card className="text-center" style={{width:"90%", maxWidth:"1200px"}}>
            <Card.Header>
              <h3>결제완료 : NO.{payInfo[0].PAY_NO}</h3>
              <h6>결제일 : {payInfo[0].PAY_DATE}</h6>
            </Card.Header>
            <Card.Body>
              <div style={{display:"flex", flexDirection: "column",justifyContent:"center", fontSize:"26px"}}>
                <span>{sessionStorage.getItem('nickname')}회원님 결제가 완료되었습니다.</span>
                <span>감사합니다.</span>
              </div>
              <div style={{display:"flex", flexWrap: "wrap", width:"100%", justifyContent: "space-around", height:"400px", marginTop:"30px"}}>
                <div style={{display: 'flex', flexDirection: 'column',justifyContent: 'space-between', maxWidth:"300px", width: "100%", height:"100px", margin:"20px"}}>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span>주문번호 : </span><span>NO.{payInfo[0].ORDER_NO}</span>
                  </div >
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span>상품이름 : </span><span>{payInfo[0].PROD_NAME}</span>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span>결제금액 : </span><span>{payInfo[0].PAY_PRICE} 원</span>
                  </div>
                </div>
              </div>
              <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                <div style={{display: 'flex',maxWidth:"300px", width: "100%", fontSize: "22px", justifyContent: 'space-between'}}>
                  <span>총 결제금액 : </span><span>{getTotal()} 원</span>
                </div>
              </div>
            </Card.Body>
            <Card.Footer>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <BButton style={{width:"150px", height:"48px"}} onClick={()=>{navigate('/')}}>홈으로</BButton>
              </div>
            </Card.Footer>
          </Card>
        </ContainerDiv>
      }
    </>
  );

};

export default TransferInfoPage;