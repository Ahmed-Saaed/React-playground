import {FunctionComponent} from 'react';
import {ChevronUp, ChevronDown} from '../icons';
import {useDispatch} from 'react-redux';
import {removeItem, increase, decrease} from '../features/cart/cartSlice';

interface CartItemProps {
  id: number;
  img: string;
  title: string;
  price: string;
  amount: number;
}

const CartItem: FunctionComponent<CartItemProps> = ({
  id,
  img,
  title,
  price,
  amount,
}) => {
  const dispatch = useDispatch();

  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>{price}</h4>
        <button
          className='remove-btn'
          onClick={() => {
            dispatch(removeItem(id));
          }}
        >
          remove
        </button>
        <div>
          <button
            className='amount-btn'
            onClick={() => {
              dispatch(increase({id}));
            }}
          >
            <ChevronUp />
          </button>
          <p className='amount'>{amount}</p>
          <button
            className='amount-btn'
            // will keed decreasing unitll it is one then remove it from the cart
            onClick={() => {
              if (amount === 1) {
                dispatch(removeItem(id));
                return;
              }
              dispatch(decrease({id}));
            }}
          >
            <ChevronDown />
          </button>
        </div>
      </div>
    </article>
  );
};

export default CartItem;
