import * as React from "react";
import style from "./layout.scss";

export default ({ children }) => (
  <div className={style.body}>
    <div className={style.mainContainer}>{children}</div>
  </div>
);
