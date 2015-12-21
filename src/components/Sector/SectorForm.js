import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import sectorValidation from './sectorValidation';
import {renderInput, renderFormBtns} from 'utils/renders';

@reduxForm({
  form: 'sector',
  fields: [
    'name',
    'details',
    'area'],
  validate: sectorValidation
})
export default
class SectorForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
  }
  render() {
    const {
      fields: {name, details, area},
      handleSubmit,
      resetForm
      } = this.props;
    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {renderInput(name, 'Nome:')}
          {renderInput(details, 'Detalhes:')}
          {renderInput(area, 'Área:')}
          {renderFormBtns(handleSubmit, resetForm, '/sectors')}
        </form>
      </div>
    );
  }
}
