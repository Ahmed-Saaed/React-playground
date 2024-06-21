import {Link} from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'
import Logo from './../components/Logo';

function Error() {
  return (
    <Wrapper className='full-page'>
      <Logo/>
      <div>
        <img src={img} alt="not found" />
        <h3>Ohh! Page Not Found</h3>
        <p>we can't seem to find the page you're looking for</p>
        <Link to= '/'>back home</Link>
      </div>
    </Wrapper>
  )
}

export default Error