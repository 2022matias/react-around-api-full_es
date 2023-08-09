import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';

function Register(props) {
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
    auth.register({ email, password })
      .then(() => {
        props.onIsRegister(true);
        props.onInfoTooltipClick();
        navigate('/signin');
      })
      .catch((err) => alert(err));
  }

  return (
    <section className="register">
      <form className="register__container" noValidate>
        <h3 className="register__title">Regístrate</h3>
        <input type="email" className="register__input-email" placeholder="Correo electrónico" value={email} onChange={handleChangeEmail} />
        <input type="password" className="register__input-password" placeholder="Contraseña" value={password} onChange={handleChangePassword} />
        <button className="register__buttom" onClick={handleSubmit}><span className="register__buttom-text">Regístrate</span></button>
        <Link to="/signin" className="register__link">¿Ya eres miembro? Inicia sesión aquí</Link>
      </form>
    </section>
  );
}

export default Register;