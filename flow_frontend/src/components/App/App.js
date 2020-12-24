import React from "react";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import Login from "../Login/Login";
import { ICON_LOGOUT, ICON_MENU, ICON_BOARDS, ICON_SETTINGS } from "../../svg/icons";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: (localStorage.getItem('token') && localStorage.getItem('token') !== "undefined") ? true : false,
      username: ''
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/api/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
      .then(res => {
        return res.json();
      })
      .then(json => {
        console.log(json);
        if(json.detail === "Signature has expired.")
            throw new Error("Signature has expired");
        this.setState({
            logged_in: true,
            username: json.username
        });
      })
      .catch(e => {
        console.log(e);
        this.setState({
            logged_in: false
        });
      });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    console.log("Logging in");
    console.log(data);
    fetch('http://localhost:8000/api/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        localStorage.setItem('token', json.token);
        this.setState({
            logged_in: true,
            username: json.username
        });
      })
      .then(() => {
        fetch('http://localhost:8000/api/current_user/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }
        })
          .then(res => res.json())
          .then(json => {
            this.setState({
                logged_in: true,
                username: json.username,
                firtsname: json.firtsname,
                lastname: json.lastname,
                email: json.email
            });
            window.history.back();
          });
      })
      .catch(e => {
        console.log(e);
      });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          username: json.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/board=:id">
            {this.state.logged_in || window.DEV
              ? <div>
                    {this.props.children}
                    <div id="toolbar">
                        <div id="toolbar-left">
                            <button id="menu-button">
                              {ICON_MENU}
                            </button>
                            <button id="boards-button">
                              {ICON_BOARDS}
                            </button>
                            <button id="settings-button">
                              {ICON_SETTINGS}
                            </button>
                        </div>
                        <div id="toolbar-right">
                            <h3 id="current-username">{this.state.username}</h3>
                            <button id="logout-button" onClick={() => {this.handle_logout();}}>
                                <Link to="/login">{ICON_LOGOUT}</Link>
                            </button>
                        </div>
                    </div>
                </div>
              : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            <Login handle_login={this.handle_login} />
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;