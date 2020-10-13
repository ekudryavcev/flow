'use strict'

window.project_id = 'UHC';
window.id_list = [];
window.users = {};
window.cards = {};
window.columns = {};
window.id_current = 1;
window.theme = "light";

var ICON_DESCRIPTION = '<svg viewBox="0 0 64 64" stroke-width="6" stroke="currentColor" fill="none"><line x1="0" y1="8" x2="64" y2="8"/><line x1="0" y1="32" x2="64" y2="32"/><line x1="0" y1="56" x2="48" y2="56"/></svg>';
var ICON_PLUS = '<svg viewBox="0 0 64 64" stroke-width="6" stroke="currentColor" fill="none"><line x1="32" y1="7" x2="32" y2="57"/><line x1="7" y1="32" x2="57" y2="32"/></svg>';
var ICON_UNLOCKED = '<svg viewBox="0 0 64 64" stroke-width="6" stroke="currentColor" fill="none"><circle cx="32" cy="32" r="24.86"/><path d="M32,6.84A34.09,34.09,0,0,1,43.66,32.31c0,16.19-7.28,21-11.66,24.24"/><path d="M32,6.84A34.09,34.09,0,0,0,20.31,32.31c0,16.19,7.28,21,11.66,24.24"/><line x1="10.37" y1="19.75" x2="53.75" y2="19.75"/><line x1="32" y1="6.84" x2="32" y2="56.55"/><line x1="11.05" y1="45.33" x2="52.98" y2="45.33"/><line x1="7.14" y1="32.31" x2="56.86" y2="31.69"/></svg>';
var ICON_OPTIONS = '<svg style="width: 0.15rem;" viewBox="28 0 8 64" stroke-width="6" stroke="currentColor" fill="none"><line x1="28" y1="8" x2="36" y2="8"/><line x1="28" y1="32" x2="36" y2="32"/><line x1="28" y1="56" x2="36" y2="56"/></svg>';


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

class Card {

    constructor(name, column) {
        this.name = name;
        this.column = column;
        this.id = window.id_current;
        window.id_current++;
        window.cards[this.id] = this;
        this.tags = [];
        this.assignees = [];
        this.description = "";
    }

    setDescription(description) {
        this.description = description;
    }

    addTag(tag) {
        this.tags.push(tag);
    }

    addAssignee(assignee) {
        this.assignees.push(assignee);
    }

    render() {
        let column_card_list = document.getElementsByClassName("card-column")[this.column].getElementsByClassName('card-list')[0];

        let card = document.createElement('div');
        card.className = "card theme-" + window.theme;

        let card_name = document.createElement('p');
        card_name.innerText = this.name;
        card.append(card_name);

        let card_details = document.createElement('div');

        if (this.description != "")
            card_details.innerHTML = ICON_DESCRIPTION;

        let card_id = document.createElement('span');
        card_id.innerText = '#' + window.project_id + '-' + this.id;
        card_details.append(card_id);
        this.tags.forEach(tag => {
            let card_tag = document.createElement('div');
            card_tag.className = "tag-hidden tag-color-" + tag;
            card_details.append(card_tag);
        });

        card.append(card_details);

        let card_assignees;
        if (this.assignees.length == 1) {
            card_assignees = document.createElement('img');
            card_assignees.setAttribute('src', window.users[this.assignees[0]].avatar);
            card.append(card_assignees);
        }
        else if (this.assignees.length == 2) {
            card_assignees = document.createElement('img');
            card_assignees.setAttribute('src', window.users[this.assignees[1]].avatar);
            card_assignees.setAttribute('style', "right: 1.75rem;");
            card.append(card_assignees);
            card_assignees = document.createElement('img');
            card_assignees.setAttribute('src', window.users[this.assignees[0]].avatar);
            card.append(card_assignees);
        }
        else if (this.assignees.length >= 3) {
            card_name.setAttribute('style', "margin-bottom: 0.5rem;");
            card_assignees = document.createElement('img');
            card_assignees.setAttribute('src', window.users[this.assignees[2]].avatar);
            card_assignees.setAttribute('style', "right: 2.75rem;");
            card.append(card_assignees);
            card_assignees = document.createElement('img');
            card_assignees.setAttribute('src', window.users[this.assignees[1]].avatar);
            card_assignees.setAttribute('style', "right: 1.75rem;");
            card.append(card_assignees);
            card_assignees = document.createElement('img');
            card_assignees.setAttribute('src', window.users[this.assignees[0]].avatar);
            card.append(card_assignees);
        }

        this.html = card;
        if(column_card_list.getElementsByClassName("add-card-button").length)
            column_card_list.insertBefore(card, column_card_list.getElementsByClassName("add-card-button")[0]);
        else
            column_card_list.append(card);
    }

    calculateTagWidth() {
        let column_width = document.getElementsByClassName("card-column")[this.column].clientWidth;
        column_width -= this.html.getElementsByTagName("span")[0].clientWidth; // ID width and margins
        column_width /= 16;
        column_width -= 2.25; // Card margins and padding
        if (this.description != "")
            column_width -= 1.75; // Description icon
        column_width -= 1.5; // Right margin
        if (this.assignees.length >= 1)
            column_width -= 2.275; // Assignee avatar
        if (this.assignees.length >= 2)
            column_width -= 1.0625; // 2nd assignee avatar
        if (this.assignees.length >= 3)
            column_width -= 1.0; // 3nd assignee avatar
        return(column_width);
    }

