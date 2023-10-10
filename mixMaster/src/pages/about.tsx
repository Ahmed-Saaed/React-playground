import React, {FunctionComponent as Fc} from 'react';
import {Link} from 'react-router-dom';
import Wrapper from '../assets/wrappers/AboutPage';

interface AboutProps {}

const About: Fc<AboutProps> = () => {
  return (
    <Wrapper>
      <h1>About</h1>
    </Wrapper>
  );
};

export default About;
