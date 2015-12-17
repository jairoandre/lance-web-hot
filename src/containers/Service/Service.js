import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col, Panel, Alert, Fade} from 'react-bootstrap';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import config from '../../config';
import * as serviceActions from 'redux/modules/services';
import {TableList, FilterInput} from 'components';

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
    clearErrors: PropTypes.func.isRequired
  }

  render() {
    const {list, loading, filter, error, clearErrors} = this.props;
    let showMessage;
    if (error) {
      showMessage = true;
    }
    const hideMessage = () => {
      showMessage = false;
      setTimeout(clearErrors(), 2000);
    };
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
        {error &&
          <Fade in={showMessage}>
            <Alert bsStyle="danger" onDismiss={hideMessage} dismissAfter={2000}>
              <h4>Erro</h4>
              <p>{error}</p>
            </Alert>
          </Fade>
        }
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
