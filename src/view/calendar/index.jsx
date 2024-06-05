import React, { useEffect, useRef, useState } from "react";
import '../../App.css';

import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, MonthAgenda, TimelineViews, TimelineMonth, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import { eventTemplate } from "./components/eventTemplate";

import { useDispatch, useSelector } from "react-redux";
import { GetAllActivity } from "../../redux/activity/activityThunk";
import { ActivityDataSelector } from "../../redux/activity/activitySelector";

import './components/vi';

const Calendar = () => {
  const dispatch = useDispatch();
  const activityData = useSelector(ActivityDataSelector);
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    LoadAllActivity();
  }, []);

  const LoadAllActivity = async () => {
    await dispatch(GetAllActivity());
  }

  useEffect(() => {
    if (activityData && activityData.length > 0) {
      const newActivityData = activityData.map(item => ({
        ...item,
        Id: item.actID,
        Subject: item.name,
        StartTime: new Date(item.time.startDate),
        EndTime: new Date(item.time.endDate),
      }));
      setCalendarData(newActivityData);
    }
  }, [activityData]);
  
  const data = [
    {
      Id: 1,
      Subject: 'Meeting',
      StartTime: new Date(2023, 1, 15, 10, 0),
      EndTime: new Date(2023, 1, 15, 12, 30),
    },
    {
      Id: 2,
      Subject: 'Meeting2',
      StartTime: new Date(2023, 1, 15, 16, 0),
      EndTime: new Date(2023, 1, 15, 21, 30),
    }
  ];

  useEffect(() => {
    // Tìm thẻ div bằng selector
    const divElement = document.querySelector('div[style*="position: fixed;"]');

    // Kiểm tra nếu thẻ div tồn tại và thay đổi thuộc tính display của nó thành none
    if (divElement) {
      divElement.style.display = 'none';
    }
  }, []); // Mảng rỗng [] để đảm bảo useEffect chỉ chạy một lần sau khi component mount

  return(
    <div className="my-calendar">
      <ScheduleComponent
        selectedDate={Date.now()}
        eventSettings={{
          dataSource: calendarData
        }}
        readonly={true}
        locale="en"
      >
        <ViewsDirective>
          <ViewDirective option="Day"/>
          <ViewDirective option="Week" eventTemplate={eventTemplate}/>
          <ViewDirective option="Month"/>
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, MonthAgenda, TimelineViews, TimelineMonth ]} />
      </ScheduleComponent>
    </div>
  );
};

export default Calendar;