    renderTags() {
        let width = this.calculateTagWidth();
        let large_number = width / 3.5;
        let small_number = this.tags.length - large_number;
        while(large_number * 3.5 + small_number * 1.0 > width) {
            large_number--;
            small_number++;
        }
        let i = 1;
        while(i <= this.tags.length) {
            if (i < large_number + 0.75) {
                this.html.getElementsByClassName("tag-hidden")[i - 1].classList.remove("tag-small");
                this.html.getElementsByClassName("tag-hidden")[i - 1].classList.add("tag-large");
            }
            else {
                this.html.getElementsByClassName("tag-hidden")[i - 1].classList.remove("tag-large");
                this.html.getElementsByClassName("tag-hidden")[i - 1].classList.add("tag-small");
            }
            i++;
        }
        //this.html.getElementsByClassName("tag-hidden")[this.html.getElementsByClassName("tag-hidden").length - 1].setAttribute('style', "width: " + width + "rem;");
    }

}

class Column {

    constructor(id, name, locked=true, cards=[]) {
        this.id = id;
        this.name = name;
        this.locked = locked;
        this.cards = cards;
        window.columns[id] = this;
    }

    render() {
        let column_list = document.getElementById("board");

        let column_container = document.createElement('div');
        column_container.className = "col-12 col-sm-4 col-lg-2";
        let column = document.createElement('div');
        column.className = "card-column";
        column_container.append(column);

        let header = document.createElement('div');
        header.className = "header";
        column.append(header);

        let header_name = document.createElement('div');
        header_name.className = "column-header-name";
        header.append(header_name);
        if (!this.locked)
        header_name.innerHTML = ICON_UNLOCKED;
        let column_name = document.createElement('h3');
        column_name.innerText = this.name;
        header_name.append(column_name);

        let header_options = document.createElement('div');
        header_options.className = "column-header-options";
        header.append(header_options);
    header_options.innerHTML = ICON_PLUS + ICON_OPTIONS;

        let card_list = document.createElement('div');
        card_list.className = "card-list";
        //card_list.setAttribute("scrolling", "auto");
        column.append(card_list);

        let add_card_button = document.createElement('div');
        add_card_button.className = "add-card-button";
        add_card_button.innerHTML = ICON_PLUS;
        card_list.append(add_card_button);

        this.html = column_container;
        column_list.insertBefore(column_container, document.getElementsByClassName("col-lg-1")[document.getElementsByClassName("col-lg-1").length - 1]);
    }
}

function resize() {
    for(const id in window.cards) {
        window.cards[id].renderTags();
    }
    for(const id in window.columns) {
        let card_list = window.columns[id].html.getElementsByClassName("card-list")[0];
        if (card_list.scrollHeight > card_list.offsetHeight)
            card_list.classList.add("vertically-scrollable");
        else
            card_list.classList.remove("vertically-scrollable");
    }

}


document.getElementsByTagName("body")[0].className = "theme-" + window.theme;

let user = new User(1, "John Gault", "whoisjgault@mail.com", "../static/imgs/avatar_ba@2x.png");
user = new User(2, "Amy House", "amywhoexactly@mail.com", "../static/imgs/avatar_cj@2x.png");
user = new User(3, "Michael", "mychael@mail.com", "../static/imgs/avatar_cx@2x.png");
user = new User(4, "Alice Boering", "nonotboring@mail.com", "../static/imgs/avatar_bz@2x.png");


let column = new Column(1, "Reported", false);
column.render();
column = new Column(2, "Confirmed");
column.render();
column = new Column(3, "In development");
column.render();
column = new Column(4, "Testing");
column.render();
column = new Column(5, "Finished");
column.render();

let card;

let tags = [];
let assignees = [];
let random_int;

for(let i = 0; i < 30; ++i) {
    let random_int = getRandomInt(texts.length - 1);
    card = new Card(texts[random_int], getRandomInt(5));
    texts.splice(random_int, 1);
    if(Math.random() > 0.3) {
        random_int = getRandomInt(texts.length - 1);
        if(Math.random() > 0.6)
            card.setDescription(card.name + '\n' + texts[random_int]);
        else
            card.setDescription(texts[random_int]);
        texts.splice(random_int, 1);
    }
    for(let j = 0; j < getRandomInt(6); ++j) {
        let tag = getRandomInt(6);
        if(card.tags.indexOf(tag) == -1)
            card.addTag(tag);
    }
    for(let j = 0; j < getRandomInt(3); ++j) {
        let assignee = getRandomInt(3) + 1;
        if(card.assignees.indexOf(assignee) == -1)
            card.addAssignee(assignee);
    }
    card.render();
}

resize();


/*
for(const i of Array(7).keys()) {
    card = new Card("Call a function from its name/id in order to allow arrays of functions.", 0);
    card.setDescription("Add an option to call functions from its name/id for more flexibility, specifically to make lists of functions.\nAlternatively make some kind of function object.");
    card.tags = [...Array(i).keys()];
    card.assignees = [1, 4, 3];
    card.render();
}

for(const i of Array(7).keys()) {
    card = new Card("DE AI bug", 1);
    card.tags = [...Array(i).keys()];
    card.render();
}

for(const i of Array(7).keys()) {
    card = new Card("Add support/implementation for new abstract types. Additionally, it would be even better if we could tie names and icons for these new types so they appear in the UI.", 2);
    card.setDescription("Lorem ipsum");
    card.tags = [...Array(i).keys()];
    card.assignees = [2];
    card.render();
}
*/

resize();
