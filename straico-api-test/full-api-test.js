/*
This script is a comprehensive integration test for the straico-api library.
It calls all major functions to ensure they work as expected with a live API key.

Instructions:
1. Make sure you are in the 'straico-api-test' directory.
2. Ensure you have a .env file in this directory with your STRAICO_API_KEY.
   STRAICO_API_KEY="your_actual_api_key"
3. Run the script from your terminal: node full-api-test.js
*/

const { 
  getModels,
  getPromptCompletion,
  getUserInfo,
  generateImageV1,
  // Note: RAG and Agent creation/deletion are commented out by default
  // to avoid creating new items on every test run.
  // You can uncomment them to test the full workflow.
  // createRag,
  // getRagPromptCompletion,
  // createAgent,
  // addRagToAgent,
  // getAgentPromptCompletion,
  getElevenLabsVoices,
  createTextToSpeech,
  generateImageToVideo,
} = require("straico-api");
const dotenv = require("dotenv");
dotenv.config();

const apiKey = process.env.STRAICO_API_KEY;

if (!apiKey || apiKey === "your_actual_api_key") {
  console.error("Error: STRAICO_API_KEY is not defined in your .env file.");
  process.exit(1);
}

async function runTests() {
  console.log("--- 🚀 Starting Comprehensive API Test ---");

  // --- Test: Get User Info ---
  try {
    console.log("\n--- Testing getUserInfo ---");
    const userInfo = await getUserInfo(apiKey);
    console.log("✅ Success:", userInfo.data);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }

  // --- Test: Get Models ---
  try {
    console.log("\n--- Testing getModels ---");
    const models = await getModels(apiKey);
    console.log("✅ Success: Fetched models (showing first 5)");
    console.log(models.data.slice(0, 5));
  } catch (error) {
    console.error("❌ Error:", error.message);
  }

  // --- Test: Prompt Completion ---
  try {
    console.log("\n--- Testing getPromptCompletion ---");
    const completion = await getPromptCompletion(apiKey, {
      models: ["openai/gpt-3.5-turbo-0125"],
      message: "Hello, world! Tell me a fun fact.",
    });
    console.log("✅ Success:", completion.data);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }

  // --- Test: Image Generation (v1) ---
  try {
    console.log("\n--- Testing generateImageV1 ---");
    const image = await generateImageV1(apiKey, {
      model: "fal-ai/flux/dev",
      description: "a cute robot waving hello",
      size: "square",
      variations: 1,
    });
    console.log("✅ Success:", image.data);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }

  // --- Test: Get Eleven Labs Voices ---
  let voiceId = null;
  try {
    console.log("\n--- Testing getElevenLabsVoices ---");
    const voices = await getElevenLabsVoices(apiKey);
    if (voices.data && voices.data.length > 0) {
      voiceId = voices.data[0].id; // Save the first voice ID for the next test
      console.log("✅ Success: Fetched voices (showing first 5)");
      console.log(voices.data.slice(0, 5));
    } else {
      console.log("⚠️ No voices found.");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  }

  // --- Test: Create Text-to-Speech ---
  if (voiceId) {
    try {
      console.log(`\n--- Testing createTextToSpeech (using voice_id: ${voiceId}) ---`);
      const audioBlob = await createTextToSpeech(apiKey, {
        model: "eleven_multilingual_v2",
        text: "This is a test of the text-to-speech API.",
        voice_id: voiceId,
      });
      console.log("✅ Success: Received audio data (Blob). Size:", audioBlob.size);
    } catch (error) {
      console.error("❌ Error:", error.message);
    }
  }

  // --- Test: Image to Video Generation ---
  try {
    console.log("\n--- Testing generateImageToVideo ---");
    // NOTE: This requires a valid, publicly accessible image URL.
    // Using a placeholder URL which will likely fail, but tests the function call.
    const video = await generateImageToVideo(apiKey, {
      model: "fal-ai/kling-video/v2.1/master/image-to-video",
      description: "The robot waving hello comes to life.",
      size: "square",
      duration: 5,
      image_url: "https://straico.com/placeholder.jpg", // Replace with a real image URL to test properly
    });
    console.log("✅ Success:", video.data);
  } catch (error) {
    console.error("❌ Error: (This may be expected if the image_url is a placeholder)", error.message);
  }

  console.log("\n--- ✅ Comprehensive API Test Finished ---");
}

runTests();
