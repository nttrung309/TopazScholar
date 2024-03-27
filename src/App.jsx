import React, { memo, useEffect } from 'react';

import PublicPage from './router/components/PublicPages';
import PrivatePage from './router/components/PrivatePages';
import {publicPage} from './router/mainRouter';

import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation, RouteObject} from 'react-router-dom';

const MainView = memo(({ statusLogin })=> {
  const navigate = useNavigate();
  const location = useLocation();
  const publicRoutes = publicPage.map((page) => page.path);

  useEffect(() => {
    if (!statusLogin && !publicRoutes.includes(location.pathname)) {
        navigate('/login');
    }
  }, [statusLogin, navigate]);

  return(
    <>
      {statusLogin ? <PrivatePage /> : <PublicPage />}
    </>
  );
});


function App() {
  //const statusLogin: boolean = useSelector(StatusLoginSelector);
  return (
    <Router>
      <MainView statusLogin={false} />
    </Router>
  );
}

export default App;
