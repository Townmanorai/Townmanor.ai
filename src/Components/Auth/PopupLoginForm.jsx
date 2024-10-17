import React, { useState } from 'react';
import "../../common.css";
import "../../commonsecond.css";

const PopupLoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call the onLogin function with the form data
        onLogin(username, password);
    };

    return (
        <div className="popup active" id="sign-popup">
            <h3>Sign In to your Account</h3>
            <div className="popup-form form-wr">
                <form id="popup_form_login" onSubmit={handleSubmit}>
                    <div className="alerts-box"></div>
                    <div className="form-field">
                        <input
                            type="text"
                            name="username"
                            value={username}
                            className="form-control"
                            id="inputUsername"
                            placeholder="Username *"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-field">
                        <input
                            type="password"
                            name="password"
                            value={password}
                            className="form-control"
                            id="inputPassword"
                            placeholder="Password *"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-cp">
                        <div className="form-field">
                            <div className="input-field">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    id="remember"
                                    value="true"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                />
                                <label htmlFor="remember">
                                    <span></span>
                                    <small>Remember me</small>
                                </label>
                            </div>
                        </div>
                        <a
                            href="https://townmanor.in/admin/user/forgetpassword"
                            className="forgot-password"
                            title="Forgot Password?"
                        >
                            Forgot Password?
                        </a>
                    </div>
                    <button type="submit" className="btn2">
                        Sign In
                        <i className="fa fa-spinner fa-spin fa-ajax-indicator hidden ajax-indicator"></i>
                    </button>
                </form>
                <a
                    href="https://townmanor.in/frontend/login/en#sw_register"
                    className="link-bottom"
                >
                    Create new account
                </a>
            </div>
        </div>
    );
};

export default PopupLoginForm;
