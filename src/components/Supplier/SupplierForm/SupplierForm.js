import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import supplierValidation from './supplierValidation';

@reduxForm({
  form: 'supplier',
  fields: ['title', 'supplierCode', 'sector'],
  validate: supplierValidation
})
export default
class SupplierForm extends Component {
  static propTypes = {
    active: PropTypes.string,
    fields: PropTypes.object.isRequired,
    dirty: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired
  }

  render() {
    const {
      dirty,
      fields: {title, supplierCode, sector},
      active,
      handleSubmit,
      invalid,
      resetForm,
      pristine,
      valid
      } = this.props;
    console.log('Form status: [A: ' + active + ', D: ' + dirty + ', I:' + invalid + ', P:' + pristine + ', V:' + valid);
    const renderInput = (field, label) =>
      <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
        <label htmlFor={field.name} className="col-sm-2">{label}</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id={field.name} {...field}/>
          {field.error && field.touched && <div className="text-danger">{field.error}</div>}
        </div>
      </div>;

    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {renderInput(title, 'Descrição:')}
          {renderInput(supplierCode, 'Código de fornecedor:')}
          {renderInput(sector, 'Setor:')}
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-success" onClick={handleSubmit}>
                <i className="fa fa-paper-plane"/> Salvar
              </button>
              <button className="btn btn-warning" onClick={resetForm} style={{marginLeft: 15}}>
                <i className="fa fa-undo"/> Resetar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

