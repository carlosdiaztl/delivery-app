import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth, dataBase } from '../../Firebase/firebaseConfig';
import { actionLoginSync } from '../../redux/actions/userActions';
import Footer from '../home/footer/Footer';
import './style.scss';
import { useForm } from 'react-hook-form';
import { FloatingLabel, Form } from 'react-bootstrap';
import { fileUpLoad } from '../../services/fileUpLoad';
import Swal from 'sweetalert2';

const Perfil = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userStore = useSelector((store) => store.userStore);
  useEffect(() => {
    dispatch(actionLoginSync(userStore));
  }, [dispatch]);
  console.log(userStore);
  const [isEdit, setIsEdit] = useState(false);
  const defaulValues = {
    name: userStore ? userStore.name : '',
    adress: userStore ? userStore.address : '',
    // description: userStore ? userStore.description : "",
    // price: userStore ? userStore.price : "",
    // quantity: userStore ? userStore.quantity : "",
    //image: paleta ? paleta.image : ""
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
        console.log(user);
      } else {
        navigate(`/createaccount/${user.uid}`);
        console.log(user);
      }
    });
  }, []);
  console.log(userStore.avatar);
  const collectionName = 'usuarios';
  const [usuarios, setUsuarios] = useState([]);
  const sendInfoUser = async () => {
    const users = [];
    const userCollection = collection(dataBase, collectionName);
    const querySnapshot = await getDocs(userCollection);

    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    console.log(users);
    setUsuarios(users);
    setIsEdit(!isEdit);
    console.log(isEdit);
  };
  const showForm = () => {
    setIsEdit(!isEdit);
    console.log(isEdit);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaulValues,
  });

  const onSubmit = async (data) => {
    console.log(data);
    const docRef = doc(dataBase, `usuarios/${userStore.uid}`);
    if (data.name === '' && data.image.length) {
      const URLimg = await fileUpLoad(data.image[0]);
      console.log(URLimg);
      alert(`${defaulValues.name}`);
      console.log(data.address);
      updateDoc(docRef, {
        name: defaulValues.name,
        avatar: URLimg,
        address: data.address,
      });
      dispatch(
        actionLoginSync({
          name: defaulValues.name,
          avatar: URLimg,
          address: data.address,
        })
      );
      setIsEdit(false);
    }
    if (data.name !== '' && data.image.length) {
      Swal.fire('Informacion actualizada', '', 'success');
      const URLimg = await fileUpLoad(data.image[0]);
      console.log(URLimg);
      console.log(data.adress);

      updateDoc(docRef, {
        name: data.name,
        avatar: URLimg,
        address: data.address,
      });

      dispatch(
        actionLoginSync({
          name: data.name,
          avatar: URLimg,
          address: data.address,
        })
      );
      setIsEdit(false);
    }
  };
  console.log(usuarios);
  return (
    <div className={userStore.admin ? 'perfil_admin' : 'perfil'}>
      {userStore && userStore.admin ? (
        <div>
          <span>
            viendo los datos{' '}
            <button onClick={sendInfoUser}>Ver usuarios </button>{' '}
          </span>
          {isEdit && usuarios.length
            ? usuarios.map((person, index) => (
                <section className="perfiles" key={index}>
                  <span>{person.name ? person.name : ''}</span>
                  <br />
                  <span>{person.email ? person.email : ''}</span>
                  <br />
                  <span>{person.address ? person.address : ''}</span>
                </section>
              ))
            : ''}
        </div>
      ) : (
        <>
          <div className="d-flex align-items-center">
            <div className="card mb-4">
              <div className="card-body">
                <div className="user-avatar-section">
                  <div className="d-flex align-items-center flex-column">
                    {' '}
                    <img
                      className="perfil_img"
                      src={userStore.avatar ? userStore.avatar : ''}
                    />
                    <div className="user-info text-center">
                      <h4 className="mb-2">
                        {userStore.name ? userStore.name : ''}
                      </h4>
                      <span className="badge bg-label-secondary mt-1">
                        User
                      </span>
                    </div>
                    <span>
                      Direccion:{' '}
                      {userStore.address ? userStore.address : 'No definida'}{' '}
                    </span>
                    <button onClick={showForm}> Editar perfil</button>
                    {isEdit ? (
                      <form onSubmit={handleSubmit(onSubmit)}>
                        {/* register your input into the hook by invoking the "register" function */}
                        <input
                          defaultValue={defaulValues.name}
                          placeholder="Name"
                          {...register('name')}
                        />

                        {/* include validation with required or other standard HTML validation rules */}
                        <input
                          defaultValue={defaulValues.address}
                          placeholder="Direccion"
                          {...register('address', { required: true })}
                        />
                        {/* errors will return when field validation fails  */}
                        {errors.exampleRequired && (
                          <span>This field is required</span>
                        )}
                        <FloatingLabel className="mb-3">
                          <Form.Control
                            type="file"
                            size="sm"
                            defaultValue={defaulValues.image}
                            {...register('image', { required: true })}
                          />
                          {/* <p>{errors[item.name]?.message}</p> */}
                        </FloatingLabel>

                        <input type="submit" />
                      </form>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Perfil;
