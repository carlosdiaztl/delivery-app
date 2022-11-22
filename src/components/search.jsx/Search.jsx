import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionGetPlatosAsync } from "../../redux/actions/platosActions";
import Footer from "../home/footer/Footer";
import "./style.scss";

const Search = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [busqueda, setBusqueda] = useState(false);
  const [msj, setMsj] = useState(false);
  const { platos } = useSelector((store) => store.platosStore);
  console.log(platos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionGetPlatosAsync());
  }, [dispatch]);
  const SearchInput = ({ target }) => {
    const parametro = target.value;
    setValue(parametro);
  };

  const platosFind = platos.filter((platos) => platos.name.includes(value));

  useEffect(() => {
    console.log(value);
    if (value === "") {
      setBusqueda(false);
      setMsj(false);
    } else {
      console.log(platosFind);
      setBusqueda(true);
    }
    if (value !== "" && !platosFind.length) {
      setMsj(true);

      console.log("sin reultados");
    }
  }, [value]);
  const goProduct = (name) => {
    navigate(`/plato${name}`);
  };

  return (
    <div>
      <span className="input">
        <input
          onChange={SearchInput}
          value={value}
          placeholder="Search for a dish"
        />
      </span>
      <p className="p"> Recent Searches</p>
      <section>
        {busqueda && platosFind.length ? (
          platosFind.map((plato, index) => (
            <span
              className="cardP"
              onClick={() => {
                goProduct(plato.name);
              }}
              key={index}
            >
              <figure>
                {" "}
                <img src={plato.image} />
              </figure>{" "}
              <span>
                <h5>{plato.name} </h5> <h5>$ {plato.price}</h5>{" "}
              </span>
            </span>
          ))
        ) : (
          <></>
        )}
        {msj ? (
          <span>
            <h2>Sin resultados</h2>
          </span>
        ) : (
          <></>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Search;
