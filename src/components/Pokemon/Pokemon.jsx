import React from 'react'
import './Pokemon.css'
const Pokemon = ({name , url}) => {
  return (
    <div className='pokemon'>
      <div className='pokemon-name'>{name}</div>
        <img className='pokemon-img' src={url}/>
      
    </div>
  )
}

export default Pokemon
