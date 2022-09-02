import React, { useState } from 'react'
import FormError from './layout/FormError'
import { ThreeDots } from 'react-loader-spinner'

const Scraper = ({ updateRecipes }) => {
  const [recipeURL, setRecipeURL] = useState({
    url: ''
  })

  const [errors, setErrors] = useState(null)
  const [visibility, setVisibility] = useState(false)
  
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
      document.getElementById('url').value = ''
      return newRecipe
    } catch (error) {
      setErrors('bad URL')
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
    setVisibility(true)
    setErrors(null)
    await postRecipe(recipeURL)  
    setVisibility(false)
  }

  let hint
  if (errors) {
    hint = <a href='https://github.com/hhursev/recipe-scrapers#scrapers-available-for' target='_blank'>List of scrapable websites</a>
  }

  return (
    <div>
      <p className='scraper-header'>Enter a URL to a recipe below</p>
      <form id='scraper' onSubmit={handleSubmit}>
        <div className='scraper-container'>
          <label className='scraper-input'>
            <input type="text" name="url" id='url' onChange={handleInputChange} value={recipeURL.url}/>
          </label>
          <div className='scraper submit'>
            <input className='minus-button' type="submit" value="Save" />
          </div>
        </div>
        <div className='scraper-feedback'>
          <ThreeDots 
            height='40'
            width='40'
            radius={2}
            color='#1879ba'
            visible={visibility}
          />
          <FormError error={errors} />
          {hint}
        </div>
      </form>
    </div>
  )

}

export default Scraper