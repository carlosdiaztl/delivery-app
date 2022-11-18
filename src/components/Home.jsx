import {signOut } from "firebase/auth";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { actionSignPhoneSync, actionUserCreateAsync, actionUserLogOutAsync } from '../redux/actions/userActions';

const Home = () => {
  const navigate=useNavigate()
  const userStore = useSelector((store) => store.userStore);
  console.log(userStore);
  const dispatch = useDispatch();
  const LogOutUser=()=>{
    // dispatch(actionUserCreateAsync({}))
    // dispatch(actionSignPhoneSync({}))
  //   signOut()
  //  .then(()=>{
  //   console.log('salir');
  //  })
  //  .catch((error)=>{console.log(error);})
  dispatch(actionUserLogOutAsync())
  
  }
  useEffect(() => {
    if (userStore.name) {
      
    }
    else{
      navigate(`/createaccount/${userStore.uid}`)

    }
    
  }, [])
  
  return (
    <div>Home
    <button onClick={LogOutUser}> Log Out</button>
    </div>
  )
}

export default Home
