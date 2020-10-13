import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


window.id_list = [];
window.users = {};
window.columns = {};
window.id_current = 1;
window.theme = "dark";

const ICON_DESCRIPTION = <svg viewBox="0 0 64 64" strokeWidth="6" stroke="currentColor" fill="none"><line x1="0" y1="8" x2="64" y2="8"/><line x1="0" y1="32" x2="64" y2="32"/><line x1="0" y1="56" x2="48" y2="56"/></svg>;
const ICON_PLUS = <svg viewBox="0 0 64 64" strokeWidth="6" stroke="currentColor" fill="none"><line x1="32" y1="7" x2="32" y2="57"/><line x1="7" y1="32" x2="57" y2="32"/></svg>;
const ICON_UNLOCKED = <svg viewBox="0 0 64 64" strokeWidth="6" stroke="currentColor" fill="none"><circle cx="32" cy="32" r="24.86" /><path d="M32,6.84A34.09,34.09,0,0,1,43.66,32.31c0,16.19-7.28,21-11.66,24.24" /><path d="M32,6.84A34.09,34.09,0,0,0,20.31,32.31c0,16.19,7.28,21,11.66,24.24" /><line x1="10.37" y1="19.75" x2="53.75" y2="19.75" /><line x1="32" y1="6.84" x2="32" y2="56.55" /><line x1="11.05" y1="45.33" x2="52.98" y2="45.33" /><line x1="7.14" y1="32.31" x2="56.86" y2="31.69" /></svg>;
const ICON_OPTIONS = <svg style={{width: '0.15rem'}} viewBox="28 0 8 64" strokeWidth="6" stroke="currentColor" fill="none"><line x1="28" y1="8" x2="36" y2="8"/><line x1="28" y1="32" x2="36" y2="32"/><line x1="28" y1="56" x2="36" y2="56"/></svg>;
const ICON_DROPDOWN_ARROW = <svg strokeWidth="8" viewBox="0 0 13.409 8.091"><g transform="translate(0.688 0.726)"><path d="M6.53,18.86l6.279,5.956L18.53,18.86" transform="translate(-6.53 -18.86)" fill="none" stroke="currentColor" strokeWidth="2"/></g></svg>;
const ICON_ATTACH = <svg strokeWidth="6" viewBox="0 0 15.717 17.443"><g transform="translate(0.973 0.905)"><path d="M25.171,17.179l-6.447,6.44a4.474,4.474,0,0,1-6.074-.163C10.9,21.7,10.605,19.2,12.306,17.444c1.813-1.875,5.526-5.526,7.506-7.506a2.953,2.953,0,0,1,4.413.025,2.928,2.928,0,0,1,0,4.286L17.2,21.3a1.672,1.672,0,0,1-2.5-.022,1.722,1.722,0,0,1,.131-2.415l6.527-6.487" transform="translate(-11.171 -8.958)" fill="none" stroke="currentColor" strokeWidth="1.5"/></g></svg>;
const ICON_CHECK = <svg strokeWidth="6" viewBox="0 0 17.75 17.75"><g transform="translate(0.875 0.875)"><circle cx="8" cy="8" r="8" fill="none" stroke="currentColor" strokeWidth="1.75"/><path d="M15.79,24.834l3.488,2.637,6.163-8.651" transform="translate(-12.916 -14.988)" fill="none" stroke="currentColor" strokeWidth="1.75"/></g></svg>;
const ICON_CALENDAR = <svg strokeWidth="6" viewBox="0 0 16 17.785"><g transform="translate(0 1.785)" fill="none" stroke="currentColor" strokeWidth="1.75"><rect width="16" height="16" rx="1.75" stroke="none"/><rect x="0.875" y="0.875" width="14.25" height="14.25" rx="0.875" fill="none"/></g><line x2="16" transform="translate(0 5.712)" fill="none" stroke="currentColor" strokeWidth="1.75"/><line y1="2.427" transform="translate(3.609)" fill="none" stroke="currentColor" strokeWidth="1.75"/><line y1="2.427" transform="translate(12.162)" fill="none" stroke="currentColor" strokeWidth="1.75"/><g transform="translate(3.188 8.328)" fill="none" stroke="currentColor" strokeWidth="1.75"><rect width="2.195" height="2.195" stroke="none"/><rect x="0.875" y="0.875" width="0.445" height="0.445" fill="none"/></g><g transform="translate(6.853 8.328)" fill="none" stroke="currentColor" strokeWidth="1.75"><rect width="2.195" height="2.195" stroke="none"/><rect x="0.875" y="0.875" width="0.445" height="0.445" fill="none"/></g><g transform="translate(10.472 8.328)" fill="none" stroke="currentColor" strokeWidth="1.75"><rect width="2.195" height="2.195" stroke="none"/><rect x="0.875" y="0.875" width="0.445" height="0.445" fill="none"/></g><g transform="translate(3.252 12.527)" fill="none" stroke="currentColor" strokeWidth="1.75"><rect width="2.195" height="2.195" stroke="none"/><rect x="0.875" y="0.875" width="0.445" height="0.445" fill="none"/></g><g transform="translate(6.92 12.527)" fill="none" stroke="currentColor" strokeWidth="1.75"><rect width="2.195" height="2.195" stroke="none"/><rect x="0.875" y="0.875" width="0.445" height="0.445" fill="none"/></g><g transform="translate(10.538 12.527)" fill="none" stroke="currentColor" strokeWidth="1.75"><rect width="2.195" height="2.195" stroke="none"/><rect x="0.875" y="0.875" width="0.445" height="0.445" fill="none"/></g></svg>;
const ICON_ASSIGNEES = <svg strokeWidth="6" viewBox="0 0 19.5 14.363"><g transform="translate(0.75 0.75)"><circle cx="2.77" cy="2.77" r="2.77" transform="translate(2.851)" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5"/><path d="M18.8,40.345A5.605,5.605,0,0,0,13.2,34.74h0A5.605,5.605,0,0,0,7.59,40.345Z" transform="translate(-7.59 -27.482)" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5"/><circle cx="2.231" cy="2.231" r="2.231" transform="translate(11.244 2.253)" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5"/><path d="M38.38,42.214h6.645A4.514,4.514,0,0,0,40.5,37.7h0a5.375,5.375,0,0,0-2.307.623" transform="translate(-27.025 -29.351)" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5"/></g></svg>;
const ICON_SCHEDULLE = <svg strokeWidth="6" viewBox="0 0 17.5 18.105"><g transform="translate(0.75 0.75)"><path d="M15.8,23.609H7.127a.78.78,0,0,1-.777-.764V10.407a.777.777,0,0,1,.777-.777H19.552a.777.777,0,0,1,.777.777v6.986" transform="translate(-6.35 -8.071)" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"/><line x2="13.979" transform="translate(0 4.99)" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"/><line y1="1.559" transform="translate(3.153)" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"/><line y1="1.559" transform="translate(10.626)" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"/><circle cx="3.877" cy="3.877" r="3.877" transform="translate(8.246 8.851)" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"/><path d="M45.22,36.7v2.844l1.357,1.042" transform="translate(-33.097 -26.698)" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"/></g></svg>;
const ICON_TAG = <svg strokeWidth="6" viewBox="0 0 19.5 19.345"><g transform="translate(1.75 1.75)"><g transform="translate(-7.42 -7.85)" fill="none" strokeLinecap="square"><path d="M7.42,14.558V8.165a.315.315,0,0,1,.315-.315h7.122a.331.331,0,0,1,.224.091l8.244,8.247a.315.315,0,0,1,0,.451L15.973,23.6a.315.315,0,0,1-.451,0L7.5,14.773A.337.337,0,0,1,7.42,14.558Z" stroke="none"/><path d="M 7.735389709472656 7.850000381469727 C 7.561208724975586 7.850000381469727 7.420000076293945 7.991209030151367 7.420000076293945 8.165390014648438 L 7.420000076293945 14.55834007263184 C 7.421428680419922 14.63722038269043 7.450439453125 14.71310043334961 7.501998901367188 14.7728099822998 L 15.52236938476563 23.60055923461914 C 15.58169937133789 23.6612491607666 15.66299915313721 23.69545936584473 15.74786949157715 23.69545936584473 C 15.83273887634277 23.69545936584473 15.91402912139893 23.6612491607666 15.97336959838867 23.60055923461914 L 23.32510948181152 16.6399097442627 C 23.38578796386719 16.58057975769043 23.41999816894531 16.4992790222168 23.41999816894531 16.41440963745117 C 23.41999816894531 16.32952880859375 23.38578796386719 16.24823951721191 23.32510948181152 16.18890953063965 L 15.08081912994385 7.941459655761719 C 15.02037906646729 7.883829116821289 14.94039916992188 7.851160049438477 14.85688877105713 7.850000381469727 L 7.735389709472656 7.850000381469727 M 7.735389709472656 6.100000381469727 L 14.85688877105713 6.100000381469727 L 14.86903953552246 6.100000381469727 L 14.88119888305664 6.100170135498047 C 15.407639503479 6.107479095458984 15.90741920471191 6.311599731445313 16.28845977783203 6.674930572509766 L 16.30365943908691 6.689420700073242 L 16.31848907470703 6.704259872436523 L 24.55835151672363 14.94728088378906 C 24.94723701477051 15.33273124694824 25.16999816894531 15.8666353225708 25.16999816894531 16.41440963745117 C 25.16999816894531 16.96677017211914 24.94348907470703 17.50502967834473 24.54854965209961 17.89118957519531 L 24.53849983215332 17.90102005004883 L 24.52827835083008 17.91069030761719 L 17.18978881835938 24.85879516601563 C 16.80645179748535 25.23223876953125 16.2838020324707 25.44545936584473 15.74786949157715 25.44545936584473 C 15.19544887542725 25.44545936584473 14.65714836120605 25.21891021728516 14.27098846435547 24.82390022277832 L 14.24862861633301 24.8010196685791 L 14.22711944580078 24.7773494720459 L 6.206748962402344 15.94960021972656 L 6.191898345947266 15.93325996398926 L 6.177469253540039 15.91654968261719 C 5.85923957824707 15.54800033569336 5.679109573364258 15.07691955566406 5.670289993286133 14.59005928039551 L 5.670000076293945 14.57419967651367 L 5.670000076293945 14.55834007263184 L 5.670000076293945 8.165390014648438 C 5.670000076293945 7.026529312133789 6.596529006958008 6.100000381469727 7.735389709472656 6.100000381469727 Z" stroke="none" fill="currentColor"/></g><g transform="translate(2.801 2.575)" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75"><circle cx="1.224" cy="1.224" r="1.224" stroke="none"/><circle cx="1.224" cy="1.224" r="2.099" fill="none"/></g></g></svg>;
const ICON_ADD_USER = <svg strokeWidth="6" viewBox="0 0 36 36"><g fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="18" r="18" stroke="none"/><circle cx="18" cy="18" r="17" fill="none"/></g><g transform="translate(10 10)"><line y2="16" transform="translate(8)" fill="none" stroke="currentColor" strokeWidth="2"/><line x2="16" transform="translate(0 8)" fill="none" stroke="currentColor" strokeWidth="2"/></g></svg>;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


