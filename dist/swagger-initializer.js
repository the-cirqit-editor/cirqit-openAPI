// Define configuration objects for each API version
let defaultVersion = "cirQit-v1.0.0";

let configurations = {

  "cirQit-v1.0.0": {
    url: "openAPI/cirqitOpenApi_v1.0.0.yml",
  },
};



window.onload = function() {
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

  // Initialize Swagger UI with default version
  switchVersion(defaultVersion);

  // add the configured versions to the dropdown on the top of the page
  let numberOfElements = Object.keys(configurations).length;
  if (numberOfElements >= 1) {
    // Hide version dropdown if there is only one version
    // Populate dropdown menu with available versions
    let versionDropdown = document.getElementById("version-dropdown");
    for (let version in configurations) {
      let option = document.createElement("option");

      console.log("version", version)
      option.value = version;
      option.text = version;
      if (version === defaultVersion) {
        option.selected = true;
      }
      versionDropdown.add(option);
    }

    // Event listener for dropdown change
    versionDropdown.addEventListener("change", function() {
      let selectedVersion = versionDropdown.value;
      switchVersion(selectedVersion);
    });
  }

};

