import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserDashboard, deleteUrlData } from './utility/ApiService';
import deleteimg from '../assets/icon/delete.svg';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../components/MapComponent';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

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
      {/* <MapComponent/> */}
      <h1 className='titalname'>Your history</h1>
      {userData && userData.url && (
        <div className='cardWrapper'>
          {userData.url.map((urlItem) => (
            <div className='shortcard' key={urlItem._id}>
              <div className='url_cont'>
                <div>
                  <h4>Your Url:</h4>
                  <p><a href={urlItem.originalURL}>{urlItem.originalURL.substring(0, 30)}</a>....</p>
                  {console.log(urlItem)}
                </div>
                <div>
                  <h4>Short Url:</h4>
                  {/* this url is use for local use only */}
                  {/* http://localhost:5000/ */}
                  <p><a href={`http://65.1.81.134:5000/${urlItem.shortURL}`} target="_blank">{`http://65.1.81.134:5000/${urlItem.shortURL}`}</a></p>
                </div>
              </div>
              <div className='clicks_cont'>
                <section>
                  <h4>Clicks</h4>
                  <p>{urlItem.pastAnalytics.length}</p>
                </section>
                <span
                  style={{ cursor: 'pointer', color: '#da5858' }}
                  onClick={() => navigate('/insights', { state: { urlItem } })}
                >
                  View insights
                  <svg style={{ width: '20px' }} viewBox="0 0 384 184" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 158.333L101.43 81.9033C114.447 68.8867 135.553 68.8867 148.57 81.9033L201.43 134.763C214.447 147.78 235.553 147.78 248.57 134.763L358.333 25M358.333 25V108.333M358.333 25H275" stroke="#4eaf4e" strokeWidth="50" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
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
