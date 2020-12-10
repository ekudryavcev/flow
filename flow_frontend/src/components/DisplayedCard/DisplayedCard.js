import React from "react";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { ICON_DESCRIPTION, ICON_PLUS, ICON_CHECK, ICON_CALENDAR, ICON_SCHEDULLE, ICON_TAG, ICON_ADD_TAG, ICON_ASSIGNEES, ICON_ADD_USER, ICON_ARROW_RIGHT, ICON_DUPLICATE, ICON_ATTACH, ICON_SAVE_TEMPLATE, ICON_STAR, ICON_TRASH, ICON_INFO, ICON_SHARE, ICON_BIN, ICON_COPY, ICON_CROSS, ICON_LINK, ICON_FORWARD, ICON_ARCHIVE, ICON_SUBSCRIBE, ICON_EDIT } from "../../svg/icons";

import Card from "../Card/Card";

class DisplayedCard extends Card {

  constructor(props) {
    super(props);
    this.descriptionComponent = React.createRef();
    this.nameComponent = React.createRef();
  };

  removeTask(i) {
    let taskList = this.state.taskList;
    taskList.splice(i, 1);
    this.updateState({ taskList: taskList });
    // Remove event listener
    //document.getElementById("task-" + i).removeEventListener("change");
    let cards = window.board.state.cards;
    cards[this.props.id].taskList = taskList;
    window.board.updateState({ cards: cards });
    for (let j = 0; j < taskList.length; j++) {
      const task = document.getElementById("task-" + j);
      task.checked = taskList[j].done;
    }

  }

  removeTag(tag) {
    let tags = this.state.tags;
    tags.splice(this.state.tags.indexOf(tag), 1);
    this.updateState({ tags: tags });
    let cards = window.board.state.cards;
    cards[this.props.id].tags = tags;
    window.board.updateState({ cards: cards });
  }

  removeAssignee(assignee) {
    let assignees = this.state.assignees;
    assignees.splice(this.state.assignees.indexOf(assignee), 1);
    this.updateState({ assignees: assignees });
    let cards = window.board.state.cards;
    cards[this.props.id].assignees = assignees;
    window.board.updateState({ cards: cards });
  }

  editContent(event, exitOnEnter = true) {
    let element = event.target;
    if (event.key === "Escape") {
      // restore state
      document.execCommand("undo");
      element.blur();
    }
    else if (event.key === "Enter" && exitOnEnter) {
      element.blur();
    }
  }

  addDescription() {
    document.getElementById("displayed-card-description").style.display = "inline-block";
    document.getElementById("displayed-card-description").focus();
    document.getElementById("add-description").style.display = "none";
  }

  descriptionSanitizeConf = {
    allowedTags: ["b", "i", "em", "strong", "a", "p", "br", "div"],
    allowedAttributes: { a: ["href"] }
  };

  nameSanitizeConf = {
    allowedTags: [],
    allowedAttributes: {}
  };

