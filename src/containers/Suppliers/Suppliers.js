import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col, Panel, Alert, Fade} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as suppliersActions from 'redux/modules/suppliers';
import DocumentMeta from 'react-document-meta';
import config from '../../config';
import {TableList, FilterInput} from 'components';

@connect(
  state => ({
    list: state.suppliers.data,
    error: state.suppliers.error,
    loading: state.suppliers.loading,
  }), {...suppliersActions})
export default class Supplier extends Component {
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
    const fields = [
      ['id', 'Id'],
      ['title', 'Nome'],
      ['supplierCode', 'Código']];
    return (
      <div className="container">
        <DocumentMeta title={config.app.title + ': Clientes'}/>
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
              <Panel header="Clientes" bsStyle="primary">
                <Grid fluid>
                  <Row>
                    <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
                      <FilterInput onSubmit={filter} loading={loading} addBtnLabel="Novo cliente" addBtnRoute="/suppliers/add"/>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
                    {list && list.length && <TableList list={list} fields={fields}/>}
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
