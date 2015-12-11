import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as suppliersActions from 'redux/modules/suppliers';
import DocumentMeta from 'react-document-meta';
import config from '../../config';
import {SupplierTableList, SupplierSearchForm} from '../../components';


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
  }

  render() {
    const {list, loading, filter} = this.props;
    return (
      <div className="container">
        <DocumentMeta title={config.app.title + ': Clientes'}/>
        <Grid fluid>
          <Row>
            <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
              <Panel header="Clientes" bsStyle="primary">
                <Grid fluid>
                  <Row>
                    <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
                      <SupplierSearchForm onSubmit={filter} loading={loading} />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
                    {list && list.length &&
                      <SupplierTableList {...this.props}/>
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
