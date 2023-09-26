import React from 'react';
import classes from './home.module.scss';
import LeftSidebar from './LeftSidebar/LeftSidebar';
import CentralSection from './CentralSection/CentralSection';
import RightSideBar from './RightSideBar/RightSideBar';

const Home = () => (
  <div className={classes.home_wrapper}>
    <div className={classes.container}>
      <LeftSidebar />
      <CentralSection />
      <RightSideBar />
    </div>
  </div>
);

export default Home;
