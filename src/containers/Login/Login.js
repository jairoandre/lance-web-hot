import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { Input } from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import * as authActions from 'redux/modules/auth';
import config from '../../config';
import {Home} from '../';

@connect(
  state => ({user: state.auth.user}),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.refs.username.getInputDOMNode();
    this.props.login(input.value);
    input.value = '';
  }

  render() {
    const {user} = this.props;
    const styles = require('./Login.scss');
    const logoImage = require('../Home/logo.png');
    return (
      <div>
        {!user &&
          <div className={styles.loginContainer}>
            <DocumentMeta title={config.app.title + ': Login'}/>
            <div className={styles.logo}>
              <img src={logoImage}/>
              <p>Sistema Lance</p>
            </div>
            <hr/>
            <div>
              <form className="login-form form-group" onSubmit={this.handleSubmit}>
                <Input type="text" label="Usuário" groupClassName="group-class" labelClassName="label-class" ref="username" placeholder="Digite seu nome de usuário"/>
                <Input type="password" label="Senha" groupClassName="group-class" labelClassName="label-class" ref="password" placeholder="Digite sua senha"/>
                <button className="btn btn-success btn-block" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Entrar
                </button>
              </form>
            </div>
          </div>
        }
      {user &&
        <Home/>
      }
    </div>);
  }
}
