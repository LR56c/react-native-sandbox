import OpenAI from "openai"
import axios  from "axios"

const openai                 = new OpenAI( {
  baseURL: "https://openrouter.ai/api/v1",
  apiKey : process.env.EXPO_PUBLIC_OPENROUTER_API_KEY
} )
export const CALORIES_PROMPT = `Based on Weight,Height, Gender,Goal give me calories and proteins need daily Consider Age as 28 in JSON format and follow the schema:
{
  calories : <>,
  proteins : <>,
}`

export const GENERATE_RECIPE_PROMPT = `Depends on user intructions create 3 different recipes variant with recipe name with emoji, 2 line description and main ingredient list in JSON format with field recipeName,description,ingredients(without size). Dont give me a text response`

export const GENERATE_COMPLETE_RECIPE_PROMPT = `
- As per recipeName and description give me recipeName and description as field, Give me all list of ingredients as ingredient
- emoji icons for each ingredient as icon, quantity as quantity, along  with detail step by step recipe as steps
- total calories as calories (only number), minutes to cook as cookTime and serving number as serveTo
- realistic image text prompt as per recipe as imagePrompt
- give me category list for recipe from [Breakfast, Lunch,Dinner, Salad, Desert, Fastfood, Drink, Cake] as category
- give me response in json format only
- schema format should be:
{
"description": "string",
"recipeName": "string",
"calories": "string",
"category": ["string"],
"cookTime": "number",
"imagePrompt": "string",
"ingredients": [
  {
    "icon": "string",
    "ingredient": "string",
    "quantity": "string"
  }
],
"serveTo": "number",
"steps":["string"]
}
`

const AIMODEL                     = "google/gemini-2.0-flash-exp:free"
export const CalculateCaloriesBot = async ( prompt: string ) => await openai.chat.completions.create(
  {
    model   : AIMODEL,
    messages: [
      { role: "user", content: prompt }
    ]
  } )

export const GenerateRecipeBot         = async ( prompt: string ) => await openai.chat.completions.create(
  {
    model   : "google/gemini-2.0-flash-exp:free",
    messages: [
      { role: "user", content: prompt }
    ]
  } )
export const GenerateCompleteRecipeBot = async ( prompt: string ) => await openai.chat.completions.create(
  {
    model   : "google/gemini-2.0-flash-exp:free",
    messages: [
      { role: "user", content: prompt }
    ]
  } )

export const GenerateRecipeImageBot = async ( input: string ) => await axios.post(
  "https://aigurulab.tech/api/generate-image",
  {
    width      : 1024,
    height     : 1024,
    input      : input,
    model      : "sdxl",
    aspectRatio: "1:1"
  },
  {
    headers: {
      "x-api-key"   : process.env.EXPO_PUBLIC_AIGURULAB_API_KEY,
      "Content-Type": "application/json"
    }
  } )
