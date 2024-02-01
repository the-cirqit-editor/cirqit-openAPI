window.onload = function() {

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

  // find a place for the version dropdown
  var versionDropdown = null;
  // Populate dropdown menu with available versions
  // Finde das Element mit der Klasse "information-container"
  let informationContainer = document.querySelector('.information-container');
  if (informationContainer) {
    // Erstelle ein neues Element
    versionDropdown = document.createElement('version-dropdown');

    // Füge das neue Element oben in das informationContainer ein
    informationContainer.insertBefore(newElement, informationContainer.firstChild);
  } else {
    versionDropdown = document.getElementById("version-dropdown");
  }

  // create the version dropdown
  for (var version in configurations) {
    let option = document.createElement("option");
    option.value = version;
    option.text = version;
    versionDropdown.add(option);
  }
  // Event listener for dropdown change
  versionDropdown.addEventListener("change", function() {
    let selectedVersion = versionDropdown.value;
    switchVersion(selectedVersion);
  });



  // Initialize Swagger UI with default version
  var defaultVersion = "v1"; // Set default version here
  switchVersion(defaultVersion);
};