import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import { SupplierListHeader, SupplierListRow } from '../';

class SupplierTableList extends Component {

  static propTypes = {
    list: PropTypes.array.isRequired
  }

  constructor(props, content) {
    super(props, content);
  }

  render() {
    const {list} = this.props;
    let listItems;
    if (list && list.length > 0) {
      listItems = list.map((item, index) => {
        return (<tbody key={ index }>
                    <SupplierListRow item={item} />
                </tbody>
          );
      });
    } else {
      listItems = (<tbody>
                             <tr><td colSpan="3">Lista vazia</td></tr>
                         </tbody>
      );
    }
    return (<Table {...this.props} striped hover>
              <SupplierListHeader />
              { listItems }
              </Table>
      );
  }
}
function mapStateToProps(state) {
  const {supplierData: {list}} = state;
  return {
    list
  };
}

export default connect(mapStateToProps)(SupplierTableList);
