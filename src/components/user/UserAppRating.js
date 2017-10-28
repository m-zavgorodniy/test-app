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
      stars.push(
        <Star
          key={i}
          rating={i}
          changeRating={this._changeRating.bind(this)}/>);
    }

    return (
      <div className="UserAppRating">
        {stars}
      </div>
    )
  }

  _changeRating(rating) {
    console.log(rating)
  }

}

const Star = (props) => {
  const _handleClick = (event) => {
    event.stopPropagation();
    props.changeRating(props.rating);
  }

  return (
    <div
      rating={props.rating}
      onClick={_handleClick}>
      <StarIcon onClick={_handleClick}/>
    </div>
  )
}

export default UserAppRating;