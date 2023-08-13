import React, { PropsWithChildren } from "react";

import { closeModal, endSpecialEvent } from "./app/gameReducer";
import { useAppDispatch } from "./app/hooks";

import "./Modal.css";

function Modal(props: PropsWithChildren<{ onClose: any }>) {
    const dispatch = useAppDispatch();

    return (
        <div className="modal">
            <div
                className="modal-overlay"
                onClick={() => dispatch(props.onClose())}
            ></div>
            <div className="modal-content">
                {props.children}
                <div
                    className="modal-close-button"
                    onClick={() => dispatch(props.onClose())}
                >
                    ✕
                </div>
            </div>
        </div>
    );
}

export default Modal;
