import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import './style.scss'
import { actionGetPlatosAsync } from '../../redux/actions/platosActions'

const Restaurantes = () => {

  const {platos}=useSelector(state=>state.platosStore)
  console.log(platos);
  
    const {name}=useParams()
    console.log(name);
  const [platosR,setPlatosR]=useState("")
  const platosRestaurante = platos.filter(plato=>plato.property ===  name)
  console.log(platosRestaurante);
  


  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(actionGetPlatosAsync())
    
    
  }, [dispatch])
  
  
  return (
    <div>Bienvenido a {name}
    {platosRestaurante.map((plate,index)=>(
      <section className='platos' key={index} > <h4>{plate.name} </h4>
      <img src={plate.image} />
       </section>
    ))}
    </div>
  )
}

export default Restaurantes