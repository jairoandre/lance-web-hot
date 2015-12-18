import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import serviceTypeValidation from './serviceTypeValidation';
import {renderInput, renderFormBtns} from 'utils/renders';

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
    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {renderInput(title, 'Descrição:')}
          {renderFormBtns(handleSubmit, resetForm)}
        </form>
      </div>
    );
  }
}
