import React from 'react';

import Header from '../Header';
import Footer from '../Footer';
import SideBar from '../SideBar';

const MainLayout = ({children}) => {
    return(//Tui return để test thôi bà làm thì xóa đi nha
        <>  
            <Header/>
            <SideBar/>
            {children}
            <Footer/>
        </>
    );
};

export default MainLayout;
