import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import config from '../../config';
import * as serviceTypesActions from 'redux/modules/serviceTypes';
import {TableList, FilterInput, ModalError} from 'components';

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
    remove: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  handleRemove = (id) => {
    this.props.remove(id);
  }

  render() {
    const {list, loading, filter, error, clearErrors} = this.props;
    const fields = [
      ['id', 'Id'],
      ['title', 'Nome']];
    return (
      <div className="container">
        <DocumentMeta title={config.app.title + ': Tipo de serviço'}/>
        {error && <ModalError error={error} onHide={clearErrors}/>}
        <Grid fluid>
          <Row>
            <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
              <Panel header="Tipo de serviço" bsStyle="primary">
                <Grid fluid>
                  <Row>
                    <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
                      <FilterInput onSubmit={filter} loading={loading} addBtnLabel="Novo tipo de serviço" addBtnRoute="/serviceTypes/add"/>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
                      <TableList list={list} fields={fields} onRemove={this.handleRemove}/>
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
