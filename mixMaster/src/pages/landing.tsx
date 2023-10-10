import React, {FunctionComponent as Fc} from 'react';
import {useLoaderData} from 'react-router-dom';
import axios from 'axios';
// import
import CocktailList from './../components/cocktailList';
import SearchForm from '../components/searchForm';

import {useQuery, QueryClient} from '@tanstack/react-query';

const searchUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

interface landingProps {}

interface loaderData {
  drinks: any[];
  searchTerm: string;
}

const searchCocktailsQuery = (searchTerm: string) => {
  return {
    queryKey: ['search', searchTerm || 'all'],
    queryfn: async () => {
      const response = await axios.get(`${searchUrl}${searchTerm}`);
      return response.data.drinks;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({request}) => {
    const url = new URL(request.url);

    const searchTerm = url.searchParams.get('search') || '';
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));
    // const response = await axios.get(`${searchUrl}${searchTerm}`);
    // console.log(response);
    // return {drinks: response.data.drinks, searchTerm};
    return {searchTerm};
  };

const Landing: Fc<landingProps> = () => {
  const {searchTerm} = useLoaderData() as loaderData;

  const {data: drinks} = useQuery<{data: any[]}>(
    searchCocktailsQuery(searchTerm)
  );

  return (
    <>
      <SearchForm SearchTerm={searchTerm} />
      <CocktailList drinks={drinks && drinks} />
    </>
  );
};

export default Landing;
