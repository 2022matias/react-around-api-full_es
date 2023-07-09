import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";

function Login(props) {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const navigate = useNavigate();

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) {
      return;
    }
    auth.authorize({ email, password })
      .then((data) => {
        if (data?.token) {
          props.updateEmail(email);
          setEmail('');
          setPassword('');
          props.setIsLoggedIn(true);
          navigate("/");
        }
        else {
          props.onIsRegister(false);
          props.onInfoTooltipClick();
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <section className="login">
      <form className="login__container" noValidate>
        <h3 className="login__title">Inicia sesión</h3>
        <input type="email" className="login__input-email" placeholder="Correo electrónico" value={email} onChange={handleChangeEmail} />
        <input type="password" className="login__input-password" placeholder="Contraseña" value={password} onChange={handleChangePassword} />
        <button className="login__buttom" onClick={handleSubmit}><span className="login__buttom-text">Inicia sesión</span></button>
        <Link to="/signup" className="register__link">¿Aún no eres miembro? Regístrate aquí</Link>
      </form>
    </section>
  );
}

export default Login;