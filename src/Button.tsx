import React, { ButtonHTMLAttributes } from "react";
import cn from "classnames";

export enum BtnStyle {
    Primary,
    Secondary,
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    btnstyle?: BtnStyle;
}

function Button(props: ButtonProps) {
    const isPrimary = props.btnstyle === BtnStyle.Primary || !props.btnstyle;

    return (
        <button
            {...props}
            className={cn([
                "button",
                {
                    "button-primary": isPrimary,
                    "button-secondary": props.btnstyle === BtnStyle.Secondary,
                },
            ])}
        />
    );
}

export default Button;
