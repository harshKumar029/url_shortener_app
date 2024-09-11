import React, { useState } from 'react';
import { registerUser } from '../utility/ApiService';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/icon/logo.png';
import google from '../../assets/icon/google.svg';
import github from '../../assets/icon/github.svg';
import linkedin from '../../assets/icon/linkedin.svg';
import signupvector from '../../assets/icon/signup.svg'

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [issubmit, setissubmit] = useState(false)

    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setissubmit(true);
        try {
            const response = await registerUser({ name: name, email: email, password: password });
            console.log(response);

            if (response.status) {
                console.log('Signup successful');
                navigate("/login")
            } else {
                console.log('Signup unsuccessful:', response.message);
                alert("Enter valid credentials")
            }
            setissubmit(false);

        } catch (error) {
            console.error(error.message);
            setissubmit(false);
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit} className='signup' >
                <div className='logsignimg'>
                    <img src={signupvector} alt='' />
                </div>
                <div className="formcontainer">
                    <div className='formwrp'>
                        <img style={{ width: 120 }} src={logo} alt='' />
                        <h3>Create your Account</h3>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="name" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="alex" required />
                        </div>
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
                                `Sign Up`
                            )}
                            </button>
                            {/* <button type="submit">Sign Up</button> */}
                            <Link to='/login' className="newuser" >Already a user</Link>
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
        </>
    )
}

export default Signup