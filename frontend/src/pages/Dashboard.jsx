import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserDashboard } from './utility/ApiService';
import deleteimg from '../assets/icon/delete.svg';
const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchUserDashboard = async () => {
      try {
        const email = localStorage.getItem("email")
        if (email) {
          const response = await getUserDashboard(email);
          setUserData(response[0]);
        } else { alert("facing problem try after some time") }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchUserDashboard();
  }, [location]);

  return (
    <>
      <div className='dasboardcard'>
      <h1 className='titalname'>Your history</h1>
      {userData && userData.url && (
        <div className='cardWrapper'>
          {userData.url.map((urlItem) => (
          <div className='shortcard'>
            <div className='url_cont'>
              <div>
                <h4>Your Url:</h4>
                <p><a href={urlItem.originalURL}>{urlItem.originalURL.substring(0, 30)}</a>....</p>
              </div>
              <div>
                <h4>Short Url:</h4>
                <p><a href={`http://localhost:5000/${urlItem.shortURL}`}>{`http://localhost:5000/${urlItem.shortURL}`}</a></p>
              </div>
            </div>
            <div className='clicks_cont'>
              <section>
              <h4>Clicks</h4>
              <p>{urlItem.pastAnalytics.length}</p>
              </section>
              <img style={{width:50}} src={deleteimg} alt='' />
            </div>
          </div>
           ))}
        </div>
          )}
      </div>

    </>

  )
};

export default Dashboard