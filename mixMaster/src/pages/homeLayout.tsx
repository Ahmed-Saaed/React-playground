import React, {FunctionComponent as Fc} from 'react';
import {Link, Outlet, useNavigation} from 'react-router-dom';
import Navbar from '../components/Navbar';

interface HomeProps {}

const Home: Fc<HomeProps> = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  return (
    <>
      <Navbar />
      <section className='page'>
        {isPageLoading ? <div className='loading'></div> : <Outlet />}
      </section>
    </>
  );
};

export default Home;
