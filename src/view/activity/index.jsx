import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, DatePicker, Dropdown, Radio } from "antd";
import ActivityCard from "shared/components/ActivityCard";
import SubSidebar from "shared/components/SubSidebar";
import { useLocation } from "react-router-dom";
import { ActivityDataSelector } from "../../redux/activity/activitySelector";
import { GetAllActivity } from "../../redux/activity/activityThunk";

import { useDispatch, useSelector } from "react-redux";

import { AuthUIDSelector } from "../../redux/auth/userSelector";


const locationItems = [
  {
    label: "Bất kỳ",
    key: "0",
  },
  {
    label: "Tại trường",
    key: "1",
  },
  {
    label: "Bên ngoài",
    key: "2",
  },
  {
    label: "Online",
    key: "3",
  },
];

const timeFilterItems = [
  {
    label: "Mọi lúc",
    key: "0",
  },
  {
    label: "Đang diễn ra",
    key: "1",
  },
  {
    label: "Sắp diễn ra",
    key: "2",
  },
];

const options = [
  {
    label: "Mọi lúc",
    value: 0,
  },
  {
    label: "Đã diễn ra",
    value: 1,
  },
  {
    label: "Đang diễn ra",
    value: 2,
  },
  {
    label: "Sắp diễn ra",
    value: 3
  }
];

const Activity = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const data = location.state?.item || null;
  const type = location.pathname.slice(1);
  const [locationOption, setLocationOption] = useState(0);
  const [timeOption, setTimeOption] = useState(0);
  const [hostingOption, setHostingOption] = useState(0);
  const [searchInput, setSearchInput] = useState('')
  const datePickerRef = useRef(null);
  const activityData = useSelector(ActivityDataSelector);
  const userUID = useSelector(AuthUIDSelector);

  const filteredActivities = useMemo(() => {
    const now = new Date();
    if(!Array.isArray(activityData)) return;
    return (activityData?.length > 0) ? 
      (type === 'explore') ? 
        activityData.filter(activity => {
          return (
            ((locationOption == 0) ||
            (activity.form == 'Trực tiếp' && locationOption == 1) ||
            (activity.form == 'Online' && locationOption == 3) ||
            (activity.form == 'Trực tiếp' && locationOption == 0)) &&
            ((timeOption == 0) ||
            (((new Date(activity.startDate) <= now) && (new Date(activity.endDate) > now)) && timeOption == 1) || 
            ((new Date(activity.startDate) > now) && timeOption == 2)) &&
            (activity.name.toUpperCase().includes(searchInput.toUpperCase()))
          );
        }) 
      : (type === 'registered') ? activityData.filter(activity => 
            activity.participants.includes(userUID) &&
            (activity.name.toUpperCase().includes(searchInput.toUpperCase())))
        : (type === 'joined') ? activityData.filter(activity => 
          activity.rollCall.includes(userUID) &&
          (activity.name.toUpperCase().includes(searchInput.toUpperCase()))) 
        : []
    : [];
  }, [activityData, locationOption, timeOption, searchInput, type]);

  useEffect(() => {
    LoadAllActivity();
  }, []);

  const LoadAllActivity = async () => {
    await dispatch(GetAllActivity());
  };

  useEffect(() => {
    console.log(activityData);
  }, [activityData]);

  const HandleLocationClick = (e) => {
    setLocationOption(e.key);
  };

  const HandleTimeClick = (e) => {
    setTimeOption(e.key);
  };

  const menuLocationProps = {
    items: locationItems,
    onClick: HandleLocationClick,
  };

  const menuTimeProps = {
    items: timeFilterItems,
    onClick: HandleTimeClick,
  };

  return (
    <div className="activity">
      <SubSidebar onChange={setSearchInput}/>

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
              onChange={(e) => {setHostingOption(e.target.value)}}
              value={hostingOption}
              optionType="button"
              buttonStyle="solid"
            ></Radio.Group>
          )}
        </div>

        {type === "explore" ? (
          <>
            <div className="dropdown-wrapper">
              <Dropdown menu={menuLocationProps} trigger={["click"]}>
                <div>
                  <i
                    className="bi bi-geo-alt-fill"
                    style={{ fontSize: "12px" }}
                  />
                  {locationItems[locationOption].label}
                  <i
                    className="bi bi-chevron-down"
                    style={{ fontSize: "12px" }}
                  />
                </div>
              </Dropdown>
              <Dropdown menu={menuTimeProps} trigger={["click"]}>
                <div>
                  <i className="bi bi-table" style={{ fontSize: "12px" }} />
                  {timeFilterItems[timeOption].label}
                  <i
                    className="bi bi-chevron-down"
                    style={{ fontSize: "12px" }}
                  />
                </div>
              </Dropdown>
            </div>

            <div className="grid">
              {filteredActivities?.length > 0 ? (
                filteredActivities.map((data, index) => (
                  <ActivityCard key={index} variant="vertical" data={data} />
                ))
              ) : (
                <p>Không có sự kiện nào</p>
              )}
            </div>
          </>
        ) : (type === "registered" || type === "joined") ? (
          <div className="flex-column">
            <div className="item">
              {filteredActivities?.length > 0 ? (
                filteredActivities.map((data, index) => (
                  <ActivityCard key={index} variant="horizontal" data={data} />
                ))
              ) : (
                <p>Không có sự kiện nào</p>
              )}
            </div>
          </div>
        ) : activityData?.length > 0 ? (
            activityData.filter(data => data.hostName == userUID).map((data, index) => (
              <ActivityCard key={index} variant="horizontal" data={data} />
            ))
          ) : (
            <p>Không có sự kiện nào</p>
          )
        }
      </div>
    </div>
  );
};

export default Activity;
