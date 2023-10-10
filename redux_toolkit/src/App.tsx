import Navbar from './components/Navbar';
import CartContainer from './components/cartContainer';
import {UseSelector, useSelector} from 'react-redux/es/hooks/useSelector';
import {useDispatch} from 'react-redux';
import cartItems from './cartItems';
import {RootState} from './store';
import {useEffect} from 'react';
import {calculateTotals, getCartItems} from './features/cart/cartSlice';
import Modal from './components/modal';

function App() {
  const {cartItems, isLoading} = useSelector((store: RootState) => store.cart);
  const {isOpen} = useSelector((store: RootState) => store.modal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems('random')); // random is the value you want to pass through this function if needed // will be the first parameter , always
  }, []);

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>loading...</h1>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
