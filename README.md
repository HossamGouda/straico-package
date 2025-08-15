# Straico API

An npm package to interact with the Straico API.

## Installation

```bash
npm install straico-api
```

## Usage

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

const apiKey = "your_api_key_here";
```

### Browser Usage

This package can be used in a browser environment. The `uploadFile` function is specifically designed to work with the browser's `File` object.

### Functions

#### `getModels(apiKey: string): Promise<ApiResponse<any>>`

Fetches the available models from the Straico API.

```ts
getModels(apiKey)
  .then((response) => console.log(response.data))
  .catch((error) => console.error('Error fetching models:', error));
```

#### `getPromptCompletion(apiKey: string, options: PromptCompletionOptions): Promise<ApiResponse<PromptCompletionResponse>>`

Fetches a prompt completion from the Straico API.

```ts
getPromptCompletion(apiKey, {
  models: ['openai/gpt-3.5-turbo-0125'],
  message: 'Hello!',
})
  .then((response) => console.log(response.data))
  .catch((error) => console.error('Error fetching prompt completion:', error));
```

#### `getUserInfo(apiKey: string): Promise<ApiResponse<any>>`

Fetches user information from the Straico API.

```ts
getUserInfo(apiKey)
  .then((response) => console.log(response.data))
  .catch((error) => console.error('Error fetching user info:', error));
```

#### `uploadFile(apiKey: string, file: File): Promise<ApiResponse<any>>`

Uploads a file to the Straico API.

```ts
const fileInput = document.querySelector(
  'input[type="file"]'
) as HTMLInputElement;
if (fileInput.files.length > 0) {
  const file = fileInput.files[0];
  uploadFile(apiKey, file).then((response) => console.log(response.data));
}
```

#### `generateImage(apiKey: string, options: ImageGenerationOptions): Promise<ApiResponse<any>>`

Generates an image using the Straico API.

```ts
const options = {
  model: 'openai/dall-e-3',
  description: 'cute cat',
  size: 'square',
  variations: 2,
};

generateImage(apiKey, options).then((response) => console.log(response.data));
```

### Types

This package exports the following types:

- `ApiResponse<T>`
- `PromptCompletionOptions`
- `ImageGenerationOptions`
- `CompletionChoice`
- `ModelCompletion`
- `PromptCompletionResponse`

## License

This project is licensed under the MIT License.
