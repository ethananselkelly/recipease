import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import FormError from "./layout/FormError";

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

  const postRecipeForm = async (recipePayload) => {
    try {
      const response = await fetch(`/api/v1/recipes/recipe-form`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(recipePayload)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      const newRecipe = body.recipe
      return newRecipe
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const validateInput = (payload) => {
    setErrors({});
    const { name, ingredients, instructions } = payload;
    let newErrors = {};
    if (name.trim() == "") {
      newErrors = {
        ...newErrors,
        name: "name is required"
      }
    }
    if (ingredients.length < 3) {
      newErrors = {
        ...newErrors,
        ingredients: "must have at least 3 ingredients"
      }
    } else {
      ingredients.forEach((ingredient) => {
        if (ingredient.name.trim() === '') {
          newErrors = {
            ...newErrors,
            ingredients: "ingredients cannot be blank"
          }
        }
      })
    }
    if (instructions.length < 2) {
      newErrors = {
        ...newErrors,
        instructions: "must have at least 2 instructions"
      }
    } else {
      instructions.forEach((instruction) => {
        if (instruction.name.trim() === '') {
          newErrors = {
            ...newErrors,
            instructions: "instructions cannot be blank"
          }
        }
      })
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true
    }
    return false
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (validateInput(recipePayload)) {
      await postRecipeForm(recipePayload)  
      setShouldRedirect(true)
    }
  }

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
      <div className="ingredient-input" key={index+1}>
        <div className="list-number">
          {index+1}.
        </div>
        <input
          className="input-field"
          type='text'
          name='ingredient'
          value={ingredient.name || ''}
          onChange={onIngredientChange(index)}
        />
        <button 
          className="minus-button"
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
      <div className="instruction-input" key={index+1}>
        <div className="list-number">
          {index+1}.
        </div>
        <textarea
          className="input-field"
          rows='3'
          cols='30'
          type='text'
          name='instruction'
          value={instruction.name || ''}
          onChange={onInstructionChange(index)}
        />
        <button 
          className="minus-button"
          type='button'
          onClick={removeInstruction(index)}
        >
          - 
        </button>
      </div>
    )
  })

  if (shouldRedirect) {
    return <Redirect to={`/recipes`} />
  }

  return (
    <div className="index-container">
      <form className="grid-container" onSubmit={handleSubmit}>
        <h4>New Recipe</h4>
        <div>
          <label>
            Name
            <input 
              type='text'
              name='name'
              value={recipePayload.name || ''}
              onChange={onInputChange}
            />
            <FormError error={errors.name} />
          </label>
        </div>
        <div>
          <label>
            <p>Ingredients</p>
            
            <button
              className="add-button"
              type='button'
              onClick={addIngredient}
            >
              Add ingredient
            </button>
            {ingredientInputs}
            <FormError error={errors.ingredients} />
          </label>
        </div>
        <div>
          <label>
            <p>Instructions</p>
            
            <button
              className="add-button"
              type='button'
              onClick={addInstruction}
            >
              Add instruction
            </button>
            {instructionInputs}
            <FormError error={errors.instructions} />
          </label>
        </div>
        <div>
          <label>
            Notes
            <textarea 
              rows='4'
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
            <input className="save-button" type="submit" value="Save Recipe" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default RecipeForm
