import { useDispatch } from 'react-redux';
import http from '../../../http';
import { signout } from '../../../store/users/usersSlice';
import './styles/styles.css';

function Header() {
  const dispatch = useDispatch();
  return (
    <header className="header">
      <div className="header__content">
        <span className="header__logo">
          TICTACTOE<span>rooms</span>
        </span>
        <span className="header__middle"></span>
        <span className="header__info">
          <button
            className="btn btn__info"
            onClick={() => {
              http
                .post('/auth/logout')
                .then(() => {
                  dispatch(signout());
                })
                .catch(error => console.error(error));
            }}
          >
            Sign Out
          </button>
        </span>
      </div>
    </header>
  );
}

export default Header;
