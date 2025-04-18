import React, { PropsWithChildren, useRef } from "react";

import { useAppDispatch } from "../../game-logic/hooks";
import useClickOutside from "../../use-outside-click";

import styles from "./modal.module.css";

function Modal(props: PropsWithChildren<{ onClose: any }>) {
    const dispatch = useAppDispatch();
    const ref = useRef(null);

    useClickOutside(ref, () => {
        dispatch(props.onClose());
    });

    return (
        <div className={styles.modal}>
            <div className={styles.modalOverlay}></div>
            <div ref={ref} className={styles.modalContent}>
                {props.children}
                <div
                    className={styles.closeButton}
                    onClick={() => dispatch(props.onClose())}
                >
                    ✕
                </div>
            </div>
        </div>
    );
}

export default Modal;
