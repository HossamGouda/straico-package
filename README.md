# Straico API

An npm package to interact with the Straico API.

## Installation

```bash
npm install straico-api
```

## Usage

First, you need to set up your API key. Create a `.env` file in the root of your project and add your Straico API key:

```env
STRAICO_API_KEY="your_api_key_here"
```

### Importing the Library

You can import the library functions as follows:

```ts
import {
  getModels,
  getPromptCompletion,
  getUserInfo,
  uploadFile,
  generateImage,
} from 'straico-api';
import dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.STRAICO_API_KEY;

if (!apiKey) {
  throw new Error('API key is not defined');
}
```

### Functions

#### `getModels(apiKey: string): Promise<string>`

Fetches the available models from the Straico API.

```ts
getModels(apiKey)
  .then((models) => console.log(models))
  .catch((error) => console.error('Error fetching models:', error));
```

#### `getPromptCompletion(apiKey: string, options: PromptCompletionOptions): Promise<string>`

Fetches a prompt completion from the Straico API.

```ts
getPromptCompletion(apiKey, {
  models: ['openai/gpt-3.5-turbo-0125'],
  message: 'Hello!',
})
  .then((response) => console.log(response))
  .catch((error) => console.error('Error fetching prompt completion:', error));
```

#### `getUserInfo(apiKey: string): Promise<string>`

Fetches user information from the Straico API.

```ts
getUserInfo(apiKey)
  .then((userInfo) => console.log(userInfo))
  .catch((error) => console.error('Error fetching user info:', error));
```

#### `uploadFile(apiKey: string, file: File): Promise<ApiResponse<JSON>>`

Uploads a file to the Straico API.

```ts
const fileInput = document.querySelector(
  'input[type="file"]'
) as HTMLInputElement;
if (fileInput.files.length > 0) {
  const file = fileInput.files[0];
  uploadFile(apiKey, file).then((response) => console.log(response));
}
```

#### `generateImage(apiKey: string, options: ImageGenerationOptions): Promise<ApiResponse<JSON>>`

Generates an image using the Straico API.

```ts
const options = {
  model: 'openai/dall-e-3',
  description: 'cute cat',
  size: 'square',
  variations: 2,
};

generateImage(apiKey, options).then((response) => console.log(response));
```

### Types

#### `ApiResponse<T>`

Represents the structure of an API response.

```ts
interface ApiResponse<T> {
  data: T;
  success: boolean;
}
```

#### `PromptCompletionOptions`

Options for fetching a prompt completion.

```ts
interface PromptCompletionOptions {
  models: string[];
  message: string;
}
```

#### `ImageGenerationOptions`

Options for generating an image.

```ts
interface ImageGenerationOptions {
  model: string;
  description: string;
  size: string;
  variations: number;
}
```

## License

This project is licensed under the MIT License.
