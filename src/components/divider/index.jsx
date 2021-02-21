import React from "react";
import "./style.css";

const Divider = ({ text }) => {
  return (
    <React.Fragment>
      <hr className="hr-text" data-content={text} />
    </React.Fragment>
  );
};

export default Divider;
