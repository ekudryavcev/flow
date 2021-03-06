import React from "react";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import BinaryHeap from "../../BinaryHeap";

import Card from "../Card/Card";
import Column from "../Column/Column";
import DisplayedCard from "../DisplayedCard/DisplayedCard";

const shortcut = require("../../shortcut.js").shortcut;


class Board extends React.Component {

  constructor(props) {
    super(props);
    this.id = props.id;
    this.state = {
      project_id: props.project_id,
      name: props.name,
      cards: props.cards,
      columns: props.columns,
      tags: props.tags,
      users: props.users,
      idCurrent: props.idCurrent,
      idAvailable: props.idAvailable,
      idReuseMode: props.idReuseMode,
      archived: props.archived,
      displayedCard: props.displayedCard,
      dialog: props.dialog,
    };
    if (props.idCurrent === undefined || props.idCurrent === -1) {
      this.state.idCurrent = Math.max(Object.keys(this.state.cards)) + 1;
      for (let i = 1; i < this.state.idCurrent; i++)
        if (!(i in this.state.cards))
          this.state.idAvailable.push(i);
    }
    window.board = this;
  }

  updateState(updated_state) {
    updated_state = Object.assign(this.state, updated_state);
    this.setState(updated_state);
  }

  addCard(column_id, card, first = false) {
    card.id = this.getCardID();
    let cards = this.state.cards;
    let columns = this.state.columns;
    if (first)
      columns[column_id].cards = [card.id].concat(columns[column_id].cards);
    else
      columns[column_id].cards.push(card.id);
    cards[card.id] = card;
    this.updateState({ cards: cards, columns: columns, displayedCard: card.id });
    window.history.pushState("Card " + card.id, "Card #" + card.id, `/board=${window.board.id}/card=${card.id}`);
    return card.id;
  }

  getCardID() {
    let id;
    if (this.state.idAvailable.isEmpty()) {
      id = this.state.idCurrent;
      // eslint-disable-next-line
      this.state.idCurrent++;
      return (id);
    }
    else {
      return (this.state.idAvailable.pop());
    }
  }
  
  deleteCardID(id) {
    if (id === this.state.idCurrent - 1) {
      // eslint-disable-next-line
      this.state.idCurrent = id;
    }
    else {
      this.state.idAvailable.push(id);
    }
  }

  deleteCard(card_id) {
    if (!(card_id in this.state.cards))
      return;
    let columns = this.state.columns;
    let cards = this.state.cards;
    columns[cards[card_id].column].cards.splice(columns[cards[card_id].column].cards.indexOf(card_id), 1);
    delete cards[card_id];
    this.updateState({ cards: cards, columns: columns, displayedCard: -1 });
    this.deleteCardID(card_id);
  }

  archiveCard(card_id) {
    console.log(this);
    if (!(card_id in this.state.cards))
      return;
    let columns = this.state.columns;
    let cards = this.state.cards;
    let archived = this.state.archived;
    columns[cards[card_id].column].cards.splice(columns[cards[card_id].column].cards.indexOf(card_id), 1);
    archived.push(card_id);
    this.updateState({ cards: cards, columns: columns, displayedCard: -1, archived: archived });
  }

  // If a card is pressed, to open it full-screen we save its ID into board.displayedCard
  displayCard(card_id = -1) { // If a displayed card is closed, we clear the ID from board.displayedCard by putting -1 instead
    if(!(card_id in this.state.cards))
      card_id = -1;
    this.updateState({ displayedCard: card_id });
  }

