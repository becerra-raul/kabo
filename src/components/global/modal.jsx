import React from "react";
import ReactModal from "react-modal";

import imgClose from "../../assets/images/modal-close.svg";

ReactModal.setAppElement("#root");

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isAppend } = this.props;
    return (
      <div className="">
        <ReactModal
          isOpen={this.props.isOpen}
          overlayClassName="fixed inset-0 flex justify-center global-modal-overlay items-start z-50 overflow-y-scroll"
          className="w-full max-w-2xl bg-white lg:mt-10 lg:rounded-xl shadow-modal outline-none"
          onRequestClose={() => this.props.onRequestClose()}
        >
          <div className="p-4 border-b border-gray-200 flex justify-between">
            <h3 className="text-xl">{this.props.title}</h3>
            <img className="cursor-pointer" src={imgClose} onClick={() => this.props.onRequestClose()} />
          </div>
          <div>{this.props.children}</div>
        </ReactModal>
      </div>
    );
  }
}

export default Modal;