class User {

  constructor(id, name, mail, avatar) {
    this.id = id;
    this.name = name;
    this.mail = mail;
    this.avatar = avatar;
    window.users[id] = this;
  }
}


class Card extends React.Component {

  constructor(props) {
    super(props);
    this.name = props.name;
    this.column = props.column;
    this.id = window.id_current;
    window.id_current++;
    window.board.cards[this.id] = this;
    this.assignees = props.assignees;
    this.description = props.description;
    this.tags = props.tags; // Tag IDs
    this.state = {tags: []}; // Tag React components
    this.creator = props.creator;
    this.creation_date = props.creation_date;
    console.log("    Creating card " + this.name);
  }

  setDescription(description) {
    this.description = description;
  }

  addTag(tag) {
    this.state.tags.push(tag);
  }

  addAssignee(assignee) {
    this.assignees.push(assignee);
  }

  render() {

    console.log("    Rendering card " + this.name);
    this.state.tags = this.renderTags();

    return(

    <div className={"card theme-" + window.theme}>
      <p>{this.name}</p>
      <div>
          {this.description === "" ? null : ICON_DESCRIPTION}
          <span>#{window.board.project_id}-{this.id}</span>
          {this.state.tags}
      </div>
      {this.assignees.length >= 3 ? <img src={window.users[this.assignees[2]].avatar} style={{right:'2.75rem'}}/> : null}
      {this.assignees.length >= 2 ? <img src={window.users[this.assignees[1]].avatar} style={{right:'1.75rem'}}/> : null}
      {this.assignees.length >= 1 ? <img src={window.users[this.assignees[0]].avatar}/> : null}
    </div>

    );
  }

