import React from "react";

import { closeModal } from "../../game-logic/game-reducer";
import { useAppDispatch } from "../../game-logic/hooks";

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
