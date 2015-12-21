import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import config from '../../config';
import * as serviceActions from 'redux/modules/services';
import {TableList, FilterInput, ModalError} from 'components';

@connect(
  state => ({
    list: state.services.data,
    error: state.services.error,
    loading: state.services.loading,
  }), {...serviceActions})
export default class Service extends Component {
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
      ['title', 'Nome do serviço'],
      ['defaultHistory', 'Histórico padrão'],
      ['documentType', 'Tipo de documento'],
      ['ledgerAccount', 'Conta contábil'],
      ['resultAccount', 'Conta resultado'],
      ['costAccount', 'Conta de custo'],
      ['serviceType.title', 'Tipo de serviço']];
    return (
      <div className="container">
        <DocumentMeta title={config.app.title + ': Serviço'}/>
        {error && <ModalError error={error} onHide={clearErrors}/>}
        <Grid fluid>
          <Row>
            <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
              <Panel header="Serviço" bsStyle="primary">
                <Grid fluid>
                  <Row>
                    <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
                      <FilterInput onSubmit={filter} loading={loading} addBtnLabel="Novo serviço" addBtnRoute="/services/add"/>
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
