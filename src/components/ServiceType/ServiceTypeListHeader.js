import React, { Component } from 'react';

export default class ServiceTypeListHeader extends Component {
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
                            <span>Descrição</span>
                        </th>
                        <th />
                    </tr>
                </thead>
      );
  }
}
