// Ensure this is in the global scope
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Add the scroll event listener
window.addEventListener("scroll", function () {
  const backToTop = document.getElementById("backToTop");
  if (window.scrollY > 300) {
    // Show button after scrolling 300px
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");

  if (!themeToggle) {
    console.error("Theme toggle button not found.");
    return;
  }

  // Remove any existing event listeners
  const newThemeToggle = themeToggle.cloneNode(true);
  themeToggle.parentNode.replaceChild(newThemeToggle, themeToggle);

  // Check for saved theme preference or use default
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    newThemeToggle.textContent = "☀️ Light Mode";
  }

  // Toggle theme when button is clicked
  newThemeToggle.addEventListener("click", function () {
    if (document.body.classList.contains("dark-mode")) {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
      newThemeToggle.textContent = "🌙 Dark Mode";
    } else {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
      newThemeToggle.textContent = "☀️ Light Mode";
    }
  });
}

function addStreamInput(dayId) {
  const dayContent = document.getElementById(`${dayId}-content`);
  if (!dayContent) {
    console.error(`Day content container not found for ID: ${dayId}`);
    return;
  }

  // Count existing stream inputs to generate unique IDs
  const streamCount = dayContent.querySelectorAll(".form-group").length;

  // Create a new form group for the stream input
  const formGroup = document.createElement("div");
  formGroup.classList.add("form-group");
  formGroup.innerHTML = `
    <label>Start Time:
      <input type="time" id="${dayId}-start-${streamCount}" onchange="updatePreview()" />
    </label><br />
    <label>End Time:
      <input type="time" id="${dayId}-end-${streamCount}" onchange="updatePreview()" />
    </label><br />
    <label>Game/Activity:
      <input type="text" id="${dayId}-game-${streamCount}" onchange="updatePreview()" />
    </label><br />
    <label>Colour:
      <input type="color" id="${dayId}-colour-${streamCount}" value="#9146FF" onchange="updatePreview()" />
    </label>
  `;

  // Append the new form group to the day content container
  dayContent.appendChild(formGroup);

  // Update the preview to reflect the new input
  updatePreview();
}

// Get the elements by their IDs
let selection = document.querySelector("#timezone");
let result = document.querySelector("#time-result");

// Add event listener to the select element
selection.addEventListener("change", () => {
  // Update the result div with the selected option text
  result.innerText = selection.options[selection.selectedIndex].text;
});

// Define the updatePreview function that's referenced in your HTML
function updatePreview() {
  // This function can call the same code as the event listener
  result.innerText = selection.options[selection.selectedIndex].text;
}

// Ensure the script runs after the DOM is fully loaded
document
  .getElementById("exportFormat")
  .addEventListener("change", updatePreviewFormat);

// Update the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function () {
  // Initialize theme toggle
  initThemeToggle();

  // Set up event listeners for all inputs that should trigger preview updates
  document
    .getElementById("weekCount")
    .addEventListener("change", generateSchedule);
  document
    .getElementById("scheduleHeader")
    .addEventListener("change", updatePreview);
  document
    .getElementById("customHeader")
    .addEventListener("input", updatePreview);
  document.getElementById("timezone").addEventListener("change", updatePreview);
  document
    .getElementById("channelName")
    .addEventListener("input", updatePreview);
  document
    .getElementById("includeQR")
    .addEventListener("change", updatePreview);
  document
    .getElementById("exportFormat")
    .addEventListener("change", updatePreviewFormat);

  // Initialize date inputs
  enhanceDateInputs();

  // Set initial preview format
  updatePreviewFormat();

  // Generate initial schedule
  generateSchedule();
});

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

document
  .getElementById("weekCount")
  .addEventListener("change", generateSchedule);
document
  .getElementById("scheduleHeader")
  .addEventListener("change", updatePreview); // Call updatePreview on header change
document
  .getElementById("customHeader")
  .addEventListener("input", updatePreview); // Call updatePreview on custom header input
