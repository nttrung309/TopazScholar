import { Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ActivityDataSelector } from "../../../redux/activity/activitySelector";

import { GetCalendarDate, TimePrettier } from "shared/helper/Time";

const Calendar = () => {
    const calendarDate = GetCalendarDate();
    const navigate = useNavigate();
    const activityData = useSelector(ActivityDataSelector);

    return(
        <div className="calendar">
            <div className="item-container">
                {calendarDate.map((date, index) => {
                    return (
                        <div className={'item'}>
                            <div className="date">
                                <div className="days-of-week">{date.daysOfWeek}</div>
                                <div className="day">{date.day + '/' + date.month}</div>
                            </div>
                            <div className="content">
                            {activityData?.filter(item => {
                                const itemDate = new Date(item.startDate);
                                return (
                                    itemDate.getDate() === date.day &&
                                    itemDate.getMonth() === date.month - 1 &&
                                    itemDate.getFullYear() === date.year
                                );
                                }).map((data, index) => (
                                <div key={index} className="activity-info">
                                    <div className="activity-name">
                                        {data.name}
                                    </div>
                                    <div className="activity-time">
                                        {TimePrettier(data.startDate)}
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <Button className="view-detail-calendar-btn" onClick={() => navigate('/calendar')} >Xem chi tiết lịch của bạn</Button>
        </div>
    );
};

export default Calendar;