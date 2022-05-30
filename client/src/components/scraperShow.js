import React, { useState } from 'react'

const ScraperShow = (props) => {
  const [recipeURL, setRecipeURL] = useState('')

  const handleInputChange = (event) => {
    setRecipeURL(
      event.currentTarget.value
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()

  }

  return (
    <div>
      <p>this is scraper page</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            URL:
            <input type="text" name="url" onChange={handleInputChange} value={recipeURL}/>
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