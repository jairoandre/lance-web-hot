import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import supplierValidation from './supplierValidation';

@reduxForm({
  form: 'supplier',
  fields: ['title', 'supplierCode'],
  validate: supplierValidation
})
export default
class SupplierForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
  }

  render() {
    const {
      fields: {title, supplierCode},
      handleSubmit,
      resetForm
      } = this.props;
    const renderInput = (field, label) =>
      <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
        <label htmlFor={field.name}>{label}</label>{field.error && field.touched && <span className="text-danger">{field.error}</span>}
        <input type="text" className="form-control" id={field.name} {...field}/>
      </div>;
    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {renderInput(title, 'Descrição:')}
          {renderInput(supplierCode, 'Código de fornecedor:')}
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

