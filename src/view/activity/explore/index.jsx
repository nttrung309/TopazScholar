import React from "react";
import { Dropdown } from "antd";
import ActivityCard from "shared/components/ActivityCard";
import SubSidebar from "shared/components/SubSidebar";

const items = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: "0",
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];

const ActivyExplore = () => {
  return (
    <div className="activity-explore">
      <SubSidebar />

      {/* Thẻ main chưa che hết height */}
      <div className="main">
        <div className="page-title">
          <div className="title-icon">
            <i className="bi bi-lightning-fill" />
          </div>
          <div className="title-name">Khám phá</div>
        </div>

        <div className="row">
          <Dropdown menu={{ items }} trigger={["click"]}>
            <div>
              <i className="bi bi-geo-alt-fill" style={{ fontSize: "12px" }} />
              Địa điểm
              <i className="bi bi-chevron-down" style={{ fontSize: "12px" }} />
            </div>
          </Dropdown>
          {/* Không biết lỗi gì nhưng sau này truyền value vào sau nên để tạm trước vậy */}
          <Dropdown menu={{ items }} trigger={["click"]}>
            <div>
              <i className="bi bi-table" style={{ fontSize: "12px" }} />
              Ngày bất kỳ
              <i className="bi bi-chevron-down" style={{ fontSize: "12px" }} />
            </div>
          </Dropdown>
        </div>

        <div className="grid">
          <ActivityCard variant="vertical" />
          <ActivityCard variant="vertical" />
          <ActivityCard variant="vertical" />
          <ActivityCard variant="vertical" />
          <ActivityCard variant="vertical" />
          <ActivityCard variant="vertical" />
          <ActivityCard variant="vertical" />
          <ActivityCard variant="vertical" />
          <ActivityCard variant="vertical" />
          <ActivityCard variant="vertical" />
        </div>
      </div>
    </div>
  );
};

export default ActivyExplore;
