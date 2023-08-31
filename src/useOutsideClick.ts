import { useEffect } from "react";

export default function useClickOutside(ref: any, callback: () => void) {
    useEffect(() => {
        const handleOutsideClick = (e: any) => {
            if (ref.current && !ref.current.contains(e.target)) {
                callback();
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("touchstart", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("touchstart", handleOutsideClick);
        };
    }, [ref, callback]);
}
