import React from 'react';
import { Routes } from 'react-router-dom';
import { privatePage } from '../mainRouter';
import useRouter from './useRouter';

const PrivatePage = () => {
    const { views } = useRouter({ routers: privatePage });
    return <Routes>{views}</Routes>;
};

export default React.memo(PrivatePage);
