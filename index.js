// Get references to the colorsWrapper and hexWrapper elements
const colorsWrapper = document.getElementById("colors-wrapper");
const hexWrapper = document.getElementById("hex-wrapper");

// Get a reference to the "Get Color Scheme" button and attach an event listener to it
const btn = document.querySelector(".btn");
btn.addEventListener("click", renderSchemes);

const btnReset = document.getElementById("btn-reset");
btnReset.addEventListener("click", function () {
  document.getElementById("color-picker").value = "";
});

function init() {
  window.Touchpoint.initialize({
    // Please check documentation for other Touchpoint settings that can be configured
    settings: {
      containerStyle: {
        borderRadius: "8px",
        boxShadow:
          "0px 3px 5px 0px rgba(0,0,0,0.2), 0px 1px 18px 0px rgba(0,0,0,0.12), 0px 6px 10px 0px rgba(0,0,0,0.14)",
      },
    },
    visitor: {
      // Pass data points from your site/application to identify the current respondent
      // id: VISITOR_ID,
      // email: VISITOR_EMAIL,
      // role: VISITOR_ROLE,
      // etc.
    },
    publisher: {
      // Please do not make edits below
      app_id: "LPtYa2RapmD8Eb9",
      pod: "sit1",
    },
  });
}
window.addEventListener("load", init);

// Function to render color schemes
function renderSchemes() {
  const form = document.querySelector("form.color-dashboard");

  // Clear existing color scheme and hex value elements
  colorsWrapper.innerHTML = "";
  hexWrapper.innerHTML = "";

  // Retrieve the selected color and scheme picker values
  const colorPicker = document.getElementById("color-picker").value;
  const schemePicker = document.getElementById("scheme-picker").value;
  const hexValue = colorPicker.slice(1);

  // Build the API URL using the selected values
  const endpoints = `scheme?hex=${hexValue}&mode=${schemePicker}&count=5`;
  const apiUrl = `https://www.thecolorapi.com/${endpoints}`;

  // Fetch color scheme data from the API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Extract the hex values from the response data
      const hexScheme = data.colors.map((scheme) => {
        return scheme.hex.value;
      });

      // Create color scheme elements and append them to the appropriate containers
      for (let scheme of hexScheme) {
        const schemeDiv = document.createElement("div");
        schemeDiv.style.backgroundColor = scheme;
        colorsWrapper.appendChild(schemeDiv);
        schemeDiv.classList.add("color-item");

        const hexDiv = document.createElement("div");
        hexDiv.textContent = scheme;
        hexWrapper.appendChild(hexDiv);
      }
    });
}

// Render color schemes initially when the page loads
renderSchemes();
