import {Filters, PaginationContainer, ProductsContainer} from '../components';
import {customFetch} from '../utils';

// you can acess the data of the loader in any nested component
// such as Filters or any child of it

const url = '/products';
export const loader = async ({request}) => {
  // const params = new URL(request.url);
  // const search = params.get('search');

  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const response = await customFetch(url, {
    params,
  });
  const products = response.data.data;
  const meta = response.data.meta;

  return {products, meta, params};
};

function Products() {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
}

export default Products;
