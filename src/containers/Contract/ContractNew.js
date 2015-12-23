import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import {connect} from 'react-redux';
import connectData from 'helpers/connectData';
import DocumentMeta from 'react-document-meta';
import config from '../../config';
import {initialize} from 'redux-form';
import {pushState} from 'redux-router';
import {filter as filterServices} from 'redux/modules/services';
import {filter as filterSuppliers} from 'redux/modules/suppliers';
import {save} from 'redux/modules/contracts';
import {ContractForm} from 'components';

function fetchData(getState, dispatch) {
  const promises = [];
  promises.push(dispatch(filterSuppliers('')));
  promises.push(dispatch(filterServices('')));
  return Promise.all(promises);
}

@connectData(fetchData)
@connect(state => ({
  suppliers: state.suppliers.data,
  services: state.services.data,
  error: state.contracts.error,
  loading: state.contracts.loading
}), {initialize, pushState, save, filterServices, filterSuppliers})
export default class ContractNew extends Component {
  static propTypes = {
    suppliers: PropTypes.array,
    services: PropTypes.array,
    initialize: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    error: PropTypes.object,
    loading: PropTypes.bool
  }

  handleSubmit = (data) => {
    console.log(JSON.stringify(data));
    this.props.save(data);
    if (this.props.error) {
      console.log(this.props.error);
    } else {
      this.props.initialize('contract', {});
      this.props.pushState(null, '/contracts');
    }
  }

  render() {
    return (
      <div className="container">
        <DocumentMeta title={config.app.title + ': Novo contrato'}/>
        <Panel header="Novo contrato" bsStyle="primary">
          <Grid fluid>
            <Row>
              <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
                <ContractForm onSubmit={this.handleSubmit}
                  serviceOptions={this.props.services}
                  supplierOptions={this.props.suppliers}/>
              </Col>
            </Row>
          </Grid>
        </Panel>
      </div>
    );
  }
}
