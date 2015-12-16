import React, { Component, PropTypes } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

class ServiceListRow extends Component {

  constructor(props, content) {
    super(props, content);
  }

  render() {
    const {item} = this.props;
    const styles = require('theme/common.scss');
    const detailTooltip = <Tooltip id={'detailTooltip_' + item.id}><strong>Detalhar</strong></Tooltip>;
    const editTooltip = <Tooltip id={'editTooltip_' + item.id}><strong>Editar</strong></Tooltip>;
    const deleteTooltip = <Tooltip id={'deleteTooltip_' + item.id}><strong>Deletar</strong></Tooltip>;
    return (
      <tr>
        <td>
          <span>{ item.id }</span>
        </td>
        <td>
          <span>{ item.title }</span>
        </td>
        <td>
          <span>{ item.defaultHistory }</span>
        </td>
        <td>
          <span>{ item.documentType }</span>
        </td>
        <td>
          <span>{ item.ledgerAccount }</span>
        </td>
        <td>
          <span>{ item.resultAccount }</span>
        </td>
        <td>
          <span>{ item.costAccount }</span>
        </td>
        <td>
          <span>{ item.serviceType.title }</span>
        </td>
        <td className={styles.tdLinks}>
          <OverlayTrigger placement="bottom" overlay={detailTooltip}>
            <a href={'detail/' + item.id}>
              <i className="fa fa-eye" ></i>
            </a>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={editTooltip}>
            <a href={'edit/' + item.id}>
             <i className="fa fa-edit" ></i>
            </a>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={deleteTooltip}>
            <a href={'delete/' + item.id}>
             <i className="fa fa-trash" ></i>
            </a>
          </OverlayTrigger>
        </td>
      </tr>
    );
  }
}

ServiceListRow.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    defaultHistory: PropTypes.number,
    documentType: PropTypes.number,
    ledgerAccount: PropTypes.number,
    resultAccount: PropTypes.number,
    costAccount: PropTypes.number,
    serviceType: PropTypes.shape({title: PropTypes.string})
  })
};

export default ServiceListRow;
