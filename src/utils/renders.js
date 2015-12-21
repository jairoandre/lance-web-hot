import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

export function renderInput(field, label) {
  return (
    <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
      <label className="control-label" htmlFor={field.name}>{label}</label>{field.error && field.touched && <span className="text-danger">{field.error}</span>}
      <input type="text" className="form-control" id={field.name} {...field}/>
    </div>);
}

export function renderSelect(field, label, list, listId, listLabel) {
  let options;
  if (list) {
    options = list.map((item, index) => {
      return (<option key={index} value={item[listId]}>{item[listLabel]}</option>);
    });
  }
  return (
    <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
      <label className="control-label" htmlFor={field.name}>{label}</label>{field.error && field.touched && <span className="text-danger">{field.error}</span>}
      <select id={field.name}
        className="form-control" {...field}>
        <option value="">Selecione...</option>
        {options}
      </select>
    </div>
  );
}

export function renderFormBtns(handleSubmit, resetForm, urlToBack) {
  return (
    <div className="form-group">
      <button className="btn btn-success" onClick={handleSubmit}>
        <i className="fa fa-paper-plane"/> Salvar
      </button>
      {urlToBack && <LinkContainer to={urlToBack}>
        <button className="btn btn-primary" style={{marginLeft: 5}}>
          <i className="fa fa-arrow-left"/> Voltar
        </button>
      </LinkContainer>}
      <button className="btn btn-warning" onClick={resetForm} style={{marginLeft: 5, float: 'right'}}>
        <i className="fa fa-undo"/> Resetar
      </button>
    </div>
  );
}
