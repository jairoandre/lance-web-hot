import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import contractValidation from './contractValidation';
import {renderFormBtns} from 'utils/renders';
import {ObjectSelect, MultiInput} from 'components';

@reduxForm({
  form: 'contract',
  fields: [
    'title',
    'endDate',
    'beginDate',
    'changeDate',
    'supplier',
    'services[].service',
    'services[].amount'],
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
      fields: {title, endDate, beginDate, changeDate, supplier, services},
      handleSubmit,
      supplierOptions,
      serviceOptions,
      resetForm
      } = this.props;
    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <MultiInput label="Nome do serviço:" {...title} />
          <MultiInput isDate mask="11/11/1111" label="Data de início:" {...beginDate} />
          <MultiInput isDate label="Data de término:" {...endDate} />
          <MultiInput isDate label="Data de reajuste:" {...changeDate} />
          <ObjectSelect emptyOption label="Cliente:" options={supplierOptions.map((item) => {return {id: item.id, label: item.title};})} {...supplier}/>
          <div className="form-group">
            <button className="btn btn-primary"
            onClick={event => {
              event.preventDefault(); // prevent form submission
              services.addField();    // pushes empty child field onto the end of the array
            }}><i className="fa fa-file"/> Adicionar serviço
            </button>
          </div>
          {services && services.map((serv, idx) =>
          <div key={idx}>
            <ObjectSelect emptyOption label="Serviço:" options={serviceOptions.map((item) => {return {id: item.id, label: item.title};})} {...serv.service}/>
            <MultiInput isCurrency label="Valor:" {...serv.amount} />
            <div className="form-group">
              <button className="btn btn-danger" onClick={event => {
                event.preventDefault();   // prevent form submission
                services.removeField(idx); // remove from index
              }}><i/> Remover
              </button>
            </div>
          </div>)}
          {renderFormBtns(handleSubmit, resetForm, '/contracts')}
        </form>
      </div>
    );
  }
}
