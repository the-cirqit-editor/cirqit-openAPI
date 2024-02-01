window.onload = function() {
  //<editor-fold desc="Changeable Configuration Block">

  // Define configuration objects for each API version
  let configurations = {
    "v1": {
      url: "partner-api_1_1_1.json",
      // Other configuration options for version 1
    },
    "v2": {
      url: "partner-api_1_2_0.json",
      // Other configuration options for version 2
    },
    "v3": {
      url: "partner-api_1_3_0.json",
      // Other configuration options for version 2
    }
    // Add configurations for other versions as needed
  };

  // Determine which version to use based on some condition
  let versionToUse = "v3"; // Example: You can set this dynamically based on user input or environment variables

  // Use the selected configuration
  window.ui = SwaggerUIBundle({
    url: configurations[versionToUse].url,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  });

  //</editor-fold>
};