document.getElementById("timezone").addEventListener("change", updatePreview); // Call updatePreview on timezone change (will be replaced later)

window.onload = generateSchedule;

function generateSchedule() {
  console.log("generateSchedule() called");
  const weekCount = parseInt(document.getElementById("weekCount").value);
  const weekSections = document.querySelectorAll(".week-section");

  // Initially hide all week sections
  weekSections.forEach((section) => {
    section.style.display = "none";
  });

  // Show the required number of week sections
  for (let i = 0; i < weekCount; i++) {
    if (weekSections[i]) {
      weekSections[i].style.display = "block";
    } else {
      // If you need more weeks than initially in HTML, you can clone here
      // For example:
      // const firstWeek = document.getElementById('week-1');
      // const newWeek = firstWeek.cloneNode(true);
      // newWeek.id = `week-${i + 1}`;
      // const controlsContainer = document.querySelector('.controls');
      // controlsContainer.appendChild(newWeek);
      // // You'd also need to reset IDs within the cloned week
    }
  }

  const preview = document.getElementById("previewOutput");
  preview.innerHTML = ""; // Clear the preview

  updatePreview(); // Re-generate the preview based on the visible HTML
}

window.onload = generateSchedule; // Call on load as well
document
  .getElementById("weekCount")
  .addEventListener("change", generateSchedule);

function toggleDayContent(dayId) {
  const toggle = document.getElementById(`${dayId}-toggle`);
  const content = document.getElementById(`${dayId}-content`);

  if (toggle && content) {
    content.style.display = toggle.checked ? "block" : "none";
    updatePreview(); // This call is correct, but there might be issues in updatePreview
  } else {
    console.error(`Could not find elements for day ID: ${dayId}`);
  }
}

// Add this function to your existing JavaScript
function enhanceDateInputs() {
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const dateRangeInfo = document.getElementById("dateRangeInfo");

  // Add event listeners to update the date range info
  startDateInput.addEventListener("change", updateDateRangeInfo);
  endDateInput.addEventListener("change", updateDateRangeInfo);

  // Set default dates if none are selected
  if (!startDateInput.value) {
    const today = new Date();
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + ((8 - today.getDay()) % 7));
    startDateInput.value = nextMonday.toISOString().split("T")[0];
  }

  if (!endDateInput.value && startDateInput.value) {
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(startDate);
    const daysToAdd = startDate.getDay() === 1 ? 6 : 7 - startDate.getDay();
    endDate.setDate(startDate.getDate() + daysToAdd);
    endDateInput.value = endDate.toISOString().split("T")[0];
  }

  // Initial update
  updateDateRangeInfo();

  function updateDateRangeInfo() {
    if (startDateInput.value && endDateInput.value) {
      const startDate = new Date(startDateInput.value);
      const endDate = new Date(endDateInput.value);

      // Calculate the difference in days
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
      const diffWeeks = Math.ceil(diffDays / 7);

      // Check if start date is a Monday and end date is a Sunday
      const isStartMonday = startDate.getDay() === 1; // 1 is Monday
      const isEndSunday = endDate.getDay() === 0; // 0 is Sunday

      // Provide feedback about the selected range
      let message = `${diffDays} days selected (${diffWeeks} weeks)`;

      if (diffDays % 7 === 0 && isStartMonday && isEndSunday) {
        message += " - Perfect week alignment (Mon-Sun)!";
      } else {
        if (!isStartMonday) {
          const nextMonday = new Date(startDate);
          nextMonday.setDate(
            startDate.getDate() + ((8 - startDate.getDay()) % 7)
          );
          message += `<br>Tip: For a full week, start date should be a Monday (like ${nextMonday.toLocaleDateString()})`;
        }

        if (!isEndSunday) {
          const prevSunday = new Date(endDate);
          prevSunday.setDate(endDate.getDate() + ((7 - endDate.getDay()) % 7));
          message += `<br>Tip: For a full week, end date should be a Sunday (like ${prevSunday.toLocaleDateString()})`;
        }
      }

      dateRangeInfo.innerHTML = message;
      dateRangeInfo.style.display = "block";
    } else {
      dateRangeInfo.style.display = "none";
    }

    // Call your existing updatePreview function
    updatePreview();
  }
}

