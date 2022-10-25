import React, {useState, useEffect} from "react";
import { withRouter } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import FormError from "./layout/FormError";
import config from "../config";

const EditRecipeForm = (props) => {
  const [recipePayload, setRecipePayload] = useState({
    name: '',
    ingredients: [],
    instructions: [],
    url: '',
    image: '',
    source: '',
  })
  const [errors, setErrors] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const recipeId = props.match.params.id
  const getRecipe = async () => {
    try {
      const response = await fetch(`/api/v1/recipes/${recipeId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      const ingredientArray = body.recipe.ingredients.split('\n')
      const ingredientObjectArray = []
      ingredientArray.forEach(ingredient => {
        ingredientObjectArray.push({name: ingredient})
      })
      const instructionArray = body.recipe.instructions.split('\n')
      const instructionObjectArray = []
      instructionArray.forEach(instruction => {
        instructionObjectArray.push({name: instruction})
      })
      setRecipePayload({
        name: body.recipe.name,
        ingredients: ingredientObjectArray,
        instructions: instructionObjectArray,
        url: body.recipe.url,
        image: body.recipe.image,
        source: body.recipe.source
      })
    } catch (error) {
      console.error(`Error in fetch ${error.message}`)
    }
  }

  const postRecipe = async (recipePayload) => {
    try {
      const response = await fetch(`/api/v1/recipes/form`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(recipePayload)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const recipeData = response.json()
      setShouldRedirect(true)
      return true
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  
  useEffect(() => {
    getRecipe()
  }, [])

  const validateInput = (payload) => {
    setErrors({})
    const { name, ingredients, instructions, url, image } = payload
    let newErrors = {}

    if (name.trim() == '') {
      newErrors = {
        ...newErrors,
        name: 'name cannot be blank'
      }
    }
    if (ingredients.length < 2) {
      newErrors = {
        ...newErrors,
        ingredients: 'must have at least 2 ingredients'
      }
    }
    let blankIngredients = []
    ingredients.forEach((ingredient, index) => {
      if (ingredient.name.trim() == '') {
        blankIngredients.push(index+1)
        newErrors = {
          ...newErrors,
          ingredient: `ingredient cannot be blank - ingredient(s) ${blankIngredients}`
        }
      }
    })

    if (instructions.length < 2) {
      newErrors = {
        ...newErrors,
        instructions: 'must have at least 2 instructions'
      }
    }

    let blankInstructions = []
    instructions.forEach((instruction, index) => {
      if (instruction.name.trim() == '') {
        blankInstructions.push(index+1)
        newErrors = {
          ...newErrors,
          instruction: `instruction cannot be blank - instruction(s) ${blankInstructions}`
        }
      }
    })
  
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      return true
    }
    return false
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (validateInput(recipePayload)) {
      await postRecipe(recipePayload)
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

  const addIngredient = (index) => {
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

  if (shouldRedirect) {
    location.href = '/recipes'
  }

  return (
    <div className="form-container">
      <h4>Edit Recipe - this will save a copy of the recipe</h4>
      <form className="recipe-form" onSubmit={handleSubmit}>
        <label className="input-container">
          Name
          <FormError error={errors.name} />
          <TextField
            name='name'
            label='Recipe title'
            value={recipePayload.name}
            onChange={onInputChange}
            size='small'
          />
        </label>
        <label className="multi-input-container">
          Ingredients
          <FormError error={errors.ingredient} />
          <FormError error={errors.ingredients} />
          {recipePayload.ingredients.map((ingredient, index) => (
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
          ))}
          <AddIcon 
            className="add-button" 
            onClick={addIngredient}
            sx={{ color: 'white', borderRadius: 1.2, bgcolor: '#3190cf', boxShadow: 3}}
          />
        </label>
        <label className="multi-input-container">
          Instructions
          <FormError error={errors.instruction} />
          <FormError error={errors.instructions} />
          {recipePayload.instructions.map((instruction, index) => (
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
          ))}
          <AddIcon 
            className="add-button" 
            onClick={addInstruction}
            sx={{ color: 'white', borderRadius: 1.2, bgcolor: '#3190cf', boxShadow: 3}}
          />
        </label>
        <label>
          <Button size='small' variant='contained' type='submit' sx={{marginRight: '0.5em'}} >Save</Button>
          <Button size='small' variant='outlined' href={`/recipes/${recipeId}`} sx={{marginLeft: '0.5em'}} >Cancel</Button>
        </label>
      </form>
    </div>
  )
}

export default withRouter(EditRecipeForm)