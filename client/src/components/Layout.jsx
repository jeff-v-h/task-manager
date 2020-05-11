import * as React from "react";
import style from "./layout.scss";
import NavBar from "./common/NavBar";

export default ({ children }) => (
    <div className={style.body}>
        <NavBar />
        <div className={style.mainContainer}>{children}</div>
    </div>
);
