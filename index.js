// Get references to the colorsWrapper and hexWrapper elements
const colorsWrapper = document.getElementById("colors-wrapper");
const hexWrapper = document.getElementById("hex-wrapper");

// Get a reference to the "Get Color Scheme" button and attach an event listener to it
const btn = document.querySelector(".btn");
btn.addEventListener("click", renderSchemes);

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
