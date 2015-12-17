import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import {connect} from 'react-redux';
import connectData from 'helpers/connectData';
import DocumentMeta from 'react-document-meta';
import config from '../../config';
import {initialize} from 'redux-form';
import {pushState} from 'redux-router';
import {filter as loadServiceTypes} from 'redux/modules/serviceTypes';
import {save} from 'redux/modules/services';
import {ServiceForm} from 'components';

function fetchDataDeferred(getState, dispatch) {
  return dispatch(loadServiceTypes(''));
}

@connectData(fetchDataDeferred, null)
@connect(state => ({
  serviceTypes: state.serviceTypes.data,
  saveError: state.services.saveError,
  loading: state.services.loading
}), {initialize, pushState, save})
export default class ServiceNew extends Component {
  static propTypes = {
    serviceTypes: PropTypes.array,
    initialize: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    saveError: PropTypes.object,
    loading: PropTypes.bool
  }

  handleSubmit = (data) => {
    alert(JSON.stringify(data));
    // this.props.save(data);
    // this.props.initialize('service', {});
    // if (this.props.saveError) {
    //   console.log(this.props.saveError);
    // } else {
    //   this.props.pushState(null, '/services');
    // }
  }

  render() {
    return (
      <div className="container">
        <DocumentMeta title={config.app.title + ': Novo serviço'}/>
        <Panel header="Novo serviço" bsStyle="primary">
          <Grid fluid>
            <Row>
              <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
                <ServiceForm onSubmit={this.handleSubmit} serviceTypes={this.props.serviceTypes}/>
              </Col>
            </Row>
          </Grid>
        </Panel>
      </div>
    );
  }
}
