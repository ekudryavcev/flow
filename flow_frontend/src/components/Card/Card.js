import React from "react";
import ReactDOM from "react-dom";
import { Draggable } from "react-drag-and-drop";
import { Link } from "react-router-dom";
import {withRouter} from "react-router";

import {ICON_DESCRIPTION, ICON_CHECK} from "../../svg/icons";


class Card extends React.Component {

  constructor(props) {
    super(props);
    this.name = props.name;
    this.column = props.column;
    this.id = props.id;
    this.state = {
      name: props.name,
      tags: props.tags,
      column: props.column,
      assignees: props.assignees,
      taskList: props.taskList,
      description: props.description
    };
  }

  updateState(updated_state) {
    updated_state = Object.assign(this.state, updated_state);
    this.name = updated_state.name
    this.setState(updated_state);
    let cards = window.board.state.cards;
    cards[this.props.id] = Object.assign(cards[this.props.id], updated_state);
    window.board.updateState({cards: cards});
  }

  setDescription(description) {
    this.updateState({ description: description });
    try {
      document.getElementById("displayed-card-description").innerText = description
    }
    catch {}
  }

  setTask(i, new_task) {
    let tasks = this.state.taskList;
    tasks[i].task = new_task;
    this.updateState({ taskList: tasks });
  }

  setName(name) {
    if(name === "") {
      name = "Issue #" + this.props.id;
    }
    this.name = name;
    this.updateState({ name: name });
    try {
      document.getElementById("displayed-card-name").innerText = name
    }
    catch {}
  }

  setColumn(new_column) {
    let all_columns = window.board.state.columns;
    all_columns[this.state.column].cards.splice(all_columns[this.state.column].cards.indexOf(this.id), 1);
    all_columns[new_column].cards.push(this.id);
    window.board.updateState({columns: all_columns});
    this.updateState({column: new_column});
  }

  addTag(tag) {
    this.updateState({tags: this.state.tags + [tag] });
  }

  addAssignee(assignee) {
    this.updateState({ assignees: this.state.assignees + [assignee] });
  }

  render() {

    this.name = window.board.state.cards[this.props.id].name;
    this.state.description = window.board.state.cards[this.props.id].description;

    let large_tag_count = 0;//this.renderTags();
    let rendered_tags = [];
    let class_name;
    for (let i = 0; i < this.state.tags.length; ++i) {
      if (i < large_tag_count)
        class_name = "tag-hidden tag-large";
      else
        class_name = "tag-hidden tag-small";
      try {
        class_name += " tag-color-" + window.board.state.tags[this.state.tags[i]].color;
      }
      catch {
        class_name += " tag-color-" + this.state.tags[i];
      }
      rendered_tags.push(<div className={class_name}></div>);
    }

    let task_list_components = [];
    if(this.state.taskList.length > 0) {
      let taskList = this.state.taskList;
      taskList.forEach(task => {
        if(task.done)
        task_list_components = [<li className={"task-done"}/>].concat(task_list_components);
        else
          task_list_components.push(<li className={"task-todo"}/>);
      });
      task_list_components =  <ol className="task-list">
                                <li>{ICON_CHECK}</li>
                                {task_list_components}
                              </ol>;
    }

    return (
      <Draggable type="card" data={this.id}>
        <Link to={"/board/card=" + this.id} className="card" onClick={() => { window.board.displayCard(this.id); console.log(this.id) }}>
          <p>{this.name}</p>
          {task_list_components}
          <div>
            {(this.state.description === "" || this.state.description === undefined) ? null : ICON_DESCRIPTION}
            <span>#{window.board.state.project_id}-{this.props.id}</span>
            {rendered_tags}
          </div>
          {this.state.assignees.length >= 3 ? <img src={window.users[this.state.assignees[2]].avatar} alt={window.users[this.state.assignees[2]].name.toString()} style={{ right: '2.75rem' }} /> : null}
          {this.state.assignees.length >= 2 ? <img src={window.users[this.state.assignees[1]].avatar} alt={window.users[this.state.assignees[1]].name.toString()} style={{ right: '1.75rem' }} /> : null}
          {this.state.assignees.length >= 1 ? <img src={window.users[this.state.assignees[0]].avatar} alt={window.users[this.state.assignees[0]].name.toString()} /> : null}
        </Link>
      </Draggable>

    );
  }

  // Calculate how many tags will be rendered in full length depending on how much space is available
  renderTags() {
    let large_tag_count;
    try {
      let column_width = ReactDOM.findDOMNode(this).clientWidth;
      column_width -= ReactDOM.findDOMNode(this).getElementsByTagName("span")[0].clientWidth; // ID width and margins
      column_width /= window.font_size;
      column_width -= 3.0; // Card margins and padding
      if (this.state.description !== "")
        column_width -= 1.5; // Description icon
      column_width -= 1.25; // Right margin
      if (this.state.assignees.length >= 1)
        column_width -= 2.75; // Assignee avatar
      if (this.state.assignees.length >= 2)
        column_width -= 1.25; // 2nd assignee avatar
      if (this.state.assignees.length >= 3)
        column_width -= 1.0; // 3nd assignee avatar

      large_tag_count = column_width / 3.5;
      let small_tag_count = this.state.tags.length - large_tag_count;
      while (large_tag_count > 0 && large_tag_count * 3.5 + small_tag_count * 1.0 > column_width) {
        large_tag_count--;
        small_tag_count++;
      }
      large_tag_count += 0.75;
    }
    catch (e) {
      large_tag_count = 0;
    }
    return (large_tag_count);
  }

  // On resize, re-calculate how many tags have the space to be fully displayed and tasklist bar width
  resize = () => {
    let large_number = this.renderTags();
    let i = 1;
    while (i <= this.state.tags.length) {
      if (i < large_number + 0.5) {
        ReactDOM.findDOMNode(this).getElementsByClassName("tag-hidden")[i - 1].classList.remove("tag-small");
        ReactDOM.findDOMNode(this).getElementsByClassName("tag-hidden")[i - 1].classList.add("tag-large");
      }
      else {
        ReactDOM.findDOMNode(this).getElementsByClassName("tag-hidden")[i - 1].classList.remove("tag-large");
        ReactDOM.findDOMNode(this).getElementsByClassName("tag-hidden")[i - 1].classList.add("tag-small");
      }
      i++;
    }
    let task_list = ReactDOM.findDOMNode(this).getElementsByClassName("task-list")[0];
    if(task_list !== undefined) {
      task_list.style.marginRight = (this.state.taskList.length > 0 ? 1.75 : 0) + Math.min(3, this.state.assignees.length) * 1.5 + "rem";
    }
  }

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
    // Save the resize function, as it is useful for cases other than actual resize
    window.board.state.cards[this.props.id].resizeFunction = this.resize;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
    if(this.props.id in window.board.state.cards && !(this.props.id in window.board.state.archived))
      delete window.board.state.cards[this.props.id].resizeFunction;
  }

}

Card.defaultProps = {
  tags: [],
  name: '',
  creator: 1,
  assignees: [1, 2],
  taskList: [],
  description: '',
  creation_date: "11.10.2020"
};

export default Card;