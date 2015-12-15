import React, {Component, PropTypes} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {Grid, Row, Col, Input} from 'react-bootstrap';

export default class SupplierSearchForm extends Component {

  static propTypes = {
    loading: PropTypes.bool,
    onSubmit: PropTypes.func
  }

  handleClick = () => {
    this.props.onSubmit(this.refs.inputText.getValue());
    this.refs.inputText.getInputDOMNode().value = '';
  }

  render() {
    const {loading} = this.props;
    const styles = require('./SupplierSearchForm.scss');
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    return (
      <Grid fluid>
        <Row>
          <Col xs={ 6 } md={ 8 } sm={ 7 } lg={ 9 }>
            <Input id="name" ref="inputText" type="text" hasFeedback disabled={loading} placeholder="Nome do cliente..." />
          </Col>
          <Col xs={ 6 } md={ 4 } sm={ 5 } lg={ 3 } className={styles.btnCol}>
            <button className="btn btn-success" disabled={loading} onClick={this.handleClick}>
              <i className={refreshClassName}/> {' '} Filtrar
            </button>
            {'  '}
            <LinkContainer to="/suppliers/add">
              <button className="btn btn-primary" disabled={loading}>
                <i className="fa fa-file"/> {' '} Novo cliente
              </button>
            </LinkContainer>
          </Col>
        </Row>
      </Grid>
    );
  }
}
