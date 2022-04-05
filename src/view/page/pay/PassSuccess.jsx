import React, { useEffect } from 'react';
import { kakaoPaySuccessDB } from '../../../service/dbLogic';


const PassSuccess = () => {
  useEffect(() => {
    const ssg = sessionStorage; 
    const list = {
      PG_TOKEN : window.location.search.split('=')[1],
      ORDER_NO : ssg.getItem("ORDER_NO"),
      PAY_NO : ssg.getItem("PAY_NO"),
      PASS_SDAY : ssg.getItem("PASS_SDAY"),
      MEM_NO : ssg.getItem("no"),
    }
    const toDo = async() => {
      ssg.removeItem('ORDER_NO');
      ssg.removeItem('PAY_NO');
      ssg.removeItem('PASS_SDAY');
      ssg.removeItem('KAKAOPAYURL');
      const res = await kakaoPaySuccessDB(list);
      console.log(res)
      if(res.data){
        window.parent.location.href="passInfo?state=success&pay_no="+res.data;
      }
    }
    toDo();
  },[]);
  return(
    <>
      <progress></progress>
    </>
  )
};

export default PassSuccess