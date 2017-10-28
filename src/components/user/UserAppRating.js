import React, { Component } from 'react';
import db from "../../db/firebase";
import {Star as StarIcon} from '../../images/icons';

class UserAppRating extends Component {

  maxStars = 5;

  constructor(props) {
    super(props);
    this.state = {
      rating: props.rating,
      ratingOnHover: null
    }
  }

  render() {
    var stars = [];
    for (let i = 1; i <= this.maxStars; i++) {
      // the rating on hover overrides the real rating
      const currentRating = (this.state.ratingOnHover !== null ? this.state.ratingOnHover : this.state.rating);
      const starShine = (i <= currentRating);
      stars.push(
        <Star
          key={i}
          rating={i}
          shine={starShine}
          setRating={this._setRating.bind(this)}
          changeRatingOnHover={this._changeRatingOnHover.bind(this)}/>
      );
    }

    return (
      <div
        className="UserAppRating"
        onMouseLeave={this._clearRatingOnHover.bind(this)}>
        {stars}
      </div>
    )
  }

  _setRating(rating) {
    this.setState({
      rating
    });

    // and update the rating in the database
    console.log(this.props.accountId, this.props.appId)
  }

  _changeRatingOnHover(rating) {
    this.setState({
      ratingOnHover: rating
    });
  }

  _clearRatingOnHover() {
    this.setState({
      ratingOnHover: null
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
    props.setRating(props.rating);
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