// Add this to your DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function () {
  enhanceDateInputs();
  // Your other initialization code...
});

// Add this function to your existing JavaScript
function updateDateRange() {
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const dateRangeInfo = document.getElementById("dateRangeInfo");

  if (startDateInput.value && endDateInput.value) {
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);

    // Calculate the difference in days
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
    const diffWeeks = Math.ceil(diffDays / 7);

    // Check if start date is a Monday and end date is a Sunday
    const isStartMonday = startDate.getDay() === 1; // 1 is Monday
    const isEndSunday = endDate.getDay() === 0; // 0 is Sunday

    // Provide feedback about the selected range
    let message = `${diffDays} days selected (${diffWeeks} weeks)`;

    if (diffDays % 7 === 0 && isStartMonday && isEndSunday) {
      message += " - Perfect week alignment (Mon-Sun)!";
    } else {
      if (!isStartMonday) {
        const nextMonday = new Date(startDate);
        nextMonday.setDate(
          startDate.getDate() + ((8 - startDate.getDay()) % 7)
        );
        message += `<br>Tip: For a full week, start date should be a Monday (like ${nextMonday.toLocaleDateString()})`;
      }

      if (!isEndSunday) {
        const prevSunday = new Date(endDate);
        prevSunday.setDate(endDate.getDate() - endDate.getDay());
        message += `<br>Tip: For a full week, end date should be a Sunday (like ${prevSunday.toLocaleDateString()})`;
      }
    }

    dateRangeInfo.innerHTML = message;
    dateRangeInfo.style.display = "block";
  } else {
    dateRangeInfo.style.display = "none";
  }

  // Call your existing updatePreview function
  updatePreview();
}

// Add this to your DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function () {
  // Set default dates if none are selected
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");

  if (!startDateInput.value) {
    // Find the next Monday
    const today = new Date();
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + ((8 - today.getDay()) % 7));
    startDateInput.value = nextMonday.toISOString().split("T")[0];
  }

  if (!endDateInput.value && startDateInput.value) {
    // Set end date to Sunday of the same week
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + ((7 - startDate.getDay()) % 7));
    endDateInput.value = endDate.toISOString().split("T")[0];
  }

  updateDateRange();
});

