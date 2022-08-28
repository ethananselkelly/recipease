import React from "react";
import { Link } from 'react-router-dom'

const SaveButton = ({isUserRecipe, setIsUserRecipe, recipe, user}) => {
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
    event.preventDefault()
    await removeRecipe()
    setIsUserRecipe(false)
  }

  const handleSave = async (event) => {
    event.preventDefault()
    await saveRecipe()
    setIsUserRecipe(true)
  }

  let saveButton
  if (user) {
    if (isUserRecipe) {
      saveButton = 
      <button className='removeButton' onClick={handleRemove}>Unsave recipe</button>
    } else {
      saveButton =
      <button className='removeButton' onClick={handleSave}>Save recipe</button>
    }
  } else {
    saveButton = 
    <Link to={`/user-sessions/new`}>Sign in to save recipe </Link>
  }

  return saveButton
}

export default SaveButton
