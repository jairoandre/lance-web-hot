import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col, Panel, Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import config from '../../config';
import * as contracts from 'redux/modules/contracts';
import {ContractTableList, ContractSearchForm} from 'components';


@connect(
  state => ({
    list: state.contracts.data,
    error: state.contracts.error,
    loading: state.contracts.loading,
  }), {...contracts})
export default class Contract extends Component {
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
        <DocumentMeta title={config.app.title + ': Contrato'}/>
        {this.props.error &&
          <Alert bsStyle="danger" onDismiss={clearErrors} dismissAfter={2000}>
            <h4>Erro</h4>
            <p>{this.props.error}</p>
          </Alert>
        }
        <Grid fluid>
          <Row>
            <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
              <Panel header="Contrato" bsStyle="primary">
                <Grid fluid>
                  <Row>
                    <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
                      <ContractSearchForm onSubmit={filter} loading={loading} />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
                    {list && list.length && <ContractTableList {...this.props}/>}
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
