import Logo from "../images/Logo.png";
import Line from "../images/Line.png";
import { Link, useLocation } from "react-router-dom";

function Header(props) {
  const location = useLocation();
  const isSigninRoute = location.pathname === "/signin";

  return (
    <header className="header">
      <div className="header__container">
        <img
          src={Logo}
          className="header__logo"
          alt="logo que dice Around the U.S."
        />
        {props.isLoggedIn ? (
          <div>
            <span className="header__text">{props.email}</span>
            <Link to="/signin" className="header__link" onClick={props.signOut}>
              Cerrar sesión
            </Link>
          </div>
        ) : (
          <>
            {isSigninRoute ? (
              <Link to="/signup" className="header__link">
                Registrate
              </Link>
            ) : (
              <Link to="/signin" className="header__link">
                Inicia sesión
              </Link>
            )}
          </>
        )}
      </div>
      <img
        src={Line}
        className="header__line"
        alt="linea que separa el encabezado del resto de la pagina"
      />
    </header>
  );
}

export default Header;