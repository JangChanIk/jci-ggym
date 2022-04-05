import React from 'react';
import Signup from '../../component/login/Signup';
import Signuptype from '../../component/login/Signuptype';

const SignupPage = () => {

  const type = window.location.search.split('=')[1]

  const signupage = () => {
    if(type){
      return <Signup/>
    } else {
      return <Signuptype/>
    }
  } 

  return (
    signupage()
  );
};

export default SignupPage;