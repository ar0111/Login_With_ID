import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import app from '../../Firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Register = () => {
    const [success, setSuccess] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const handleOnSubmit = (event)=>{
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(name, email, password);

        // password validation
        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setPasswordError('Please Provide at Least Two Uppercase Letter');
            return;
        }

        if(password.length < 6){
            setPasswordError("Please Provide More Thab 6 Charecters");
            return;
        }

        if(!/(?=.*[!@#$*])/.test(password)){
            setPasswordError("Please Provide any of !@#$* This Special Charecters");
            return;
        }

        setPasswordError('');

        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const user = result.user;
            console.log(user);
            setSuccess(true);
            verifyEmail();
            form.reset();
            // alert("Registration Successfully Done");
        })
        .catch(error=> console.log(error))
    }

    const verifyEmail = ()=>{
        sendEmailVerification(auth.currentUser)
        .then(()=>{
            alert("Please Check Your Email and Verify The Email Address")
        })
    }

    return (
        <div className='w-25 mx-auto my-5'>
            <form onSubmit={handleOnSubmit} className='p-4 shadow-lg rounded-3'>
            <h4>Please Register Here</h4>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" name='name' className="form-control" placeholder="Name Please" required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Eamil</label>
                    <input type="email" name="email" className="form-control" placeholder="Email Please" required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Password Please" required/>
                </div>
                <p>Already Have an Account? <Link to='/login'>Please Login</Link></p>
                <button type="submit" className="btn btn-primary">Register</button>
                {
                    success && <p className='text-success mt-2'>Registration Successfully Completed</p>
                }
                <p className='text-danger mt-2'>{passwordError}</p>
            </form>
        </div>
    );
};

export default Register;