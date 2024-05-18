import React from 'react';
import { Routes } from 'react-router-dom';
import { adminPage } from '../mainRouter';
import useRouter from './useRouter';

const AdminPage = () => {
    const { views } = useRouter({ routers: adminPage });
    return <Routes>{views}</Routes>;
};

export default React.memo(AdminPage);
