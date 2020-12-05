import React from "react";
import { ICON_CROSS } from "../../svg/icons";

export default class Login extends React.Component {

    constructor(props) {
      super(props);
    };

    render() {
        return(
            <div id="login-container">
                <form id="login-form" className="col-12 col-sm-6 col-lg-4">
                    <div className="login-form-card">
                        <h1>Sign in</h1>
                        <h2>Username</h2>
                        <div className="input-container">
                            <span className="filler"></span>
                            <input type="email" name="username" data-required="true" id="username-field"/>
                            <span className="filler"></span>
                        </div>
                        <h2>Password</h2>
                        <div className="input-container">
                            <span className="filler"></span>
                            <input type="password" name="password" data-required="true" id="password-field"/>
                            <span className="filler"></span>
                        </div>
                        <div className="actions">
                            <button id="forgot-password-button" onClick={ () => {console.log("Forgot password")} }>Forgot password</button>
                            <button type="submit" onClick={ () => {console.log("Log in")} }>Log in</button>
                        </div>
                    </div>
                    <div className="login-right-buttons">
                        <button>
                            {ICON_CROSS}
                        </button>
                    </div>
                </form>
                <div id="no-account-footer">
                    <span>Don't have an account?</span><a>Sign up</a>
                </div>
            </div>
        );
    }

}