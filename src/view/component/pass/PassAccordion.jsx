import React from 'react';
import { Accordion } from 'react-bootstrap';
import PassTable from './PassTable';

const PassAccodion = ({myPass, click, handleSelectPass}) => {

  return (
    <Accordion>
      {['보유중인 헬스 회원권','보유중인 수업 횟수권'].map((item,index)=>(
        <Accordion.Item eventKey={index} key={index}>
          <Accordion.Header>{item}</Accordion.Header>
          <Accordion.Body>
            <PassTable myPass={myPass} index={index} click={click} handleSelectPass={handleSelectPass}/>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default PassAccodion;