import React, { Component } from 'react';

export default class ServiceListHeader extends Component {
  constructor(props, content) {
    super(props, content);
  }

  render() {
    return (<thead>
              <tr>
                <th>
                  <span>Id</span>
                </th>
                <th>
                  <span>Nome do serviço</span>
                </th>
                <th>
                  <span>Histórico padrão</span>
                </th>
                <th>
                  <span>Tipo de documento</span>
                </th>
                <th>
                  <span>Conta contábil</span>
                </th>
                <th>
                  <span>Conta resultado</span>
                </th>
                <th>
                  <span>Conta de custo</span>
                </th>
                <th>
                  <span>Tipo de serviço</span>
                </th>
                <th />
              </tr>
            </thead>
      );
  }
}
