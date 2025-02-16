import React from "react";

import styles from "./BurgerMenuIcon.module.css";

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
