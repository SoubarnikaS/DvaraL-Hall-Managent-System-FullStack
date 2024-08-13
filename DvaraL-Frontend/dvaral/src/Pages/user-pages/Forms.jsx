import React, { useState } from 'react';

import SignIn from './SignIn';
import SignUp from './SignUp';

import '../css/Forms.css'

const Forms = () => {


    const [isSignIn, setIsSignIn] = useState(true);


    return (
        <div className='login-container'>
            <div className="container">
                <div className="toggle-button-container">
                    <div className='button-container'>
                        <button className={`toggle-button ${isSignIn ? 'active' : ''}`} onClick={() => setIsSignIn(true)}>
                            Sign In
                        </button>
                        
                        <button className={`toggle-button ${!isSignIn ? 'active' : ''}`}
                            onClick={() => setIsSignIn(false)}>
                            Sign Up
                        </button>
                      
                    </div>
                </div>
                <div className="form-container">
                    {isSignIn ? (
                        <form className="sign-in-form">
                            <SignIn/>
                        </form>
                    ) : (
                        <form className="sign-up-form">
                            <SignUp/>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Forms;
