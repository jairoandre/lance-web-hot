import React, { Component, PropTypes } from 'react';

const {styles} = require('../../../theme/variables.scss');

class SupplierListRow extends Component {

  constructor(props, content) {
    super(props, content);
  }

  render() {
    const {item} = this.props;
    console.log(styles);
    return (
      <tr>
        <td>
            <span>{ item.id }</span>
        </td>
        <td>
            <span>{ item.title }</span>
        </td>
        <td>
            <span>{ item.supplierCode }</span>
        </td>
        <td className="tdLinks">
          <div className="table-list-actions">
            <a href={'detail/' + item.id}>
              <i className="fa fa-eye" ></i>
            </a>
            <a href={'edit/' + item.id}>
             <i className="fa fa-edit" ></i>
            </a>
            <a href={'delete/' + item.id}>
             <i className="fa fa-trash" ></i>
            </a>
          </div>
        </td>
      </tr>
    );
  }
}
SupplierListRow.defaultProps = {
  item: {
    id: 0,
    title: 'title',
    supplierCode: -9999
  }
};
SupplierListRow.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    supplierCode: PropTypes.number
  })
};

export default SupplierListRow;
