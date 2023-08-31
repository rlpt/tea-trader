import React, { PropsWithChildren, useRef } from "react";

import { useAppDispatch } from "./app/hooks";
import useClickOutside from "./useOutsideClick";

import "./Modal.css";

function Modal(props: PropsWithChildren<{ onClose: any }>) {
    const dispatch = useAppDispatch();
    const ref = useRef(null);

    useClickOutside(ref, () => {
        dispatch(props.onClose());
    });

    // TODO css modules

    return (
        <div className="modal">
            <div className="modal-overlay"></div>
            <div ref={ref} className="modal-content">
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
