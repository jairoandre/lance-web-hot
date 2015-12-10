import React, { Component } from 'react';

class SupplierListHeader extends Component {
  constructor(props, content) {
    super(props, content);
  }

  render() {
    return (<thead {...this.props}>
                    <tr>
                        <th>
                            <span>Id</span>
                        </th>
                        <th>
                            <span>Nome</span>
                        </th>
                        <th>
                            <span>Código</span>
                        </th>
                        <th />
                    </tr>
                </thead>
      );
  }
}

export default SupplierListHeader;
