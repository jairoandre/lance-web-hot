import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import DocumentMeta from 'react-document-meta';
import config from '../../config';
import { pushState } from 'redux-router';
import { save } from 'redux/modules/suppliers';
import {SupplierForm} from 'components';

@connect(state => ({
  error: state.suppliers.error,
  loading: state.suppliers.loading
}), {initialize, pushState, save})
export default class SuppliersNew extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    error: PropTypes.object,
    loading: PropTypes.bool
  }

  handleSubmit = (data) => {
    this.props.save(data);
    this.props.initialize('supplier', {});
    if (this.props.error) {
      console.log(this.props.error);
    } else {
      this.props.pushState(null, '/suppliers');
    }
  }

  render() {
    return (
      <div className="container">
        <DocumentMeta title={config.app.title + ': Novo cliente'}/>
        <Panel header="Novo cliente" bsStyle="primary">
          <Grid fluid>
            <Row>
              <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
                <SupplierForm onSubmit={this.handleSubmit}/>
              </Col>
            </Row>
          </Grid>
        </Panel>
      </div>
    );
  }
}
