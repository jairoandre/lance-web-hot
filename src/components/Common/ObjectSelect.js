import React, {Component, PropTypes} from 'react';

/**
 * Serializes and deserializes complex values to and from JSON
 *
 */
export default class ObjectSelect extends Component {
  static propTypes = {
    multiple: PropTypes.bool,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired
    })),
    label: PropTypes.string,
    name: PropTypes.string,
    error: PropTypes.string,
    touched: PropTypes.bool,
    value: PropTypes.any // array or individual value
  }

  render() {
    const {multiple, onBlur, onChange, options, value, label, name, error, touched, ...rest} = this.props;
    const parse = event => {
      if (multiple) {
        const result = [];
        // event.target.selectedOptions is a NodeList, not an array. Gross.
        for (let index = 0; index < event.target.selectedOptions.length; index++) {
          result.push(JSON.parse(event.target.selectedOptions[index].value));
        }
        return result;
      }
      return JSON.parse(event.target.value);
    };
    return (
      <div className={'form-group' + (error && touched ? ' has-error' : '')}>
        <label className="control-label" htmlFor={name}>
          {label}
        </label>
        {error && touched && <span className="text-danger">{error}</span>}
        <select
          id={name}
          className="form-control"
          multiple={multiple}
          onBlur={event => onBlur(parse(event))}
          onChange={event => onChange(parse(event))}
          value={multiple && value ? value.map(JSON.stringify) : JSON.stringify(value)}
          {...rest}>
            {options.map(option =>
              <option key={option.id} value={JSON.stringify(option)}>{option.label}</option>)}
        </select>
      </div>
    );
  }
}
