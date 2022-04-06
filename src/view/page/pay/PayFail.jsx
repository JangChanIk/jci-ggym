import React from 'react';
import { useLocation } from 'react-router-dom';

const PayFail = () => {

  const param = useLocation().search;
  console.log(param);
  if(!param){
    window.parent.location.href="pay/passInfo?state=Fail";
  }

  return (
    <>
      <progress></progress>
    </>
  )

};

export default PayFail;