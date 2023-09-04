import React, { ButtonHTMLAttributes } from "react";
import cn from "classnames";
import * as R from "remeda";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    secondary?: boolean;
}

function Button(props: ButtonProps) {
    const isPrimary = !props.secondary;

    return (
        <button
            {...R.omit(props, ["secondary"])}
            className={cn([
                "button",
                {
                    "button-primary": isPrimary,
                    "button-secondary": props.secondary,
                },
            ])}
        />
    );
}

export default Button;
