const express = require('express');
const router = express.Router();
const moment = require('moment');
const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
require('dotenv').config(); // Load environment variables

// Import required controllers and models
const { getConversationHistory, saveConversationHistory } = require('../controllers/conversationController');
const { getSchedule, addSchedule, updateSchedule, deleteSchedule } = require('../controllers/processRequest');

// Define functions
const functions = [
    {
        name: "get_schedule",
        description: "Retrieve the user's schedule for a specific date when explicitly requested.",
        parameters: {
            type: "object",
            properties: {
                date: {
                    type: "string",
                    description: "'Today', 'Tomorrow', or in 'YYYY-MM-DD' format"
                }
            },
            required: ["date"]
        }
    },
    {
        name: "add_schedule",
        description: "Add a new schedule entry when the user explicitly requests it.",
        parameters: {
            type: "object",
            properties: {
                title: { type: "string", description: "Title of the schedule entry" },
                date: { type: "string", description: "'Today', 'Tomorrow', or 'YYYY-MM-DD' format" },
                start_time: { type: "string", description: "Start time in HH:MM format" },
                end_time: { type: "string", description: "End time in HH:MM format" }
            },
            required: ["title", "date", "start_time", "end_time"]
        }
    },
    {
        name: "update_schedule",
        description: "Update an existing schedule entry when explicitly requested.",
        parameters: {
            type: "object",
            properties: {
                id: { type: "integer", description: "ID of the schedule entry to be updated" },
                title: { type: "string", description: "New title of the schedule entry" },
                start_time: { type: "string", description: "New start time in HH:MM format" },
                end_time: { type: "string", description: "New end time in HH:MM format" }
            },
            required: ["id"]
        }
    },
    {
        name: "delete_schedule",
        description: "Delete a schedule entry when explicitly requested.",
        parameters: {
            type: "object",
            properties: {
                id: { type: "integer", description: "ID of the schedule entry to delete" }
            },
            required: ["id"]
        }
    }
];

// Router setup
router.post('/', async (req, res) => {
    const userId = req.user ? req.user.id : 'testUser@example.com';
    const userMessage = req.body.request;

    try {
        // Fetch conversation history
        let conversationHistory = await getConversationHistory(userId);

        // Add initial system message if it's the first conversation
        if (conversationHistory.length === 0) {
            conversationHistory.push({
                role: 'system',
                content: `
                    You are an assistant conversing with the user.
                    Only execute schedule-related functions when there is a clear request to view, add, update, or delete a schedule.
                    Otherwise, continue with general conversation.
                    Today's date is ${moment().format('YYYY-MM-DD')}.
                `
            });
        }

        // Add user message to conversation history
        conversationHistory.push({ role: 'user', content: userMessage });

        // Call OpenAI API for chat completion with function calling
        const openaiResponse = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // Update with your specific model if necessary
            messages: conversationHistory,
            functions: functions,
            function_call: "auto" // Allow model to call functions as needed
        });

        const assistantMessage = openaiResponse.choices[0].message;

        // Check if function was called
        if (assistantMessage.function_call) {
            const functionName = assistantMessage.function_call.name;
            const functionArgs = JSON.parse(assistantMessage.function_call.arguments);

            // Execute the appropriate function
            let functionResponse;

            if (functionName === 'get_schedule') {
                functionResponse = await getSchedule(functionArgs.date, userId);
            } else if (functionName === 'add_schedule') {
                functionResponse = await addSchedule(functionArgs, userId);
            } else if (functionName === 'update_schedule') {
                functionResponse = await updateSchedule(functionArgs, userId);
            } else if (functionName === 'delete_schedule') {
                functionResponse = await deleteSchedule(functionArgs.id, userId);
            }

            // Add function call and result to conversation history
            conversationHistory.push({
                role: 'assistant',
                content: null,
                function_call: assistantMessage.function_call
            });
            conversationHistory.push({
                role: 'function',
                name: functionName,
                content: JSON.stringify(functionResponse)
            });

            // Generate final response
            const finalResponse = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo', // Use the same model as above
                messages: conversationHistory,
            });

            const finalAssistantMessage = finalResponse.choices[0].message;

            // Save final response in conversation history
            conversationHistory.push(finalAssistantMessage);
            await saveConversationHistory(userId, conversationHistory);

            // Send final response to user
            res.json({ response: finalAssistantMessage.content });

        } else {
            // If no function was called, proceed with regular conversation
            conversationHistory.push(assistantMessage);
            await saveConversationHistory(userId, conversationHistory);
            res.json({ response: assistantMessage.content });
        }

    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ message: "An error occurred.", error: error.message });
    }
});

/**
 * @swagger
 * /chat:
 *   post:
 *     summary: Chat with the assistant
 *     description: User sends a message to the chatbot and receives a response.
 *     tags: [Chatbot]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               request:
 *                 type: string
 *                 description: Message from the user
 *             required:
 *               - request
 *     responses:
 *       200:
 *         description: Successfully received a response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Chatbot's response message
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

module.exports = router;
