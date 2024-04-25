import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { auth } from '../../Firebase/firebaseConfig';
import { actionAddCompra } from '../../redux/actions/comprasActions';
import { actionGetPlatosAsync } from '../../redux/actions/platosActions';
import { Card, Button } from 'react-bootstrap';
import './stylePlato.scss';
import Footer from '../home/footer/Footer';

const Plato = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { platos } = useSelector((state) => state.platosStore);
  const { name } = useParams();
  const platoSelect = platos.find((plato) => plato.name === name);

  useEffect(() => {
    dispatch(actionGetPlatosAsync());
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user?.displayName) {
        navigate(`/createaccount/${user?.uid}`);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const goBack = () => {
    navigate(`/restaurante${platoSelect?.property}`);
  };

  const changeQuantity = (action) => {
    if (action === 'decrease') {
      setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
    } else if (action === 'increase') {
      setQuantity((prevQuantity) => (prevQuantity < 10 ? prevQuantity + 1 : prevQuantity));
    }
  };

  const agregarCompra = () => {
    const total = platoSelect?.price * quantity;
    const newBuy = {
      restaurante: platoSelect?.property,
      platoName: platoSelect?.name,
      price: platoSelect?.price,
      quantity,
      total,
      confirmacion: false,
    };
    dispatch(actionAddCompra(newBuy));
    Swal.fire('Tu compra ha sido agregada con éxito', 'Que la disfrutes', 'success');
  };

  return (
    <>
      {platoSelect && (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <Card>
                <Card.Header>
                  <Button variant="link"  onClick={goBack}>&lt;Regresar</Button>
                </Card.Header>
                <Card.Body>
                  <Card.Title>{platoSelect.name}</Card.Title>
                  <Card.Text>
                    <img
                      src={platoSelect.image}
                      alt={platoSelect.name}
                      className="img-fluid"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    <p>Precio: ${platoSelect.price}</p>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <div className="divbotones">
                    <aside className="compraButtons">
                      <Button variant="outline-secondary" onClick={() => changeQuantity('decrease')}>-</Button>
                      <span>{quantity}</span>
                      <Button variant="outline-secondary" onClick={() => changeQuantity('increase')}>+</Button>
                    </aside>
                    <Button variant="primary" onClick={agregarCompra}>
                      <span>Añadir </span>
                      <span>${platoSelect.price && quantity * platoSelect.price}</span>
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Plato;
