import React, {Component, PropTypes} from 'react';
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
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    return (
      <Grid fluid>
        <Row>
          <Col xs={ 8 } md={ 8 } sm={ 8 } lg={ 8 }>
            <Input id="name" ref="inputText" type="text" hasFeedback disabled={loading} placeholder="Nome do cliente..." />
          </Col>
          <Col xs={ 4 } md={ 4 } sm={ 4 } lg={ 4 }>
            <button className="btn btn-success" disabled={loading} onClick={this.handleClick}>
              <i className={refreshClassName}/> {' '} Filtrar
            </button>
            {'  '}
            <button className="btn btn-primary" disabled={loading} onClick={this.handleClick}>
              <i className="fa fa-file"/> {' '} Novo cliente
            </button>
          </Col>
        </Row>
      </Grid>
    );
  }
}
