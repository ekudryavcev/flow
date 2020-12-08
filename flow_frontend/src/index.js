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
  theme: "dark",
  warnOnDelete: true
};
window.users = {};
window.font_size = parseFloat(window.getComputedStyle(document.body, null).getPropertyValue('font-size'));


//const getUUID = uuid;


var idAvailable = new BinaryHeap(),
    idCurrent = 1;

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


let tags = {
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

let columns_json = [
  {
    id: 0,
    name: "Reported",
    locked: false,
    cards: []
  },
  {
    id: 1,
    name: "Confirmed",
    locked: true,
    cards: []
  },
  {
    id: 2,
    name: "In development",
    locked: true,
    cards: []
  },
  {
    id: 3,
    name: "Testing",
    locked: true,
    cards: []
  },
  {
    id: 4,
    name: "Finished",
    locked: true,
    cards: []
  }
];

let id = getCardID();
let cards_json = {};
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
  let column = getRandomInt(columns_json.length);
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
  

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/board">
        <Board id={0} project_id={'UHC'} name={"UHC Bugs"} tags={tags} columns={columns_json} cards={cards_json} idAvailable={idAvailable} idCurrent={idCurrent} />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById("app-container")
);

document.getElementsByTagName("body")[0].className = "theme-" + window.preferences.theme;
