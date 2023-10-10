import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {clearCart} from '../features/cart/cartSlice';
import {logoutUser} from '../features/user/userSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);

  const handleLogOut = () => {
    navigate('/');
    dispatch(clearCart());
    dispatch(logoutUser());
  };

  return (
    <header className='bg-netural py-2 text-netural-content'>
      <div className='align-element flex justify-center sm:justify-end'>
        {user ? (
          <div className='flex gap-x-2 sm:gap-x-8 items-center'>
            <p className='text-xs sm:text sm'>Hello, {user.username}</p>
            <button
              className='btn btn-xs btn-outline btn-primary'
              onClick={handleLogOut}
            >
              logout
            </button>
          </div>
        ) : (
          <div className='flex gap-x-6 justify-center items-center'>
            <Link to='/login' className='link link-hover text-xs sm:text-sm'>
              sign in/guest
            </Link>
            <Link to='/register' className='link link-hover text-xs sm:text-sm'>
              create an account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
