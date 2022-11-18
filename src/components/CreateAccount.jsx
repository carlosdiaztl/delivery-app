import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { actionAuthenticationSync, actionUserCreateAsync } from '../redux/actions/userActions';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';

const CreateAccount = () => {
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const {uid}=useParams()
  const userStore = useSelector((store) => store.userStore);

  useEffect(() => {
    if (userStore.name) {
      navigate("/home")
      
    }
   
  }, [userStore])
  


  const {
    register,
    handleSubmit,
   
  } = useForm()
const onSubmit=(data)=>{
console.log(data);
dispatch(actionUserCreateAsync(data))
dispatch(actionAuthenticationSync())
navigate("/home")
  }
  return (
    <div>CreateAccount 
    <form onSubmit={handleSubmit(onSubmit)}> 
    <input type="text" placeholder='name' {...register('name')} /> 
    <input type="email" placeholder='email' {...register('email')} /> 
    <input type="password" placeholder='password' {...register('password')} /> 
    <button type='submit'> Crear cuenta </button>
    </form>
    <span> {uid} </span>
    </div>
  )
}

export default CreateAccount