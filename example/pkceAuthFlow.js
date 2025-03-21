// 1. Beim Login: Generiere Code Verifier und Challenge
function generateCodeVerifier() {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return base64UrlEncode(array);
}

function base64UrlEncode(buffer) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

async function generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return base64UrlEncode(digest);
}

// 2. Starte den Login-Prozess
async function startLogin() {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

// Speichere den Code Verifier für später
    localStorage.setItem('codeVerifier', codeVerifier);

// Redirect zum Authorization Server
    const authUrl = `https://auth-server.com/authorize?` +
        `client_id=YOUR_CLIENT_ID` +
        `&response_type=code` +
        `&code_challenge=${codeChallenge}` +
        `&code_challenge_method=S256` +
        `&redirect_uri=${encodeURIComponent('https://your-app.com/callback')}`;

    window.location = authUrl;
}

// 3. Nach dem Redirect: Verarbeite den Auth Code
function handleRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
// Hole den gespeicherten Code Verifier
        const codeVerifier = localStorage.getItem('codeVerifier');

// Sende Code und Code Verifier an den Backend-Server
        exchangeCodeForToken(code, codeVerifier);
    }
}

// 4. Sende Auth Code und Code Verifier an den Backend-Server
async function exchangeCodeForToken(code, codeVerifier) {
    try {

        const response = await fetch('https://your-backend.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code,
                codeVerifier,
                redirectUri: 'https://your-app.com/callback'
            })
        });

        const data = await response.json();
        // Verarbeite die Antwort (z.B. speichere den Access Token)
        console.log('Token erhalten:', data);
    } catch (error) {
        console.log("----------------- error -----------------");
        console.error('Fehler beim Token-Austausch:', error);
    }
}

// Prüfe beim Laden der Seite, ob es sich um einen Redirect handelt
window.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/callback') {
        handleRedirect();
    }
});
