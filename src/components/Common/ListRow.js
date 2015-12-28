import React, { Component, PropTypes } from 'react';
import { Modal, Tooltip, OverlayTrigger, Alert, Button } from 'react-bootstrap';

export default class ListRow extends Component {

  static propTypes = {
    id: PropTypes.number,
    fields: PropTypes.array,
    onDetail: PropTypes.func,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func
  }

  constructor(props, content) {
    super(props, content);
  }

  state = {
    showDeleteConfirmDialog: false
  }

  toggleDeleteConfirmDialog = () => {
    this.setState({showDeleteConfirmDialog: !this.state.showDeleteConfirmDialog});
  }

  handleDetail = () => {
    this.props.onDetail({id: this.props.id});
  }

  handleEdit = () => {
    this.props.onEdit(this.props.id);
  }

  handleRemove = () => {
    this.props.onRemove(this.props.id);
    this.toggleDeleteConfirmDialog();
  }

  render() {
    const {showDeleteConfirmDialog} = this.state;
    const {id, fields} = this.props;
    const styles = require('theme/common.scss');
    const detailTooltip = <Tooltip id={'detailTooltip_' + id}><strong>Detalhar</strong></Tooltip>;
    const editTooltip = <Tooltip id={'editTooltip_' + id}><strong>Editar</strong></Tooltip>;
    const deleteTooltip = <Tooltip id={'deleteTooltip_' + id}><strong>Deletar</strong></Tooltip>;
    let fieldsTD;
    fieldsTD = fields.map((field, idx) => {
      return (
        <td key={idx}>
          <span>{field}</span>
        </td>
      );
    });

    return (
      <tr>
        {fieldsTD}
        <td className={styles.tdLinks}>
          <OverlayTrigger placement="bottom" overlay={detailTooltip}>
            <a href="#" onClick={this.handleDetail}>
              <i className="fa fa-eye" ></i>
            </a>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={editTooltip}>
            <a href="#" onClick={this.handleEdit}>
             <i className="fa fa-edit" ></i>
            </a>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={deleteTooltip}>
            <a href="#" onClick={this.toggleDeleteConfirmDialog}>
             <i className="fa fa-trash" ></i>
            </a>
          </OverlayTrigger>
          <Modal show={showDeleteConfirmDialog} onHide={()=>{}}>
            <Modal.Header>
              <Modal.Title bsStyle="danger">Excluir registro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Alert bsStyle="danger">
                <h4>Atenção!</h4>
                <p>Deseja realmente excluir o item?</p>
              </Alert>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="danger" onClick={this.handleRemove}>Excluir</Button>
              <Button bsStyle="warning" styles={{marginLeft: '5px'}} onClick={this.toggleDeleteConfirmDialog}>Cancelar</Button>
            </Modal.Footer>
          </Modal>
        </td>
      </tr>
    );
  }
}
