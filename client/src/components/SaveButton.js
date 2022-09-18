import React, { useState } from "react";
import { Link } from 'react-router-dom'

const SaveButton = ({isUserRecipe, setIsUserRecipe, recipe, user}) => {
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const removeRecipe = async () => {
    try {
      const response = await fetch(`/api/v1/recipes`,
      {
        method: 'DELETE',
        headers: new Headers({
          'Content-type': 'application/json',
        }),
        body: JSON.stringify(recipe)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      setShouldRedirect(true)
      return true
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const saveRecipe = async () => {
    try {
      const response = await fetch(`/api/v1/recipes/${recipe.id}`,{
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(recipe)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      return true
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handleRemove = async (event) => {
    if (window.confirm(`Remove ${recipe.name} from saved recipes?`)) {
      event.preventDefault()
      await removeRecipe()
      setIsUserRecipe(false)
    }
  }

  const handleSave = async (event) => {
    event.preventDefault()
    await saveRecipe()
    setIsUserRecipe(true)
  }

  if (shouldRedirect) {
    location.href = "/recipes";
  }

  let saveButton
  if (user) {
    if (isUserRecipe) {
      saveButton = 
      <button className='join-button show-link' onClick={handleRemove}>Remove recipe</button>
    } else {
      saveButton =
      <button className='join-button show-link' onClick={handleSave}>Save recipe</button>
    }
  } else {
    saveButton = 
    <Link className='show-link' to={`/user-sessions/new`}>Sign in to save recipe </Link>
  }
  //this doesn't work right now, maybe can get it to work? idk lol
  // {user ? isUserRecipe ? <button className='join-button show-link' onClick={handleRemove}>Remove recipe</button> : <button className='join-button show-link' onClick={handleSave}>Save recipe</button> : <Link className='show-link' to={`/user-sessions/new`}>Sign in to save recipe </Link>}
  return saveButton
  
}

export default SaveButton
