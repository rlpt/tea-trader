import React, { ButtonHTMLAttributes } from "react";
import cn from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    secondary?: boolean;
}

function Button(props: ButtonProps) {
    const { secondary, ...rest } = props;

    const isPrimary = !props.secondary;

    return (
        <button
            {...rest}
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
