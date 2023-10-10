import React, {FunctionComponent as Fc} from 'react';
import Wrapper from '../assets/wrappers/ErrorPage';
import {Link, useRouteError} from 'react-router-dom';
import img from '../assets/not-found.svg';

interface ErrorProps {}

const Error: Fc<ErrorProps> = () => {
  const error = useRouteError() as any;

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt='not-found' />
          <Link to='/'>home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h3>sth went wrong</h3>
      </div>
    </Wrapper>
  );
};

export default Error;
