import React, {FunctionComponent as FC} from 'react';
import Wrapper from '../assets/wrappers/SearchForm';
import {Form, useNavigation} from 'react-router-dom';

interface SearchFormProps {
  SearchTerm: string;
}

const SearchForm: FC<SearchFormProps> = ({SearchTerm}) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form className='form'>
        <input
          type='search'
          className='form-input'
          name='search'
          defaultValue={SearchTerm}
        />
        <button type='submit' className='btn' disabled={isSubmitting}>
          {isSubmitting ? 'searching' : 'search'}
        </button>
      </Form>
    </Wrapper>
  );
};

export default SearchForm;
