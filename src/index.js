import '@fortawesome/fontawesome-free/js/all.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';
import 'react-calendar/dist/Calendar.css'; // css import
import './styles/Cal.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { setAuth } from './redux/userAuth/action';
import App from './App';
import rootReducer from './redux/rootReducer'
import AuthLogic from './service/firebase/authLogic';
import firebaseApp from './service/firebase/firebase';

const authLogic = new AuthLogic(firebaseApp);

let store = createStore(rootReducer);
// 생성한 store안에 모든 전역 state를 넣어 관리
store.dispatch(setAuth(authLogic.getUserAuth(), authLogic.getGoogleAuthProvider()));
console.log(store.getState());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename={process.env.PUBLIC_URL}>
        <App/>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
