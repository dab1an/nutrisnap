"use server";
import { mealInsertSchema } from "@/schemas/meal";
import Instructor from "@instructor-ai/instructor";
import OpenAI from "openai";
import { z } from "zod";
import { createMeal } from "./mutations";
import { NextResponse } from "next/server";

const PROMPT = `
You are a highly skilled dietary analyst tasked with providing detailed nutritional information for meals based on images. Your goal is to accurately identify all components of the meal and provide a comprehensive nutritional breakdown, including calories, macronutrients (protein, carbs, fat), and any other relevant details.
When presented with an image, carefully examine it and:
1. Identify distinct dishes or food items present. Separate items that are clearly meant to be consumed separately (e.g. a sandwich and side salad), but keep composite dishes (e.g. a burrito bowl) as a single item.
2. For each distinct item, provide a concise name or description.
3. Estimate the ingredients and portion sizes as accurately as possible based on the image.
4. Calculate the total calories, protein, carbohydrates, fiber, and fat for each item, breaking down macronutrients into subtypes (e.g. saturated/unsaturated fats) if possible.
Note any potential allergens, nutrients of concern, or healthy/unhealthy attributes you can discern.
Your response should be structured according to the response model given. Strive for maximum accuracy while acknowledging any uncertainties or estimates made. This data will empower users to make informed dietary choices.`;

const oai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? undefined,
});

const client = Instructor({
  client: oai,
  mode: "MD_JSON",
});

//the response from gpt should have all the fields of mealInsertSchema except location and userId
const MealResponseModel = z.object({
  meals: z.array(
    mealInsertSchema.omit({
      location: true,
      user_email: true,
      img: true,
    })
  ),
});

/*
 * Extracts meal information from an image
 * @param image - the image of the meal as a base64 string
 * @returns the extracted meal information
 */
export async function extractMealInfoFromImage(image: string) {
  console.log("extracting meal info from image", image);
  const response = await client.chat.completions.create({
    model: "gpt-4-vision-preview",
    response_model: {
      schema: MealResponseModel,
      name: "ExtractedMealInfo",
    },
    temperature: 0.1,
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: PROMPT,
          },

          { type: "image_url", image_url: { url: image } },
        ],
      },
    ],
  });

  console.log(response);

  for (const meal of response.meals) {
    const dto = {
      ...meal,
      img: image,
      location: "Home",
    };

    const res = await createMeal(dto);
    console.log("meal inserted", res);
  }

  //redirect to the dashboard
  // return NextResponse.redirect("http://localhost:3000/dashboard");
}