// Update the existing updatePreview function to handle the formatting better
function updatePreview() {
  console.log("updatePreview() called");
  const weekCount = parseInt(document.getElementById("weekCount").value);
  const preview = document.getElementById("previewOutput");
  const exportFormat = document.getElementById("exportFormat").value;

  // Clear the preview
  preview.innerHTML = "";

  // Get schedule options
  const scheduleHeader =
    document.getElementById("scheduleHeader").value === "custom"
      ? document.getElementById("customHeader").value
      : document.getElementById("scheduleHeader").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const timezone = document.getElementById("timezone").value;
  const channelName = document.getElementById("channelName").value;
  const includeQR = document.getElementById("includeQR").checked;

  // Create header section
  const previewHeaderDiv = document.createElement("div");
  previewHeaderDiv.classList.add("preview-header-info");

  // Adjust header size based on export format
  if (exportFormat === "Twitch Stories") {
    previewHeaderDiv.innerHTML = `<div class="preview-title" style="font-size: 28px; margin-bottom: 15px;">${scheduleHeader}</div>`;
  } else if (exportFormat === "Twitch Schedule Panel") {
    previewHeaderDiv.innerHTML = `<div class="preview-title" style="font-size: 18px; margin-bottom: 10px;">${scheduleHeader}</div>`;
  } else {
    previewHeaderDiv.innerHTML = `<div class="preview-title">${scheduleHeader}</div>`;
  }

  if (startDate && endDate) {
    const formattedStartDate = new Date(startDate).toLocaleDateString(
      undefined,
      { day: "numeric", month: "long" }
    );
    const formattedEndDate = new Date(endDate).toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    previewHeaderDiv.innerHTML += `<div class="preview-date-range">${formattedStartDate} - ${formattedEndDate}</div>`;
  } else if (startDate) {
    const formattedStartDate = new Date(startDate).toLocaleDateString(
      undefined,
      { day: "numeric", month: "long", year: "numeric" }
    );
    previewHeaderDiv.innerHTML += `<div class="preview-date-range">Starting: ${formattedStartDate}</div>`;
  } else if (endDate) {
    const formattedEndDate = new Date(endDate).toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    previewHeaderDiv.innerHTML += `<div class="preview-date-range" style="font-weight: bold">Ending: ${formattedEndDate}</div>`;
  }

  if (timezone) {
    previewHeaderDiv.innerHTML += `<div class="preview-timezone" style="font-weight: bold">Time Zone: ${timezone}</div>`;
  }

  preview.appendChild(previewHeaderDiv);

  // Adjust layout based on export format
  const previewContainer = document.createElement("div");
  previewContainer.classList.add("preview-content");

  if (exportFormat === "Twitch Stories") {
    previewContainer.style.display = "flex";
    previewContainer.style.flexDirection = "column";
  } else {
    previewContainer.style.display = "block";
  }

  preview.appendChild(previewContainer);

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const scheduleEvents = []; // Array to store schedule data

  for (let w = 1; w <= weekCount; w++) {
    const previewWeek = document.createElement("div");
    previewWeek.classList.add("preview-week");

    // Adjust week title based on format
    if (exportFormat === "Twitch Schedule Panel") {
      previewWeek.innerHTML = `<h3 style="font-size: 16px; margin: 8px 0;">Week ${w}</h3>`;
    } else if (exportFormat === "Twitch Stories") {
      previewWeek.innerHTML = `<h3 style="font-size: 22px; margin: 10px 0;">Week ${w}</h3>`;
    } else {
      previewWeek.innerHTML = `<h3>Week ${w}</h3>`;
    }

    daysOfWeek.forEach((day) => {
      const dayId = `week-${w}-${day}`;
      const toggle = document.getElementById(`${dayId}-toggle`);
      const previewDayContainer = document.createElement("div");
      previewDayContainer.classList.add("preview-day");

      // Adjust day container based on format
      if (exportFormat === "Twitch Stories") {
        previewDayContainer.style.marginBottom = "15px";
      } else if (exportFormat === "Twitch Schedule Panel") {
        previewDayContainer.style.marginBottom = "8px";
        previewDayContainer.style.fontSize = "14px";
      }

      let hasStreamsForDay = false;

      if (toggle && toggle.checked) {
        const streamInputs = document.querySelectorAll(
          `#${dayId}-content .form-group`
        );

        streamInputs.forEach((input, index) => {
          const startTime = document.getElementById(
            `${dayId}-start-${index}`
          ).value;
          const endTime = document.getElementById(
            `${dayId}-end-${index}`
          ).value;
          const game = document.getElementById(`${dayId}-game-${index}`).value;
          const color = document.getElementById(
            `${dayId}-colour-${index}`
          ).value;

          if (startTime && endTime && game) {
            hasStreamsForDay = true;

            const streamBlock = document.createElement("div");
            streamBlock.style.backgroundColor = color;
            streamBlock.style.color = getContrastColor(color);
            streamBlock.innerHTML = `<strong>${startTime} - ${endTime}</strong><br>${game}`;
            previewDayContainer.appendChild(streamBlock);

            // Add event to scheduleEvents array
            scheduleEvents.push({
              day: day.charAt(0).toUpperCase() + day.slice(1),
              time: startTime,
              endTime: endTime,
              title: game,
            });
          }
        });
      }

      if (!hasStreamsForDay) {
        previewDayContainer.classList.add("no-stream");
        previewDayContainer.innerHTML = `<strong>${
          day.charAt(0).toUpperCase() + day.slice(1)
        }</strong><br>No Stream`;
      }

      previewWeek.appendChild(previewDayContainer);
    });

    previewContainer.appendChild(previewWeek);
  }

  // Add channel link and QR code to the footer
  if (channelName) {
    const footerDiv = document.createElement("div");
    footerDiv.id = "preview-footer";
    footerDiv.classList.add("preview-footer");

    // Add channel link
    const channelLinkDiv = document.createElement("div");
    channelLinkDiv.classList.add("channel-link");
    channelLinkDiv.textContent = `twitch.tv/${channelName}`;
    footerDiv.appendChild(channelLinkDiv);

    // Add QR code if selected
    if (includeQR) {
      const qrContainer = document.createElement("div");
      qrContainer.id = "qr-code";
      qrContainer.classList.add("qr-code");
      footerDiv.appendChild(qrContainer);

      generateQRCode(channelName, qrContainer);
    }

    preview.appendChild(footerDiv);
  }

  // Store scheduleEvents globally for export
  window.scheduleEvents = scheduleEvents;
}

