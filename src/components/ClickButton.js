import React from "react";

function ClickButton(props) {
  return (
    <>
      <button type="button" class="btn btn-outline-primary">{props.value}</button>
    </>
  );
}

export default ClickButton;
