import React, {FunctionComponent as FC} from 'react';
import Wrapper from '../assets/wrappers/CocktailList';
import CocktailCard from './cocktailCard';

interface CocktailListProps {
  drinks: any[];
}

const CocktailList: FC<CocktailListProps> = ({drinks}) => {
  if (!drinks) {
    return <h4 style={{textAlign: 'center'}}>no mathcing cocktails</h4>;
  }

  const formatedDrink = drinks.map((item) => {
    const {idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass} = item;

    return {
      id: idDrink,
      name: strDrink,
      image: strDrinkThumb,
      info: strAlcoholic,
      glass: strGlass,
    };
  });
  return (
    <Wrapper>
      {formatedDrink.map((item) => {
        return <CocktailCard key={item.id} {...item} />;
      })}
    </Wrapper>
  );
};

export default CocktailList;
