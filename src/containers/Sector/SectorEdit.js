import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import config from '../../config';
import { initialize } from 'redux-form';
import { pushState } from 'redux-router';
import { save } from 'redux/modules/sectors';
import { SectorForm } from 'components';

@connect(state => ({
  sector: state.sectors.sector,
  error: state.sectors.error,
  loading: state.sectors.loading
}), {initialize, pushState, save})
export default class SectorEdit extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    sector: PropTypes.object,
    error: PropTypes.object,
    loading: PropTypes.bool,
    params: PropTypes.object
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sector) {
      this.props.initialize('sector', nextProps.sector);
    } else {
      this.props.pushState(null, '/sectors');
    }
  }

  handleSubmit = (data) => {
    this.props.save(data);
    this.props.initialize('sector', {});
    if (!this.props.error) {
      this.props.pushState(null, '/sectors');
    }
  }

  render() {
    return (
      <div className="container">
        <DocumentMeta title={config.app.title + ': Editando setor'}/>
        <Panel header="Editando setor" bsStyle="primary">
          <Grid fluid>
            <Row>
              <Col xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 }>
                <SectorForm onSubmit={this.handleSubmit}/>
              </Col>
            </Row>
          </Grid>
        </Panel>
      </div>
    );
  }
}
