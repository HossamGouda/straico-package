# Straico API Client Library

[![NPM Version](https://img.shields.io/npm/v/straico-api)](https://www.npmjs.com/package/straico-api)
[![License](https://img.shields.io/npm/l/straico-api)](https://github.com/HossamGouda/straico-package/blob/main/LICENSE)

The official, lightweight JavaScript & TypeScript client for the [Straico API](https://straico.com/). This library provides a simple and convenient way to integrate Straico's powerful AI features into your web and Node.js applications.

It is designed to be fully typed, easy to use, and works seamlessly in both server-side and client-side environments.

## Features

- 🤖 **Prompt Completion:** Access powerful language models like GPT-3.5 and more.
- 🎨 **Image Generation:** Create stunning images with models like DALL-E 3.
- 📂 **File Uploads:** Seamlessly upload files for use with the API.
- 📈 **Model Information:** Fetch a list of currently available models.
- 👤 **User Information:** Retrieve details about your user account.

## Why Use This Library?

- **Modern:** Built with `async/await` and modern JavaScript practices.
- **Fully Typed:** Provides a great developer experience with TypeScript, including type definitions for API responses and options.
- **Universal:** Works in both Node.js and modern web browsers.
- **Lightweight:** No unnecessary dependencies, keeping your projects lean.

## Installation

Install the package using npm:

```bash
npm install straico-api
```

## Quick Start

Here's a simple example of how to get a prompt completion:

```javascript
import { getPromptCompletion } from 'straico-api';

// It's recommended to use environment variables for your API key
const apiKey = process.env.STRAICO_API_KEY || 'your_straico_api_key';

async function getJoke() {
  try {
    const options = {
      models: ['openai/gpt-3.5-turbo-0125'],
      message: 'Tell me a short joke about programming.',
    };

    const response = await getPromptCompletion(apiKey, options);

    // Access the actual data from the API response
    const completionData =
      response.data.completions['openai/gpt-3.5-turbo-0125'];
    const joke = completionData.completion.choices[0].message.content;

    console.log(joke);
  } catch (error) {
    console.error('Failed to get prompt completion:', error);
  }
}

getJoke();
```

## Usage Examples

Here is a more comprehensive example demonstrating how to use all the core functions of the library in a single script. This example uses CommonJS (`require`) syntax.

First, make sure you have `dotenv` installed (`npm install dotenv`) and a `.env` file with your `STRAICO_API_KEY`.

```javascript
const {
  getModels,
  getPromptCompletion,
  getUserInfo,
  generateImage,
} = require('straico-api');
const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.STRAICO_API_KEY;

if (!apiKey) {
  console.error('Error: STRAICO_API_KEY is not defined in your .env file.');
  process.exit(1);
}

console.log('--- Testing getModels ---');
getModels(apiKey)
  .then((response) => console.log('Success:', response.data))
  .catch((error) => console.error('Error:', error.message));

console.log('\n--- Testing getPromptCompletion ---');
getPromptCompletion(apiKey, {
  models: ['amazon/nova-lite-v1'],
  message: 'Hello, world!',
})
  .then((response) => console.log('Success:', response.data))
  .catch((error) => console.error('Error:', error.message));

console.log('\n--- Testing getUserInfo ---');
getUserInfo(apiKey)
  .then((response) => console.log('Success:', response.data))
  .catch((error) => console.error('Error:', error.message));

console.log('\n--- Testing generateImage ---');
generateImage(apiKey, {
  model: 'openai/dall-e-3',
  description: 'a white siamese cat',
  size: 'square',
  variations: 1,
})
  .then((response) => console.log('Success:', response.data))
  .catch((error) => console.error('Error:', error.message));
```

## Documentation

```

For more detailed information on each function, the available options, and the structure of the returned data, please refer to the [Straico API Documentation](https://documenter.getpostman.com/view/5900072/2s9YyzddrR).

## Contributing

Contributions are welcome! If you have a feature request, bug report, or want to improve the code, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```
