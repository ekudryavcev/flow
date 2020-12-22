import React from "react";
import ReactDOM from "react-dom";
//import { v4 as uuid } from "uuid";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Board from "./components/Board/Board";
import Login from "./components/Login/Login";

import BinaryHeap from "./BinaryHeap";
import User from "./User"
import { getRandomInt } from "./utilities";

import lorem_ipsum from "./lorem_ipsum";


window.board = {};
window.preferences = {
  theme: "light",
  warnOnDelete: true
};
window.users = {};
window.font_size = parseFloat(window.getComputedStyle(document.body, null).getPropertyValue('font-size'));


//const getUUID = uuid;


var idAvailable = new BinaryHeap(),
    idCurrent = -1;

function getCardID() {
  let id;
  if (idAvailable.isEmpty()) {
    id = idCurrent;
    idCurrent++;
    return (id);
  }
  else {
    return (idAvailable.pop());
  }
}


new User(1, "John Galt", "whoisjgalt@mail.com", "/static/imgs/avatar_ba@2x.png");
new User(2, "Amy House", "amywhoexactly@mail.com", "/static/imgs/avatar_cj@2x.png");
new User(3, "Michael", "mychael@mail.com", "/static/imgs/avatar_cx@2x.png");
new User(4, "Alice Boering", "nonotboring@mail.com", "/static/imgs/avatar_bz@2x.png");


let id,
    project_id,
    board_id,
    board_name,
    tags = {},
    columns_json = {},
    cards_json = {};

if(window.DEV) {
  board_id = 0;
  project_id = "UHC";
  board_name = "UHC Bugs";
  idCurrent = 1;
  tags = {
    0: { "name": "performance", "color": 0 },
    1: { "name": "feature",     "color": 1 },
    2: { "name": "csharp",      "color": 2 },
    3: { "name": "critical",    "color": 3 },
    4: { "name": "python",      "color": 4 },
    5: { "name": "installer",   "color": 5 },
    6: { "name": "xs queries",  "color": 6 },
    7: { "name": "lrm",         "color": 7 },
    8: { "name": "ipsm",        "color": 8 }
  }
  window.board.state = { tags: tags };
  
  columns_json = {
    0: {
      id: 0,
      name: "Reported",
      locked: false,
      cards: []
    },
    1: {
      id: 1,
      name: "Confirmed",
      locked: true,
      cards: []
    },
    2: {
      id: 2,
      name: "In development",
      locked: true,
      cards: []
    },
    3: {
      id: 3,
      name: "Testing",
      locked: true,
      cards: []
    },
    4: {
      id: 4,
      name: "Finished",
      locked: true,
      cards: []
    }
  };
  
  id = getCardID();
  cards_json[id] = {
    id: id,
    name: "Call a function from its name/id in order to allow arrays of functions.",
    description: "Add an option to call functions from its name/id for more flexibility, specifically to make lists of functions. Alternatively make some kind of function object.",
    column: 0,
    tags: [0, 1, 6],
    taskList: [{task: "Call function from ID", done: true}, {task: "Call function by name", done: false}, {task: "Make a function object", done: false}, {task: "Test calling a function", done: false}, {task: "Log function calls", done: false}],
    assignees: [1, 3]
  };
  columns_json[0].cards.push(id);
  for (let i = 0; i < 30; ++i) {
    let random_int = getRandomInt(lorem_ipsum.length - 1);
    let name = lorem_ipsum[random_int];
    let column = getRandomInt(Object.keys(columns_json).length);
    let id = getCardID();
    let tags = [];
    let task_list = [];
    let assignees = [];
    let description = "";
    lorem_ipsum.splice(random_int, 1);
    if (Math.random() > 0.3) {
      random_int = getRandomInt(lorem_ipsum.length - 1);
      if (Math.random() > 0.7)
        description = name + '\n' + lorem_ipsum.splice(random_int, 1);
      else
        description = lorem_ipsum.splice(random_int, 1);
    }
    if (Math.random() < 0.1) {
      for (let j = 0; j < 2 + getRandomInt(7); ++j) {
        random_int = getRandomInt(lorem_ipsum.length - 1);
        let task = {task: lorem_ipsum.splice(random_int, 1)}
        if (Math.random() < 0.2 + column / 6.0)
          task.done = true;
        task_list.push(task);
      }
    }
    for (let j = 0; j < getRandomInt(4) * getRandomInt(3) + getRandomInt(4); ++j) {
      let tag = getRandomInt(8);
      if (tags.indexOf(tag) === -1)
        tags.push(tag);
    }
    for (let j = 0; j < getRandomInt(4); ++j) {
      let assignee = getRandomInt(4) + 1;
      if (assignees.indexOf(assignee) === -1)
        assignees.push(assignee);
    }
    cards_json[id] = {
      id: id,
      name: name,
      description: description,
      column: column,
      tags: tags,
      taskList: task_list,
      assignees: assignees
    };
    columns_json[column].cards.push(id);
  }
  
  console.log(cards_json);
  console.log(columns_json);
} else {
  if(window.location.pathname.match(/board=\d+/) === null || 
     window.location.pathname.match(/board=\d+/).length == 0)
    board_id = -1;
  else
    board_id = parseInt(window.location.pathname.match(/board=\d+/)[0].replace(/[^0-9]/g, ''));

  let column_ids,
      card_ids;
  
  
  fetch(`http://localhost:8000/api/boards/${board_id}/`, {
    headers: {
      Authorization: `JWT ${localStorage.getItem('token')}`
    }
  }).then(res => res.json()).then(result => {
      project_id = result.project_id;
      board_name = result.name;
      column_ids = result.columns;
      card_ids = result.cards;
      console.log(result)

      column_ids.forEach(column_id => {
        fetch(`http://localhost:8000/api/columns/${column_id}/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }
        }).then(res => res.json()).then((result) => {
          let new_column = {
            id: column_id,
            name: result.name,
            description: result.description,
            locked: result.is_private,
            cards: result.cards
          };
          columns_json[column_id] = new_column;
          console.log(result);
        }).catch((error) => { console.log(error); });
      });
  
      card_ids.forEach(card_id => {
        fetch(`http://localhost:8000/api/cards/${card_id}/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }
        }).then(res => res.json()).then((result) => {
          let new_card = {
            id: result.local_id,
            name: result.name,
            description: result.description,
            column: result.column,
            tags: result.tags,
            taskList: result.taskList,
            assignees: result.assignees,
            is_archived: result.is_archived,
            creator: result.creator,
            creation_date: result.creation_date
          };
          cards_json[result.local_id] = new_card;
          console.log(result);
        }).catch((error) => { console.log(error); });
      });
  });

}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: (localStorage.getItem('token') && localStorage.getItem('token') != "undefined") ? true : false,
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
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        })
        .catch(e => {
          console.log(e);
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
          logged_in: true
        });
      })
      .then(() => {{
        fetch('http://localhost:8000/api/current_user/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }
        })
          .then(res => res.json())
          .then(json => {
            this.setState({ username: json.username });
          });
        }
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
              ? this.props.children
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


function render() {
  ReactDOM.render(
    <App>
      <Board id={board_id} project_id={project_id} name={board_name} tags={tags} columns={columns_json} cards={cards_json} idAvailable={idAvailable} idCurrent={idCurrent} />
    </App>,
    document.getElementById("app-container")
  );
}

setTimeout(render, window.DEV? 0 : 1000);


document.getElementsByTagName("body")[0].className = "theme-" + window.preferences.theme;
