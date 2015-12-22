import React, {Component, PropTypes} from 'react';
import {OverlayTrigger} from 'react-bootstrap';
import {Calendar} from 'react-date-range';

/**
 * Serializes and deserializes complex values to and from JSON
 *
 */
export default class DateInput extends Component {
  static propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    error: PropTypes.string,
    touched: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.any // array or individual value
  }

  render() {
    const {label, name, error, onChange, touched, ...rest} = this.props;
    const handleSelect = (date) => {
      onChange(date.format('DD/MM/YYYY'));
    };
    const style = {
      position: 'absolute',
      backgroundColor: '#EEE',
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
      border: '1px solid #CCC',
      borderRadius: 3,
      marginLeft: -5,
      marginTop: 5,
      padding: 10
    };
    return (
      <div className={'form-group' + (error && touched ? ' has-error' : '')}>
        <label className="control-label" htmlFor={name}>{label}</label>
        {error && touched && <span className="text-danger">{error}</span>}
        <div className="input-group">
          <input type="text" className="form-control" id={name} {...rest}/>
          <span className="input-group-btn">
            <OverlayTrigger
            trigger="click"
            rootClose
            placement="bottom"
            overlay={<div style={style}><Calendar onChange={handleSelect} /></div>}>
              <button className="btn btn-secondary" type="button"><i className="fa fa-calendar"/></button>
            </OverlayTrigger>
          </span>
        </div>
      </div>
    );
  }
}
