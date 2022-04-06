import axios from "axios";





export const memberListDB = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: 'get',
        url: process.env.REACT_APP_SPRING_IP+'member/memberList',
        params: params
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}


export const memberDetailDB = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: 'get',
        url: process.env.REACT_APP_SPRING_IP+'member/memberDetail',
        params: params
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}


export const memberInsertDB = (datas) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: 'post',
        url: process.env.REACT_APP_SPRING_IP+'member/memberInsert',
        data: datas
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}


export const memberUpdateDB = (datas) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: 'post',
        url: process.env.REACT_APP_SPRING_IP+'member/memberUpdate',
        data: datas
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}

export const kakaoPayReadyDB = (list) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: 'post',
        url: process.env.REACT_APP_SPRING_IP+'orders/payReady',
        data: list
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}


export const kakaoPaySuccessDB = (list) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: 'post',
        url: process.env.REACT_APP_SPRING_IP+'orders/paySuccess',
        data: list
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}


export const TransferSuccessDB = (list) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: 'post',
        url: process.env.REACT_APP_SPRING_IP+'orders/transferSuccess',
        data: list
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}

export const payListDB = (info) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: 'get',
        url: process.env.REACT_APP_SPRING_IP+'orders/payList',
        params: info
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}


export const myPassListDB = (info) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: 'get',
        url: process.env.REACT_APP_SPRING_IP+'orders/passList',
        params: info
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}




export const uploadImageDB = (file) => {
  return new Promise((resolve, reject) => {
    try {
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
    } catch (error) {
      reject(error);
    }
  });

}


export const boardListDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: 'get',
        url: process.env.REACT_APP_SPRING_IP+'board/boardList',
        params: board
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}


export const boardInsertDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
    const response = axios({
      method: 'post',
      url: process.env.REACT_APP_SPRING_IP+'board/boardInsert',
      data: board
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}

export const boardUpdateDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: 'post',
        url: process.env.REACT_APP_SPRING_IP+'board/boardUpdate',
        data: board
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}



export const boardDeleteDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: 'post',
        url: process.env.REACT_APP_SPRING_IP+'board/boardDelete',
        data: board
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}


export const boardDetailDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: 'get',
        url: process.env.REACT_APP_SPRING_IP+'board/boardDetail',
        params: board
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}




export const commentInsertDB = (comment) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: 'post',
        url: process.env.REACT_APP_SPRING_IP+'board/commentInsert',
        data: comment
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}


export const commentUpdateDB = (comment) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: 'post',
        url: process.env.REACT_APP_SPRING_IP+'board/commentUpdate',
        data: comment
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}



export const commentDeleteDB = (comment) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: 'post',
        url: process.env.REACT_APP_SPRING_IP+'board/commentDelete',
        data: comment
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}


export const productListDB = () => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: 'get',
        url: process.env.REACT_APP_SPRING_IP+'orders/productList',
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}


export const attendInsertDB = (user) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: 'post',
        url: process.env.REACT_APP_SPRING_IP+'pass/attendInsert',
        data: user
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}


export const reSignUserDB = (user) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: 'post',
        url: process.env.REACT_APP_SPRING_IP+'member/memberDelete',
        data: user
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}