  renderTags() {
    let tags = [];
    let class_name;
    let large_tag_count;
    try {
      let column_width = document.getElementsByClassName("card-column")[0].clientWidth;
      column_width -= ReactDOM.findDOMNode(this).getElementsByTagName("span")[0].clientWidth; // ID width and margins
      column_width /= 16;
      column_width -= 2.25; // Card margins and padding
      if (this.description !== "")
        column_width -= 1.75; // Description icon
      column_width -= 1.5; // Right margin
      if (this.assignees.length >= 1)
        column_width -= 2.275; // Assignee avatar
      if (this.assignees.length >= 2)
        column_width -= 1.0625; // 2nd assignee avatar
      if (this.assignees.length >= 3)
        column_width -= 1.0; // 3nd assignee avatar
      
      large_tag_count = column_width / 3.5;
      let small_tag_count = this.tags.length - this.large_tag_count;
      while(this.large_tag_count * 3.5 + small_tag_count * 1.0 > column_width) {
        this.large_tag_count--;
        small_tag_count++;
      }
      large_tag_count += 0.75;
    }
    catch(e) {
      large_tag_count = 0;
    }
    for(let i = 0; i < this.tags.length; ++i) {
      if(i < large_tag_count)
        class_name = "tag-hidden tag-large tag-color-";
      else
        class_name = "tag-hidden tag-small tag-color-";
      class_name += this.tags[i];
      tags.push(<div className={class_name}></div>);
    }
    console.log(tags);
    return(tags);
  }

