import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import contractValidation from './contractValidation';
import {renderInput, renderSelect, renderFormBtns} from 'utils/renders';

@reduxForm({
  form: 'service',
  fields: [
    'title',
    'finalDate',
    'beginDate',
    'changeDate',
    'supplier.id',
    'service.id'],
  validate: contractValidation
})
export default
class ServiceForm extends Component {
  static propTypes = {
    suppliers: PropTypes.array,
    services: PropTypes.array,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
  }
  render() {
    const {
      fields: {title, finalDate, beginDate, changeDate, supplier, service},
      handleSubmit,
      suppliers,
      services,
      resetForm
      } = this.props;
    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {renderInput(title, 'Nome do serviço:')}
          {renderInput(beginDate, 'Data de início:')}
          {renderInput(finalDate, 'Data de término:')}
          {renderInput(changeDate, 'Data de reajuste:')}
          {renderSelect(supplier.id, 'Cliente:', suppliers, 'id', 'title')}
          {renderSelect(service.id, 'Serviço:', services, 'id', 'title')}
          {renderFormBtns(handleSubmit, resetForm, '/services')}
        </form>
      </div>
    );
  }
}
