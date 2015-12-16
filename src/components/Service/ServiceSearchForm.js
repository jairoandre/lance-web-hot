import React, {Component, PropTypes} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Input } from 'react-bootstrap';

export default class ServiceSearchForm extends Component {

  static propTypes = {
    loading: PropTypes.bool,
    onSubmit: PropTypes.func
  }

  handleClick = () => {
    this.props.onSubmit(this.refs.inputText.getValue());
    this.refs.inputText.getInputDOMNode().value = '';
  }

  render() {
    const {loading} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    return (
      <div>
        <div className="form-group">
          <Input id="name" ref="inputText" type="text" hasFeedback disabled={loading} placeholder="Descrição do tipo..." />
        </div>
        <div className="form-group">
          <button className="btn btn-success" disabled={loading} onClick={this.handleClick}>
            <i className={refreshClassName}/> {' '} Filtrar
          </button>
          {'  '}
          <LinkContainer to="/services/add">
            <button className="btn btn-primary" disabled={loading}>
              <i className="fa fa-file"/> {' '} Novo serviço
            </button>
          </LinkContainer>
        </div>
      </div>
    );
  }
}
