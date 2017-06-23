import React from 'react';
import Modal from 'terra-modal';
import Button from 'terra-button';
import PopupHelper from './PopupHelper';

class ModalIsOpen extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      isFocused: true,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleRequestFocus = this.handleRequestFocus.bind(this);
    this.handleReleaseFocus = this.handleReleaseFocus.bind(this);
  }

  handleOpenModal() {
    this.setState({ isOpen: true });
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
  }

  handleRequestFocus() {
    this.setState({ isFocused: false });
  }

  handleReleaseFocus() {
    this.setState({ isFocused: true });
  }

  render() {
    return (
      <div>
        <Modal
          ariaLabel="Default Modal"
          isOpen={this.state.isOpen}
          isFocused={this.state.isFocused}
          onRequestClose={this.handleCloseModal}
        >
          <div>
            <h1>Default Modal</h1>
            <br />
            <p>You can close the modal by:</p>
            <ul>
              <li>- Pressing the ESC key</li>
              <li>- Clicking on the overlay</li>
              <li>- Clicking on the close button</li>
            </ul>
            <br />
            <p>On smaller screens, the modal will take up the full screen.</p>
            <p />
            <br />
            <button onClick={this.handleCloseModal}>Close Modal</button>
            <PopupHelper onFocusGain={this.handleRequestFocus} onFocusLoss={this.handleReleaseFocus}/>
          </div>
        </Modal>
        <button onClick={this.handleOpenModal}>Open Modal</button>
      </div>
    );
  }
}

export default ModalIsOpen;
