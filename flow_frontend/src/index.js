import React from "react";
import ReactDOM from "react-dom";
//import { v4 as uuid } from "uuid";
import User from "./User"
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Board from "./components/Board/Board";
import Login from "./components/Login/Login";
import BinaryHeap from "./BinaryHeap";


window.board = {};
window.preferences = {
  theme: "dark",
  warnOnDelete: true
};
window.users = {};
window.font_size = parseFloat(window.getComputedStyle(document.body, null).getPropertyValue('font-size'));


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

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


new User(1, "John Galt", "whoisjgalt@mail.com", "../static/imgs/avatar_ba@2x.png");
new User(2, "Amy House", "amywhoexactly@mail.com", "../static/imgs/avatar_cj@2x.png");
new User(3, "Michael", "mychael@mail.com", "../static/imgs/avatar_cx@2x.png");
new User(4, "Alice Boering", "nonotboring@mail.com", "../static/imgs/avatar_bz@2x.png");


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
let texts = 
  ["Vivamus vel risus sed metus ultricies sollicitudin sed in lectus.", "Donec vitae augue vel ligula iaculis pharetra eu eu nunc.", "Curabitur accumsan sem eget tortor mollis, consequat aliquet justo faucibus.", "Cras nec diam euismod, fermentum lectus ut, suscipit tortor.", "Maecenas a metus vitae urna dictum eleifend.", "Curabitur elementum leo ut mattis tristique.", "Morbi auctor tellus et dapibus pretium.", "Vestibulum sagittis lacus sed feugiat commodo.", "Cras pharetra libero at metus feugiat placerat.", "Nullam vitae tellus semper sem dignissim pharetra.", "Mauris ac velit at nibh tempor volutpat vitae et nunc.", "Ut vitae mauris non nulla vehicula pretium.", "Nullam ut dolor sollicitudin sapien dignissim ultricies.", "Sed scelerisque tellus ut pulvinar iaculis.", "Vivamus commodo risus vel ipsum pulvinar, quis dictum tortor elementum.", "Quisque ac quam placerat, ultricies ipsum non, posuere dui.", "Cras ut quam nec enim finibus pretium.", "Morbi pulvinar eros et tortor pharetra molestie.", "Curabitur rutrum libero ac enim pellentesque blandit.", "Quisque varius nisl eget lectus feugiat rhoncus.", "Fusce dapibus nulla nec odio ornare porttitor.", "Phasellus eget nibh at libero mattis condimentum ut quis mauris.", "Donec cursus dui et massa dapibus consectetur.", "Morbi vel lorem porta, venenatis sem vehicula, tempor metus.", "Integer quis mi vel nisi posuere imperdiet.", "Curabitur rutrum odio id urna molestie, nec commodo metus blandit.", "Phasellus gravida massa quis sem posuere, id luctus ipsum venenatis.", "Morbi sed arcu imperdiet, feugiat velit ac, cursus mi.", "Donec id magna sit amet urna tempor sodales.", "Nullam tempor mi a ex sagittis volutpat.", "Integer nec diam ultrices orci vestibulum ullamcorper id in erat.", "Donec molestie lacus a scelerisque fringilla.", "Maecenas eu est aliquam justo aliquet tempor.", "Quisque dictum metus tempor, commodo quam in, molestie risus.", "Phasellus condimentum eros vitae eros ultricies tristique.", "Donec sed purus sit amet mauris eleifend consequat.", "Phasellus tempor libero sed ornare consequat.", "Phasellus ultricies augue ut enim sodales, sed dapibus lorem tempus.", "Curabitur eu nibh congue, tincidunt odio in, dictum elit.", "Donec tempus velit a pretium sagittis.", "Nullam ut mauris vehicula, facilisis sapien eu, finibus lectus.", "Vestibulum quis tellus eu orci posuere eleifend sit amet non lectus.", "Donec egestas augue in orci condimentum porta.", "Donec et lacus ac sapien accumsan rhoncus.", "Sed dictum nisi a tempus hendrerit.", "Donec porttitor ante quis lacus pretium congue.", "Nulla nec risus vel velit lobortis dapibus.", "Pellentesque quis felis vitae eros molestie rutrum.", "Etiam molestie dolor placerat, semper dolor non, volutpat erat.", "Sed ac nisl ullamcorper quam maximus blandit.", "Nullam sed nisl malesuada, lacinia lacus sed, porttitor eros.", "Aliquam porttitor lacus vel ornare pellentesque.", "Curabitur vitae nunc ullamcorper, ultricies dolor at, rutrum odio.", "Morbi a lacus a nibh gravida hendrerit.", "Curabitur dapibus ligula molestie ante tristique, in tincidunt purus porttitor.", "Fusce sed mi vel nunc mollis scelerisque quis ac massa.", "Suspendisse rhoncus sem non fringilla finibus.", "Praesent sagittis odio eget fringilla ornare.", "Morbi hendrerit nisl varius, egestas nulla eu, gravida urna.", "Vestibulum eget odio ac enim rutrum sollicitudin in eget turpis.", "Aliquam facilisis neque venenatis dui pulvinar feugiat.", "Proin iaculis metus non urna hendrerit vestibulum.", "Donec eu nisi vel risus aliquam maximus.", "Morbi convallis lorem id nibh tincidunt, vitae ultrices tortor malesuada.", "Vestibulum sollicitudin nunc vel tincidunt consectetur.", "Pellentesque vestibulum augue non cursus mattis.", "Nunc vestibulum arcu aliquet, eleifend nisi ac, condimentum nisl.", "Phasellus pulvinar tortor hendrerit pellentesque faucibus.", "Integer feugiat erat id libero dictum tincidunt.", "Nulla pharetra turpis a mollis cursus.", "Duis et justo efficitur, malesuada turpis eu, tempus nulla.", "Aliquam lobortis risus eu velit sagittis maximus.", "Vestibulum nec est pharetra, rhoncus turpis eget, pretium tellus.", "Morbi iaculis mi a ligula pharetra, nec venenatis augue porttitor.", "Duis et sem eu dolor suscipit sollicitudin eget at massa.", "Donec tempus urna nec mauris tristique, in sollicitudin lacus egestas.", "Praesent fermentum odio et nisl auctor laoreet.", "Cras mattis diam venenatis, elementum risus non, porta nisl.", "Fusce molestie turpis eget ultricies dictum.", "Aliquam efficitur libero vel luctus elementum.", "Quisque non arcu nec justo vestibulum laoreet a sed nunc.", "Sed laoreet mi in nisl cursus fringilla.", "Duis finibus lectus non condimentum pretium.", "Nunc a arcu hendrerit, vestibulum leo quis, condimentum nisi.", "Phasellus vitae risus auctor, maximus purus in, blandit ligula.", "Curabitur pretium est vel mauris pharetra maximus.", "Morbi nec lectus nec felis vestibulum hendrerit at id orci.", "Quisque id orci sit amet est convallis egestas.", "Praesent laoreet odio tincidunt urna condimentum tincidunt.", "Fusce tristique erat vitae tortor malesuada, ac aliquam turpis euismod.", "Ut vel quam auctor, convallis leo non, finibus est.", "Praesent vitae justo at diam iaculis venenatis.", "Donec fermentum tortor id mauris fringilla, faucibus tristique metus placerat.", "Proin sit amet tortor vitae purus bibendum mattis eu eget est.", "Sed mollis leo sit amet ex vestibulum, nec faucibus felis mattis.", "Vivamus lobortis odio at ipsum scelerisque, ac tristique sem molestie.", "Donec ornare magna vel lacus lacinia, nec mattis nisi elementum.", "Pellentesque faucibus mauris sed justo ultrices, at convallis odio efficitur.", "Sed id erat non nulla ullamcorper aliquet.", "Integer nec sem eu velit ullamcorper sollicitudin sed quis nunc.", "Vivamus et metus iaculis, fringilla nunc vel, dapibus turpis.", "Donec euismod nibh eu nisi efficitur, eget tempus elit eleifend.", "Mauris pharetra diam at orci euismod, vel elementum felis molestie.", "Donec viverra tortor quis arcu lacinia, et sodales erat viverra.", "Phasellus efficitur sem nec ullamcorper semper.", "Maecenas vel urna quis risus facilisis tincidunt.", "Proin eu mi ut ante tristique lacinia et ac elit.", "Mauris euismod magna ut efficitur maximus.", "Maecenas consectetur elit vitae nulla dignissim, eget posuere sem convallis.", "Curabitur tincidunt est vitae velit egestas, ac placerat dui consequat.", "Pellentesque consequat arcu dignissim arcu interdum gravida at vitae eros.", "Maecenas quis orci consectetur, tincidunt dui ac, euismod libero.", "Sed consectetur magna sed turpis pharetra, ac cursus tortor egestas.", "Nam in mauris nec arcu vulputate ornare.", "Morbi a leo eleifend, bibendum ipsum vitae, faucibus eros.", "Vivamus eget justo sit amet urna dictum euismod.", "Mauris sagittis orci et rhoncus dictum.", "Cras a ex eleifend, sollicitudin libero quis, pretium dolor.", "Nullam tristique orci id varius vestibulum.", "Donec non quam eu eros lobortis aliquam.", "Ut ultrices lacus vel imperdiet semper.", "Quisque a diam id turpis faucibus interdum.", "Morbi luctus lectus sed scelerisque volutpat.", "Nunc a lectus sed dolor molestie blandit.", "Vestibulum dignissim arcu quis tempor dapibus.", "In convallis quam ac lorem elementum, vitae molestie nibh mattis.", "Fusce laoreet tortor eu augue interdum laoreet.", "Pellentesque non mi id sem tempus mattis eu eu purus.", "Vestibulum ornare erat sed vehicula lacinia.", "In pulvinar ligula rutrum, sollicitudin lorem ultrices, varius dui.", "Curabitur sit amet sem a elit sodales dignissim.", "Vivamus bibendum leo ac vehicula pharetra.", "Cras a arcu id nisl sagittis varius.", "Maecenas faucibus tortor nec lacinia laoreet.", "Donec sit amet nulla vel enim malesuada aliquam.", "Phasellus in nibh tincidunt, gravida erat eget, sollicitudin purus.", "Suspendisse eu est sed leo iaculis accumsan.", "Nam mollis urna vitae tempus porttitor.", "Donec eu mauris at lacus dictum dictum sit amet quis lectus.", "Cras a orci sit amet massa gravida pharetra eu tempus arcu.", "Curabitur quis nisl ac leo pharetra pulvinar et id enim.", "Suspendisse tempus purus nec vestibulum feugiat.", "Sed ullamcorper tortor placerat tellus ullamcorper ultrices.", "Quisque eget massa efficitur, ullamcorper augue sed, cursus mi.", "Suspendisse nec quam in tellus rutrum tincidunt at sit amet urna.", "Vivamus faucibus augue sit amet cursus efficitur.", "Maecenas auctor eros vel molestie malesuada.", "Maecenas at mauris consequat, molestie nulla sed, tempor elit.", "Etiam ut quam id lorem finibus ullamcorper.", "In pretium nisi eget tellus varius elementum.", "Morbi tempus leo vel pretium hendrerit.", "Donec vitae nibh a leo facilisis aliquam id in risus.", "Vestibulum interdum ipsum sed rutrum facilisis.", "Duis lacinia mi in cursus sagittis.", "Vivamus vitae urna ullamcorper, gravida eros et, suscipit arcu.", "Fusce efficitur elit eget erat auctor vehicula.", "Fusce blandit ipsum in arcu lacinia, venenatis volutpat dolor porttitor.", "Sed aliquam eros sit amet dolor laoreet tempus.", "Proin sagittis quam non leo convallis, vitae aliquet massa commodo.", "Praesent vulputate risus eget metus accumsan efficitur.", "Cras luctus dolor non tincidunt congue.", "Nam vulputate est et tortor finibus, ut imperdiet arcu viverra.", "Integer in erat malesuada, dapibus ante sed, convallis nibh.", "Pellentesque in est ut tellus ultricies imperdiet in viverra sapien.", "Pellentesque lobortis elit sed sapien auctor, eu hendrerit nunc feugiat.", "Suspendisse at nisl vulputate, gravida nisi in, vehicula odio.", "Quisque dictum justo rutrum felis imperdiet mollis.", "Sed vestibulum ligula vitae ipsum imperdiet, sit amet sollicitudin justo convallis.", "Duis quis quam mollis, eleifend odio in, pretium velit.", "In ultricies ante vitae urna porta vehicula.", "Fusce rutrum neque in metus vulputate varius.", "Morbi vel purus a nisl venenatis blandit.", "Aliquam luctus tellus nec malesuada laoreet.", "Sed ut libero vitae risus viverra iaculis non non quam.", "Vivamus faucibus dui eu est placerat lacinia a in nisi.", "Quisque ornare nunc in leo vulputate, eget facilisis ligula aliquet.", "Nunc semper tellus pellentesque, suscipit metus vel, convallis lorem.", "In lacinia est eget imperdiet dapibus.", "Donec sagittis lacus vel ligula consequat, nec finibus velit aliquam.", "Nulla suscipit est eu ultricies ullamcorper.", "Pellentesque bibendum enim at diam egestas aliquam.", "Sed ac mauris nec mauris commodo varius.", "Aliquam ornare ipsum pellentesque neque ultricies euismod.", "Fusce dapibus tellus vel justo gravida fringilla.", "In ac lorem sed sapien faucibus pulvinar.", "Vestibulum facilisis ante feugiat neque pharetra porttitor."];



for (let i = 0; i < 30; ++i) {
  let random_int = getRandomInt(texts.length - 1);
  let name = texts[random_int];
  let column = getRandomInt(columns_json.length);
  let id = getCardID();
  let tags = [];
  let task_list = [];
  let assignees = [];
  let description = "";
  texts.splice(random_int, 1);
  if (Math.random() > 0.3) {
    random_int = getRandomInt(texts.length - 1);
    if (Math.random() > 0.7)
      description = name + '\n' + texts.splice(random_int, 1);
    else
      description = texts.splice(random_int, 1);
  }
  if (Math.random() < 0.1) {
    for (let j = 0; j < 2 + getRandomInt(7); ++j) {
      random_int = getRandomInt(texts.length - 1);
      let task = {task: texts.splice(random_int, 1)}
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
        <Board id={0} project_id={'UHC'} name={"UHC Bugs"} tags={tags} columns={columns_json} cards={cards_json} idAvailable={idAvailable} idCurrent={idCurrent} />;
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementsByTagName('body')[0]
);

document.getElementsByTagName("body")[0].className = "theme-" + window.preferences.theme;
