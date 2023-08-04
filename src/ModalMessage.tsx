import React from "react";
import { useAppDispatch } from "./app/hooks";
import { closeModal } from "./app/gameReducer";

function ModalMessage(props: { message: string }) {
    const dispatch = useAppDispatch();

    return (
        <div>
            <p>{props.message}</p>
            <div className="buttons">
                <button onClick={() => dispatch(closeModal())}>Ok!</button>
            </div>
        </div>
    );
}

export default ModalMessage;