  componentDidMount() {
    console.log("    Card " + this.name + " mount");
    this.render();
  }

}


class Column extends React.Component {

  constructor(props) {
    super(props);
    this.id = props.id;
    this.name = props.name;
    this.locked = props.locked;
    this.cards = props.cards;
    window.board.columns[this.id] = this;
    console.log("  Creating column " + this.name);
  }

  render() {

    console.log("  Rendering column " + this.name);

    return(

    <div className="col-12 col-sm-4 col-lg-2">
      <div className="card-column">
        <div className="header">
          <div className="column-header-name">
            {this.locked ? null : ICON_UNLOCKED}
            <h3>{this.name}</h3>
          </div>
          <div className="column-header-options">
            {ICON_PLUS}
            {ICON_OPTIONS}
          </div>
        </div>
        <div className="card-list">
          {this.props.children}
          <div className="add-card-button">
            {ICON_PLUS}
          </div>
        </div>
      </div>
    </div>
    
    );
  }
}


class Board extends React.Component {

  constructor(props) {
    super(props);
    this.id = props.id;
    this.project_id = props.project_id;
    this.name = props.name;
    this.cards = props.cards;
    this.columns = props.columns;
    this.tags = props.tags;
    window.board = this;
  }

  render() {

    console.log("Rendering Board")
    return(

    <div className="row" id="board">
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div className="col-lg-1"></div>
      {this.props.children}
      <div className="col-lg-1"></div>
    </div>

    );
  }