  render() {

    this.next_id = this.getCardID();
    this.deleteCardID(this.next_id);

    // If the URL indicates there is a card displayed - display it
    //if(window.location.pathname.match(/card=\d+/)) {
    //  let card_id = parseInt(window.location.pathname.match(/card=\d+/)[0].replace(/[^0-9]/g, ''));
    //  if(card_id in this.state.cards && this.state.displayedCard !== card_id)
    //    this.displayCard(card_id);
    //}
    // If a card is open full-screen right now, make a component for it
    let displayedCard = null;
    if(window.location.pathname.match(/card=\d+/)) {
      let card_id = parseInt(window.location.pathname.match(/card=\d+/)[0].replace(/[^0-9]/g, ''));
      if(card_id === this.next_id) {
        displayedCard = <Redirect to={`/board=${window.board.id}/card=${card_id}`} />;
      } else {
        let card = this.state.cards[card_id];
        if(card === undefined)
          displayedCard = <Redirect to={`/board=${window.board.id}`} />;
        else
          displayedCard = <DisplayedCard id={card.id} name={card.name} description={card.description} column={card.column} tags={card.tags} taskList={card.taskList} assignees={card.assignees} />;
      }
    }

    let columns = [];
    // For each column of cards in the board's list of card IDs
    for (const i in this.state.columns) {
      if (this.state.columns.hasOwnProperty(i)) {
        const column_data = this.state.columns[i].cards;
        const column = this.state.columns[i];
        let card_list = []; // A list of card components for a column
        // For each card ID in the column
        column_data.forEach(card_id => {
          const card = this.state.cards[card_id];
          card_list.push( // Add the card's component into the list for a column
            <Card key={card.id.toString()} id={card.id} name={card.name} description={card.description} column={card.column} tags={card.tags} taskList={card.taskList} assignees={card.assignees} />
          );
        });
        // Now generate the column components, complete with their cards as children
        columns.push(
          <Column key={column.id.toString()} id={column.id} name={column.name} description={column.description} locked={column.locked}>
            {card_list}
          </Column>
        );
      }
    }

    // If a dialog is open full-screen right now, make a component for it
    let dialog = null;
    if (this.state.dialog === "delete-confirmation") {
      dialog =<div className="dialog-container">
                <div id="delete-confirmation" className="dialog">
                  <h2>Are you sure you want to delete this card?</h2>
                  <p>You will not be able to recover it.</p>
                  <input id="do-not-confirm" type="checkbox" name="do-not-confirm" style={{display: "none"}} value="do-not-confirm"/>
                  <label className="checkbox" htmlFor="do-not-confirm">
                    <span><svg viewBox="0 0 12 9"><polyline points="1 5 4 8 11 1"></polyline></svg></span>
                    <span>Do not ask me again</span>
                  </label> 
                  <div className="actions">
                    <button onClick={() => { window.board.updateState({dialog: -1});}}>Cancel</button>
                    <div className="delete-buttons">
                      <button onClick={() => { window.board.updateState({dialog: -1}); window.board.archiveCard(window.board.state.displayedCard); window.preferences.warnOnDelete = !document.getElementById("do-not-confirm").checked;}}>
                        <Link to={`/board=${window.board.id}`}>Archive</Link>
                      </button>
                      <button onClick={() => { window.board.updateState({dialog: -1}); window.board.deleteCard(window.board.state.displayedCard); window.preferences.warnOnDelete = !document.getElementById("do-not-confirm").checked;}} className="critical">
                        <Link to={`/board=${window.board.id}`}>Delete</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>;
    }

    return (

      <div>
        <div className="row" id="board">
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <div className="col-lg-1"></div>
          {columns}
          <div className="col-lg-1"></div>
        </div>
        <Switch>
          <Route exact path="/board=:board_id/card=-1">
            <Redirect to={`/board=${this.id}`} />
          </Route>
          <Route path="/board=:board_id/card=:id">
            {displayedCard}
          </Route>
        </Switch>
        {dialog}
      </div>

    );
  }

  componentDidMount() {
    shortcut.add("escape", () => {
      if(document.activeElement.contentEditable === "true") {
        return;
      }
      //this.displayCard(-1);
    });
    shortcut.add("delete", () => {
      if(document.activeElement.contentEditable === "true")
        return;
      if(window.preferences.warnOnDelete)
        window.board.updateState({dialog: "delete-confirmation"});
      else
        window.board.deleteCard(this.props.id);
    });
  }

  componentWillUnmount() {
    shortcut.remove("escape");
    shortcut.remove("delete");
  }

}


Board.defaultProps = {
  cards: [],
  columns: [],
  users: {},
  tags: {},
  archived: [],
  displayedCard: -1,
  dialog: -1,
  idCurrent: 1,
  idReuseMode: false,
  idAvailable: new BinaryHeap()
};

export default Board;