import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import config from '../../config';
import {initialize} from 'redux-form';
import { pushState } from 'redux-router';
import { save } from 'redux/modules/serviceTypes';
import {ServiceTypeForm} from 'components';

@connect(state => ({
  error: state.serviceTypes.error,
  loading: state.serviceTypes.loading
}), {initialize, pushState, save})
export default class ServiceTypesNew extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    error: PropTypes.object,
    loading: PropTypes.bool
  }

  handleSubmit = (data) => {
    this.props.save(data);
    this.props.initialize('serviceType', {});
    if (this.props.error) {
      console.log(this.props.error);
    } else {
      this.props.pushState(null, '/serviceTypes');
    }
  }

  render() {
    return (
      <div className="container">
        <DocumentMeta title={config.app.title + ': Novo tipo de serviço'}/>
        <Panel header="Novo tipo de serviço" bsStyle="primary">
          <Grid fluid>
            <Row>
              <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
                <ServiceTypeForm onSubmit={this.handleSubmit}/>
              </Col>
            </Row>
          </Grid>
        </Panel>
      </div>
    );
  }
}
