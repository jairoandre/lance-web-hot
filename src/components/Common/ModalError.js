import React, {Component, PropTypes} from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';

export default class ModalError extends Component {

  static propTypes = {
    error: PropTypes.string,
    onHide: PropTypes.func
  }

  state = {
    showModal: true
  }

  render() {
    const {showModal} = this.state;
    const {error, onHide} = this.props;
    const hideModal = () => {
      onHide();
      this.setState({showModal: !this.state.showModal});
    };
    return (
      <Modal show={showModal} onHide={onHide}>
        <Modal.Header>
          <Modal.Title bsStyle="danger">Erro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert bsStyle="danger">
            <h4>Opa, problemas!</h4>
            <p>{error}</p>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="danger" onClick={hideModal}>Fechar</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
