import React, { Component } from 'react';
import {Star as StarIcon} from '../../images/icons';

class UserAppRating extends Component {

  maxStars = 5;

  constructor(props) {
    super(props);
    this.state = {
      rating: props.rating
    }
  }

  render() {
    var stars = [];
    for (let i = 1; i <= this.maxStars; i++) {
      const starShine = (i <= this.state.rating);
      stars.push(
        <Star
          key={i}
          rating={i}
          shine={starShine}
          changeRating={this._changeRating.bind(this)}/>);
    }

    return (
      <div className="UserAppRating">
        {stars}
      </div>
    )
  }

  _changeRating(newRating) {
    this.setState({
      rating: newRating
    })
  }

}

const Star = (props) => {
  const _handleClick = (event) => {
    event.stopPropagation();
    props.changeRating(props.rating);
  }

  const className = 'UserAppRating__Star ' +
    (props.shine === true ?
      'UserAppRating__Star--shine' :
      'UserAppRating__Star--dim');

  return (
    <div
      rating={props.rating}
      onClick={_handleClick}
      className={className}>
      <StarIcon onClick={_handleClick}/>
    </div>
  )
}

export default UserAppRating;