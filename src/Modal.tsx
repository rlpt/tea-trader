import React, { PropsWithChildren } from "react";

import { closeModal } from "./app/gameReducer";
import { useAppDispatch } from "./app/hooks";

import "./Modal.css";

function Modal(props: PropsWithChildren) {
    const dispatch = useAppDispatch();

    return (
        <div className="modal">
            <div
                className="modal-overlay"
                onClick={() => dispatch(closeModal())}
            ></div>
            <div className="modal-content">
                {props.children}
                <div
                    className="modal-close-button"
                    onClick={() => dispatch(closeModal())}
                >
                    ✕
                </div>
            </div>
        </div>
    );
}

export default Modal;
