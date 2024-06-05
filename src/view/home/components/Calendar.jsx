import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

import { GetCalendarDate } from "shared/helper/Time";

const Calendar = () => {
    const calendarDate = GetCalendarDate();
    const navigate = useNavigate();

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
                                <div className="activity-info">
                                    <div className="activity-name">
                                        Ngày hội việc làm
                                    </div>
                                    <div className="activity-time">
                                        8:00 am
                                    </div>
                                </div>
                                <div className="activity-info">
                                    <div className="activity-name">
                                        Ngày hội văn hóa
                                    </div>
                                    <div className="activity-time">
                                        20:00 am
                                    </div>
                                </div>
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