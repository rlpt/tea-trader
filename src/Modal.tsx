import React, { PropsWithChildren } from "react";
import "./Modal.css";
import { useAppDispatch } from "./app/hooks";
import { closeModal } from "./app/gameReducer";

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
