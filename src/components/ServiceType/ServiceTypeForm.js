import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import serviceTypeValidation from './serviceTypeValidation';

const name = 'serviceType';

@reduxForm({
  form: name,
  fields: ['title'],
  validate: serviceTypeValidation
})
export default
class ServiceTypeForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
  }

  render() {
    const {
      fields: {title},
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
