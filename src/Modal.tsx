import React, { PropsWithChildren } from "react";
import "./Modal.css";

// TODO click overlay to close

function Modal(props: PropsWithChildren) {
    return (
        <div className="modal">
            <div className="modal-content">{props.children}</div>
        </div>
    );
}

export default Modal;
