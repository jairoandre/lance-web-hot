import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import { ListHeader, ListRow } from './';

export default class TableList extends Component {

  static propTypes = {
    fields: PropTypes.array.isRequired,
    list: PropTypes.array,
    onDetail: PropTypes.func,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func
  }

  render() {
    const FIELD = 0;
    const HEADER = 1;
    const {list, fields, onRemove, onDetail, onEdit} = this.props;

    const extractInfo = (type) => {
      let extractList;
      extractList = fields.map((field) => {
        return field[type];
      });
      return extractList;
    };
    const _fields = extractInfo(FIELD);
    const _headers = extractInfo(HEADER);

    const interpolateField = (item, field) => {
      const splitedFields = field.split('.');
      let value = item[splitedFields[0]];
      for (let jdx = 1; jdx < splitedFields.length; jdx++) {
        value = value[splitedFields[jdx]];
      }
      return value;
    };

    let listItems;

    if (list && list.length > 0) {
      listItems = list.map((item, index) => {
        let interpolizedFields;
        interpolizedFields = _fields.map((field) => {
          return interpolateField(item, field);
        });
        return (
          <tbody key={index}>
            <ListRow id={item.id} fields={interpolizedFields} onRemove={onRemove} onDetail={onDetail} onEdit={onEdit}/>
          </tbody>
          );
      });
    } else {
      listItems = (
        <tbody>
          <tr>
            <td colSpan={fields.length}>Lista vazia</td>
          </tr>
        </tbody>
      );
    }
    return (
      <Table striped hover>
        <ListHeader headers={_headers} />
        { listItems }
      </Table>
      );
  }
}
