import React from 'react';

export function renderInput(field, label) {
  return (
    <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
      <label htmlFor={field.name}>{label}</label>{field.error && field.touched && <span className="text-danger">{field.error}</span>}
      <input type="text" className="form-control" id={field.name} {...field}/>
    </div>);
}

export function renderSelect(field, label, options) {
  return (
    <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
      <label htmlFor={field.name}>{label}</label>{field.error && field.touched && <span className="text-danger">{field.error}</span>}
      <select id={field.name}
        className="form-control" {...field}>
        <option value="">Selecione...</option>
        {options}
      </select>
    </div>
  );
}
