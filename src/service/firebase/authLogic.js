import { getAuth, signInWithPopup , GoogleAuthProvider, createUserWithEmailAndPassword, 
  sendEmailVerification, signInWithEmailAndPassword, EmailAuthProvider, linkWithCredential, 
  sendPasswordResetEmail, reauthenticateWithCredential, updatePassword, deleteUser } from 'firebase/auth';


class AuthLogic {

  
  constructor() {
    this.auth = getAuth();
    //setPersistence(this.auth, browserSessionPersistence);
    this.googleProvider = new GoogleAuthProvider();
  }

  getUserAuth = () => {
    return this.auth
  }

  getGoogleAuthProvider = () => {
    return this.googleProvider
  }

}

export default AuthLogic;




export const onAuthChange = (auth) => {
  return new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      resolve(user); 
    });
  }); 
}

export const logout = (auth) => {
  return new Promise((resolve, reject) => {
    auth.signOut().catch(e => reject(alert(e+": 로그아웃 오류입니다.")));
    resolve();
  }); 
}

export const loginGoogle = (auth, googleProvider) => {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, googleProvider).then(
      (result) => {
        const user = result.user;
        console.log(user);
        resolve(user);
      }).catch(e => reject(e));
  });  
}


export const loginEmail = (auth, user) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, user.email, user.password).then(
      (userCredential) => {
        console.log(userCredential);
        resolve(userCredential);
      }).catch(e => reject(e));
  });  
}


export const signupEmail = (auth, user) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      sendEmail(userCredential.user).then(()=>{
        resolve(userCredential.user.uid);
      }
      )
    }).catch(e => reject(e));
  });
}  

export const linkEmail = (auth, user) => {
  return new Promise((resolve, reject) => {
    const credential = EmailAuthProvider.credential(user.email, user.password);
    linkWithCredential(auth.currentUser, credential)
      .then((usercred) => {
        const user = usercred.user;
        console.log("Account linking success", user.uid);
        resolve(user.uid);
      }).catch(e => reject(e));
  });
}

export const sendEmail = (user) => {
  return new Promise((resolve, reject) => {
    sendEmailVerification(user).then(() => {
      resolve("해당 이메일에서 인증메세지를 확인 후 다시 로그인 해주세요.");
    }).catch(e => reject(e+": 인증메일 오류입니다.")); 
    
  });
}

export const sendResetpwEmail = (auth, email) => {
  return new Promise((resolve, reject) => {
  sendPasswordResetEmail(auth, email).then(() => {
        resolve("비밀번호 변경 이메일을 보냈습니다.");
    }).catch(e => reject(e));
  });  
}

export const recertification = (auth, password) => {
  return new Promise((resolve, reject) => {
    try{
      const credential = EmailAuthProvider.credential(auth.currentUser.email,password)
      const result = reauthenticateWithCredential(auth.currentUser,credential);
      resolve(result);
    }catch (e) {
      reject(e);
    }
  });  
}


export const updatePwd = (auth, newPassword) => {
  return new Promise((resolve, reject) => {
    updatePassword(auth.currentUser, newPassword).then(() => {
      resolve();
    }).catch((error) => {
      reject(error);
    });
  });
};

export const reSignUser = (auth) => {
  return new Promise((resolve, reject) => {
    deleteUser(auth.currentUser).then(() => {
      resolve();
    }).catch((error) => {
      reject(error);
    });
  });  
};