// Add channel link and QR code to the footer
if (channelName) {
  const preview = document.getElementById("previewOutput"); // Ensure preview is defined
  const footerDiv = document.createElement("div");
  footerDiv.id = "preview-footer";
  footerDiv.classList.add("preview-footer");

  // Add channel link
  const channelLinkDiv = document.createElement("div");
  channelLinkDiv.classList.add("channel-link");
  channelLinkDiv.textContent = `twitch.tv/${channelName}`;
  footerDiv.appendChild(channelLinkDiv);

  // Add QR code if selected
  if (includeQR) {
    const qrContainer = document.createElement("div");
    qrContainer.id = "qr-code";
    qrContainer.classList.add("qr-code");
    footerDiv.appendChild(qrContainer);

    generateQRCode(channelName, qrContainer);
  }

  preview.appendChild(footerDiv); // Append footer to preview
}

// Add this function if it's missing
function getContrastColor(hexColor) {
  // Convert hex to RGB
  let r, g, b;
  if (hexColor.startsWith("#")) {
    const hex = hexColor.slice(1);
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else if (hexColor.startsWith("rgb")) {
    // Handle rgb() format
    const rgbValues = hexColor.match(/\d+/g);
    if (rgbValues && rgbValues.length >= 3) {
      r = parseInt(rgbValues[0]);
      g = parseInt(rgbValues[1]);
      b = parseInt(rgbValues[2]);
    } else {
      return "#000000"; // Default to black if parsing fails
    }
  } else {
    return "#000000"; // Default to black for unknown formats
  }

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black for light colors, white for dark colors
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

// Function to generate QR code using qrcode-generator library
function generateQRCode(channelName, container) {
  try {
    // Clear any existing QR code
    container.innerHTML = "";

    // Generate QR code for Twitch channel URL
    const qr = qrcode(0, "L");
    qr.addData(`https://twitch.tv/${channelName}`);
    qr.make();

    // Calculate QR code size
    const qrSize = 120; // Fixed size for the preview

    // Create a canvas for the QR code
    const qrCanvas = document.createElement("canvas");
    qrCanvas.width = qrSize;
    qrCanvas.height = qrSize;
    qrCanvas.id = "qr-code-canvas";

    const qrCtx = qrCanvas.getContext("2d");

    // Draw white background for QR code
    qrCtx.fillStyle = "white";
    qrCtx.fillRect(0, 0, qrSize, qrSize);

    // Draw QR code cells
    const cellSize = qrSize / qr.getModuleCount();
    qrCtx.fillStyle = "black";

    for (let row = 0; row < qr.getModuleCount(); row++) {
      for (let col = 0; col < qr.getModuleCount(); col++) {
        if (qr.isDark(row, col)) {
          qrCtx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
      }
    }

    // Add the canvas to the container
    container.appendChild(qrCanvas);

    // Add a label below the QR code
    const label = document.createElement("div");
    label.textContent = "Scan to visit channel";
    label.style.fontSize = "20px";
    label.style.marginTop = "20px";
    label.style.textAlign = "center";
    container.appendChild(label);

    console.log("QR code generated successfully");
  } catch (e) {
    console.error("Error generating QR code:", e);
    // Fallback text in case QR generation fails
    container.innerHTML = `<div style="text-align: center; padding: 10px;">QR code for twitch.tv/${channelName}</div>`;
  }
}

// Add this function to set the preview dimensions based on export format
function updatePreviewFormat() {
  const exportFormat = document.getElementById("exportFormat").value;
  const previewOutput = document.getElementById("previewOutput");

  // Reset any previous styling
  previewOutput.style.width = "";
  previewOutput.style.height = "";
  previewOutput.style.maxWidth = "";
  previewOutput.style.aspectRatio = "";
  previewOutput.style.padding = "20px";
  previewOutput.style.boxSizing = "border-box";

  // Re-enable the preview if it was hidden
  previewOutput.style.display = "block";

  // Apply format-specific dimensions
  switch (exportFormat) {
    case "Twitter":
      // Twitter recommended image size is 1200x675 (16:9)
      previewOutput.style.width = "100%";
      previewOutput.style.aspectRatio = "16/9";
      previewOutput.style.maxWidth = "1200px";
      break;
    case "Discord":
      // Discord embeds work well with 16:9 or 4:3
      previewOutput.style.width = "100%";
      previewOutput.style.aspectRatio = "16/9";
      previewOutput.style.maxWidth = "1200px";
      break;
    case "Instagram":
      // Instagram post is 1:1 square
      previewOutput.style.width = "100%";
      previewOutput.style.aspectRatio = "1/1";
      previewOutput.style.maxWidth = "1080px";
      break;
    case "Twitch Schedule Panel":
      // Twitch panels are typically 320px wide with variable height
      previewOutput.style.width = "320px";
      previewOutput.style.maxWidth = "320px";
      break;
    case "Twitch Stories":
      // Twitch Stories are vertical 9:16
      previewOutput.style.width = "100%";
      previewOutput.style.aspectRatio = "9/16";
      previewOutput.style.maxWidth = "1080px";
      break;
    case "OBS":
      // OBS exports should be flexible
      previewOutput.style.width = "100%";
      previewOutput.style.maxWidth = "1920px";
      break;
    case "iCal":
      // iCal doesn't need a visual preview
      previewOutput.style.display = "none";
      return; // Exit early since no preview is needed
    default:
      console.error("Unknown export format:", exportFormat);
      return;
  }

  // Dynamically adjust height based on content
  setTimeout(() => {
    const contentHeight = previewOutput.scrollHeight;
    previewOutput.style.height = `${contentHeight}px`;
  }, 0);

  // Update the preview content
  updatePreview();
}

// Update the exportSchedule function to ensure it captures the footer
function exportSchedule() {
  console.log("Exporting schedule...");
  const exportFormat = document.getElementById("exportFormat").value;
  const preview = document.getElementById("previewOutput");
  const channelName = document.getElementById("channelName").value;

  // Set specific dimensions for each export format
  let canvasWidth, canvasHeight;
  switch (exportFormat) {
    case "Twitter":
      canvasWidth = 1200; // Twitter recommended width
      canvasHeight = 675; // Twitter recommended height (16:9)
      break;
    case "Discord":
      canvasWidth = 1200; // Discord embeds width
      canvasHeight = 675; // Discord embeds height (16:9)
      break;
    case "Instagram":
      canvasWidth = 1080; // Instagram post width
      canvasHeight = 1080; // Instagram post height (1:1)
      break;
    case "Twitch Schedule Panel":
      canvasWidth = 320; // Twitch panel width
      canvasHeight = preview.scrollHeight; // Dynamic height based on content
      break;
    case "Twitch Stories":
      canvasWidth = 1080; // Twitch Stories width
      canvasHeight = 1920; // Twitch Stories height (9:16)
      break;
    case "OBS":
      canvasWidth = 1920; // OBS width
      canvasHeight = preview.scrollHeight; // Dynamic height based on content
      break;
    case "iCal":
      // Use the global scheduleEvents array
      const events = window.scheduleEvents || [];
      const iCalContent = generateICalFile(events, channelName);
      const iCalBlob = new Blob([iCalContent], { type: "text/calendar" });
      const iCalLink = document.createElement("a");
      iCalLink.href = URL.createObjectURL(iCalBlob);
      iCalLink.download = `${channelName}-schedule.ics`;
      document.body.appendChild(iCalLink);
      iCalLink.click();
      document.body.removeChild(iCalLink);
      showNotification("iCal file exported successfully!", "success");
      return; // Exit the function since no canvas is needed
    default:
      console.error("Unknown export format:", exportFormat);
      showNotification("Error: Unknown export format", "error");
      return;
  }

  // Set specific options for html2canvas
  const options = {
    backgroundColor: null, // Transparent background
    scale: 2, // Higher resolution
    width: canvasWidth,
    height: canvasHeight,
    logging: false,
    useCORS: true, // Allow cross-origin images
  };

  // Create a canvas from the preview content
  html2canvas(preview, options)
    .then((canvas) => {
      switch (exportFormat) {
        case "Twitter":
        case "Discord":
        case "Instagram":
        case "Twitch Stories":
          // For social media, download the image
          const image = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = image;
          link.download = `${channelName}-schedule.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          break;

        case "Twitch Schedule Panel":
        case "OBS":
          // For OBS or Twitch panels, download the image
          const obsImage = canvas.toDataURL("image/png");
          const obsLink = document.createElement("a");
          obsLink.href = obsImage;
          obsLink.download = `${channelName}-schedule-obs.png`;
          document.body.appendChild(obsLink);
          obsLink.click();
          document.body.removeChild(obsLink);
          break;

        default:
          console.error("Unknown export format:", exportFormat);
          showNotification("Error: Unknown export format", "error");
      }

      // Show success notification
      showNotification(`Schedule exported for ${exportFormat}!`, "success");
    })
    .catch((error) => {
      console.error("Export failed:", error);
      showNotification("Export failed. Please try again.", "error");
    });
}

// Helper function to generate iCal file content
function generateICalFile(events, channelName) {
  let iCalContent =
    [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//StreamScheduler//EN",
      `X-WR-CALNAME:${channelName} Stream Schedule`,
      "CALSCALE:GREGORIAN",
    ].join("\r\n") + "\r\n";

  // Get the current date for reference
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDate = now.getDate();

  // Add each event to the calendar
  events.forEach((event) => {
    // Calculate the next occurrence of this day
    const dayIndex = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ].indexOf(event.day);
    const today = now.getDay();
    let daysUntil = dayIndex - today;
    if (daysUntil <= 0) daysUntil += 7; // Next week if day has passed

    const eventDate = new Date(
      currentYear,
      currentMonth,
      currentDate + daysUntil
    );
    const [hours, minutes] = event.time.split(":").map(Number);

    // Set the event time
    const startDate = new Date(eventDate);
    startDate.setHours(hours, minutes, 0, 0);

    // End time is 2 hours later by default
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 2);

    // Format dates for iCal
    const formatDate = (date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    // Add event to iCal content
    iCalContent +=
      [
        "BEGIN:VEVENT",
        `SUMMARY:${event.title}`,
        `DTSTART:${formatDate(startDate)}`,
        `DTEND:${formatDate(endDate)}`,
        `DESCRIPTION:${channelName} streaming ${event.title}`,
        `LOCATION:https://twitch.tv/${channelName}`,
        `RRULE:FREQ=WEEKLY;BYDAY=${event.day.substring(0, 2).toUpperCase()}`,
        "END:VEVENT",
      ].join("\r\n") + "\r\n";
  });

  // Close the calendar
  iCalContent += "END:VCALENDAR\r\n";

  return iCalContent;
}

function showNotification(message, type = "info") {
  // Create a notification container if it doesn't exist
  let notificationContainer = document.getElementById("notification-container");
  if (!notificationContainer) {
    notificationContainer = document.createElement("div");
    notificationContainer.id = "notification-container";
    notificationContainer.style.position = "fixed";
    notificationContainer.style.bottom = "20px";
    notificationContainer.style.right = "20px";
    notificationContainer.style.zIndex = "1000";
    notificationContainer.style.maxWidth = "300px";
    document.body.appendChild(notificationContainer);
  }

  // Create the notification element
  const notification = document.createElement("div");
  notification.style.padding = "10px 15px";
  notification.style.marginBottom = "10px";
  notification.style.borderRadius = "5px";
  notification.style.color = "#fff";
  notification.style.fontSize = "14px";
  notification.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
  notification.style.transition = "opacity 0.3s ease";

  // Set the background color based on the type
  switch (type) {
    case "success":
      notification.style.backgroundColor = "#4CAF50"; // Green
      break;
    case "error":
      notification.style.backgroundColor = "#F44336"; // Red
      break;
    case "warning":
      notification.style.backgroundColor = "#FFC107"; // Yellow
      notification.style.color = "#000"; // Black text for better contrast
      break;
    default:
      notification.style.backgroundColor = "#2196F3"; // Blue
  }

  // Set the notification message
  notification.textContent = message;

  // Append the notification to the container
  notificationContainer.appendChild(notification);

  // Automatically remove the notification after 3 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      notificationContainer.removeChild(notification);
    }, 300);
  }, 3000);
}

