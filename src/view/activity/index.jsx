import React, { useEffect, useState } from "react";
import { Dropdown, Radio } from "antd";
import ActivityCard from "shared/components/ActivityCard";
import SubSidebar from "shared/components/SubSidebar";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllActivity,
  GetRecentActivities,
} from "../../redux/activity/activityThunk";
import { ActivityDataSelector } from "../../redux/activity/activitySelector";

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
  const [value1, setValue1] = useState("Sắp diễn ra");
  const location = useLocation();
  const data = location.state?.item || null;
  const type = location.pathname.slice(1);

  const dispatch = useDispatch();
  const activities = useSelector(ActivityDataSelector);

  useEffect(() => {
    const getAllActivity = async () => {
      try {
        // @ts-ignore
        await dispatch(GetRecentActivities());
      } catch (error) {
        console.error("Error occurred:", error.message);
      }
    };
    getAllActivity();
  }, []);

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
          </>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Activity;
