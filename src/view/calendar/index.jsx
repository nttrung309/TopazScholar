import React, { useEffect, useRef, useState } from "react";
import '../../App.css';

import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, MonthAgenda, TimelineViews, TimelineMonth } from '@syncfusion/ej2-react-schedule';

const Calendar = () => {
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
        selectedDate={new Date(2023, 1, 15)}
        eventSettings={{
          dataSource: data,
        }}
        readonly={true}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, MonthAgenda, TimelineViews, TimelineMonth ]} />
      </ScheduleComponent>
    </div>
  );
};

export default Calendar;
