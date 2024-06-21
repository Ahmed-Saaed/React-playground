import {NavLink} from 'react-router-dom';
import links from '../utils/Links';

function NavLinks({toggleSideBar}) {
  return (
    <div className='nav-links'>
      {links.map((link) => {
        const {text, path, id, icon} = link;
        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSideBar}
            className={({isActive}) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            end
          >
            <span className='icon'>
              {icon} <span>{text}</span>
            </span>
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavLinks;
