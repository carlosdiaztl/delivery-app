
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { userTypes } from "../types/userTypes";

export const userRegisterAsync = ({email,password,name}) => {
  return (dispatch) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async()=>{
        await updateProfile(auth.currentUser,{displayName:name} )
        dispatch(userRegisterSync({name,email, error:false}))

      })
      .catch((error) => {
        console.log(error);
        dispatch(userRegisterSync({error:true, email , name}))
      });
  };
};

const userRegisterSync = ({ name, email, error }) => {
  return {
    type: userTypes.CREATE_USER,
    payload: { name, email, error },
  };
};
