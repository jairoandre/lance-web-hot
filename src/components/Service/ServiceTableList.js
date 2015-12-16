import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import { ServiceListHeader, ServiceListRow } from './';

export default class ServiceTableList extends Component {

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
            <ServiceListRow item={item} />
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
        <ServiceListHeader />
        { listItems }
      </Table>
      );
  }
}
