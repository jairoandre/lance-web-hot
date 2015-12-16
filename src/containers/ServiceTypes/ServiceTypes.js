import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col, Panel, Alert, Fade} from 'react-bootstrap';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import config from '../../config';
import * as serviceTypesActions from 'redux/modules/serviceTypes';
import {ServiceTypeTableList, ServiceTypeSearchForm} from 'components';


@connect(
  state => ({
    list: state.serviceTypes.data,
    error: state.serviceTypes.error,
    loading: state.serviceTypes.loading,
  }), {...serviceTypesActions})
export default class ServiceTypes extends Component {
  static propTypes = {
    list: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired,
    filter: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  render() {
    const {list, loading, filter, clearErrors} = this.props;
    return (
      <div className="container">
        <DocumentMeta title={config.app.title + ': Tipo de serviço'}/>
        {this.props.error &&
          <Fade in={this.props.error}>
            <Alert bsStyle="danger" onDismiss={clearErrors} dismissAfter={2000}>
              <h4>Erro</h4>
              <p>{this.props.error}</p>
            </Alert>
          </Fade>
        }
        <Grid fluid>
          <Row>
            <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
              <Panel header="Tipo de serviço" bsStyle="primary">
                <Grid fluid>
                  <Row>
                    <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
                      <ServiceTypeSearchForm onSubmit={filter} loading={loading} />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
                    {list && list.length && <ServiceTypeTableList {...this.props}/>}
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
