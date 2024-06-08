import React, { useEffect, useState } from "react";
import { Dropdown, Radio } from "antd";
import ActivityCard from "shared/components/ActivityCard";
import SubSidebar from "shared/components/SubSidebar";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { ActivityDataSelector } from "../../redux/activity/activitySelector";
import { GetAllActivity } from "../../redux/activity/activityThunk";

const items = [
  {
    label: "1st menu item",
    key: "0",
  },
  {
    label: "2nd menu item",
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

const Activity = () => {
  const dispatch = useDispatch();

  const [value1, setValue1] = useState("Sắp diễn ra");
  const location = useLocation();
  const data = location.state?.item || null;
  const type = location.pathname.slice(1);
  const activityData = useSelector(ActivityDataSelector);

  useEffect(() => {
    LoadAllActivity();
  }, []);

  const LoadAllActivity = async () => {
    await dispatch(GetAllActivity());
  }

  useEffect(() => {
    console.log(activityData);
  }, [activityData]);

  return (
    <div className="activity">
      <SubSidebar />

      <div className="main">
        <div className="top">
          <div className="page-title">
            <div className="title-icon">
              <i className="bi bi-lightning-fill" />
            </div>
            <div className="title-name">{data?.title || "Khám phá"}</div>
          </div>
          {type === "hosting" && (
            <Radio.Group
              options={options}
              onChange={(e) => setValue1(e.target.value)}
              value={value1}
              optionType="button"
              buttonStyle="solid"
            ></Radio.Group>
          )}
        </div>

        {type === "explore" ? (
          <>
            <div className="dropdown-wrapper">
              <Dropdown menu={{ items }} trigger={["click"]}>
                <div>
                  <i
                    className="bi bi-geo-alt-fill"
                    style={{ fontSize: "12px" }}
                  />
                  Địa điểm
                  <i
                    className="bi bi-chevron-down"
                    style={{ fontSize: "12px" }}
                  />
                </div>
              </Dropdown>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <div>
                  <i className="bi bi-table" style={{ fontSize: "12px" }} />
                  Ngày bất kỳ
                  <i
                    className="bi bi-chevron-down"
                    style={{ fontSize: "12px" }}
                  />
                </div>
              </Dropdown>
            </div>

            <div className="grid">
              {activityData?.length > 0 ? (
                activityData.map((data, index) => (
                  <ActivityCard key={index} variant="vertical" data={data} />
                ))
              ) : (
                <p>Không có sự kiện sắp đến</p>
              )}
            </div>
          </>
        ) : (
          <div className="flex-column">
            <div className="item">
              <div className="title">Hôm nay</div>
              {activityData?.length > 0 ? (
                <ActivityCard variant="horizontal" data={activityData[0]} />
              ) : (
                <p>Không có sự kiện nào</p>
              )}
            </div>

            <div className="item">
              <div className="title">Tháng trước</div>
              {activityData?.length > 0 ? (
                <ActivityCard variant="horizontal" data={activityData[0]} />
              ) : (
                <p>Không có sự kiện nào</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activity;
