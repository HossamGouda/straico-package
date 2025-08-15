# Straico API Client Library

[![NPM Version](https://img.shields.io/npm/v/straico-api)](https://www.npmjs.com/package/straico-api)
[![License](https://img.shields.io/npm/l/straico-api)](https://github.com/HossamGouda/straico-package/blob/main/LICENSE)

The official, lightweight JavaScript & TypeScript client for the [Straico API](https://straico.com/). This library provides a simple and convenient way to integrate Straico's powerful AI features into your web and Node.js applications.

It is designed to be fully typed, easy to use, and works seamlessly in both server-side and client-side environments.

## About Straico

The `straico-api` library gives you direct access to the powerful and comprehensive features of the Straico platform, a cohesive, centralized workspace designed to streamline AI-powered workflows.

### 🚀 Core AI Capabilities
*   **Multi-Modal AI Workspace**: Access advanced models for text, images, and audio in one unified platform.
*   **30+ LLMs in One Chat**: Choose from a wide range of cutting-edge models and run up to 4 parallel chats to compare responses side-by-side.
*   **State-of-the-Art Image Generation**: Utilize powerful models like FLUX 1.1 Pro, DALL-E 3, and Stable Diffusion for marketing, art, and data visualization.
*   **Multimedia Context**: Enhance your prompts by adding images, PDFs, text files, Excel, PowerPoint, audio, video, and even YouTube links.

### 🧑‍💻 Developer-Focused Tools
*   **Comprehensive API Access**: Leverage scalable and flexible endpoints for everything from simple apps to complex systems.
*   **Custom Templates & Prompt Library**: Speed up development with reusable, specialized prompts and AI-powered suggestions to refine your inputs.
*   **Integration Ecosystem**: Connect with platforms like ActivePieces, Albato, and Pabbly to create unified workflows across your existing tools.

### 🤝 Community & Support
*   **Active Community Hub**: Join a network of professionals, developers, and enthusiasts to get expert guidance, feedback, and shared resources.
*   **Responsive Support**: Get reliable assistance during integration and development, backed by continuous platform improvements.

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

## Agent Management

The library provides full support for creating, managing, and interacting with Agents. Agents can be associated with RAGs to create powerful, customized assistants.

```javascript
import { createAgent, addRagToAgent, getAgentPromptCompletion } from 'straico-api';

async function useAgent(apiKey, ragId) {
  try {
    // 1. Create a new Agent
    console.log('Creating agent...');
    const agentResponse = await createAgent(apiKey, {
      name: 'My Custom Agent',
      custom_prompt: 'You are an expert on the provided documents.',
      default_llm: 'anthropic/claude-3.5-sonnet',
    });
    const agentId = agentResponse.data._id;
    console.log(`Agent created with ID: ${agentId}`);

    // 2. Associate the Agent with a RAG
    console.log('Associating RAG with agent...');
    await addRagToAgent(apiKey, agentId, ragId);
    console.log('RAG associated successfully.');

    // 3. Query the Agent
    console.log('Querying agent...');
    const promptResponse = await getAgentPromptCompletion(apiKey, agentId, {
      prompt: 'What is the main topic of my documents?',
    });

    console.log('Answer:', promptResponse.data.answer);

  } catch (error) {
    console.error('An error occurred with the agent workflow:', error);
  }
}

// Example usage:
// const myRagId = 'your-rag-id-here';
// useAgent(process.env.STRAICO_API_KEY, myRagId);
```

### Image Generation (v1)

A new, upgraded image generation endpoint is available with different models and a new response structure.

```javascript
import { generateImageV1 } from 'straico-api';

async function generateV1Image(apiKey) {
  try {
    const response = await generateImageV1(apiKey, {
      model: 'fal-ai/flux/dev',
      description: 'A futuristic cityscape',
      size: 'landscape',
      variations: 1,
    });
    console.log('Image v1 response:', response.data);
  } catch (error) {
    console.error('Error generating v1 image:', error);
  }
}
```

## Additional Generative AI

The library also supports Text-to-Speech (TTS) and Image-to-Video generation.

### Text-to-Speech (TTS)

```javascript
import { createTextToSpeech } from 'straico-api';

async function generateSpeech(apiKey) {
  try {
    const audioBlob = await createTextToSpeech(apiKey, {
      model: 'eleven_multilingual_v2',
      text: 'Hello from the world of AI!',
      voice_id: 'voice-id-from-elevenlabslist', // Get this from getElevenLabsVoices()
    });
    // You can now play or save the audioBlob
    console.log('Audio generated:', audioBlob);
  } catch (error) {
    console.error('Error generating speech:', error);
  }
}
```

### Image-to-Video

```javascript
import { generateImageToVideo } from 'straico-api';

async function generateVideo(apiKey) {
  try {
    const response = await generateImageToVideo(apiKey, {
      model: 'fal-ai/kling-video/v2.1/master/image-to-video',
      description: 'A beautiful sunset',
      size: 'landscape',
      duration: 5,
      image_url: 'your-image-url-here',
    });
    console.log('Video generation response:', response.data);
  } catch (error) {
    console.error('Error generating video:', error);
  }
}
```

## Running the Comprehensive Test Script

For development and testing purposes, a comprehensive test script is available in the `straico-api-test` directory. This script, `full-api-test.js`, runs through all major functions of the library to ensure they work correctly with a live API key.

To run the test:
1. Navigate to the test directory: `cd straico-api-test`
2. Create a `.env` file and add your API key: `STRAICO_API_KEY="your_key_here"`
3. Run the script: `node full-api-test.js`

## Documentation

```

## Contributing

Contributions are welcome! If you have a feature request, bug report, or want to improve the code, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```
