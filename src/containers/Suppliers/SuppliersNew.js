import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import DocumentMeta from 'react-document-meta';
import config from '../../config';
import {SupplierForm} from 'components';

@connect(() => ({}), {initialize})
export default class SuppliersNew extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired
  }

  handleSubmit = (data) => {
    window.alert('Data submitted! ' + JSON.stringify(data));
    this.props.initialize('survey', {});
  }

  render() {
    return (
      <div className="container">
        <DocumentMeta title={config.app.title + ': Novo cliente'}/>
        <Panel header="Novo cliente" bsStyle="primary">
          <Grid fluid>
            <Row>
              <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
                <SupplierForm onSubmit={this.handleSubmit}/>
              </Col>
            </Row>
          </Grid>
        </Panel>
      </div>
    );
  }
}
