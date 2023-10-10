import React, {FunctionComponent as FC} from 'react';
import {NavLink} from 'react-router-dom';
import Wrapper from '../assets/wrappers/Navbar';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  return (
    <Wrapper>
      <nav>
        <div className='nav-center'>
          <span className='logo'>MixMaster</span>
          <div className='nav-links'>
            <NavLink to='/' className='nav-link'>
              home
            </NavLink>
            <NavLink to='/newsletter' className='nav-link'>
              newsletter
            </NavLink>
            <NavLink to='/about' className='nav-link'>
              about
            </NavLink>
          </div>
        </div>
      </nav>
    </Wrapper>
  );
};

export default Navbar;
