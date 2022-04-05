import React from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';

const PassTable = ({myPass, index, click, handleSelectPass}) => {

  const passHeaders = ["상품번호", "상품이름" , "남은일수", "시작일", "만료일"];
  const passHeaderWd = ["10%", "20%", "10%", "10%", "10%"];

  const classHeaders = ["상품번호", "상품이름" , "남은횟수" , "시작일", "만료일"];
  const classHeaderWd = ["10%", "20%", "10%", "10%","10%"];

  const listHeadersElements = (listHeaders, HeaderWd) => listHeaders.map((listHeader, index) => 
    listHeader==='상품이름'?
    <th key={index} style={{width:HeaderWd[index]}}>{listHeader}</th>
    :
    <th key={index} style={{width:HeaderWd[index],textAlign: 'center'}}>{listHeader}</th>
  )


  const listItemsElements = (listBody, type) => listBody.map((listItem, index) => {
    return (
      type===listItem.PASS_TYPE&&
      <tr key={index} onClick={()=>{if(click){handleSelectPass(listItem)}}}>
        <td key={1} style={{textAlign: 'center'}}>{listItem.PASS_NO}</td>
        <td key={2}>{listItem.PROD_NAME}</td>
        { listItem.PASS_TYPE===0&&<td key={3} style={{textAlign: 'center'}}>{moment(listItem.PASS_EDAY).diff(listItem.PASS_SDAY, 'days')}일</td> }  
        { listItem.PASS_TYPE===1&&<td key={4} style={{textAlign: 'center'}}>{listItem.PASS_CNT}회</td> }
        <td key={5} style={{textAlign: 'center'}}>{listItem.PASS_SDAY}</td>
        <td key={6} style={{textAlign: 'center'}}>{listItem.PASS_EDAY}</td>
      </tr>
    )
  })


  return (
    <Table hover responsive style={{minWidth:"800px"}}>
      <thead>
        <tr>
          {index===0&&listHeadersElements(passHeaders, passHeaderWd)}
          {index===1&&listHeadersElements(classHeaders, classHeaderWd)}
        </tr>
      </thead>
      <tbody>
        {listItemsElements(myPass, index)}
      </tbody>
    </Table>
  );
};

export default PassTable;