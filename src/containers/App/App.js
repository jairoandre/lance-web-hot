import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, NavBrand, Nav, NavItem, CollapsibleNav, NavDropdown } from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import config from '../../config';

function fetchData(getState, dispatch) {
  const promises = [];
  if (!isAuthLoaded(getState())) {
    promises.push(dispatch(loadAuth()));
  }
  return Promise.all(promises);
}

@connectData(fetchData)
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState(null, '/');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState(null, '/login');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    const {user} = this.props;
    const styles = require('./App.scss');
    return (
      <div className={styles.app}>
        <DocumentMeta {...config.app}/>
        {user &&
        <Navbar fixedTop toggleNavKey={0}>
          <NavBrand>
            <IndexLink to="/">
              <div className={styles.brand}/>
              <span>{config.app.title}</span>
            </IndexLink>
          </NavBrand>

          <CollapsibleNav eventKey={0}>
            <Nav navbar>
              <NavDropdown id="dropdowCRUD" eventKey={1} title="Cadastro">
                <LinkContainer to="/sectors">
                  <NavItem eventKey={1.0}>Setores</NavItem>
                </LinkContainer>
                <LinkContainer to="/suppliers">
                  <NavItem eventKey={1.1}>Clientes</NavItem>
                </LinkContainer>
                <LinkContainer to="/services">
                  <NavItem eventKey={1.2}>Serviços</NavItem>
                </LinkContainer>
                <LinkContainer to="/contracts">
                  <NavItem eventKey={1.3}>Contratos</NavItem>
                </LinkContainer>
              </NavDropdown>
              <NavDropdown id="dropdownEntrys" eventKey={2} title="Lançamentos">
                <LinkContainer to="/entrys/add">
                  <NavItem eventKey={2.0}>Gerar lançamentos</NavItem>
                </LinkContainer>
                <LinkContainer to="/entrys/audit">
                  <NavItem eventKey={2.1}>Avaliar lançamentos</NavItem>
                </LinkContainer>
              </NavDropdown>
              <LinkContainer to="/reports">
                <NavItem eventKey={3}>Relatórios</NavItem>
              </LinkContainer>
              <LinkContainer to="/widgets">
                <NavItem eventKey={4}>Widgets</NavItem>
              </LinkContainer>
            </Nav>
            <Nav navbar right>
              <NavItem>Olá, <strong>{user.name}</strong>.</NavItem>
              <LinkContainer to="/logout">
                <NavItem eventKey={4} onClick={this.handleLogout}>
                  <i className="fa fa-sign-out"/> Logout
                </NavItem>
              </LinkContainer>
            </Nav>
          </CollapsibleNav>
        </Navbar>}

        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
