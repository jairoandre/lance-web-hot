import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import { SupplierListHeader, SupplierListRow } from '../';

export default class SupplierTableList extends Component {

  static propTypes = {
    list: PropTypes.array.isRequired
  }

  render() {
    const {list} = this.props;
    let listItems;
    if (list && list.length > 0) {
      listItems = list.map((item, index) => {
        return (
          <tbody key={ index }>
            <SupplierListRow item={item} />
          </tbody>
          );
      });
    } else {
      listItems = (
        <tbody>
          <tr>
            <td colSpan="3">Lista vazia</td>
          </tr>
        </tbody>
      );
    }
    return (
      <Table striped hover>
        <SupplierListHeader />
        { listItems }
      </Table>
      );
  }
}