  render() {

    let select_column = [];
    Object.keys(window.board.state.columns).forEach(column => {
      select_column.push(<option value={column.id}>{column.name}</option>);
    });
    select_column = <select id="displayed-card-column"
      value={this.state.column}
      onChange={() => { this.setColumn(parseInt(document.getElementById("displayed-card-column").value)); }}>
      {select_column}
    </select>;

    let taskList = [];
    for (let i = 0; i < this.state.taskList.length; i++) {
      const task = this.state.taskList[i];
      taskList.push(
        <li className="displayed-task">
          <input id={`task-${i}`} type="checkbox" name={`task-${i}`} style={{ display: "none" }} value={`task-${i}`} defaultChecked={task.done} />
          <label className="checkbox checkbox-small crossed" htmlFor={`task-${i}`}>
            <span><svg viewBox="0 0 12 9"><polyline points="1 5 4 8 11 1"></polyline></svg></span>
            <span id={`task-text-${i}`}
              onBlur={() => {
                let elem = document.getElementById(`task-text-${i}`);
                let new_task = elem.innerText;
                if (new_task === "") {
                  document.execCommand("undo");
                  elem.blur();
                }

                else
                  this.setTask(i, new_task);
                elem.contentEditable = false;
              }}
              onKeyDown={e => { this.editContent(e); }}>
              {task.task}
            </span>
          </label>
          <button className="edit-task" onClick={() => { document.getElementById(`task-text-${i}`).contentEditable = true; document.getElementById(`task-text-${i}`).focus(); }}>
            {ICON_EDIT}
          </button>
          <button className="remove-task" onClick={() => { this.removeTask(i); }}>
            <svg viewBox="0 0 64 64" stroke="currentColor" fill="currentColor"><line x1="18" y1="32" x2="46" y2="32" /></svg>
          </button>
        </li>
      );
    }
    taskList.push(
      <button id="add-task">
        {ICON_PLUS}<span>Add</span>
      </button>
    );

    let tags = [];
    this.state.tags.forEach(tag => {
      try {
        tags.push(
          <span className={`tag-color-${window.board.state.tags[tag].color}`}>
            {window.board.state.tags[tag].name}
            <button className="remove-card-tag" onClick={() => { this.removeTag(tag); }}>
              <svg viewBox="0 0 64 64" stroke="currentColor" fill="currentColor"><line x1="18" y1="32" x2="46" y2="32" /></svg>
            </button>
          </span>
        );
      }
      catch (e) {
        console.log(window.board.state.tags[tag]);
      }
    });
    tags.push(<button id="add-tag">{ICON_ADD_TAG}</button>);

    let assignees = [];
    this.state.assignees.forEach(assignee => {
      assignees.push(
        <li className="displayed-assignee">
          <div>
            <img src={window.users[assignee].avatar} alt={window.users[assignee].name.toString()} />
            <button className="remove-card-assignee" onClick={() => { this.removeAssignee(assignee); }}>
              <svg viewBox="0 0 64 64" stroke="currentColor" fill="currentColor"><line x1="18" y1="32" x2="46" y2="32" /></svg>
            </button>
            <span>{window.users[assignee].name}</span>
          </div>
        </li>
      );
    });
    assignees.push(
      <li>
        <button id="add-assignee">
          {ICON_ADD_USER}
          <span>Assign</span>
        </button>
      </li>
    );

    let description;
    let add_btn_style = {};
    let desc_style = {};
    if (this.state.description !== "")
      add_btn_style = { "display": "none" };

    else
      desc_style = { "display": "none" };
    description = <div className="displayed-card-section displayed-card-description">
      <div className="displayed-card-section-name">
        {ICON_DESCRIPTION}<span>Description</span>
      </div>
      <ContentEditable
        id="displayed-card-description"
        innerRef={this.descriptionComponent}
        html={this.state.description.toString()} // innerHTML of the editable div
        disabled={false}
        onKeyDown={event => { this.editContent(event, false); }}
        onBlur={event => {
          this.setDescription(sanitizeHtml(event.target.innerHTML, this.descriptionSanitizeConf));
          if (event.target.innerText === '') {
            event.target.style.display = "none";
            document.getElementById("add-description").style.display = "flex";
          }
        }}
        tagName='p' // Use a custom HTML tag (uses a div by default)
        style={desc_style} />
      <button id="add-description"
        onClick={() => { this.addDescription(); }}
        style={add_btn_style}>
        {ICON_PLUS}<span>Add</span>
      </button>
    </div>;

    return (

      <div className="displayed-card-background">
        <div className="displayed-card-container">
          <div className="displayed-card col-12 col-sm-10 col-lg-8" onClick={(e) => { let evt = e ? e : window.event; if (evt.stopPropagation) { evt.stopPropagation(); } else { evt.cancelBubble = true; } return false; /* Ignore click - to prevent clicks from registering on lower layers */ }}>
            <div className="displayed-card-header">
              <ContentEditable
                id="displayed-card-name"
                innerRef={this.nameComponent}
                disabled={false}
                onBlur={() => {
                  this.setName(document.getElementById("displayed-card-name").innerText);
                }}
                tagName='h2'
                onKeyDown={e => { this.editContent(e); }}
                html={this.state.name} />
              <div>
                <span>in </span>
                {select_column}
              </div>
            </div>
            {description}
            <div className="displayed-card-details">
              <div className="displayed-card-section displayed-card-task-list">
                <div className="displayed-card-section-name">
                  {ICON_CHECK}<span>Task list</span>
                </div>
                <ol>
                  {taskList}
                </ol>
              </div>
              <div className="displayed-card-section displayed-card-tags">
                <div className="displayed-card-section-name">
                  {ICON_TAG}<span>Tags</span>
                </div>
                <div className="displayed-card-tag-list">{tags}</div>
              </div>
              <div className="displayed-card-section displayed-card-assignees">
                <div className="displayed-card-section-name">
                  {ICON_ASSIGNEES}<span>Assignees</span>
                </div>
                <ul>{assignees}</ul>
              </div>
              <div className="displayed-card-section displayed-card-files" style={{ display: "none" }}>
                <div className="displayed-card-section-name">
                  {ICON_ATTACH}<span>Files</span>
                </div>
                <button id="add-files">
                  {ICON_PLUS}<span>Attach</span>
                </button>
              </div>
              <div className="displayed-card-section displayed-card-due-date">
                <div className="displayed-card-section-name">
                  {ICON_SCHEDULLE}<span>Due date</span>
                </div>
                <button id="add-due-date">
                  {ICON_CALENDAR}<span>Select</span>
                </button>
              </div>
            </div>
            <div className="displayed-card-options">
              <button id="move-card-button" onClick={() => { }}>
                {ICON_ARROW_RIGHT}<span>Move</span>
              </button>
              <button id="duplicate-card-button">
                {ICON_DUPLICATE}<span>Duplicate</span>
              </button>
              <button id="save-template-card-button" style={{ display: "none" }}>
                {ICON_SAVE_TEMPLATE}<span>Save template</span>
              </button>
              <div className="divider" style={{ display: "none" }} />
              <button id="subscribe-card-button" style={{ display: "none" }}>
                {ICON_SUBSCRIBE}<span>Subscribe</span>
              </button>
              <button id="star-card-button" style={{ display: "none" }}>
                {ICON_STAR}<span>Star</span>
              </button>
              <button id="link-card-button">
                {ICON_LINK}<span>Copy link</span>
              </button>
              <button id="forward-card-button" style={{ display: "none" }}>
                {ICON_FORWARD}<span>Forward</span>
              </button>
              <div className="divider" />
              <button id="archive-card-button" onClick={() => { window.board.archiveCard(this.props.id); }}>
                <Link to={`/board=${window.board.id}`}>
                  {ICON_ARCHIVE}<span>Archive</span>
                </Link>
              </button>
              <button id="delete-card-button" className="critical-on-hover"
                onClick={() => { if (window.preferences.warnOnDelete) { window.board.updateState({ dialog: "delete-confirmation" }); } else { window.board.deleteCard(this.props.id); } }}>
                <Link to={`/board=${window.board.id}`}>
                  {ICON_TRASH}<span>Delete</span>
                </Link>
              </button>
            </div>
            <div className="displayed-card-footer">
              <div className="displayed-card-created">
                <img src={window.users[this.props.creator].avatar} alt={window.users[this.props.creator].name.toString()} style={{ right: '2.75rem' }} />
                <span className="displayed-card-creator">
                  {window.users[this.props.creator].name} <span>created this card on</span><span className="number"> {this.props.creation_date}</span>
                </span>
              </div>
              <div className="displayed-card-id number">
                #{window.board.state.project_id}-{this.props.id}
              </div>
            </div>
          </div>
          <div className="displayed-card-right-buttons" onClick={e => { let evt = e ? e : window.event; if (evt.stopPropagation) { evt.stopPropagation(); } else { evt.cancelBubble = true; } return false; /* Ignore click - to prevent clicks from registering on lower layers */ }}>
            <div className="displayed-card-right-top-buttons">
              <Link to={`/board=${window.board.id}`} >
                <button>{ICON_CROSS}</button>
              </Link>
              <button>{ICON_INFO}</button>
              <button>{ICON_SHARE}</button>
            </div>
            <div className="displayed-card-right-bottom-buttons">
              <button>{ICON_COPY}</button>
              <button className="critical-on-hover" onClick={() => { if (window.preferences.warnOnDelete) { window.board.updateState({ dialog: "delete-confirmation" }); } else { window.board.deleteCard(this.props.id); } }}>{ICON_BIN}</button>
            </div>
          </div>
        </div>
      </div>

    );
  }

  componentDidMount() {
    // Add event listeners to the tasklist checkboxes
    for (let i = 0; i < this.state.taskList.length; i++) {
      document.getElementById("task-" + i).addEventListener("change", evt => {
        let checkbox = evt.target;
        let task_list = this.state.taskList;
        task_list[i].done = checkbox.checked;
        this.updateState({ taskList: task_list });
        window.board.state.cards[this.props.id].taskList = task_list;
      });
    }
    // If this is a new card, focus on the name input
    if (this.state.name === "") {
      document.getElementById("displayed-card-name").focus();
    }
  }

  // If some of the properties of the card have been changed, we have to re-render it on the board.
  // To do this, we'll simulate a resize, unless the card has been deleted.
  componentWillUnmount() {
    try {
      if (this.props.id in window.board.state.cards && !(this.props.id in window.board.state.archived)) {
        window.board.state.cards[this.props.id].resizeFunction();
      }
    }
    catch { }
    document.activeElement.blur();
  }

  resize = () => { };
}

export default DisplayedCard;