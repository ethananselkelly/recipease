import React, { useState } from 'react'

const Scraper = ({ updateRecipes }) => {
  const [recipeURL, setRecipeURL] = useState({
    url: ''
  })
  
  const postRecipe = async (recipeURL) => {
    try {
      const response = await fetch(`/api/v1/recipes`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(recipeURL)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      const newRecipe = body.recipe
      await updateRecipes(newRecipe)
      return newRecipe
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handleInputChange = (event) => {
    setRecipeURL({
      ...recipeURL,
      [event.currentTarget.name]: event.currentTarget.value
    }
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await postRecipe(recipeURL)  
    document.getElementById('url').value = ''
  }

  return (
    <div className='container'>
      <p>Enter a link to a recipe below</p>
      <form id='scraper' onSubmit={handleSubmit}>
        <div>
          <label>
            <input type="text" name="url" id='url' onChange={handleInputChange} value={recipeURL.url}/>
          </label>
          <div>
            <input type="submit" value="Save Recipe" />
          </div>
        </div>
      </form>
    </div>
  )

}

export default Scraper