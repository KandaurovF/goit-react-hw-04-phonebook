import { Component } from 'react';
import { createPortal } from 'react-dom';
import IconButton from '../IconButton';
import { ImCross } from 'react-icons/im';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleKeyDown);
  }

  hendleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  handleClose = e => {
    this.props.onClose();
  };

  render() {
    return createPortal(
      <div className={css.backdrop} onClick={this.handleBackdropClick}>
        <div className={`${css.modal__content} `}>
          <IconButton className={css.close__button} onClick={this.handleClose}>
            <ImCross fill="#000" />
          </IconButton>

          {this.props.children}
        </div>
      </div>,
      modalRoot
    );
  }
}
