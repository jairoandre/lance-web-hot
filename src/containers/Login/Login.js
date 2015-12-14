import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { Input } from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import * as authActions from 'redux/modules/auth';
import config from '../../config';
import {Home} from '../';

@connect(
  state => ({user: state.auth.user, loading: state.auth.loading}),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    loading: PropTypes.bool,
    login: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const input = this.refs.username.getInputDOMNode();
    const password = this.refs.password.getInputDOMNode();
    this.props.login(input.value, password.value);
    input.value = '';
    input.password = '';
  }

  render() {
    const {user, loading} = this.props;
    const styles = require('./Login.scss');
    const logoImage = require('../Home/logo.png');
    let refreshClassName = 'fa fa-sign-in';
    if (loading) {
      refreshClassName = 'fa fa-refresh fa-spin';
    }
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
                <Input type="text" disabled={loading} label="Usuário" groupClassName="group-class" labelClassName="label-class" ref="username" placeholder="Digite seu nome de usuário"/>
                <Input type="password" disabled={loading} label="Senha" groupClassName="group-class" labelClassName="label-class" ref="password" placeholder="Digite sua senha"/>
                <button className="btn btn-success btn-block" disabled={loading} onClick={this.handleSubmit}><i className={refreshClassName}/>{' '}Entrar
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
