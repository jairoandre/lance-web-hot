import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button, Input } from 'react-bootstrap';
// import { fetchSuppliersData } from './action';

class SupplierSearchForm extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    status: PropTypes.string,
    statusText: PropTypes.string
  }

  constructor(props, content) {
    super(props, content);
    this.handleFetch = this.handleFetch.bind(this);
  }
  handleFetch(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const {dispatch} = this.props;
    const {inputText} = this.refs;
    // dispatch(fetchSuppliersData(inputText.getValue()));
    dispatch(inputText.getValue());
  }

  render() {
    const {status} = this.props;
    let fetchButton = null;
    if (status === 'loading') {
      fetchButton = (
        <Button
          bsStyle="primary"
          onClick={ this.handleFetch }
          disabled>
          <span>Carregando...</span>
          {  }
          <i className="fa fa-spinner fa-spin"></i>
        </Button>
      );
    } else if (status === 'done') {
      fetchButton = (<Button
      bsStyle="primary"
      onClick={ this.handleFetch }>
                               <span>Filtrar</span>
                           </Button>
      );
    } else if (status === 'error') {
      fetchButton = (<Button
      bsStyle="primary"
      onClick={ this.handleFetch }>
                               <span>Erro!</span>
                               <span className="fa fa-warn"></span>
                           </Button>
      );
    }
    return (<form {...this.props}>
                    <Grid fluid>
                        <Row>
                            <Col
      xs={ 10 }
      md={ 10 }
      sm={ 10 }
      lg={ 10 }>
                                <Input
      ref="inputText"
      type="text"
      hasFeedback
      disabled = {status === 'loading'}
      placeholder="Nome do cliente..." />
                            </Col>
                            <Col xs={ 2 }
      md={ 2 }
      sm={ 2 }
      lg={ 2 }>
                                { fetchButton }
                            </Col>
                        </Row>
                    </Grid>
                </form>
      );
  }
}
function mapStateToProps(state) {
  const {supplierData: {fetching: {status, statusText}}} = state;
  return {
    status,
    statusText
  };
}

export default connect(mapStateToProps)(SupplierSearchForm);
