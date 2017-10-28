import React, { Component } from 'react';
import {Star as StarIcon} from '../../images/icons';

class UserAppRating extends Component {

  maxStars = 5;

  constructor(props) {
    super(props);
    this.state = {
      rating: props.rating,
      deafultRating: props.rating // stores the rating to roll back on mouse leave
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
          changeRating={this._changeRating.bind(this)}
          changeRatingOnHover={this._changeRatingOnHover.bind(this)}
          onMouseEnter={this._changeRating.bind(this)}/>
      );
    }

    return (
      <div
        className="UserAppRating"
        onMouseLeave={this._backToDefault.bind(this)}>
        {stars}
      </div>
    )
  }

  _changeRatingOnHover(rating) {
    this.setState({rating});
  }

  _changeRating(rating) {
    this.setState({rating, deafultRating: rating});
  }

  _backToDefault() {
    this.setState({
      rating: this.state.deafultRating
    });
  }

}

const Star = (props) => {
  const _handleHover = (event) => {
    event.stopPropagation();
    props.changeRatingOnHover(props.rating);
  }

  const _handleClick = (event) => {
    event.stopPropagation();
    props.changeRating(props.rating);
  }

  const stateClassSuffix = (props.shine === true ? 'shine' : 'dim');

  return (
    <div
      rating={props.rating}
      onClick={_handleClick}
      onMouseEnter={_handleHover}
      className={'UserAppRating__Star UserAppRating__Star--' + stateClassSuffix}>
      <StarIcon onClick={_handleClick}/>
    </div>
  )
}

export default UserAppRating;