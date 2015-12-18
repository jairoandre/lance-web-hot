import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import config from '../../config';
import {pushState} from 'redux-router';

@connect(
  state => ({user: state.auth.user}), {pushState})
export default class Home extends Component {
  static propTypes = {
    user: PropTypes.object,
    pushState: PropTypes.func.isRequired
  }

  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    if (!this.props.user) {
      this.props.pushState(null, '/login');
    }
    return (
      <div className={styles.homeWrapper}>
        <div className="container">
          <div className={styles.home}>
            <div className={styles.masthead}>
              <div className={styles.logo}>
                <p>
                  <img src={logoImage} />
                </p>
              </div>
              <h1>{config.app.title}</h1>
              <h2>{config.app.description}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
