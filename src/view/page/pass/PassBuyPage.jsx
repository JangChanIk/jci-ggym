import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import { kakaoPayReadyDB, myPassListDB, productListDB } from '../../../service/dbLogic';
import { BButton, ContainerDiv, PayForm} from '../../../styles/FromStyle';
import moment from 'moment';
import { Card, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setToastMsg } from '../../../redux/toastStatus/action';
import PassAccodion from '../../component/pass/PassAccordion';

const PassBuyPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [buyCheck, setBuyCheck] = useState(false);
  const [date, setDate] = useState(new Date());
  const [edate, setEdate] = useState(new Date());
  const [product, setProduct] = useState({
    pass: [],
    class: []
  });
  const [myPass, setMyPass] = useState([]);
  const [selectPass, setSelectPass] = useState({
    PROD_NO : 0,
    PASS_SDAY : moment(new Date()).format("YYYY-MM-DD"),
    PROD_AMOUNT : 0,
    PROD_PRICE : 0,
    PROD_TYPE : -1,
    PROD_NAME : '선택 안함',
  });
  const [selectClass, setSelectClass] = useState({
    PROD_NO : 0,
    PROD_AMOUNT : 0,
    PROD_PRICE : 0,
    PROD_TYPE : -1,
    PROD_NAME : '선택 안함',
  });
  const[submitBtn, setSubmitBtn] = useState({
    disabled: true,
    bgColor: 'rgb(175, 210, 244)',
  });


  useEffect(()=> {
    if(buyCheck&&(selectPass.PROD_NO!==0||selectClass.PROD_NO!==0)){ 
      setSubmitBtn({disabled:false, bgColor: 'rgb(105, 175, 245)'});
    } else {
      setSubmitBtn({disabled:true, bgColor: 'rgb(175, 210, 244)'});
    }
  },[buyCheck, selectPass.PROD_NO, selectClass.PROD_NO ]);


  useEffect(() => {
    const productList = async() => {
      const res = await productListDB();
      let pass = [{
        PROD_NO : 0,
        PROD_AMOUNT : 0,
        PROD_TYPE : 0,
        PROD_NAME : '선택 안함',
        PROD_PRICE : 0
      }];
      let lesson = [{
        PROD_NO : 0,
        PROD_AMOUNT : 0,
        PROD_TYPE : 1,
        PROD_NAME : '선택 안함',
        PROD_PRICE : 0
      }];
      console.log(res.data);
      res.data.forEach((item)=> {
        if(item.PROD_TYPE===0){
          pass.push(item);
        } else if(item.PROD_TYPE===1){
          lesson.push(item);
        }
      });
      setProduct({
        pass : pass,
        class : lesson,
      })
    }
    productList();
  },[setProduct])


  useEffect(() => {
    const payList = async() => {
      const MEM_NO = sessionStorage.getItem('no');
      if(MEM_NO){
        const mem_no = { MEM_NO : MEM_NO, TYPE: 2 };
        const res = await myPassListDB(mem_no);
        console.log(res); 
        let bool = false;
        if(res.data){
          let lastDay = new Date();
          res.data.forEach((item)=>{
            if(item.PASS_TYPE===0){
              const eday = new Date(item.PASS_EDAY);
              if(lastDay < eday){
                lastDay = eday;
                bool = true;
              }
            }
          })
          if(bool){
            const nextDay = new Date(moment(lastDay).add(1, 'day'));
            setEdate(nextDay);
            setDate(nextDay);
          }
          setMyPass(res.data);
        }
      } 
    }
    payList();
  },[setEdate, setDate,setMyPass])


  const payment = async() => {
    if(!sessionStorage.getItem('no')) {
      dispatch(setToastMsg('로그인 후 구매해주세요.'));
      return;
      //alert('로그인 후 구매해주세요.');
      //navigate('/login');
    }else if(sessionStorage.getItem('auth')!=='1') {
      dispatch(setToastMsg('회원만 구매할 수 있습니다.'));
      return;
      //alert('로그인 후 구매해주세요.');
      //navigate('/login');
    }
    const buyList = [];
    if(selectPass.PROD_NO!==0) {
      buyList.push({
        MEM_NO : sessionStorage.getItem('no'),
        PROD_NO : selectPass.PROD_NO,
      })
    }
    if(selectClass.PROD_NO!==0) {
      buyList.push({
        MEM_NO : sessionStorage.getItem('no'),
        PROD_NO : selectClass.PROD_NO,
      })
    }

    const kakao = await kakaoPayReadyDB(buyList);
    console.log(kakao);
    sessionStorage.setItem('KAKAOPAYURL', kakao.data.NEXT_REDIRECT_PC_URL)
    sessionStorage.setItem('ORDER_NO', kakao.data.ORDER_NO)
    sessionStorage.setItem('PAY_NO', kakao.data.PAY_NO)
    if(selectPass.PROD_NO!==0) sessionStorage.setItem('PASS_SDAY', selectPass.PASS_SDAY)
    navigate('/pay/ready');
  }


  const handleProduct = (item) => {
    if(item.PROD_TYPE===0) {
      setSelectPass({
        ...selectPass,
        PROD_NO : item.PROD_NO,
        PROD_AMOUNT : item.PROD_AMOUNT,
        PROD_PRICE : item.PROD_PRICE,
        PROD_NAME : item.PROD_NAME,
        PASS_SDAY : moment(date).format("YYYY-MM-DD"),
      });
    } else if (item.PROD_TYPE===1) {
      setSelectClass({
        ...selectClass,
        PROD_NO : item.PROD_NO,
        PROD_AMOUNT : item.PROD_AMOUNT,
        PROD_PRICE : item.PROD_PRICE,
        PROD_NAME : item.PROD_NAME,
      });
    }
  }


  const changeSDAY = (e) => {
    setDate(e);
    setSelectPass({
      ...selectPass,
      PASS_SDAY : moment(e).format("YYYY-MM-DD")
    });
    
  }


  const ProductList = (name ,product) => (
    <div>
      <h3 style={{marginBottom: "30px"}}>{name}</h3>
      { product.map((item) => (
        <div key={item.PROD_NAME} style={{display: 'flex', justifyContent:"space-between"}}>
          {
            item.PROD_NO===0
            ?
            <Form.Check type='radio' id={item.PROD_NAME} name={item.PROD_TYPE} label={item.PROD_NAME}
              onChange={()=>{handleProduct(item)}} defaultChecked={true}/>
            :
            <Form.Check type='radio' id={item.PROD_NAME} name={item.PROD_TYPE} label={item.PROD_NAME}
              onChange={()=>{handleProduct(item)}}/>
          }
          <span style={{marginBottom: '10px'}}>{item.PROD_PRICE} 원</span>
        </div>
      ))}
    </div>
  )



  return (
    <>
      <ContainerDiv>
        <Card className="text-center" style={{width:"90%", maxWidth:"1200px"}}>
          <Card.Header>
            <h3>이용권 구매</h3>
          </Card.Header>
          <Card.Body>
            <PassAccodion myPass={myPass} hover={true}/>
            <div style={{display:"flex", flexWrap: "wrap", justifyContent: "space-around"}}>
              <PayForm>
                {ProductList('헬스 회원권', product.pass)}
                <div>
                  <div style={{margin: "20px 0px 20px 0px", textAlign: 'center'}}>
                    <div style={{marginBottom:"10px"}}>회원권 시작일 선택</div>
                    <Calendar 
                      onChange={(e)=>{changeSDAY(e)}} value={date} 
                      formatDay={(locale, date) => moment(date).format("DD")}
                      minDetail="month" maxDetail="month" minDate={edate}
                    /> 
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                      <span style={{textAlign: 'center'}}>회원권 시작일</span>
                      <span>{moment(date).format("YYYY년 MM월 DD일")} </span>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                      <span style={{textAlign: 'center'}}>회원권 종료일</span>
                      <span>{moment(date).add(selectPass.PROD_AMOUNT, 'month').format("YYYY년 MM월 DD일")} </span>
                    </div>
                  </div>
                </div>
              </PayForm>
              <PayForm>
                {ProductList('수업 횟수권', product.class)}  
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <h3 style={{margin: "30px 0px 30px 0px"}}>구매목록</h3>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: "10px"}}>
                    <span>헬스 회원권 : {selectPass.PROD_NAME.split(' ')[2]}</span>
                    <span>{selectPass.PROD_PRICE} 원</span>
                  </div> 
                  <div style={{display: 'flex', justifyContent: 'space-between',marginBottom: "10px"}}>
                    <span>수업 횟수권 : {selectClass.PROD_NAME.split(' ')[2]}</span>
                    <span>{selectClass.PROD_PRICE} 원</span>
                  </div> 
                  <div style={{display: 'flex', justifyContent: 'space-between',marginBottom: "10px"}}>
                    <span>총 결제금액 :</span>
                    <span>{selectPass.PROD_PRICE+selectClass.PROD_PRICE} 원</span>
                  </div> 
                </div>
              </PayForm>
            </div>
          </Card.Body>
          <Card.Footer>
            <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
              <Form.Check type={'checkbox'} id={'checkbox'} name={'checkbox'} label={`결제에 동의하시나요?`} style={{margin:'5px'}} onChange={()=>{setBuyCheck(!buyCheck)}}/>
              <BButton disabled={submitBtn.disabled} style={{backgroundColor:submitBtn.bgColor, width:"150px", height:"48px"}} onClick={()=>{payment()}}>이용권 결제</BButton>
            </div>
          </Card.Footer>
        </Card>
      </ContainerDiv>
    </>
  );
};

export default PassBuyPage;