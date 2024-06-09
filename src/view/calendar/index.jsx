import React, { useEffect, useRef, useState } from "react";
import '../../App.css';

import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, MonthAgenda, TimelineViews, TimelineMonth, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import { eventTemplate, editorTemplate } from "./components/eventTemplate";
import { registerLicense } from '@syncfusion/ej2-base';



import { useDispatch, useSelector } from "react-redux";
import { GetAllActivity } from "../../redux/activity/activityThunk";
import { ActivityDataSelector } from "../../redux/activity/activitySelector";

import './components/vi';

// Registering Syncfusion license key
registerLicense('ORg4AjUWIQA/Gnt2UFhhQlJBfVhdW3xLflFyVWJbdV91flZGcDwsT3RfQFljT35Vd0diXn5WcHVWTw==');

const Calendar = () => {
  const dispatch = useDispatch();
  const activityData = useSelector(ActivityDataSelector);
  const [calendarData, setCalendarData] = useState([]);

  const color = [
    {
      main: '#6ea8fe',
      sub: '#2f80f8'
    },
    {
      main: '#febb6e',
      sub: '#f88a2f'
    },
    {
      main: '#6efe8d',
      sub: '#1eda46'
    },
    {
      main: '#6ea8fe',
      sub: '#2279fc'
    },
    {
      main: '#6ea8fe',
      sub: '#2279fc'
    },
    {
      main: '#fa8be7',
      sub: '#d660c3'
    },
    {
      main: '#fa8bac',
      sub: '#d66091'
    }
  ]

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
        StartTime: new Date(item.startDate),
        EndTime: new Date(item.endDate),
        color: color[getRandomNumber()]
      }));
      setCalendarData(newActivityData);
    }
  }, [activityData]);

  function getRandomNumber() {
    return Math.floor(Math.random() * 7);
  }
  
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
  }, []);

  const onPopupOpen = (args) => {
    args.cancel = true;
  }

  return(
    <div className="my-calendar">
      <ScheduleComponent
        selectedDate={new Date('2024/6/10')}
        eventSettings={{
          dataSource: calendarData
        }}
        readonly={true}
        rowAutoHeight
        locale="en"
        popupOpen={onPopupOpen.bind(this)}
      >
        <ViewsDirective>
          <ViewDirective option="Day" eventTemplate={eventTemplate}/>
          <ViewDirective option="Week" eventTemplate={eventTemplate}/>
          <ViewDirective option="Month"/>
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, MonthAgenda, TimelineViews, TimelineMonth ]} />
      </ScheduleComponent>
    </div>
  );
};

export default Calendar;
