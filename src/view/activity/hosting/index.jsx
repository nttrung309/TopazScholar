import React, { useState } from "react";
import ActivityCard from "shared/components/ActivityCard";
import SubSidebar from "shared/components/SubSidebar";
import { Radio } from "antd";

const options = [
  {
    label: "Sắp diễn ra",
    value: "Sắp diễn ra",
  },
  {
    label: "Trước đây",
    value: "Trước đây",
  },
];

const ActivityHosting = () => {
  const [value1, setValue1] = useState("Sắp diễn ra");
  return (
    <div className="activity-hosting">
      <SubSidebar />
      <div className="main">
        <div className="top">
          <div className="page-title">
            <div className="title-icon">
              <i className="bi bi-lightning-fill" />
            </div>
            <div className="title-name">Hoạt động bạn tổ chức</div>
          </div>
          <Radio.Group
            options={options}
            onChange={(e) => setValue1(e.target.value)}
            value={value1}
            optionType="button"
            buttonStyle="solid"
          ></Radio.Group>
        </div>

        <div className="flex-column">
          <div className="item">
            <div className="title">Hôm nay</div>
            <ActivityCard variant="horizontal" />
            <ActivityCard variant="horizontal" />
          </div>

          <div className="item">
            <div className="title">Tháng trước</div>
            <ActivityCard variant="horizontal" />
            <ActivityCard variant="horizontal" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityHosting;
