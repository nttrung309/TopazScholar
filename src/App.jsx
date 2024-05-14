import React, { memo, useEffect } from 'react';

import PublicPage from './router/components/PublicPages';
import PrivatePage from './router/components/PrivatePages';
import {publicPage, privatePage} from './router/mainRouter';


import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { StatusLoginSelector } from './redux/auth/userSelector';
import { AutoLogin } from './redux/auth/userThunk';

const MainView = memo(({ statusLogin })=> {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const publicRoutes = publicPage.map((page) => page.path);
  const privateRoutes = privatePage.map((page) => page.path);

  useEffect(() => {
    
    async function GetAuth() {
      try {
          // Dispatch action 'login' với username và password
          await dispatch(AutoLogin());
      } catch (error) {
          // Xử lý lỗi nếu có
          console.error('Error occurred:', error.message);
      }
    };
    GetAuth();
    if (!statusLogin && !publicRoutes.includes(location.pathname)) {
        navigate('/auth/login');
    }
    else if(statusLogin && !privateRoutes.includes(location.pathname)){
        navigate('/');
    }
  }, [statusLogin, navigate]);

  return(
    <>
      {statusLogin ? <PrivatePage /> : <PublicPage />}
    </>
  );
});


function App() {
  const statusLogin = useSelector(StatusLoginSelector);
  return (
    <Router>
      <MainView statusLogin={statusLogin} />
    </Router>
  );
}

export default App;
