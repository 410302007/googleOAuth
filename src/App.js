import logo from './logo.svg';
import {useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";
import './App.css';

function App() {
  const [user, setUser] = useState({}); //empty object

  function handelCallbackResponse(response){
    console.log("Encoded JWT ID token" + response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject); //顯示用戶資訊
    setUser(userObject);
    //登入成功後，登入按鈕消失
    document.getElementById("signInDiv").hidden = true;
  }
  function handleSignOut(event){
    setUser({});   
    //登出成功後，顯示登入按鈕
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google*/
    google.accounts.id.initialize({
      client_id:"747210412051-hlr8n0ftgqmtjcjc8lus6kbdbbtksjti.apps.googleusercontent.com",
      callback:handelCallbackResponse
    });
 
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme:"outline", size:"large"}
    );
    
    google.accounts.id.prompt();
  },[]);

  //尚未登入:顯示登入選項
  //已登入: 顯示登出選項
  return (
    <div className="App">
      <div id="signInDiv"></div>
      {/* 若尚未登入時不要顯示登出選項 */}
      {Object.keys(user).length !== 0 &&
        <button onClick={(e)=>
        handleSignOut(e)
      }>登出</button>
      }
     
      {user &&
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