// Update the generateTwitchPanelHTML function to include the footer
function generateTwitchPanelHTML(previewElement, channelName) {
  // Create a simplified HTML version of the schedule
  let html = '<div style="font-family: Arial, sans-serif; max-width: 100%;">';

  // Get the header information
  const headerInfo = previewElement.querySelector(".preview-header-info");
  if (headerInfo) {
    html += `<div style="text-align: center; margin-bottom: 15px;">
          <h3 style="margin: 0;">${
            headerInfo.querySelector(".preview-title").textContent
          }</h3>`;

    const dateRange = headerInfo.querySelector(".preview-date-range");
    if (dateRange) {
      html += `<div>${dateRange.textContent}</div>`;
    }

    const timezone = headerInfo.querySelector(".preview-timezone");
    if (timezone) {
      html += `<div>${timezone.textContent}</div>`;
    }

    html += "</div>";
  }

  // Get all weeks
  const weeks = previewElement.querySelectorAll(".preview-week");
  weeks.forEach((week) => {
    html += `<div style="margin-bottom: 15px;">
          <h4 style="margin: 5px 0;">${
            week.querySelector("h3").textContent
          }</h4>`;

    // Get all days in this week
    const days = week.querySelectorAll(".preview-day");
    days.forEach((day) => {
      const isNoStream = day.classList.contains("no-stream");

      html += `<div style="margin-bottom: 8px;">
              <strong>${day.textContent.split("\n")[0]}</strong>`;

      if (isNoStream) {
        html += `<div style="color: #888;">No Stream</div>`;
      } else {
        // Get all stream blocks
        const streamBlocks = day.querySelectorAll('div[style*="background"]');
        streamBlocks.forEach((block) => {
          const lines = block.textContent.split("\n");
          const time = lines[0];
          const game = lines[1];
          const bgColor = block.style.backgroundColor;

          html += `<div style="background-color: ${bgColor}; padding: 5px; margin: 3px 0; border-radius: 3px;">
                      <div>${time}</div>
                      <div>${game}</div>
                  </div>`;
        });
      }

      html += "</div>";
    });

    html += "</div>";
  });

  // Add channel link
  if (channelName) {
    html += `<div style="text-align: center; margin-top: 10px;">
          <a href="https://twitch.tv/${channelName}" target="_blank">twitch.tv/${channelName}</a>
      </div>`;
  }

  html += "</div>";
  return html;
}

// Helper function to copy text to clipboard
function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}
