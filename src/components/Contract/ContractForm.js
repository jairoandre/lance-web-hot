import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import contractValidation from './contractValidation';
import {renderInput, renderSelect, renderFormBtns} from 'utils/renders';
import {ObjectSelect, DateInput} from 'components';

@reduxForm({
  form: 'service',
  fields: [
    'title',
    'finalDate',
    'beginDate',
    'changeDate',
    'supplier.id',
    'services'],
  validate: contractValidation
})
export default
class ContractForm extends Component {
  static propTypes = {
    supplierOptions: PropTypes.array,
    serviceOptions: PropTypes.array,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
  }
  render() {
    const {
      fields: {title, finalDate, beginDate, changeDate, supplier, services},
      handleSubmit,
      supplierOptions,
      serviceOptions,
      resetForm
      } = this.props;
    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {renderInput(title, 'Nome do serviço:')}
          <DateInput label="Data de início:" {...beginDate} />
          <DateInput label="Data de término:" {...finalDate} />
          <DateInput label="Data de reajuste:" {...changeDate} />
          {renderSelect(supplier.id, 'Cliente:', supplierOptions, 'id', 'title')}
          <ObjectSelect multiple label="Serviços:" options={serviceOptions.map((item) => {return {id: item.id, label: item.title};})} {...services}/>
          {renderFormBtns(handleSubmit, resetForm, '/contracts')}
        </form>
      </div>
    );
  }
}
