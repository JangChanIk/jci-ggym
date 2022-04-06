import React from 'react';
import { useLocation } from 'react-router-dom';

const PayCancel = () => {

  const param = useLocation().search;
  console.log(param);
  if(!param){
    window.parent.location.href="pay/passInfo?state=cancel";
  }

  return (
    <>
      <progress></progress>
    </>
  )

};

export default PayCancel;