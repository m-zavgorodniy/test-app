import React, { Component } from 'react';
import {ArrowUp, ArrowDown} from '../../images/icons';
import UserAppRating from './UserAppRating';
import './User.css';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      expanded: false
    }
  }

  render() {
    const userName = this.props.user.name;
    const userAcc = this.props.user.account;
    const userAccStr = `Acc ID: ${this.props.user.account}`;
    const userApps = this.props.user.apps;
    const userHasApps = userApps.length > 0;
    const userAppsStr = `Apps (${userApps.length})`;

    const userClassName = 'User' + (this.state.expanded ? ' User--expanded' : '');
    const userBarClassName = 'User__bar' + (userHasApps ? ' User__bar--hasApps' : '') + (this.state.hover ? ' User__bar--hover' : '');
    return (
      <li className={userClassName}>
        <div className={userBarClassName}
          onClick={this._handleClick.bind(this)}
          onMouseEnter={this._handleHover.bind(this)}
          onMouseLeave={this._handleHover.bind(this)}>
          <div>
            <div>{userName}</div>
            <div className="User__account">{userAccStr}</div>
          </div>
          { userHasApps ?
            <div className="User__apps">
                {userAppsStr}
                {this.state.expanded ? <ArrowUp/> : <ArrowDown/>}
            </div> : null}
        </div>
        { userHasApps ?
          <UserAppsList
            accountId={userAcc}
            apps={userApps}
            open={this.state.expanded}/> : null
        }
        <div className="User__hr"/>
      </li>
    )
  }

  _handleClick(event) {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  _handleHover(event) {
    this.setState({
      hover: !this.state.hover
    })
  }

}

const UserAppsList = (props) => {
  if (false === props.open) {
    return null;
  }

  return (
    <div className="UserAppsList">
      <div className="UserAppsList__title">Apps</div>
      <ul>
        { Object.keys(props.apps).map((appId, index) => {
            const app = props.apps[appId];
            return (
              <li key={index} className="UserAppsList__item">
                <div>{app.title}</div>
                <UserAppRating
                  accountId={props.accountId}
                  appId={app.id}
                  rating={app.rating}/>
              </li>
            )
          }
        )}
      </ul>
    </div>
  )
}

export default User;