  createTag(id, name, color) {
    this.tags[id] = {"name" : name, "color" : color};
    document.getElementById("tag-colors").innerHTML += `      .tag-color-${id}: { background-color: ${color}; }\n`;
  }

}


class DisplayedCard extends Card {
  
  render() {

    let tags = []
    this.tags.forEach(tag => {
      try {
        tags.push(<li id={`.tag-color-${tag}`}>{window.board.tags[tag].name}</li>);
      }
      catch(e) {
        console.log( window.board.tags);
      }
    });

    return(

      <div className={"displayed-card-container theme-" + window.theme}>
        <div className={"displayed-card theme-" + window.theme}>
          <div className="displayed-card-header">
            <h2>{this.name}</h2>
            <div>
              <span>in </span><span className="displayed-card-column">{window.board.columns[this.column].name}</span>{ICON_DROPDOWN_ARROW}
            </div>
          </div>
          <div className="displayed-card-section displayed-card-description">
            <div className="displayed-card-section-name">
              {ICON_DESCRIPTION}<span>Description</span>
            </div>
            <p>{this.description}</p>
          </div>
          <div className="displayed-card-section displayed-card-tags">
            <div className="displayed-card-section-name">
              {ICON_TAG}<span>Tags</span>
            </div>
            <ul>{tags}</ul>
          </div>
          <div className="displayed-card-section displayed-card-assignees">
            <div className="displayed-card-section-name">
              {ICON_ASSIGNEES}<span>Assignees</span>
            </div>
          </div>
          <div className="displayed-card-footer">
            <div className="displayed-card-created">
              <img src={window.users[this.creator].avatar} style={{right:'2.75rem'}}/>
              <span className="displayed-card-creator">{window.users[this.creator].name} <span>created this card on</span> {this.creation_date}</span>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

Card.defaultProps = {
  tags: [],
  assignees: [1, 2],
  description: '',
  creator: 1,
  creation_date: "11.10.2020"
};

Column.defaultProps = {
  locked: true,
  cards: {}
};

Board.defaultProps = {
  cards: {},
  columns: {},
  tags: {}
};

let user = new User(1, "John Gault", "whoisjgault@mail.com", "../static/imgs/avatar_ba@2x.png");
user = new User(2, "Amy House", "amywhoexactly@mail.com", "../static/imgs/avatar_cj@2x.png");
user = new User(3, "Michael", "mychael@mail.com", "../static/imgs/avatar_cx@2x.png");
user = new User(4, "Alice Boering", "nonotboring@mail.com", "../static/imgs/avatar_bz@2x.png");

var boardContainer = 
            <div>
              <Board id={0} project_id={'UHC'} name="UHC Bugs">
                <Column id={0} name="Reported" locked={false}>
                  <Card name="1" column={0} tags={[0, 3]} assignees={[1, 2]} description="a"/>
                </Column>
                <Column id={1} name="Confirmed">
                  <Card name="2" column={1} tags={[0, 1, 4]} assignees={[1]}/>
                </Column>
              </Board>
              <DisplayedCard name="Call a function from its name/id in order to allow arrays of functions." description={"Add an option to call functions from its name/id for more flexibility, specifically to make lists of functions. Alternatively make some kind of function object."} column={1} tags={[0, 1, 4]} assignees={[1]}/>
            </div>;

ReactDOM.render(
  boardContainer,
  document.getElementsByTagName('body')[0]
);

window.board.createTag(0, "performance", "#2CA876");
window.board.createTag(1, "feature", "#FB9E24");
window.board.createTag(2, "csharp", "#AB0069");
window.board.createTag(3, "critical", "#D63A13");
window.board.createTag(4, "python", "#0092B9");
window.board.createTag(5, "installer", "#7073DA");

document.getElementsByTagName("body")[0].className = "theme-" + window.theme;

window.addEventListener("resize", boardContainer.forceUpdate);
