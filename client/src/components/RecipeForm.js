import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { TextField, Button } from "@mui/material";

const RecipeForm = (props) => {

  const [recipePayload, setRecipePayload] = useState({
    name: '',
    ingredients: [{name: ''}],
    instructions: [{name: ''}],
    url: '',
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
      <div className="multi-input" key={index+1}>
        <TextField 
          name='ingredient' 
          label={`Ingredient ${index+1}`}
          value={ingredient.name}
          onChange={onIngredientChange(index)}
          size='small'
        />
        <RemoveIcon 
          className="remove-button" 
          onClick={removeIngredient(index)} 
          size='small' 
          sx={{ color: 'white', borderRadius: 1.2, bgcolor: '#3190cf', boxShadow: 3}}
        />
      </div>
    )
  })

  const instructionInputs = recipePayload.instructions.map((instruction, index) => {
    return (
      <div className="multi-input" key={index+1}>
         <TextField 
          name='instruction' 
          label={`Instruction ${index+1}`}
          value={instruction.name}
          onChange={onInstructionChange(index)}
          size='small'
          multiline={true}
          rows={2}
        />
        <RemoveIcon 
          className="remove-button"  
          onClick={removeInstruction(index)} 
          size='small' 
          sx={{ color: 'white', borderRadius: 1.2, bgcolor: '#3190cf', boxShadow: 3}}
        />
      </div>
    )
  })

  return (
    <div className="form-container">
      <h3>New Recipe Form</h3>
      <form className="recipe-form" onSubmit={console.log(recipePayload)} >
        <label className="input-container">
          Name
          <TextField 
            name='name'
            label='Enter a title for your recipe'
            value={recipePayload.name}
            onChange={onInputChange} 
            size='small'
            required={true}
          />
        </label>
        <label className="multi-input-container">
          Ingredients
          {ingredientInputs}
          <AddIcon 
            className="add-button" 
            onClick={addIngredient}
            sx={{ color: 'white', borderRadius: 1.2, bgcolor: '#3190cf', boxShadow: 3}}
          />
        </label>
        <label className="multi-input-container">
          Instructions
          {instructionInputs}
          <AddIcon 
            className="add-button" 
            onClick={addInstruction}
            sx={{ color: 'white', borderRadius: 1.2, bgcolor: '#3190cf', boxShadow: 3}}
          />
        </label>
        <label className="input-container">
          Source URL
          <TextField 
            name='url'
            label='Optional'
            value={recipePayload.url}
            onChange={onInputChange}
            size='small'
          />
        </label>
        <label className="input-container">
          Image URL
          <TextField
            name='image'
            label='Optional'
            value={recipePayload.image}
            onChange={onInputChange}
            size='small'
          />
        </label>
        <label>
          <Button variant='contained' type='submit' size='small' >
            Save Recipe
          </Button>
        </label>
      </form>
    </div>
  )
}

export default RecipeForm