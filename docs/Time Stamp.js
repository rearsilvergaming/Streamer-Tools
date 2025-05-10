// Scroll to top functionality
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Add the scroll event listener
window.addEventListener("scroll", function () {
  const backToTop = document.getElementById("backToTop");
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

// DOM elements
const startTimeOutputSection = document.getElementById(
  "startTimeOutputSection"
);
const endTimeOutputSection = document.getElementById("endTimeOutputSection");
const startDateInput = document.getElementById("startDateInput");
const endDateInput = document.getElementById("endDateInput");
const toggleCurrentTime = document.getElementById("toggleCurrentTime");
const toggleCurrentTimeEnd = document.getElementById("toggleCurrentTimeEnd");
const toggle12hr = document.getElementById("toggle12hr");
const unixOverride = document.getElementById("unixOverride");
const timezoneSelect = document.getElementById("timezoneSelect");
const toggleEndTimeControl = document.getElementById("toggleEndTimeControl");
const existingTimestampPreview = document.getElementById(
  "existingTimestampPreview"
);
const endDateLabel = document.getElementById("endDateLabel");
const endDateButtons = document.getElementById("endDateButtons");
const toggleCurrentTimeEndLabel = document.getElementById(
  "toggleCurrentTimeEndLabel"
);
const endTimeSectionTitle = document.getElementById("endTimeSectionTitle");

// Initialize date and time inputs
function initDateAndTimeInputs() {
  const now = new Date();
  const localISOString = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16);

  if (startDateInput) startDateInput.value = localISOString;
  if (endDateInput) endDateInput.value = localISOString;

  // Initial generation of timestamps
  generateTimestamps();
}

// Generate timestamps
function generateTimestamps() {
  let startTime;
  let endTime = null;

  // Handle the existing timestamp preview
  if (unixOverride && unixOverride.value) {
    const overrideValue = parseInt(unixOverride.value, 10);
    if (!isNaN(overrideValue)) {
      const preview = getPreview(
        new Date(overrideValue * 1000),
        "F",
        timezoneSelect.value
      );
      if (existingTimestampPreview) {
        existingTimestampPreview.textContent = `Preview: ${preview}`;
      }
    } else if (existingTimestampPreview) {
      existingTimestampPreview.textContent = ""; // Clear the preview for invalid input
    }
  } else if (existingTimestampPreview) {
    existingTimestampPreview.textContent = ""; // Clear the preview when the input is empty
  }

  // Generate the main timestamps based on date/time inputs
  if (toggleCurrentTime && toggleCurrentTime.checked) {
    startTime = Math.floor(Date.now() / 1000);
  } else if (startDateInput && startDateInput.value) {
    startTime = Math.floor(new Date(startDateInput.value).getTime() / 1000);
  } else {
    if (startTimeOutputSection)
      startTimeOutputSection.innerHTML = "Please select a start date and time.";
    return;
  }

  if (toggleEndTimeControl && toggleEndTimeControl.checked) {
    if (toggleCurrentTimeEnd && toggleCurrentTimeEnd.checked) {
      endTime = Math.floor(Date.now() / 1000);
    } else if (endDateInput && endDateInput.value) {
      endTime = Math.floor(new Date(endDateInput.value).getTime() / 1000);
    } else {
      if (endTimeOutputSection)
        endTimeOutputSection.innerHTML = "Please select an end date and time.";
      return;
    }
  }

  updateOutputSection(startTimeOutputSection, startTime);

  if (endTime !== null && endTimeOutputSection) {
    updateOutputSection(endTimeOutputSection, endTime);
  }
}

// Update output section
function updateOutputSection(outputSection, timestampValue) {
  const formats = [
    { code: "t", label: "Short Time" },
    { code: "T", label: "Long Time" },
    { code: "d", label: "Short Date" },
    { code: "D", label: "Long Date" },
    { code: "f", label: "Short Date/Time" },
    { code: "F", label: "Long Date/Time" },
    { code: "R", label: "Relative Time" },
  ];

  if (outputSection) {
    outputSection.innerHTML = ""; // Clear previous output
    formats.forEach(({ code, label }) => {
      const formattedTime = `<t:${timestampValue}:${code}>`;
      const previewTime = getPreview(
        new Date(timestampValue * 1000),
        code,
        timezoneSelect.value
      );
      const timestampDiv = document.createElement("div");
      timestampDiv.classList.add("timestamp");
      timestampDiv.innerHTML = `
                <div>
                    <strong>${label}</strong>: <span class="formatted-time">${formattedTime}</span><br/>
                    <small>Preview: <span class="preview-time">${previewTime}</span></small>
                </div>
                <button class="copy-btn">Copy</button>
            `;
      const copyButton = timestampDiv.querySelector(".copy-btn");
      if (copyButton) {
        copyButton.onclick = () => copyToClipboard(formattedTime, copyButton);
      }
      outputSection.appendChild(timestampDiv);
    });
  }
}

// Get preview of timestamp
function getPreview(date, format, timezone) {
  let options = {};
  if (format === "t") {
    options = {
      hour: "numeric",
      minute: "2-digit",
      hour12: toggle12hr && toggle12hr.checked,
    };
  } else if (format === "T") {
    options = {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: toggle12hr && toggle12hr.checked,
    };
  } else if (format === "d") {
    options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
  } else if (format === "D") {
    // Discord's D format doesn't include weekday
    options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
  } else if (format === "f") {
    options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: toggle12hr && toggle12hr.checked,
    };
  } else if (format === "F") {
    // F format includes weekday
    options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: toggle12hr && toggle12hr.checked,
    };
  } else if (format === "R") {
    // Relative time logic remains the same
    const now = new Date();
    const diff = Math.floor((date.getTime() - now.getTime()) / 1000);
    const absDiff = Math.abs(diff);
    const direction = diff >= 0 ? "from now" : "ago";
    if (absDiff < 60) {
      return `${absDiff} second${absDiff !== 1 ? "s" : ""} ${direction}`;
    }
    if (absDiff < 3600) {
      const mins = Math.floor(absDiff / 60);
      return `${mins} minute${mins !== 1 ? "s" : ""} ${direction}`;
    }
    if (absDiff < 86400) {
      const hours = Math.floor(absDiff / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""} ${direction}`;
    }
    const days = Math.floor(absDiff / 86400);
    return `${days} day${days !== 1 ? "s" : ""} ${direction}`;
  }

  if (timezone) options.timeZone = timezone;
  try {
    return new Date(date).toLocaleString(undefined, options);
  } catch (e) {
    console.error("Date formatting error:", e);
    return "Invalid Date";
  }
}

// Copy to clipboard
function copyToClipboard(text, button) {
  if (navigator && navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        button.textContent = "Copied!";
        button.classList.add("copied");
        setTimeout(() => {
          button.textContent = "Copy";
          button.classList.remove("copied");
        }, 1500);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        fallbackCopyToClipboard(text, button);
      });
  } else {
    fallbackCopyToClipboard(text, button);
  }
}

// Fallback copy method
function fallbackCopyToClipboard(text, button) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();

  try {
    document.execCommand("copy");
    button.textContent = "Copied!";
    button.classList.add("copied");
    setTimeout(() => {
      button.textContent = "Copy";
      button.classList.remove("copied");
    }, 1500);
  } catch (err) {
    console.error("Fallback copy failed:", err);
    button.textContent = "Failed!";
    setTimeout(() => {
      button.textContent = "Copy";
    }, 1500);
  }

  document.body.removeChild(textArea);
}

// Clear timestamps
function clearTimestamps() {
  if (startTimeOutputSection) startTimeOutputSection.innerHTML = "";
  if (endTimeOutputSection) endTimeOutputSection.innerHTML = "";
  if (endTimeSectionTitle) endTimeSectionTitle.style.display = "none";
}

// Adjust start date
function adjustStartDate(days) {
  if (startDateInput && startDateInput.value) {
    const date = new Date(startDateInput.value);
    date.setDate(date.getDate() + days);
    const localISOString = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 16);
    startDateInput.value = localISOString;
    generateTimestamps();
  }
}

// Adjust start time
function adjustStartTime(minutes) {
  if (startDateInput && startDateInput.value) {
    const date = new Date(startDateInput.value);
    date.setMinutes(date.getMinutes() + minutes);
    const localISOString = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 16);
    startDateInput.value = localISOString;
    generateTimestamps();
  }
}

// Adjust end date
function adjustEndDate(days) {
  if (endDateInput && endDateInput.value) {
    const date = new Date(endDateInput.value);
    date.setDate(date.getDate() + days);
    const localISOString = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 16);
    endDateInput.value = localISOString;
    generateTimestamps();
  }
}

// Adjust end time
function adjustEndTime(minutes) {
  if (endDateInput && endDateInput.value) {
    const date = new Date(endDateInput.value);
    date.setMinutes(date.getMinutes() + minutes);
    const localISOString = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 16);
    endDateInput.value = localISOString;
    generateTimestamps();
  }
}

// Set current time
function setCurrentTime(isEnd = false) {
  const now = new Date();
  const localISOString = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16);

  if (isEnd && endDateInput) {
    endDateInput.value = localISOString;
  } else if (startDateInput) {
    startDateInput.value = localISOString;
  }

  generateTimestamps();
}

// Set up event listeners
document.addEventListener("DOMContentLoaded", () => {
  initDateAndTimeInputs();
  initThemeToggle();

  // Event listeners for inputs
  if (startDateInput) {
    startDateInput.addEventListener("input", generateTimestamps);
  }

  if (endDateInput) {
    endDateInput.addEventListener("input", generateTimestamps);
  }

  if (toggleCurrentTime) {
    toggleCurrentTime.addEventListener("change", () => {
      setCurrentTime(false);
      if (startDateInput) {
        startDateInput.disabled = toggleCurrentTime.checked;
        document.getElementById("startDateButtons").style.display =
          toggleCurrentTime.checked ? "none" : "flex";
      }
      generateTimestamps();
    });
  }

  if (toggleCurrentTimeEnd) {
    toggleCurrentTimeEnd.addEventListener("change", () => {
      setCurrentTime(true);
      if (endDateInput) {
        endDateInput.disabled = toggleCurrentTimeEnd.checked;
        document.getElementById("endDateButtons").style.display =
          toggleCurrentTimeEnd.checked ? "none" : "flex";
      }
      generateTimestamps();
    });
  }

  if (toggleEndTimeControl) {
    toggleEndTimeControl.addEventListener("change", () => {
      const showEnd = toggleEndTimeControl.checked;
      if (endDateLabel) endDateLabel.style.display = showEnd ? "block" : "none";
      if (endDateInput) endDateInput.style.display = showEnd ? "block" : "none";
      if (endDateButtons)
        endDateButtons.style.display = showEnd ? "flex" : "none";

      // Show/hide the end time current time toggle
      const toggleCurrentTimeEndContainer = document.getElementById(
        "toggleCurrentTimeEndContainer"
      );
      if (toggleCurrentTimeEndContainer)
        toggleCurrentTimeEndContainer.style.display = showEnd
          ? "block"
          : "none";

      if (endTimeSectionTitle)
        endTimeSectionTitle.style.display = showEnd ? "block" : "none";
      if (endTimeOutputSection)
        endTimeOutputSection.style.display = showEnd ? "block" : "none";
      generateTimestamps();
    });
  }

  if (timezoneSelect) {
    timezoneSelect.addEventListener("change", generateTimestamps);
  }

  if (toggle12hr) {
    toggle12hr.addEventListener("change", generateTimestamps);
  }

  if (unixOverride) {
    unixOverride.addEventListener("input", generateTimestamps);
  }

  // Set up Ko-fi button
  const kofiBtn = document.getElementById("kofiBtn");
  if (kofiBtn) {
    kofiBtn.addEventListener("click", function () {
      window.open("https://ko-fi.com/rearsilver", "_blank");
    });
  }

  // Set up Twitch button
  const twitchBtn = document.getElementById("twitchBtn");
  if (twitchBtn) {
    twitchBtn.addEventListener("click", function () {
      window.open("https://twitch.tv/rearsilver", "_blank");
    });
  }

  // Set up Discord button
  const discordBtn = document.getElementById("discordBtn");
  if (discordBtn) {
    discordBtn.addEventListener("click", function () {
      window.open("https://discord.com/invite/RRbQ93Ceew", "_blank");
    });
  }

  // Auto-update current time if enabled
  if (toggleCurrentTime && toggleCurrentTime.checked) {
    setCurrentTime(false);
  }

  if (toggleCurrentTimeEnd && toggleCurrentTimeEnd.checked) {
    setCurrentTime(true);
  }

  // Set up auto-refresh for current time
  setInterval(() => {
    if (toggleCurrentTime && toggleCurrentTime.checked) {
      setCurrentTime(false);
    }
    if (toggleCurrentTimeEnd && toggleCurrentTimeEnd.checked) {
      setCurrentTime(true);
    }
    // Always update relative timestamps
    generateTimestamps();
  }, 10000); // Update every 10 seconds
});

// Initialize theme toggle
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      themeToggle.textContent = "☀️ Light Mode";
    }

    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
      const currentTheme = document.body.classList.contains("dark-mode")
        ? "dark"
        : "light";
      localStorage.setItem("theme", currentTheme);
      themeToggle.textContent =
        currentTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
    });
  }
}

// Initialize on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDateAndTimeInputs);
} else {
  initDateAndTimeInputs();
}
