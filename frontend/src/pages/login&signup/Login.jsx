import React, { useState } from 'react';
import { loginUser } from '../utility/ApiService';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/icon/logo.png';
import google from '../../assets/icon/google.svg';
import github from '../../assets/icon/github.svg';
import linkedin from '../../assets/icon/linkedin.svg';
import loginvector from '../../assets/icon/signup.svg'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [issubmit, setissubmit] = useState(false)
    let navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setissubmit(true);
        try {
            const response = await loginUser({ email: email, password: password });
            console.log("resposnse data ", response)

            // Check if the login was successful
            if (response.status) {
                console.log("hello")
                localStorage.setItem("name", response.name);
                localStorage.setItem("Token", response.token);
                localStorage.setItem("email", response.email);
                console.log(localStorage.getItem("Token"))
                navigate("/");
            } else {
                console.log('Login unsuccessful:', response.message);
                alert("Enter valid credentials",response.message);
            }
            setissubmit(false);

        } catch (error) {
            console.error(error.message);
            alert(error.message);
            setissubmit(false);
        }
    };
    return (
        <form onSubmit={handleLogin} className='loginform' >
            <div className='logsignimg'>
                <img src={loginvector} alt='' />
            </div>
            <div className="formcontainer">
                <div className='formwrp'>
                    <img style={{ width: 120 }} src={logo} alt='' />
                    <h3>Access Your Account</h3>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alex@gmail.com" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
                    </div>
                    <div className='actionbutton'>
                        <button>
                            {issubmit ? (
                                <div className="loading-spinner">

                                </div>

                            ) : (
                                `Log In`
                            )}
                        </button>
                        {/* <button type="submit">Log In</button> */}
                        <Link to='/createuser' className="newuser" >i'm a new user.</Link>
                    </div>
                    <hr />
                    <p>or login with</p>
                    <div className='loginicon'>
                        <img src={google} alt='' />
                        <img src={linkedin} alt='' />
                        <img src={github} alt='' />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Login