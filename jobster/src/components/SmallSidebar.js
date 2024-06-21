import {FaTimes} from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux';
import Wrapper from '../assets/wrappers/SmallSidebar';
import {toggleSidebar} from '../features/sidebarSlice';
import Logo from './Logo';
import NavLinks from './NavLinks';

function SmallSidebar() {
  const {isSidebarOpen} = useSelector((store) => store.sidebar);
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='content'>
          <button className='close-btn' onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSideBar={toggle} />
        </div>
      </div>
    </Wrapper>
  );
}

export default SmallSidebar;
