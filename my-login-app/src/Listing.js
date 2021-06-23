import React, { useState, useEffect } from "react";
import './Listing.css';

// const code = sessionStorage.getItem('clientCode');

const Listing  = () =>{
    const [repoUrl,setrepoUrl] = useState(null);
    const [gistUrl,setgistUrl] = useState(null);

    useEffect(() => {
        callGETAPI()
        .then(res => {
            const gistUrl = res.url+"/gists";
            setrepoUrl(res.repos_url);
            setgistUrl(gistUrl);
        })
        .catch(err => console.log(err));
    },[]);
    

      const callGETAPI = async () => {
        const token = "token "+sessionStorage.getItem('accessToken');
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': token
            },
        };

        const response = await fetch('https://api.github.com/user', requestOptions);
        const body = await response.json();
    
        if (response.status !== 200) {
          throw Error(body.message) 
        }
        return body;
      };

      const handleRepoButtonClick = () => {
        window.open(repoUrl);
      };

      const handleGistButtonClick = () => {
        window.open(gistUrl);
      };

      let buttonRepo;       
      let buttonGist;       
      if(sessionStorage.getItem('accessToken')){
          buttonRepo = <Repositories onClick={handleRepoButtonClick} />;
          buttonGist = <Gists onClick={handleGistButtonClick} />;
      }
      return(
          <div className="main-listing-body">
              <div className="listing-page-buttons">
                <div class="card">
                    <div className="card-text">
                        Please click below to view the logged-in users list of Repositories
                    </div>
                    <div class="container">
                        {buttonRepo}
                    </div>
                </div>
                <div class="card">
                    <div className="card-text">
                        Please click below to view the logged-in users list of Gists
                    </div>
                    <div class="container">
                        {buttonGist}
                    </div>
                </div>
              </div>

          </div>

      )
}

function Repositories({onClick}) {
    return (
      <button className="repo" onClick={onClick} >
        Repositories
      </button>
    );
  }
  
  function Gists({onClick}) {
    return (
      <button className="gist" onClick={onClick}>
        Gists
      </button>
    );
  }

export default Listing;