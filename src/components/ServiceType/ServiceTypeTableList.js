import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import { ServiceTypeListHeader, ServiceTypeListRow } from './';

export default class ServiceTypeTableList extends Component {

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
            <ServiceTypeListRow item={item} />
          </tbody>
          );
      });
    } else {
      listItems = (
        <tbody>
          <tr>
            <td colSpan="2">Lista vazia</td>
          </tr>
        </tbody>
      );
    }
    return (
      <Table striped hover>
        <ServiceTypeListHeader />
        { listItems }
      </Table>
      );
  }
}
