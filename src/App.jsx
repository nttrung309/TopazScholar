import React, { memo, useEffect } from 'react';

import PublicPage from './router/components/PublicPages';
import PrivatePage from './router/components/PrivatePages';
import {publicPage, privatePage} from './router/mainRouter';


import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation} from 'react-router-dom';

import { useSelector } from 'react-redux';
import { StatusLoginSelector } from './redux/auth/userSelector';

const MainView = memo(({ statusLogin })=> {
  const navigate = useNavigate();
  const location = useLocation();
  const publicRoutes = publicPage.map((page) => page.path);
  const privateRoutes = privatePage.map((page) => page.path);

  useEffect(() => {
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
