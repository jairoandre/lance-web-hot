import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import config from '../../config';
import * as sectors from 'redux/modules/sectors';
import { TableList, FilterInput, ModalError } from 'components';
import { pushState } from 'redux-router';

@connect(
  state => ({
    list: state.sectors.data,
    error: state.sectors.error,
    loading: state.sectors.loading,
  }), {...sectors, pushState})
export default class Sector extends Component {
  static propTypes = {
    list: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired,
    filter: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    pushState: PropTypes.func
  }

  handleRemove = (id) => {
    this.props.remove(id);
  }

  handleEdit = (id) => {
    console.log(id);
    this.props.editStart(id);
    this.props.pushState(null, 'sectors/edit');
  }

  render() {
    const {list, loading, filter, error, clearErrors} = this.props;
    const fields = [
      ['id', 'Id'],
      ['name', 'Nome'],
      ['details', 'Detalhes'],
      ['area', 'Área']];
    return (
      <div className="container">
        <DocumentMeta title={config.app.title + ': Setor'}/>
        {error && <ModalError error={error} onHide={clearErrors}/>}
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
                      <TableList list={list} fields={fields} onEdit={this.handleEdit} onRemove={this.handleRemove}/>
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
