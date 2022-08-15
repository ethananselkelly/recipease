import React, { useState } from "react";

const RecipeForm = (props) => {
  
  const [recipePayload, setRecipePayload] = useState({
    name: '',
    ingredients: [{name: ''}],
    instructions: [{name: ''}],
    notes: '',
    tags: [],
    image: '',

  })

  const [errors, setErrors] = useState({});

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const onInputChange = (event) => {
    setRecipePayload({
      ...recipePayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const onIngredientChange = index => event => {
    const newIngredients = recipePayload.ingredients.map((ingredient, ingredientIndex) => {
      if (index != ingredientIndex) return ingredient
      return {...ingredient, name: event.target.value}
    })
    setRecipePayload({
      ...recipePayload,
      ingredients: newIngredients
    })
  }

  const onInstructionChange = index => event => {
    const newInstructions = recipePayload.instructions.map((instruction, instructionIndex) => {
      if (index != instructionIndex) return instruction
      return {...instruction, name: event.target.value}
    })
    setRecipePayload({
      ...recipePayload,
      instructions: newInstructions
    })
  }

  const addIngredient = () => {
    setRecipePayload({
      ...recipePayload,
      ingredients: recipePayload.ingredients.concat([{ name: '' }])
    })
  }

  const removeIngredient = (index) => () => {
    setRecipePayload({
      ...recipePayload,
      ingredients: recipePayload.ingredients.filter((ingredient, ingredientIndex) => index != ingredientIndex)
    })
  }

  const addInstruction = () => {
    setRecipePayload({
      ...recipePayload,
      instructions: recipePayload.instructions.concat([{ name: '' }])
    })
  }

  const removeInstruction = (index) => () => {
    setRecipePayload({
      ...recipePayload,
      instructions: recipePayload.instructions.filter((instruction, instructionIndex) => index != instructionIndex)
    })
  }

  const ingredientInputs = recipePayload.ingredients.map((ingredient, index) => {
    return (
      <div key={index+1}>
        {index+1}.
        <input
          type='text'
          name='ingredient'
          value={ingredient.name || ''}
          onChange={onIngredientChange(index)}
        />
        <button 
          type='button'
          onClick={removeIngredient(index)}
        >
          - 
        </button>
      </div>
    )
  })

  const instructionInputs = recipePayload.instructions.map((instruction, index) => {
    return (
      <div key={index+1}>
        {index+1}.
        <input
          type='text'
          name='instruction'
          value={instruction.name || ''}
          onChange={onInstructionChange(index)}
        />
        <button 
          type='button'
          onClick={removeInstruction(index)}
        >
          - 
        </button>
      </div>
    )
  })

  return (
    <div className="grid-container">
      <h3>New Recipe Form</h3>
      <form>
        <div>
          <label>
            Name
            <input 
              type='text'
              name='name'
              value={recipePayload.name || ''}
              onChange={onInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Ingredients
            {ingredientInputs}
            <button
              type='button'
              onClick={addIngredient}
            >
              Add ingredient
            </button>
          </label>
        </div>
        <div>
          <label>
            Instructions
            {instructionInputs}
            <button
              type='button'
              onClick={addInstruction}
            >
              Add instruction
            </button>
          </label>
        </div>
        <div>
          <label>
            Notes
            <textarea 
              rows='5'
              cols='30'
              type='text'
              name='notes'
              value={recipePayload.notes || ''}
              onChange={onInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Tags (separate by commas)
            <input 
              type='text'
              name='tags'
              value={recipePayload.tags || ''}
              onChange={onInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Image URL
            <input 
              type='text'
              name='image'
              value={recipePayload.image || ''}
              onChange={onInputChange}
            />
          </label>
          <div>
            <input type="submit" value="Save Recipe" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default RecipeForm