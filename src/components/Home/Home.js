import React from 'react';
import classes from './home.module.scss';
import LeftSidebar from './LeftSidebar/LeftSidebar';

const Home = () => (
  <div className={classes.home_wrapper}>
    <div className={classes.container}>
      <LeftSidebar />
    </div>
  </div>
);

export default Home;
