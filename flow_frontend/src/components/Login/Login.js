import React from "react";
import { Link } from "react-router-dom";
import { ICON_CROSS } from "../../svg/icons";
import PropTypes from "prop-types";

class Login extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: ''
      }
    };

    handle_change = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState(prevstate => {
        const newState = { ...prevstate };
        newState[name] = value;
        return newState;
      });
    };

    render() {
        return(
            <div id="login-container">
                <form id="login-form" className="col-12 col-sm-6 col-lg-4" onSubmit={e => this.props.handle_login(e, this.state)}>
                    <div className="login-form-card">
                        <h1>Sign in</h1>
                        <h2>Username</h2>
                        <div className="input-container">
                            <span className="filler"></span>
                            <input
                                type="text"
                                name="username"
                                required={true}
                                id="username-field"
                                value={this.state.username}
                                onChange={this.handle_change}
                                autoComplete="current_user"
                            />
                            <span className="filler"></span>
                        </div>
                        <h2>Password</h2>
                        <div className="input-container">
                            <span className="filler"></span>
                            <input
                                type="password"
                                name="password"
                                required={true}
                                id="password-field"
                                value={this.state.password}
                                onChange={this.handle_change}
                                autoComplete="current_password"/>
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
                    <span>Don't have an account?</span><Link to={"/signup"}>Sign up</Link>
                </div>
            </div>
        );
    }

}

export default Login;

Login.propTypes = {
    handle_login: PropTypes.func.isRequired
  };