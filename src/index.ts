import { getModels } from './models';
import { getPromptCompletion } from './promptCompletion';
import { getUserInfo } from './userInfo';
import { uploadFile } from './fileUpload';
import { generateImage } from './imageGeneration';
import dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.STRAICO_API_KEY;

if (!apiKey) {
  throw new Error('API key is not defined');
}

export {
  getModels,
  getPromptCompletion,
  getUserInfo,
  uploadFile,
  generateImage,
};

// getModels(apiKey)
//   .then((models) => console.log(models))
//   .catch((error) => console.error('Error fetching models:', error));

// Prompt Completion
getPromptCompletion(apiKey, {
  models: ['openai/gpt-3.5-turbo-0125'],
  message: 'Hello!',
})
  .then((response) => console.log(response))
  .catch((error) => console.error('Error fetching prompt completion:', error));

getUserInfo(apiKey)
  .then((userInfo) => console.log(userInfo))
  .catch((error) => console.error('Error fetching user info:', error));

// File Upload
// const fileInput = document.querySelector(
//   'input[type="file"]'
// ) as HTMLInputElement;
// if (fileInput.files.length > 0) {
//   const file = fileInput.files[0];
//   uploadFile(apiKey, file).then((response) => console.log(response));
// }

// Image Generation
// const options = {
//   model: 'openai/dall-e-3',
//   description: 'cute cat',
//   size: 'square',
//   variations: 2,
// };

// generateImage(apiKey, options).then((response) => console.log(response));
