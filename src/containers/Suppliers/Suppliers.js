import React, {Component, PropTypes} from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import {initialize} from 'redux-form';
import config from '../../config';
import { SupplierTableList, SupplierSearchForm } from '../../components';

@connect(
  () => ({}),
  {initialize})
export default class Supplier extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    params: PropTypes.object
  }

  handleSubmit = (data) => {
    window.alert('Data submitted! ' + JSON.stringify(data));
    this.props.initialize('survey', {});
  }

  render() {
    return (
      <div className="container">
                <DocumentMeta title={config.app.title + ': Clientes'}/>
                <Grid fluid>
                    <Row>
                        <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
                            <Panel header="Clientes"
                                   bsStyle="primary">
                                <Grid fluid>
                                    <Row>
                                        <Col xs={ 12 }
                                             md={ 12 }
                                             sm={ 12 }
                                             lg={ 12 }>
                                            <SupplierSearchForm params={ this.props.params } />
                                        </Col>
                                    </Row>
                                    <Row params={ this.props.params }>
                                        <Col xs={ 12 }
                                             md={ 12 }
                                             sm={ 12 }
                                             lg={ 12 }
                                             params={ this.props.params }>
                                            <SupplierTableList striped
                                                               hover
                                                               params={ this.props.params }/>
                                        </Col>
                                    </Row>
                                </Grid>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
      </div>
    );
  }
}
