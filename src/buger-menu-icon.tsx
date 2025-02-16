import React from "react";

import styles from "./burger-menu-icon.module.css";

function BurgerMenuIcon() {
    return (
        <div className={styles.burgerMenu}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
        </div>
    );
}

export default BurgerMenuIcon;
