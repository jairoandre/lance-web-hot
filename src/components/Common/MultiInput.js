import React, {Component, PropTypes} from 'react';
import {OverlayTrigger} from 'react-bootstrap';
import {Calendar} from 'react-date-range';
import CurrencyMaskedInput from 'react-currency-masked-input';

/**
 * Serializes and deserializes complex values to and from JSON
 *
 */
export default class MultiInput extends Component {
  static propTypes = {
    label: PropTypes.string,
    isDate: PropTypes.bool,
    isCurrency: PropTypes.bool,
    touched: PropTypes.bool,
    error: PropTypes.string,
    name: PropTypes.string,
    mask: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any // array or individual value
  }

  render() {
    const {label, isDate, isCurrency, mask} = this.props;
    const handleSelect = (date) => {
      this.props.onChange(date.format('DD/MM/YYYY'));
    };
    const style = {
      position: 'absolute',
      backgroundColor: '#EEE',
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
      border: '1px solid #CCC',
      borderRadius: 3,
      marginLeft: -5,
      marginTop: 5,
      padding: 10,
      zIndex: 9999
    };
    return (
      <div className={'form-group' + (this.props.error && this.props.touched ? ' has-error' : '')}>
        <label className="control-label" htmlFor={name}>{label}</label>
        {this.props.error && this.props.touched && <span className="text-danger">{this.props.error}</span>}
        {!isCurrency && !mask && <input id={this.props.name} type="text" className="form-control" {...this.props}/>}
        {!isCurrency && mask && <input id={this.props.name} mask={mask} className="form-control" {...this.props}/>}
        {isCurrency && <CurrencyMaskedInput id={this.props.name} className="form-control" {...this.props}/>}
        {isDate &&
          <OverlayTrigger
          trigger="click"
          rootClose
          placement="bottom"
          overlay={<div style={style}><Calendar date={this.props.value} onChange={handleSelect} /></div>}>
            <span><i className="fa fa-calendar"/></span>
          </OverlayTrigger>}
      </div>
    );
  }
}
