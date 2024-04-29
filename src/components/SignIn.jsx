import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebaseConfig';
import Swal from 'sweetalert2';
import { loginProviderAsync } from '../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import googleLogo from '../assets/gogle_logo.png';
import screen from './../assets/Logo.png';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const validatePhoneNumber = (numberPhone, lengthString) => {
    if (!numberPhone) {
      return false;
    }

    const value = numberPhone.replace(/\D/g, '');
    const valueLength = value.length;
    return { isValid: valueLength === lengthString, value };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, value: validNumber } = validatePhoneNumber(
      phoneNumber,
      10
    );
    if (!isValid) {
      alert('el numero debe tener 10 caracteres');
    }
    generateReCaptcha();
    const recapcthaValue = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+57${validNumber}`, recapcthaValue)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        navigate('/verification');
      })
      .catch((error) => {
        console.log(error);
        Swal.fire('Upps ', 'intenta de nuevo  ', 'error');
        navigate('/intro');
      });
  };
  const generateReCaptcha = () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptch-container',
        {
          size: 'invisible',

          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // onSignInSubmit();
            console.log(response);
          },
        },
        auth
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleLoginGoogle = async () => {
    dispatch(loginProviderAsync('google'));
  };
  return (
    <div className="signin">
      <img src={screen} />
      <h2>SignIn </h2>
      <form onSubmit={handleSubmit}>
        <label>
          Phone number
          <input
            type="number"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            value={phoneNumber}
            placeholder=" + 57 Ingrese numero de telefono"
          />
        </label>
        <div id="recaptch-container"> </div>
        <img
          src={googleLogo}
          alt="Google"
          style={{ width: 50, marginLeft: 30 }}
          onClick={handleLoginGoogle}
        />
        <button type="submit"> Sign in</button>
      </form>
    </div>
  );
};

export default SignIn;
