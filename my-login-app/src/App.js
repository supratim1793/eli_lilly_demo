import React, { useState, useEffect } from "react";
import './App.css';


const App = () =>{
  const [buttonDisplay,setButtonDisplay] = useState(false);
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;

  let buttonListing;

  useEffect(() => {
      const code = window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1];
    if(code){
      sessionStorage.setItem("clientCode", code);
      callBackendPOSTAPI()
        .then(res => {
          sessionStorage.setItem("accessToken", res.access_token)
          if(res.access_token){
            setButtonDisplay(true);
          }
        })
        .catch(err => console.log(err));
    }
  },[]);

  const handleListingButtonClick = () =>{
    window.open(REDIRECT_URI+"listings");
  };

  const callBackendPOSTAPI = async () => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ client_id: '74307ff9b3fbadbe2e84', client_secret: 'eb95df1f954a211636daffb3ddea6de69fdf3421', code:sessionStorage.getItem('clientCode')})
    };

    const response = await fetch('/my-oauth', requestOptions);
    let body;
    if (response.status === 200) {
      body = await response.json();
    }else{
      window.alert(response.statusText+". Kindly start the node JS server");
      throw Error(body.message);
    }
    return body;
  };

  if(buttonDisplay){
    buttonListing = <ListingPageButton onClick={handleListingButtonClick} />;
  }
  return (
    <div>
      <div>

      </div>
        <div className="main-body">
        <div className="sub-heading">
          Click on the link below to access Github
        </div>

        <div className="login-link">
          <a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}>
          Login
          </a>
        </div>

        <div className="main-button">
          {buttonListing}
        </div>
      </div>
    </div>
  );
}

function ListingPageButton({onClick}) {
  return (
    <button onClick={onClick} >
      Go to Listings Page
    </button>
  );
}

export default App;
