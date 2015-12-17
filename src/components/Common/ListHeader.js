import React, { Component, PropTypes } from 'react';

export default class ListHeader extends Component {

  static propTypes = {
    headers: PropTypes.array.isRequired
  }

  constructor(props, content) {
    super(props, content);
  }

  render() {
    const {headers} = this.props;
    let headersTH;
    headersTH = headers.map((header, index) => {
      return (
        <th key={index}>
          <span>{header}</span>
        </th>
      );
    });
    return (<thead>
              <tr>
                {headersTH}
                <th />
              </tr>
            </thead>
      );
  }
}
