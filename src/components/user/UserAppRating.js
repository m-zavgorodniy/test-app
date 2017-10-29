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
    this.ratingDbKey = null; // if voted, keeps the id from the database so the user is able to change the vote
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
          setRating={(rating) => this._setRating(rating)}
          changeRatingOnHover={(rating) => this._changeRatingOnHover(rating)}/>
      );
    }

    return (
      <div
        className="UserAppRating"
        onMouseLeave={() => this._clearRatingOnHover()}>
        {stars}
      </div>
    )
  }

  _setRating(rating) {
    this.setState({
      rating
    });
    this._updateRating(rating);
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

  // updates the rating in the database
  _updateRating(rating) {
    let itemPath = `/accounts/${this.props.accountId}/apps/${this.props.appId}/ratings/`;
    // a little imitation of user auth within the page's lifespan
    if (this.ratingDbKey === null) {
      // if the user has not voted, push a new rating and keep its key to let them change it
      const ratingKey = db.ref(itemPath).push({rating}).key;
      this.ratingDbKey = ratingKey;
    } else {
      // if the user has just voted, let them quickly change their mind
      itemPath += this.ratingDbKey;
      db.ref(itemPath).set({rating});
    }
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