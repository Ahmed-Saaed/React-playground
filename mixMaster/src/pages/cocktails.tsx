import React, {FunctionComponent as Fc} from 'react';
import axios from 'axios';
import {useLoaderData, Link} from 'react-router-dom';
import Wrapper from '../assets/wrappers/CocktailPage';

interface CocktailsProps {}

interface singleItem {
  strDrink: string;
  strDrinkThumb: string;
  strAlcoholic: string;
  strCategory: string;
  strGlass: string;
  strinstructions: string;
}

interface LoaderData {
  data: any;
  id: string;
}

const singleUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export const loader = async ({params}) => {
  const {id} = params;
  const {data} = await axios.get(`${singleUrl}${id}`);
  console.log(data, id);
  return {data, id};
};

const Cocktails: Fc<CocktailsProps> = () => {
  const {id, data} = useLoaderData() as LoaderData;
  const singleDrink = data.drinks[0] as singleItem;

  console.log('drinks: ', singleDrink);
  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strinstructions: instructions,
  } = singleDrink;

  return (
    <Wrapper>
      <header>
        <Link to='/' className='btn'>
          back home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className='drink'>
        <img src={image} alt={name} className='img' />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name: </span>
            {name}
            <span className='drink-data'>category: </span>
            {category}
            <span className='drink-data'>info: </span>
            {info}
            <span className='drink-data'>glass: </span>
            {glass}
            <span className='drink-data'>instructions: </span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cocktails;
