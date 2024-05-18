import React, { memo, useEffect, useState } from 'react';

import PublicPage from './router/components/PublicPages';
import PrivatePage from './router/components/PrivatePages';
import AdminPage from 'router/components/AdminPages';

import {publicPage, privatePage, adminPage} from './router/mainRouter';


import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { AuthDataLoadingStateSelector, AuthRoleSelector, StatusLoginSelector } from './redux/auth/userSelector';
import { AutoLogin } from './redux/auth/userThunk';

const MainView = memo(()=> {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const publicRoutes = publicPage.map((page) => page.path);
  const privateRoutes = privatePage.map((page) => page.path);
  const adminRoutes = adminPage.map((page) => page.path);
  const statusLogin = useSelector(StatusLoginSelector);
  const authDataLoadingState = useSelector(AuthDataLoadingStateSelector); 
  const authRole = useSelector(AuthRoleSelector);
  
  const [authState, setAuthState] = useState(authDataLoadingState);

  useEffect(() => {
    GetAuth();
    if (!statusLogin && authDataLoadingState == 'succeeded' && !publicRoutes.includes(location.pathname)) {
      navigate('/auth/login');
    }
    else if(statusLogin && authRole === 'student' && !privateRoutes.includes(location.pathname)){
        navigate('/');
    }
    else if(statusLogin && authRole === 'admin' && !adminRoutes.includes(location.pathname)){
      navigate('admin/activity');
    }
  }, [statusLogin, navigate]);

  const GetAuth = async () => {
    try {
        // Dispatch action 'login' với username và password
        await dispatch(AutoLogin());
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error occurred:', error.message);
    }
  };

  return(
    <>
      {(statusLogin && authRole != 'admin') ? <PrivatePage /> : <PublicPage />}
      {(statusLogin && authRole == 'admin') ? <AdminPage/> : null}
    </>
  );
});


function App() {
  return (
    <Router>
      <MainView/>
    </Router>
  );
}

export default App;
