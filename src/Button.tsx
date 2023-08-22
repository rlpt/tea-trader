import React, { ButtonHTMLAttributes } from "react";
import cn from "classnames";

export enum BtnType {
    Primary,
    Secondary,
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    btnType?: BtnType;
}

function Button(props: ButtonProps) {
    // default to primary
    const isPrimary = props.btnType === BtnType.Primary || !props.btnType;

    return (
        <button
            {...props}
            className={cn([
                "button",
                {
                    "button-primary": isPrimary,
                    "button-secondary": props.btnType === BtnType.Secondary,
                },
            ])}
        />
    );
}

export default Button;
