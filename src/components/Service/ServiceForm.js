import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import serviceValidation from './serviceValidation';

const name = 'service';

@reduxForm({
  form: name,
  fields: [
    'title',
    'defaultHistory',
    'documentType',
    'ledgerAccount',
    'resultAccount',
    'costAccount',
    'serviceType.id'],
  validate: serviceValidation
})
export default
class ServiceForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
  }
  render() {
    const {
      fields: {title, defaultHistory, documentType, ledgerAccount, resultAccount, costAccount, serviceType},
      handleSubmit,
      resetForm
      } = this.props;
    const serviceTypes = [{id: 1, title: 'Tipo 1'}, {id: 2, title: 'Tipo 2'}];
    let listItems;
    listItems = serviceTypes.map((item, index) => {
      return (<option key={index} label={item.title}>{item.id}</option> );
    });
    const renderInput = (field, label) =>
      <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
        <label htmlFor={field.name}>{label}</label>{field.error && field.touched && <span className="text-danger">{field.error}</span>}
        <input type="text" className="form-control" id={field.name} {...field}/>
      </div>;
    const renderSelect = (field) =>
      <div className="form-group">
        <label>Tipo de serviço:</label>{field.error && field.touched && <span className="text-danger">{field.error}</span>}
        <select className="form-control" id={field.name} {...field}>
          <option label="Selecione..."></option>
          {listItems}
        </select>
      </div>;
    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {renderInput(title, 'Nome do serviço:')}
          {renderInput(defaultHistory, 'Histórico padrão:')}
          {renderInput(documentType, 'Tipo do documento:')}
          {renderInput(ledgerAccount, 'Conta contábil:')}
          {renderInput(resultAccount, 'Conta resultado:')}
          {renderInput(costAccount, 'Conta de custo:')}
          {renderSelect(serviceType.id)}
          <div className="form-group">
            <button className="btn btn-success" onClick={handleSubmit}>
              <i className="fa fa-paper-plane"/> Salvar
            </button>
            <button className="btn btn-warning" onClick={resetForm} style={{marginLeft: 5}}>
              <i className="fa fa-undo"/> Resetar
            </button>
          </div>
        </form>
      </div>
    );
  }
}
