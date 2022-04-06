import React, { useEffect } from 'react';
import { TransferSuccessDB } from '../../../service/dbLogic';


const TransferSuccess = () => {
  useEffect(() => {
    const ssg = sessionStorage; 
    const list = {
      PG_TOKEN : window.location.search.split('=')[1],
      ORDER_NO : ssg.getItem("ORDER_NO"),
      PASS_NO : ssg.getItem("PASS_NO"),
      PAY_NO : ssg.getItem("PAY_NO"),
      MEM_NO : ssg.getItem("no"),
      TRANS_MEM_NO : ssg.getItem("TRANS_MEM_NO"),
      BNO : ssg.getItem("BNO"),
    }
    const toDo = async() => {
      ssg.removeItem('ORDER_NO');
      ssg.removeItem('PAY_NO');
      ssg.removeItem('KAKAOPAYURL');
      ssg.removeItem('PASS_NO');
      ssg.removeItem('TRANS_MEM_NO');
      ssg.removeItem("BNO");
      const res = await TransferSuccessDB(list);
      console.log(res);
      if(res.data){
        window.parent.location.href="pay/transferInfo?state=success&pay_no="+res.data;
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

export default TransferSuccess