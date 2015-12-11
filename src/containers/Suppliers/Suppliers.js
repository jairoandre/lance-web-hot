import React, {Component, PropTypes} from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import {connect} from 'react-redux';
import * as supplierActions from 'redux/modules/suppliers';
import {isLoaded, filter as loadSuppliers} from 'redux/modules/suppliers';
import DocumentMeta from 'react-document-meta';
import {initializeWithKey} from 'redux-form';
import config from '../../config';
import connectData from 'helpers/connectData';
import { SupplierTableList } from '../../components';


function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadSuppliers('teste'));
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    list: state.suppliers.data,
    error: state.suppliers.error,
    loading: state.suppliers.loading,
  }),
  {...supplierActions, initializeWithKey })
export default class Supplier extends Component {
  static propTypes = {
    list: PropTypes.array,
    error: PropTypes.object,
    loading: PropTypes.bool,
    dispatch: PropTypes.func,
    status: PropTypes.string,
    statusText: PropTypes.string
  }
  render() {
    const {list} = this.props;
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
                                             lg={ 12 }/>
                                    </Row>
                                    <Row>
                                        <Col xs={ 12 }
                                             md={ 12 }
                                             sm={ 12 }
                                             lg={ 12 }>
                                             {list && list.length &&
                                                <SupplierTableList
                                                  striped
                                                  hover
                                                  list={list}/>
                                              }
                                              {!list && 'Lista vazia!'}
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
