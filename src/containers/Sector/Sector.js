import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col, Panel, Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import config from '../../config';
import * as sectors from 'redux/modules/sectors';
import {TableList, FilterInput} from 'components';


@connect(
  state => ({
    list: state.sectors.data,
    error: state.sectors.error,
    loading: state.sectors.loading,
  }), {...sectors})
export default class Sector extends Component {
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
      ['title', 'Descrição'],
      ['beginDate', 'Data de início'],
      ['finalDate', 'Data de término'],
      ['changeDate', 'Data de reajuste']];
    return (
      <div className="container">
        <DocumentMeta title={config.app.title + ': Contrato'}/>
        {error &&
          <Alert bsStyle="danger" onDismiss={clearErrors} dismissAfter={2000}>
            <h4>Erro</h4>
            <p>{error}</p>
          </Alert>
        }
        <Grid fluid>
          <Row>
            <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
              <Panel header="Setor" bsStyle="primary">
                <Grid fluid>
                  <Row>
                    <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
                      <FilterInput onSubmit={filter} loading={loading} addBtnLabel="Novo setor" addBtnRoute="/sectors/add"/>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
                    {list && list.length && <TableList list={list} fields={fields} onRemove={this.handleRemove}/>}
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
