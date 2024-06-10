import { ClockCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const eventTemplate = (props) => {

  const OpenActivity = () => {
    window.open('http://localhost:3000/activity/' + props.actID, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="my-calendar-custom-event" style={{backgroundColor: props.color?.main}} onClick={OpenActivity}>
      <div className="event-header" style={{backgroundColor: props.color?.sub}}>
        <div className="name">{props.Subject}</div>
      </div>
      <div className="event-body">
      </div>
      <div className="event-footer" style={{backgroundColor: props.color?.sub}}>
        <ClockCircleOutlined className="clock-icon"/>
        <div className="event-time">{GetTimeAndMin(props.StartTime) + ' - ' + GetTimeAndMin(props.EndTime)}</div>
      </div>
    </div>
  );
};

export const editorTemplate = (props) => {
  return(
    <div>meow</div>
  );
}

const GetTimeAndMin = (time) => {

  // Lấy giờ và phút từ đối tượng Date
  let hours = time.getHours();
  let minutes = time.getMinutes();

  // Đảm bảo giờ và phút luôn có hai chữ số
  let formattedHours = hours.toString().padStart(2, '0');
  let formattedMinutes = minutes.toString().padStart(2, '0');

  // Định dạng thành 'hh:mm'
  return `${formattedHours}:${formattedMinutes}`;
}

function getRandomNumber() {
  return Math.floor(Math.random() * 8);
}