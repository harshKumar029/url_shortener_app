import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserDashboard ,deleteUrlData} from './utility/ApiService';
import deleteimg from '../assets/icon/delete.svg';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const location = useLocation();

  const fetchUserDashboard = async () => {
    try {
      const email = localStorage.getItem("email")
      if (email) {
        const response = await getUserDashboard(email);
        setUserData(response[0]);
      } else {
        alert("Facing problem, try again after some time");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchUserDashboard();
  }, [location]);

const deleteData = async (Id) => {
  try {
    const email = localStorage.getItem("email")
    if (email) {
      const response = await deleteUrlData({ email: email, id: Id });
      console.log(response)
      await fetchUserDashboard();
    }
  } catch (error) {
    console.error("Error deleting URL data:", error);
  }
};


  return (
    <div className='dasboardcard'>
      <h1 className='titalname'>Your history</h1>
      {userData && userData.url && (
        <div className='cardWrapper'>
          {userData.url.map((urlItem) => (
            <div className='shortcard' key={urlItem._id}>
              <div className='url_cont'>
                <div>
                  <h4>Your Url:</h4>
                  <p><a href={urlItem.originalURL}>{urlItem.originalURL.substring(0, 30)}</a>....</p>
                </div>
                <div>
                  <h4>Short Url:</h4>
                  <p><a href={`https://x-agc4.onrender.com/${urlItem.shortURL}`}>{`https://x-agc4.onrender.com/${urlItem.shortURL}`}</a></p>
                </div>
              </div>
              <div className='clicks_cont'>
                <section>
                  <h4>Clicks</h4>
                  <p>{urlItem.pastAnalytics.length}</p>
                </section>
                <img
                  style={{ width: 30, cursor: 'pointer' }}
                  src={deleteimg}
                  alt='Delete'
                  onClick={() => deleteData(urlItem._id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
