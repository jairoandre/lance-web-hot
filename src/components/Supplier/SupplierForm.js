import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import supplierValidation from './supplierValidation';
import {renderInput, renderFormBtns} from 'utils/renders';

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
    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {renderInput(title, 'Descrição:')}
          {renderInput(supplierCode, 'Código de fornecedor:')}
          {renderFormBtns(handleSubmit, resetForm, '/suppliers')}
        </form>
      </div>
    );
  }
}

