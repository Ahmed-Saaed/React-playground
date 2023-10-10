import React, {FunctionComponent as FC} from 'react';
import {Link} from 'react-router-dom';
import Wrapper from '../assets/wrappers/CocktailCard';

interface CocktailCardProps {
  id: string;
  name: string;
  image: string;
  info: string;
  glass: string;
}

const CocktailCard: FC<CocktailCardProps> = ({
  id,
  image,
  name,
  glass,
  info,
}) => {
  return (
    <Wrapper>
      <div className='image-container'>
        <img src={image} alt={name} className='img' />
      </div>
      <div className='footer'>
        <h4>{name}</h4>
        <h5>{glass}</h5>
        <p>{info}</p>
        <Link to={`/cocktail/${id}`} className='btn'>
          details
        </Link>
      </div>
    </Wrapper>
  );
};

export default CocktailCard;
