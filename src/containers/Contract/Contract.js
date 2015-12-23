import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import config from '../../config';
import * as contracts from 'redux/modules/contracts';
import {TableList, FilterInput, ModalError} from 'components';


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
      ['endDate', 'Data de término'],
      ['changeDate', 'Data de reajuste']];
    return (
      <div className="container">
        <DocumentMeta title={config.app.title + ': Contrato'}/>
        {error && <ModalError error={error} onHide={clearErrors}/>}
        <Grid fluid>
          <Row>
            <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
              <Panel header="Contrato" bsStyle="primary">
                <Grid fluid>
                  <Row>
                    <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
                      <FilterInput onSubmit={filter} loading={loading} addBtnLabel="Novo contrato" addBtnRoute="/contracts/add"/>
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
