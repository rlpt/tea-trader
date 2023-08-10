import React from "react";

import { buyEquipment, closeModal } from "./app/gameReducer";
import { useAppDispatch } from "./app/hooks";
import { SpecialEvent } from "./app/types";

function ModalBuyEvent(props: {
    event: SpecialEvent;
    icon: string;
    message: string;
    price: number;
    value: number;
}) {
    const dispatch = useAppDispatch();

    return (
        <div>
            <p>{props.message}</p>
            <div className="buttons">
                <button
                    onClick={() =>
                        dispatch(
                            buyEquipment({
                                event: props.event,
                                cost: 0,
                                value: 0,
                            }),
                        )
                    }
                >
                    Buy!
                </button>
            </div>
        </div>
    );
}
