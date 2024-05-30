import React, { useEffect, useState } from "react";

import { Avatar } from "antd";

import { useDispatch } from "react-redux";
import { UpdateReadNotify } from "../../../redux/notify/notifyThunk";

import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

const NotifyCard = ({data}) => {
    const dispatch = useDispatch();

    const HandleMarkAsRead = async () => {
        if(!data.isRead){
            await dispatch(UpdateReadNotify({notifyID: data.notifyID, reqType: 'single'}));
        }
    }

    const removeApproximate = (timeAgo) => {
        return timeAgo.replace(/^khoảng /, '');
    };

    return(
        <div className={'notify-card ' + ((!data.isRead) ? 'unread' : '')} onClick={HandleMarkAsRead}>
            {data.senderID !== 'system' ? (
                <Avatar src={data.avatar} className="notify-card__avatar"/>
                ) : (
                <Avatar 
                    style={{
                        backgroundColor: '#6ea8fe',
                        verticalAlign: 'middle',
                    }} 
                    className="notify-card__avatar">S</Avatar>
            )}
            <div className="content">
                <div className="notify-title">{data.content}</div>
                <div className="send-time">{removeApproximate(formatDistanceToNow(new Date(data.sendTime), { addSuffix: true, locale: vi }))}</div>
            </div>
        </div>
    );
};

export default NotifyCard;