import React, { useEffect, useState } from "react";

import { Tabs } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { NotifyDataSelector } from "../../../redux/notify/notifySelector";
import NotifyCard from "./NotifyCard";
import { AuthUIDSelector } from "../../../redux/auth/userSelector";
import { UpdateReadNotify } from "../../../redux/notify/notifyThunk";

const NotifyHolder = () => {
    const dispatch = useDispatch();

    const notifyData = useSelector(NotifyDataSelector);
    const currentUserUID = useSelector(AuthUIDSelector);

    const [activityTypeCount, setActivityTypeCount] = useState(0);
    const [systemTypeCount, setSystemTypeCount] = useState(0);
    
    const tabItems = [
        {
          key: '1',
          label: `Tất cả (${activityTypeCount + systemTypeCount})`,
          children: notifyData.map((notification, index) => <NotifyCard data={notification}/>)
        },
        {
          key: '2',
          label: `Hoạt động (${activityTypeCount})`,
          children: notifyData.filter(item => item.type === 'activity').map((notification, index) => <NotifyCard data={notification}/>),
        },
        {
          key: '3',
          label: `Hệ thống (${systemTypeCount})`,
          children: notifyData.filter(item => item.type === 'system').map((notification, index) => <NotifyCard data={notification}/>),
        },
    ];

    useEffect(() => {
        if(notifyData.length != 0){
            setActivityTypeCount(notifyData.filter(item => item.type === 'activity' && !item.isRead).length);
            setSystemTypeCount(notifyData.filter(item => item.type === 'system' && !item.isRead).length);
        }
    }, [notifyData]);

    const HandleMarkAllAsRead = async () => {
        await dispatch(UpdateReadNotify({recvID: currentUserUID, reqType: 'all'}));
    }

    return(
        <div className="notify-holder">
            <div className="notify-holder__header">
                <div className="title">Thông báo</div>
                <div className="mark-as-read" onClick={HandleMarkAllAsRead}>Đánh dấu là đã đọc</div>
            </div>
            <Tabs 
                defaultActiveKey="1" 
                items={tabItems} 
                onChange={() => {}} 
                centered
            />
        </div>
    );
}

export default NotifyHolder;