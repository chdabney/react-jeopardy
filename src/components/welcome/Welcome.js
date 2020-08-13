import React from "react";

function Welcome(props) {
  return (
    <div className="Welcome">Welcome, {props.match.params.name || "Chad"}!</div>
  );
}

export default Welcome;
