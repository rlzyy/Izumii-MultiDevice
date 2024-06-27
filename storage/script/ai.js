/*
@Irull2nd a.k.a Izumii
*/

import fetch from "node-fetch";

async function elxyz(q, mdl) {
    try {
    const response = await fetch('https://elxyz.me/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148',
        },
        body: JSON.stringify({
        prompt: q,
        sessionId: '-',
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

export { elxyz };