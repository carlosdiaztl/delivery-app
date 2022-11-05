import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterAsync } from "../../redux/actions/userAction";

const Register = () => {
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    if (data.password1 === data.password2) {
      const newUser = {
        name: data.name,
        email: data.email,
        password: data.password1,
      };
      dispatch(userRegisterAsync(newUser));
      if (error) {
        alert("hay error");
      } else {
        alert("usuario creado exitosamente");
      }
      console.log(data);
    }
  };
  const ValidatePass = (value) => {
    if (value.length < 8) {
      return "La contraseña debería contener al menos 8 caracteres";
    } else if (value.length > 16) {
      return "La contraseña debe contener menos de 16 de caracteres";
    } else {
      return true;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)} className="form">
        <label>
          <input
            type="text"
            placeholder="Nombre"
            {...register("name", { required: true })}
          />
          {errors.name && <span>El campo del nombre es requerido</span>}
        </label>
        <label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>El campo del email es requerido</span>}
        </label>
        <label>
          <input
            type="password"
            placeholder="Contraseña"
            {...register("password1", { validate: ValidatePass })}
          />
          {errors.password1 && <span>{errors.password1.message}</span>}
        </label>
        <label>
          <input
            type="password"
            placeholder="Confirmar contraseña"
            {...register("password2", { validate: ValidatePass })}
          />
          {errors.password2 && <span>{errors.password2.message}</span>}
        </label>
        <button type="submit">Registrarse</button>
      </form>
      <Link to="/">Ir a login</Link>
    </div>
  );
};

export default Register;
