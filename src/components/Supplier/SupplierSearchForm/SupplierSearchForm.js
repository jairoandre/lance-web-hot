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
          <Col xs={ 10 } md={ 10 } sm={ 10 } lg={ 10 }>
            <Input id="name" ref="inputText" type="text" hasFeedback disabled={loading} placeholder="Nome do cliente..." />
          </Col>
          <Col xs={ 2 } md={ 2 } sm={ 2 } lg={ 2 }>
            <button className="btn btn-success" disabled={loading} onClick={this.handleClick}>
              <i className={refreshClassName}/> {' '} Filtrar
            </button>
          </Col>
        </Row>
      </Grid>
    );
  }
}
