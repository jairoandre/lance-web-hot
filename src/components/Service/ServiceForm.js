import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import serviceValidation from './serviceValidation';
import {renderInput, renderSelect} from 'utils/renders';

@reduxForm({
  form: 'service',
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
    serviceTypes: PropTypes.array,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
  }
  render() {
    const {
      fields: {title, defaultHistory, documentType, ledgerAccount, resultAccount, costAccount, serviceType},
      handleSubmit,
      serviceTypes,
      resetForm
      } = this.props;
    let options;
    if (serviceTypes) {
      options = serviceTypes.map((item, index) => {
        return (<option key={index} value={item.id}>{item.title}</option> );
      });
    }
    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {renderInput(title, 'Nome do serviço:')}
          {renderInput(defaultHistory, 'Histórico padrão:')}
          {renderInput(documentType, 'Tipo do documento:')}
          {renderInput(ledgerAccount, 'Conta contábil:')}
          {renderInput(resultAccount, 'Conta resultado:')}
          {renderInput(costAccount, 'Conta de custo:')}
          {renderSelect(serviceType.id, 'Tipo de serviço:', options)}
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
