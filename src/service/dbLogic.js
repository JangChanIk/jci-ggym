import axios from "axios";





export const memberListDB = (params) => {

  return new Promise((resolve) => {
    const response = axios({
      method: 'get',
      url: process.env.REACT_APP_SPRING_IP+'member/memberList',
      params: params
    });
    resolve(response);
  });

}


export const memberDetailDB = (params) => {

  return new Promise((resolve) => {
    const response = axios({
      method: 'get',
      url: process.env.REACT_APP_SPRING_IP+'member/memberDetail',
      params: params
    });
    resolve(response);
  });

}

export const memberInsertDB = (datas) => {

  return new Promise((resolve) => {
    const response = axios({
      method: 'post',
      url: process.env.REACT_APP_SPRING_IP+'member/memberInsert',
      data: datas
    });
    resolve(response);
  });

}


export const memberUpdateDB = (datas) => {

  return new Promise((resolve) => {
    const response = axios({
      method: 'post',
      url: process.env.REACT_APP_SPRING_IP+'member/memberUpdate',
      data: datas
    });
    resolve(response);
  });

}


export const kakaoPayReadyDB = (list) => {
  return new Promise((resolve) => {
    const response = axios({
      method: 'post',
      url: process.env.REACT_APP_SPRING_IP+'orders/payReady',
      data: list
    });
    resolve(response);
  });
}


export const kakaoPaySuccessDB = (list) => {
  return new Promise((resolve) => {
    const response = axios({
      method: 'post',
      url: process.env.REACT_APP_SPRING_IP+'orders/paySuccess',
      data: list
    });
    resolve(response);
  });
}


export const TransferSuccessDB = (list) => {
  return new Promise((resolve) => {
    const response = axios({
      method: 'post',
      url: process.env.REACT_APP_SPRING_IP+'orders/transferSuccess',
      data: list
    });
    resolve(response);
  });
}

export const payListDB = (info) => {
  return new Promise((resolve) => {
    const response = axios({
      method: 'get',
      url: process.env.REACT_APP_SPRING_IP+'orders/payList',
      params: info
    });
    resolve(response);
  });
}


export const myPassListDB = (info) => {
  return new Promise((resolve) => {
    const response = axios({
      method: 'get',
      url: process.env.REACT_APP_SPRING_IP+'orders/passList',
      params: info
    });
    resolve(response);
  });
}





export const uploadImageDB = (file) => {
  return new Promise((resolve) => {
    const response = axios({
      method: 'post',
      url: process.env.REACT_APP_SPRING_IP+'board/imageUpload',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      processData: false,
      contentType: false,
      data: file
      
    });
    resolve(response);
  });
}

export const boardListDB = (board) => {
  return new Promise((resolve) => {
    const response = axios({
      method: 'get',
      url: process.env.REACT_APP_SPRING_IP+'board/boardList',
      params: board
    });
    resolve(response);
  });
}


export const boardInsertDB = (board) => {
  return new Promise((resolve) => {
    const response = axios({
      method: 'post',
      url: process.env.REACT_APP_SPRING_IP+'board/boardInsert',
      data: board
    });
    resolve(response);
  });
}

export const boardUpdateDB = (board) => {
  return new Promise((resolve) => {
    const response = axios({
      method: 'post',
      url: process.env.REACT_APP_SPRING_IP+'board/boardUpdate',
      data: board
    });
    resolve(response);
  });
}


export const boardDeleteDB = (board) => {
  return new Promise((resolve) => {
    const response = axios({
      method: 'post',
      url: process.env.REACT_APP_SPRING_IP+'board/boardDelete',
      data: board
    });
    resolve(response);
  });
}


export const boardDetailDB = (board) => {
  return new Promise((resolve) => {
    const response = axios({
      method: 'get',
      url: process.env.REACT_APP_SPRING_IP+'board/boardDetail',
      params: board
    });
    resolve(response);
  });
}




export const commentInsertDB = (comment) => {
  return new Promise((resolve) => {
    const response = axios({
      method: 'post',
      url: process.env.REACT_APP_SPRING_IP+'board/commentInsert',
      data: comment
    });
    resolve(response);
  });
}

export const commentUpdateDB = (comment) => {
  return new Promise((resolve) => {
    const response = axios({
      method: 'post',
      url: process.env.REACT_APP_SPRING_IP+'board/commentUpdate',
      data: comment
    });
    resolve(response);
  });
}

export const commentDeleteDB = (comment) => {
  return new Promise((resolve) => {
    const response = axios({
      method: 'post',
      url: process.env.REACT_APP_SPRING_IP+'board/commentDelete',
      data: comment
    });
    resolve(response);
  });
}


export const productListDB = () => {
  return new Promise((resolve) => {
    const response = axios({
      method: 'get',
      url: process.env.REACT_APP_SPRING_IP+'orders/productList',
    });
    resolve(response);
  });
}


export const passListDB = () => {
  return new Promise((resolve) => {
    const response = axios({
      method: 'get',
      url: process.env.REACT_APP_SPRING_IP+'orders/productList',
    });
    resolve(response);
  });
} 