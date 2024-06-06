import React from "react";

export const eventTemplate = (props) => {
    return (
      <div className="my-calendar-custom-event">
        <div>{props.Subject}</div>
      </div>
    );
};