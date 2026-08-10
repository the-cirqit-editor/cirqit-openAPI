const express = require("express");
const https = require("https");
const fs = require("fs");
const { join } = require("path");
const app = express();

const PORT = 44301;
const CERT_DIR = join(__dirname, "certs");
const KEY_FILE = join(CERT_DIR, "localhost-key.pem");
const CERT_FILE = join(CERT_DIR, "localhost.pem");

// Serve static assets from the /public folder
app.use(express.static(join(__dirname, "public")));

// Endpoint to serve the configuration file
app.get("/auth_config.json", (req, res) => {
    res.sendFile(join(__dirname, "auth_config.json"));
});

// OAuth callback registered in Cognito for the swissolar-int environment:
// https://localhost:44301/oauth/callback/cirqit
// authentication.html reads "code" and "state" from location.search and
// performs the PKCE token exchange against the configured backendServer.
app.get("/oauth/callback/cirqit", (_, res) => {
    res.sendFile(join(__dirname, "public", "authentication.html"));
});

// Serve the index page for all other requests
app.get("/*", (_, res) => {
    res.sendFile(join(__dirname, "public", "index.html"));
});

if (!fs.existsSync(KEY_FILE) || !fs.existsSync(CERT_FILE)) {
    console.error(
        `\nMissing TLS certificate.\nExpected:\n  ${KEY_FILE}\n  ${CERT_FILE}\n\n` +
        `Generate one (recommended: mkcert):\n` +
        `  mkdir -p certs && cd certs && mkcert localhost\n` +
        `  # produces certs/localhost.pem and certs/localhost-key.pem\n\n` +
        `Or with openssl:\n` +
        `  mkdir -p certs && openssl req -x509 -newkey rsa:2048 -nodes \\\n` +
        `    -keyout certs/localhost-key.pem -out certs/localhost.pem \\\n` +
        `    -days 365 -subj "/CN=localhost"\n`
    );
    process.exit(1);
}

https
    .createServer(
        {
            key: fs.readFileSync(KEY_FILE),
            cert: fs.readFileSync(CERT_FILE),
        },
        app
    )
    .listen(PORT, () =>
        console.log(`Application running on https://localhost:${PORT}`)
    );