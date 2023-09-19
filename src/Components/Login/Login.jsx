import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import app from '../../Firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Login = () => {
    const [success, setSuccess] = useState(false);

    const handleOnSubmit = (event)=>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const user = result.user;
            console.log(user);
            setSuccess(true);
            form.reset();
        })
        .catch(error => console.log(error))
    }

    return (
        <div className='w-25 mx-auto my-5'>
            <form onSubmit={handleOnSubmit} className='p-4 shadow-lg rounded-3'>
            <h4>Please Login</h4>
                <div className="mb-3">
                    <label className="form-label">Eamil</label>
                    <input type="email" name="email" className="form-control" placeholder="Email Please" required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Password Please" required/>
                </div>
                <p>New User in Website <Link to='/register'>Please Register Your Account</Link></p>

                <button type="submit" className="btn btn-primary">Login</button>
                {
                    success && <p className='text-success mt-2'>Login Successfully</p>
                }
            </form>
        </div>
    );
};

export default Login;