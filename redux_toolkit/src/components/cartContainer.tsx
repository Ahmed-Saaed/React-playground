import {useSelector} from 'react-redux/es/hooks/useSelector';
import {useDispatch} from 'react-redux';
import CartItem from './CartItem';
import {FunctionComponent} from 'react';
import {RootState} from '../store';
import {clearCart} from '../features/cart/cartSlice';
import {openModal} from '../features/modal/modalSlice';

interface CartContainerProps {}

const CartContainer: FunctionComponent<CartContainerProps> = () => {
  const dispatch = useDispatch();

  const {cartItems, total, amount} = useSelector(
    (store: RootState) => store.cart
  );

  if (amount < 1) {
    return (
      <section className='cart'>
        <header>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className='cart'>
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button className='btn clear-btn' onClick={() => dispatch(openModal())}>
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
