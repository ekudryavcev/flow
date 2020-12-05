export default class User {

    constructor(id, name, mail, avatar) {
      this.id = id;
      this.name = name;
      this.mail = mail;
      this.avatar = avatar;
      window.users[id] = this;
    }
  
  }