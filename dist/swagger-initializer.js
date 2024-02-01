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


  // Function to switch API version
  function switchVersion(version) {
    window.ui = SwaggerUIBundle({
      url: configurations[version].url,
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
  }

  // Populate dropdown menu with available versions
  var versionDropdown = document.getElementById("version-dropdown");
  for (var version in configurations) {
    var option = document.createElement("option");
    option.value = version;
    option.text = version;
    versionDropdown.add(option);
  }

  // Event listener for dropdown change
  versionDropdown.addEventListener("change", function() {
    var selectedVersion = versionDropdown.value;
    switchVersion(selectedVersion);
  });

  // Initialize Swagger UI with default version
  var defaultVersion = "v1"; // Set default version here
  switchVersion(defaultVersion);

  //</editor-fold>
};