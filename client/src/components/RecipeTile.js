import React from 'react'
import { Link } from 'react-router-dom'

const RecipeTile = ({ recipe }) => {

  return (
    <div className='recipe-tile'>
      <li>
        <div className='recipe-info'>
          <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
          <p className='source'>{recipe.source}</p>
        </div>
      </li>
    </div>
  )
}

export default RecipeTile
