import React from 'react'
import { useParams } from 'react-router-dom'

const Restaurantes = () => {
    const {name}=useParams()
  return (
    <div>Bienvenido a {name}
    </div>
  )
}

export default Restaurantes