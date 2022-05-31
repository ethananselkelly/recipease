import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const ScraperShow = (props) => {
  const [recipeURL, setRecipeURL] = useState({
    url: ''
  })
  const [shouldRedirect, setShouldRedirect] = useState(false)
  
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
      return true
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
    
    setShouldRedirect(true)
    
  }

  if(shouldRedirect) {
    return <Redirect push to={`/recipes`} />
  }

  return (
    <div>
      <p>Enter a link to a recipe below and save it to your profile</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            URL:
            <input type="text" name="url" onChange={handleInputChange} value={recipeURL.url}/>
          </label>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </div>
      </form>
    </div>
  )

}

export default ScraperShow