// Login.js
import React, { useState } from 'react';
import { loginUser } from '../services/apiservice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password });
      console.log(response); // Handle successful login
    } catch (error) {
      console.error(error.message); // Handle login error
    }
  };

  return (
    <div>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

// Register.js
import React, { useState } from 'react';
import { registerUser } from '../services/apiservice';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await registerUser({ email, password });
      console.log(response); // Handle successful registration
    } catch (error) {
      console.error(error.message); // Handle registration error
    }
  };

  return (
    <div>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;

// ShortenURL.js
import React, { useState } from 'react';
import { shortenUrl } from '../services/apiservice';

const ShortenURL = () => {
  const [originalURL, setOriginalURL] = useState('');

  const handleShortenURL = async () => {
    try {
      const response = await shortenUrl({ originalURL });
      console.log(response); // Handle successful URL shortening
    } catch (error) {
      console.error(error.message); // Handle URL shortening error
    }
  };

  return (
    <div>
      <input type="text" placeholder="Enter URL" value={originalURL} onChange={(e) => setOriginalURL(e.target.value)} />
      <button onClick={handleShortenURL}>Shorten URL</button>
    </div>
  );
};

export default ShortenURL;

// UserDashboard.js
import React, { useEffect, useState } from 'react';
import { getUserDashboard } from '../services/apiservice';

const UserDashboard = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserDashboard = async () => {
      try {
        const response = await getUserDashboard();
        setUserData(response.data); // Assuming the response is an array of user data
      } catch (error) {
        console.error(error.message); // Handle fetch error
      }
    };

    fetchUserDashboard();
  }, []);

  return (
    <div>
      {userData.map((data) => (
        <div key={data.id}>
          {/* Display user data */}
        </div>
      ))}
    </div>
  );
};

export default UserDashboard;

// DeleteURLData.js
import React, { useState } from 'react';
import { deleteUrlData } from '../services/apiservice';

const DeleteURLData = () => {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');

  const handleDeleteURLData = async () => {
    try {
      const response = await deleteUrlData({ email, id });
      console.log(response); // Handle successful URL data deletion
    } catch (error) {
      console.error(error.message); // Handle URL data deletion error
    }
  };

  return (
    <div>
      <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="Enter URL ID" value={id} onChange={(e) => setId(e.target.value)} />
      <button onClick={handleDeleteURLData}>Delete URL Data</button>
    </div>
  );
};

export default DeleteURLData;
