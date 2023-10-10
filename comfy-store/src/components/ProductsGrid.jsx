import {Link, useLoaderData} from 'react-router-dom';
import {formatPrice} from '../utils';

const ProductGrid = () => {
  const {products} = useLoaderData();
  // const products = [];

  return (
    <div className='pt-12 grid gap-4 md:grid-col-2 lg:grid-col-3'>
      {products.map((product) => {
        const {title, price, image} = product.attributes;
        const dollarAmount = formatPrice(price);
        return (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className='card w-full shadow-xl hover:shadow-2xl transition duratuin-300'
          >
            <figure className='px-4 pt-4'>
              <img
                src={image}
                alt={title}
                className='rounded-xl h-64 md:h-48 w-full object-cover'
              />
            </figure>
            <div className='card-body items-center text-center'>
              <h2 className='card-title capitalize tracking-wider'>{title}</h2>
              <span className='text-secondary'>{dollarAmount}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductGrid;
