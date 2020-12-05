import React from "react";
import { Droppable } from "react-drag-and-drop";
import { ICON_PLUS, ICON_UNLOCKED, ICON_OPTIONS } from "../../svg/icons";

export default class Column extends React.Component {

  constructor(props) {
    super(props);
    this.id = props.id;
    this.state = {
      name: props.name,
      cards: props.cards,
      locked: props.locked,
      description: props.description
    };
  }

  render() {

    return (

      <div className="col-12 col-sm-4 col-lg-2">
        <div className="card-column">
          <div className="header">
            <div className="column-header-name">
              {this.state.locked ? null : ICON_UNLOCKED}
              <h3>{this.state.name}</h3>
            </div>
            <div className="column-header-options">
              <button onClick={() => { window.board.addCard(this.id, { name: "", description: "", column: this.id, tags: [], assignees: [] }, true); /*this.resize();*/ }}>
                {ICON_PLUS}
              </button>
              {ICON_OPTIONS}
            </div>
          </div>
          <div className="card-list">
            <Droppable
              types={["card"]}
              onDrop={this.onDrop.bind(this)}>
              <ol className="card-list-droppable">
                {this.props.children}
              </ol>
            </Droppable>
            <button className="add-card-button" onClick={() => { window.board.addCard(this.id, { name: "", description: "", column: this.id, tags: [], assignees: [] }); /*this.resize();*/ }}>
              {ICON_PLUS}
            </button>
          </div>
        </div>
      </div>

    );
  }

  onDrop(data) {
    let card_id = data.card,
      card = window.board.state.cards[card_id],
      all_columns = window.board.state.columns;
    if (this.id === card.column)
      return;
    all_columns[card.column].cards.splice(all_columns[card.column].cards.indexOf(card_id), 1);
    all_columns[this.id].cards.push(card_id);

    window.board.updateState({ columns: all_columns });
    this.setState({
      name: this.state.name,
      locked: this.state.locked,
      description: this.state.description,
      cards: all_columns[this.id]
    });

  }

  resize = () => {
  };

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }
}

Column.defaultProps = {
  locked: true,
  description: '',
  cards: {}
};