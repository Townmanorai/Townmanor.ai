// import React from 'react';
// import LoginForm from './LoginForm';
// import SignUpForm from './SignUpForm';

// const AuthContainer = (props) => {
//     return (
//         <div className="row">
//             <div className="col-md-6 offset-md-3">
//                 <div className="ci sw_widget sw_wrap">
//                     <ul className="nav nav-tabs d-none sw-sign-form-tabs" role="tablist">
//                         <li className="nav-item">
//                             <a className="nav-link log-in" href="#log-in-form" role="tab" data-toggle="tab">
//                                 {props.langCheck('Log in')}
//                             </a>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link sign-up" href="#sign-up-form" role="tab" data-toggle="tab">
//                                 {props.langCheck('Sign Up')}
//                             </a>
//                         </li>
//                     </ul>
//                     <div className="forms-_row_area">
//                         <div className="tab-content">
//                             <LoginForm {...props} />
//                             <SignUpForm {...props} />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AuthContainer;


import React, { useState } from 'react';
import Login from './LoginForm';
import Signup from './SignUpForm';
import dummyUserData from './dummyUserData.json';

import '../common.css';
import '../commonsecond.css';

const AuthContainer = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [activeTab, setActiveTab] = useState('sign-up-form');

    console.log(dummyUserData);
    const handleLogin = (username, password) => {
        const user = dummyUserData.users.find(user => user.username === username && user.password === password);
        if (user) {
            setCurrentUser(user);
            alert("Login successful");
        } else {
            alert("Invalid credentials");
        }
    };

    const handleSignup = (newUser) => {
        dummyUserData.users.push(newUser);
        setCurrentUser(newUser);
        alert("Signup successful");
    };

    return (
        <div class="wrapper ConTentFlex Body_back_Img">
            <div class="container">
                <div class="selio_sw_win_wrapper LoginRegister_page">
                    <div class="Topar_logo_head text-center">
                        <a href="{homepage_url_lang}" class="navbar-brand">
                            <img width="250" src="./footer-logo.png" alt="TownManor"></img>
                        </a>
                    </div>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div className="ci sw_widget sw_wrap">
                            <h1>hello</h1>
                                <ul className="nav nav-tabs d-none sw-sign-form-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            className={`nav-link log-in ${activeTab === 'log-in-form' ? 'active' : ''}`}
                                            href="#log-in-form"
                                            role="tab"
                                            onClick={() => setActiveTab('log-in-form')}
                                        >
                                            Log in
                                        </a>
                                    </li>
                                    <h1>world</h1>
                                    <li className="nav-item">
                                        <a
                                            className={`nav-link sign-up ${activeTab === 'sign-up-form' ? 'active' : ''}`}
                                            href="#sign-up-form"
                                            role="tab"
                                            onClick={() => setActiveTab('sign-up-form')}
                                        >
                                            Sign Up
                                        </a>
                                    </li>
                                    <h1>Ravi</h1>
                                </ul>
                                <div className="forms-_row_area">
                                    <div className="tab-content">
                                        {activeTab === 'log-in-form' && <Login onLogin={handleLogin} />}
                                        {activeTab === 'sign-up-form' && <Signup onSignup={handleSignup} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthContainer;
