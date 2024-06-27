/*
@Irull2nd a.k.a Izumii
*/

import fetch from "node-fetch";
import axios from "axios";
import crypto from "crypto";

async function elxyz(q, sesi, mdl) {
    try {
    const response = await fetch('https://elxyz.me/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148',
        },
        body: JSON.stringify({
        prompt: q,
        sessionId: sesi,
        character: mdl
        }),
    });
    const data = await response.json();
    return data;
        } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function blackbox(messages) {
        try {
        const userId = crypto.randomUUID();
            const blackboxResponse = await fetch("https://www.blackbox.ai/api/chat", {
                method: "POST",
                headers: {
                    "Accept": "*/*",
                    "Accept-Language": "en-US,en;q=0.5",
                    "Referer": "https://www.blackbox.ai/",
                    "Content-Type": "application/json",
                    "Origin": "https://www.blackbox.ai",
                    "Alt-Used": "www.blackbox.ai"
                },
                body: JSON.stringify({
                    messages,
                    id: "chat-free",
                    previewToken: null,
                    userId: userId,
                    codeModelMode: true,
                    agentMode: {},
                    trendingAgentMode: {},
                    isMicMode: false,
                    userSystemPrompt: "Realtime",
                    maxTokens: 1024,
                    webSearchMode: false,
                    promptUrls: "",
                    isChromeExt: false,
                    githubToken: null
                })
            });

            return await blackboxResponse.text();
        } catch (error) {
            console.error("Error fetching data:", error);
            return null;
        }
    }

export { elxyz, blackbox };
