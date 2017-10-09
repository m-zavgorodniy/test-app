import React, { Component } from 'react';
import db from "../../db/firebase";
import User from './User';
import './UserList.css';

const UserList = () => (
  <section className="UserList">
    <h1 className="UserList__title">Users</h1>
    <UserListGrid/>
  </section>
)

class UserListGrid extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      filter: '',
      status: 'fetch' // fetch|ready|error
    }
  }

  componentDidMount() {
    const result = db.ref('/');
    result.once('value')
      .then((snapshot) => {
        this.setState({
          users: UserListGrid._processResult(snapshot.val()),
          status: 'ready'
        })
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          status: 'error'
        });
      })
  }

  render() {

    // check the status
    // if not ready, make the user aware - that's it

    const status = this.state.status;
    if ("ready" !== status) {
      return (
        <div className="UserList__message">
          { "fetch" === status ? "Loading..." : "Something went wrong..." }
        </div>
      )
    }

    // the data is ready - proceed with the list

    return (
      <div>
        <div className="UserList__search">
          <form>
            <input
              className="UserList__input"
              placeholder="Start typing user name"
              autocomplete="off"
              autoFocus
              onChange={this._handleFilterChange.bind(this)}/>
          </form>
        </div>
        <ul>
        { this.state.users.map((user, index) => {
            if (false === user.name.toLowerCase().includes(this.state.filter)) {
              return null;
            }
            return (
              <User
                key={index}
                user={user}/>
            )
          })
        }
        </ul>
      </div>
    )
  }

  _handleFilterChange(event) {
    this.setState({
      filter: event.target.value.toLowerCase()
    })
  }

  // converts originally flat data structure into hierarchical array:
  // Users
  //   Apps
  static _processResult(result) {
    const accounts = result.accounts;
    let resultProcessed = [];
    const users = result.users;
    Object.keys(users).forEach((key) => {
      let user = users[key];
      // add the 'apps' property to users
      const userApps = accounts[user.account].apps;
      user.apps = Object.keys(userApps).map((key) => userApps[key]);
      resultProcessed.push(user);
    });
    // sort users by name
    resultProcessed.sort((a, b) => a.name.localeCompare(b.name));
    return resultProcessed;
  }
}

export default UserList;
