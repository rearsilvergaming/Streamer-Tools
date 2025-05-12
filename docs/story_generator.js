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

document.addEventListener("DOMContentLoaded", function () {
  // Initialize theme toggle
  initThemeToggle();
  // Get DOM elements
  const generateBtn = document.getElementById("generateBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const canvas = document.getElementById("storyCanvas");
  const ctx = canvas.getContext("2d");
  const storyTypeSelect = document.getElementById("storyType");
  const upcomingStreamOptions = document.getElementById(
    "upcomingStreamOptions"
  );
  const upcomingHeaderOptions = document.getElementById(
    "upcomingHeaderOptions"
  );
  const upcomingHeader = document.getElementById("upcomingHeader");
  const customHeaderInput = document.getElementById("customHeaderInput");
  const customHeaderText = document.getElementById("customHeaderText");
  const subscriberThankerOptions = document.getElementById(
    "subscriberThankerOptions"
  );
  const subCount = document.getElementById("subCount");
  const subEntries = document.getElementById("subEntries");
  const giftedThankerOptions = document.getElementById("giftedThankerOptions");
  const gifterCount = document.getElementById("gifterCount");
  const gifterEntries = document.getElementById("gifterEntries");
  const followerThankerOptions = document.getElementById(
    "followerThankerOptions"
  );
  const followerCount = document.getElementById("followerCount");
  const followerEntries = document.getElementById("followerEntries");
  const raidThankerOptions = document.getElementById("raidThankerOptions");
  const raidCountInput = document.getElementById("raidCount");
  const raidEntriesContainer = document.getElementById("raidEntries");
  const fontStyle = document.getElementById("fontStyle");
  const textColor = document.getElementById("textColor");
  const includeQRCode = document.getElementById("includeQRCode");

  // Handle story type switching
  storyTypeSelect.addEventListener("change", function () {
    const selectedStoryType = this.value;
    console.log("Selected story type:", selectedStoryType);

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Hide all options first
    upcomingStreamOptions.style.display = "none";
    upcomingHeaderOptions.style.display = "none";
    raidThankerOptions.style.display = "none";
    subscriberThankerOptions.style.display = "none";
    giftedThankerOptions.style.display = "none";
    followerThankerOptions.style.display = "none";

    // Show relevant options based on selection
    if (selectedStoryType === "upcoming") {
      upcomingStreamOptions.style.display = "block";
      upcomingHeaderOptions.style.display = "block";
    } else if (selectedStoryType === "raid") {
      raidThankerOptions.style.display = "block";
      updateRaidEntries();
    } else if (selectedStoryType === "subscriber") {
      subscriberThankerOptions.style.display = "block";
      updateSubscriberEntries();
    } else if (selectedStoryType === "gifted") {
      giftedThankerOptions.style.display = "block";
      updateGifterEntries();
    } else if (selectedStoryType === "follower") {
      followerThankerOptions.style.display = "block";
      updateFollowerEntries();
    }

    // Trigger preview generation
    refreshPreview();
  });

  // Set up header style dropdown event listener
  upcomingHeader.addEventListener("change", function () {
    if (this.value === "custom") {
      customHeaderInput.style.display = "block";
    } else {
      customHeaderInput.style.display = "none";
    }
    refreshPreview();
  });

  customHeaderText.addEventListener("input", refreshPreview);

  // Add functions to update entries for each new type
  function updateSubscriberEntries() {
    const count = parseInt(subCount.value, 10) || 1;
    console.log("Updating subscriber entries, count:", count);
    subEntries.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const subEntry = document.createElement("div");
      subEntry.classList.add("form-group");

      // Subscriber name input
      const subNameLabel = document.createElement("label");
      subNameLabel.textContent = `Subscriber ${i + 1} Name:`;
      subEntry.appendChild(subNameLabel);

      const subNameInput = document.createElement("input");
      subNameInput.type = "text";
      subNameInput.id = `subName${i}`;
      subNameInput.placeholder = `Subscriber${i + 1}`;
      subEntry.appendChild(subNameInput);

      // Subscription type
      const subTypeLabel = document.createElement("label");
      subTypeLabel.textContent = `Subscription Type:`;
      subEntry.appendChild(subTypeLabel);

      const subTypeSelect = document.createElement("select");
      subTypeSelect.id = `subType${i}`;

      const options = [
        { value: "new", text: "New Subscription" },
        { value: "prime", text: "Prime Subscription" },
        { value: "resub", text: "Resubscription" },
      ];

      options.forEach((option) => {
        const optionEl = document.createElement("option");
        optionEl.value = option.value;
        optionEl.textContent = option.text;
        subTypeSelect.appendChild(optionEl);
      });

      subEntry.appendChild(subTypeSelect);

      // Months (for resubs)
      const monthsLabel = document.createElement("label");
      monthsLabel.textContent = `Months (for resubs):`;
      monthsLabel.id = `monthsLabel${i}`;
      monthsLabel.style.display = "none";
      subEntry.appendChild(monthsLabel);

      const monthsInput = document.createElement("input");
      monthsInput.type = "number";
      monthsInput.id = `months${i}`;
      monthsInput.min = 1;
      monthsInput.value = 1;
      monthsInput.style.display = "none";
      subEntry.appendChild(monthsInput);

      // Show/hide months input based on sub type
      subTypeSelect.addEventListener("change", function () {
        if (this.value === "resub") {
          monthsLabel.style.display = "block";
          monthsInput.style.display = "block";
        } else {
          monthsLabel.style.display = "none";
          monthsInput.style.display = "none";
        }
        refreshPreview();
      });

      // Attach event listeners
      subNameInput.addEventListener("input", refreshPreview);
      subTypeSelect.addEventListener("change", refreshPreview);
      monthsInput.addEventListener("input", refreshPreview);

      subEntries.appendChild(subEntry);
    }
    refreshPreview();
  }

  function updateGifterEntries() {
    const count = parseInt(gifterCount.value, 10) || 1;
    console.log("Updating gifter entries, count:", count);
    gifterEntries.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const gifterEntry = document.createElement("div");
      gifterEntry.classList.add("form-group");

      // Gifter name input
      const gifterNameLabel = document.createElement("label");
      gifterNameLabel.textContent = `Gifter ${i + 1} Name:`;
      gifterEntry.appendChild(gifterNameLabel);

      const gifterNameInput = document.createElement("input");
      gifterNameInput.type = "text";
      gifterNameInput.id = `gifterName${i}`;
      gifterNameInput.placeholder = `Gifter${i + 1}`;
      gifterEntry.appendChild(gifterNameInput);

      // Gift count input
      const giftCountLabel = document.createElement("label");
      giftCountLabel.textContent = `Number of Subs Gifted:`;
      gifterEntry.appendChild(giftCountLabel);

      const giftCountInput = document.createElement("input");
      giftCountInput.type = "number";
      giftCountInput.id = `giftCount${i}`;
      giftCountInput.min = 1;
      giftCountInput.value = 5;
      gifterEntry.appendChild(giftCountInput);

      // Attach event listeners
      gifterNameInput.addEventListener("input", refreshPreview);
      giftCountInput.addEventListener("input", refreshPreview);

      gifterEntries.appendChild(gifterEntry);
    }
    refreshPreview();
  }

  function updateFollowerEntries() {
    const count = parseInt(followerCount.value, 10) || 5;
    console.log("Updating follower entries, count:", count);
    followerEntries.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const followerEntry = document.createElement("div");
      followerEntry.classList.add("form-group");

      // Follower name input
      const followerNameLabel = document.createElement("label");
      followerNameLabel.textContent = `Follower ${i + 1} Name:`;
      followerEntry.appendChild(followerNameLabel);

      const followerNameInput = document.createElement("input");
      followerNameInput.type = "text";
      followerNameInput.id = `followerName${i}`;
      followerNameInput.placeholder = `Follower${i + 1}`;
      followerEntry.appendChild(followerNameInput);

      // Attach event listener
      followerNameInput.addEventListener("input", refreshPreview);

      followerEntries.appendChild(followerEntry);
    }
    refreshPreview();
  }

  // Add event listeners for count inputs
  subCount.addEventListener("input", updateSubscriberEntries);
  gifterCount.addEventListener("input", updateGifterEntries);
  followerCount.addEventListener("input", updateFollowerEntries);

  // Tab navigation
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      document
        .querySelectorAll(".tab")
        .forEach((t) => t.classList.remove("active"));
      document
        .querySelectorAll(".tab-content")
        .forEach((c) => c.classList.remove("active"));

      this.classList.add("active");
      const tabId = this.getAttribute("data-tab");
      document.getElementById(`${tabId}-tab`).classList.add("active");
    });
  });

  // ✅ HERE is the correct place to register preview-updating inputs
  [
    "gameTitle",
    "streamTitle",
    "matureContent",
    "streamDate",
    "streamTime",
    "timeZone",
    "profilePicture",
    "textColor",
    "fontStyle",
    "includeQRCode",
  ].forEach((id) => {
    const input = document.getElementById(id);
    if (!input) {
      console.warn(`Input #${id} not found`);
      return;
    }

    const type = input.type;
    const eventType =
      type === "checkbox" || type === "radio" ? "change" : "input";

    input.addEventListener(eventType, function () {
      console.log(`Preview refreshed from #${id}`);
      refreshPreview();
    });
  });

  // 🧼 You can put other preview-related logic and color pickers below here

  function updateRaidEntries() {
    const raidCountInput = document.getElementById("raidCount");

    if (raidCountInput) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          console.log("Mutation observed:", mutation);
        });
      });

      observer.observe(raidCountInput, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    // Debugging: Log the raidCountInput element and its value
    console.log("Raid count input element:", raidCountInput);
    console.log("Raid count input value before parsing:", raidCountInput.value);

    const raidCount = parseInt(raidCountInput.value, 10) || 1;

    // Debugging: Log the parsed raidCount value
    console.log(
      "Number of raids to thank (inside updateRaidEntries):",
      raidCount
    );

    // Clear existing raid entries
    const raidEntriesContainer = document.getElementById("raidEntries");
    if (!raidEntriesContainer) {
      console.error("Element with ID 'raidEntries' not found.");
      return;
    }
    raidEntriesContainer.innerHTML = "";

    // Dynamically create raid input fields
    for (let i = 0; i < raidCount; i++) {
      const raidEntry = document.createElement("div");
      raidEntry.classList.add("form-group");

      // Raider name input
      const raiderNameLabel = document.createElement("label");
      raiderNameLabel.textContent = `Raider ${i + 1} Name:`;
      raidEntry.appendChild(raiderNameLabel);

      const raiderNameInput = document.createElement("input");
      raiderNameInput.type = "text";
      raiderNameInput.id = `raider${i}`;
      raiderNameInput.placeholder = `RearSilver`;
      raidEntry.appendChild(raiderNameInput);

      // Raider count input
      const raiderCountLabel = document.createElement("label");
      raiderCountLabel.textContent = `Raider ${i + 1} Viewer Count:`;
      raidEntry.appendChild(raiderCountLabel);

      const raiderCountInput = document.createElement("input");
      raiderCountInput.type = "number";
      raiderCountInput.id = `raiderCount${i}`;
      raiderCountInput.min = 1;
      raiderCountInput.placeholder = "Viewer Count";
      raidEntry.appendChild(raiderCountInput);

      // 🧠 Attach live preview update listeners here:
      raiderNameInput.addEventListener("input", refreshPreview);
      raiderCountInput.addEventListener("input", refreshPreview);

      // Append the raid entry to the container
      raidEntriesContainer.appendChild(raidEntry);
    }
    refreshPreview(); // Trigger once after rebuilding
  }

  // Background style options
  const backgroundStyleSelect = document.getElementById("backgroundStyle");
  const gradientOptions = document.getElementById("gradientOptions");
  const solidColorOptions = document.getElementById("solidColorOptions");
  const backgroundImageOptions = document.getElementById(
    "backgroundImageOptions"
  );

  backgroundStyleSelect.addEventListener("change", function () {
    refreshPreview();
    gradientOptions.style.display = "none";
    solidColorOptions.style.display = "none";
    backgroundImageOptions.style.display = "none";
    if (this.value === "gradient") {
      gradientOptions.style.display = "block";
    } else if (this.value === "solid") {
      solidColorOptions.style.display = "block";
    } else if (this.value === "image") {
      backgroundImageOptions.style.display = "block";
    }
  });

  // Color preview updates
  document
    .getElementById("gradientTopColor")
    .addEventListener("input", function () {
      document.getElementById("topColorPreview").style.backgroundColor =
        this.value;
      refreshPreview(); // ← add this
    });

  document
    .getElementById("gradientBottomColor")
    .addEventListener("input", function () {
      document.getElementById("bottomColorPreview").style.backgroundColor =
        this.value;
      refreshPreview(); // ← add this
    });

  document
    .getElementById("backgroundColor")
    .addEventListener("input", function () {
      document.getElementById("bgColorPreview").style.backgroundColor =
        this.value;
      refreshPreview(); // ← add this
    });

  document
    .getElementById("overlayColor")
    .addEventListener("input", function () {
      document.getElementById("overlayColorPreview").style.backgroundColor =
        this.value;
      refreshPreview(); // ← add this
    });

  document.getElementById("textColor").addEventListener("input", function () {
    document.getElementById("textColorPreview").style.backgroundColor =
      this.value;
    refreshPreview(); // ← add this
  });

  document.getElementById("accentColor").addEventListener("input", function () {
    document.getElementById("accentColorPreview").style.backgroundColor =
      this.value;
    refreshPreview(); // ← add this
  });

  // Initialize color previews
  document.getElementById("topColorPreview").style.backgroundColor =
    document.getElementById("gradientTopColor").value;
  document.getElementById("bottomColorPreview").style.backgroundColor =
    document.getElementById("gradientBottomColor").value;
  document.getElementById("bgColorPreview").style.backgroundColor =
    document.getElementById("backgroundColor").value;
  document.getElementById("overlayColorPreview").style.backgroundColor =
    document.getElementById("overlayColor").value;
  document.getElementById("textColorPreview").style.backgroundColor =
    document.getElementById("textColor").value;
  document.getElementById("accentColorPreview").style.backgroundColor =
    document.getElementById("accentColor").value;

  // Profile picture options
  const includeProfilePic = document.getElementById("includeProfilePic");
  const profilePicOptions = document.getElementById("profilePicOptions");
  const profilePicture = document.getElementById("profilePicture");
  const profilePreview = document.getElementById("profilePreview");
  const clearProfileBtn = document.getElementById("clearProfileBtn");

  includeProfilePic.addEventListener("change", function () {
    profilePicOptions.style.display = this.checked ? "block" : "none";

    // Load profile from localStorage if available
    if (this.checked && localStorage.getItem("profilePicture")) {
      profilePreview.src = localStorage.getItem("profilePicture");
      profilePreview.style.display = "block";
    }
    refreshPreview(); // Trigger once after rebuilding
  });

  // Handle profile picture upload
  profilePicture.addEventListener("change", function (e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = function (event) {
        profilePreview.src = event.target.result;
        profilePreview.style.display = "block";

        // Save to localStorage
        localStorage.setItem("profilePicture", event.target.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  });

  // Clear profile picture
  clearProfileBtn.addEventListener("click", function () {
    profilePreview.src = "";
    profilePreview.style.display = "none";
    profilePicture.value = "";
    localStorage.removeItem("profilePicture");
  });

  // Background image handling
  const backgroundImage = document.getElementById("backgroundImage");
  let backgroundImageData = null;

  backgroundImage.addEventListener("change", function (e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (event) {
        backgroundImageData = event.target.result;
        refreshPreview(); // Call refreshPreview after the image is loaded
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  });

  // Set default date and time
  const now = new Date();
  now.setHours(now.getHours() + 1);

  document.getElementById("streamDate").valueAsDate = now;
  document.getElementById("streamTime").value = `${String(
    now.getHours()
  ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  // Toggle schedule options visibility
  document
    .getElementById("scheduleStream")
    .addEventListener("change", refreshPreview, function () {
      document.getElementById("scheduleOptions").style.display = this.checked
        ? "block"
        : "none";
    });

  // Generate the story image
  function refreshPreview() {
    const channelName =
      document.getElementById("channelName").value.trim() || "Your Channel";
    const storyType = storyTypeSelect.value;
    const includeQRCode = document.getElementById("includeQRCode").checked;

    const styleOptions = {
      backgroundStyle: backgroundStyleSelect.value,
      gradientTopColor: document.getElementById("gradientTopColor").value,
      gradientBottomColor: document.getElementById("gradientBottomColor").value,
      backgroundColor: document.getElementById("backgroundColor").value,
      backgroundImage: backgroundImageData,
      backgroundOpacity: parseFloat(
        document.getElementById("backgroundOpacity").value
      ),
      overlayColor: document.getElementById("overlayColor").value,
      fontStyle: document.getElementById("fontStyle").value,
      textColor: document.getElementById("textColor").value,
      accentColor: document.getElementById("accentColor").value,
    };

    const profileOptions = {
      includeProfilePic: document.getElementById("includeProfilePic").checked,
      profilePicture: document.getElementById("profilePreview").src,
      profileSize: parseInt(document.getElementById("profileSize").value),
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (storyType === "upcoming") {
      // Get header style
      let headerText = "UPCOMING STREAM";
      const headerStyle = upcomingHeader.value;

      if (headerStyle === "lookforward") {
        headerText = "What You Have To Look Forward To";
      } else if (headerStyle === "joinme") {
        headerText = "Join Me Live";
      } else if (headerStyle === "nextstream") {
        headerText = "Next Stream";
      } else if (headerStyle === "comingup") {
        headerText = "Coming Up";
      } else if (headerStyle === "custom") {
        headerText = customHeaderText.value.trim() || "Upcoming Stream";
      }

      const gameTitle =
        document.getElementById("gameTitle").value.trim() || "Awesome Stream";
      const streamTitle =
        document.getElementById("streamTitle").value.trim() ||
        "Come hang out with me!";
      const matureContent = document.getElementById("matureContent").checked;
      const scheduleStream = document.getElementById("scheduleStream").checked;

      generateTwitchStory(ctx, {
        channelName,
        gameTitle,
        streamTitle,
        matureContent,
        scheduleStream,
        includeQRCode,
        storyType,
        headerText, // Pass the custom header text
        styleOptions,
        profileOptions,
      });
    } else if (storyType === "raid") {
      const raidCount =
        parseInt(document.getElementById("raidCount").value) || 1;
      const raids = [];

      for (let i = 0; i < raidCount; i++) {
        const raiderName =
          document.getElementById(`raider${i}`)?.value.trim() ||
          `Raider${i + 1}`;
        const raiderCount =
          parseInt(document.getElementById(`raiderCount${i}`)?.value) || 10;
        raids.push({ raiderName, raiderCount });
      }

      generateTwitchStory(ctx, {
        channelName,
        includeQRCode,
        storyType,
        raids,
        styleOptions,
        profileOptions,
      });
    } else if (storyType === "subscriber") {
      const subCount = parseInt(document.getElementById("subCount").value) || 1;
      const subscribers = [];

      for (let i = 0; i < subCount; i++) {
        const subName =
          document.getElementById(`subName${i}`)?.value.trim() ||
          `Subscriber${i + 1}`;
        const subType = document.getElementById(`subType${i}`)?.value || "new";
        const months =
          subType === "resub"
            ? parseInt(document.getElementById(`months${i}`)?.value) || 1
            : 0;

        subscribers.push({ subName, subType, months });
      }

      generateTwitchStory(ctx, {
        channelName,
        includeQRCode,
        storyType,
        subscribers,
        styleOptions,
        profileOptions,
      });
    } else if (storyType === "gifted") {
      const gifterCount =
        parseInt(document.getElementById("gifterCount").value) || 1;
      const gifters = [];

      for (let i = 0; i < gifterCount; i++) {
        const gifterName =
          document.getElementById(`gifterName${i}`)?.value.trim() ||
          `Gifter${i + 1}`;
        const giftCount =
          parseInt(document.getElementById(`giftCount${i}`)?.value) || 5;

        gifters.push({ gifterName, giftCount });
      }

      generateTwitchStory(ctx, {
        channelName,
        includeQRCode,
        storyType,
        gifters,
        styleOptions,
        profileOptions,
      });
    } else if (storyType === "follower") {
      const followerCount =
        parseInt(document.getElementById("followerCount").value) || 5;
      const followers = [];

      for (let i = 0; i < followerCount; i++) {
        const followerName =
          document.getElementById(`followerName${i}`)?.value.trim() ||
          `Follower${i + 1}`;
        followers.push({ followerName });
      }

      generateTwitchStory(ctx, {
        channelName,
        includeQRCode,
        storyType,
        followers,
        styleOptions,
        profileOptions,
      });
    }

    downloadBtn.disabled = false;
  }

  // Initialize the new entry forms
  function initializeNewStoryTypes() {
    const storyTypeSelect = document.getElementById("storyType");
    const upcomingHeaderOptions = document.getElementById(
      "upcomingHeaderOptions"
    );

    if (
      storyTypeSelect &&
      storyTypeSelect.value === "upcoming" &&
      upcomingHeaderOptions
    ) {
      upcomingHeaderOptions.style.display = "block";
    }

    // Set up subscriber entries
    const subCount = document.getElementById("subCount");
    if (subCount) {
      subCount.addEventListener("input", updateSubscriberEntries);
      updateSubscriberEntries();
    }

    // Set up gifter entries
    const gifterCount = document.getElementById("gifterCount");
    if (gifterCount) {
      gifterCount.addEventListener("input", updateGifterEntries);
      updateGifterEntries();
    }

    // Set up follower entries
    const followerCount = document.getElementById("followerCount");
    if (followerCount) {
      followerCount.addEventListener("input", updateFollowerEntries);
      updateFollowerEntries();
    }
  }
  initializeNewStoryTypes(); // ✅ This stays

  // Keep existing event listeners
  generateBtn.addEventListener("click", refreshPreview);

  // Download the generated image
  downloadBtn.addEventListener("click", function () {
    if (this.disabled) return;

    const link = document.createElement("a");
    link.download = "twitch-story.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });

  // Generate a default story on page load
  generateTwitchStory(ctx, {
    channelName: "Your Channel",
    gameTitle: "Awesome Stream",
    streamTitle: "Come hang out with me!",
    matureContent: false,
    scheduleStream: true,
    includeQRCode: true,
    storyType: "upcoming",
    styleOptions: {
      backgroundStyle: "gradient",
      gradientTopColor: "#6441a5",
      gradientBottomColor: "#392e5c",
      fontStyle: "Arial, sans-serif",
      textColor: "#ffffff",
      accentColor: "#ff8c00",
    },
    profileOptions: {
      includeProfilePic: false,
    },
  });

  // Initialize first raid entry
  updateRaidEntries();

  // Delegated event listeners for raidCount input
  document.addEventListener("input", function (e) {
    if (e.target && e.target.id === "raidCount") {
      console.log(
        "Delegated: raidCount input event. Current value:",
        e.target.value
      );
      updateRaidEntries();
    }
  });

  document.addEventListener("change", function (e) {
    if (e.target && e.target.id === "raidCount") {
      console.log(
        "Delegated: raidCount change event. Current value:",
        e.target.value
      );
      updateRaidEntries();
    }
  });

  // Check if we have a saved profile picture
  if (localStorage.getItem("profilePicture")) {
    profilePreview.src = localStorage.getItem("profilePicture");
  }
});

// Update the generateTwitchStory function to handle new story types
function generateTwitchStory(ctx, options) {
  const {
    channelName,
    includeQRCode,
    storyType,
    styleOptions,
    profileOptions,
  } = options;

  const canvas = ctx.canvas;
  const width = canvas.width;
  const height = canvas.height;

  // Draw background based on style
  drawBackground(ctx, styleOptions, width, height);

  // Set font style
  const fontFamily = styleOptions.fontStyle || "Arial, sans-serif";
  const textColor = styleOptions.textColor || "#ffffff";
  const accentColor = styleOptions.accentColor || "#ff8c00";

  // Calculate proportional spacing
  const headerHeight = height * 0.08; // 8% of canvas height
  const footerHeight = includeQRCode ? height * 0.22 : height * 0.08; // Reduced from 0.28 to 0.22
  const contentHeight = height - headerHeight - footerHeight;

  // Start with proportional spacing from top
  let currentY = headerHeight;

  // Skip Twitch branding to save space
  const headerFontSize = Math.max(20, Math.floor(height * 0.035));
  // Just a minimal spacing adjustment
  currentY += headerFontSize * 0.5; // Reduced from 1.5 to 0.5

  // Skip displaying channel name to save space (still use it for QR code)
  currentY = height * 0.05; // Start at 5% from the top (reduced from previous position)

  // Add profile picture if enabled
  if (profileOptions.includeProfilePic && profileOptions.profilePicture) {
    const profileSize = profileOptions.profileSize || Math.floor(height * 0.18); // Reduced from 0.22 to 0.18
    const profileX = (width - profileSize) / 2;
    const profileY = currentY;

    // Draw circular profile picture
    ctx.save();
    ctx.beginPath();
    ctx.arc(
      profileX + profileSize / 2,
      profileY + profileSize / 2,
      profileSize / 2,
      0,
      Math.PI * 2,
      true
    );
    ctx.closePath();
    ctx.clip();

    const img = new Image();
    img.src = profileOptions.profilePicture;

    if (img.complete) {
      ctx.drawImage(img, profileX, profileY, profileSize, profileSize);
    } else {
      img.onload = function () {
        ctx.drawImage(img, profileX, profileY, profileSize, profileSize);
      };
    }

    ctx.restore();

    // Adjust vertical position
    currentY += profileSize + headerHeight * 1.2; // Slightly reduced spacing
  } else {
    currentY += headerHeight * 1.2;
  }

  // Add QR code and footer for all story types
  if (includeQRCode) {
    try {
      const qr = qrcode(0, "L");
      qr.addData(`https://twitch.tv/${channelName}`);
      qr.make();

      // Get canvas dimensions from the context
      const canvasWidth = ctx.canvas.width;
      const canvasHeight = ctx.canvas.height;

      const qrSize = Math.min(canvasWidth / 4, canvasHeight * 0.12);
      const qrX = (canvasWidth - qrSize) / 2;
      const qrY = canvasHeight - qrSize - canvasHeight * 0.05;

      const qrCanvas = document.createElement("canvas");
      qrCanvas.width = qrSize;
      qrCanvas.height = qrSize;
      const qrCtx = qrCanvas.getContext("2d");

      // Fill with white background
      qrCtx.fillStyle = "white";
      qrCtx.fillRect(0, 0, qrSize, qrSize);

      // Draw QR code
      const cellSize = qrSize / qr.getModuleCount();
      qrCtx.fillStyle = "black";
      for (let row = 0; row < qr.getModuleCount(); row++) {
        for (let col = 0; col < qr.getModuleCount(); col++) {
          if (qr.isDark(row, col)) {
            qrCtx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
          }
        }
      }

      // Draw QR code on main canvas
      ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

      // Add text below QR code
      const scanFontSize = Math.max(12, Math.floor(canvasHeight * 0.02));
      ctx.fillStyle = textColor;
      ctx.font = `${scanFontSize}px ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.fillText(
        "Scan to visit channel",
        canvasWidth / 2,
        qrY + qrSize + scanFontSize
      );
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  }

  // Set text alignment to center for all subsequent text
  ctx.textAlign = "center";
  ctx.fillStyle = textColor;

  // Calculate remaining space for content
  const contentStartY = currentY;
  const contentEndY = height - footerHeight;
  const availableContentHeight = contentEndY - contentStartY;
  // Detect if profile is being used to adjust spacing throughout
  const profileUsed =
    profileOptions.includeProfilePic && profileOptions.profilePicture;
  // Adjust section spacing based on whether profile is used
  const sectionSpacingFactor = profileUsed ? 0.08 : 0.15; // Smaller spacing when profile is used
  const sectionSpacing = availableContentHeight * sectionSpacingFactor;

  if (storyType === "upcoming") {
    const {
      gameTitle,
      streamTitle,
      matureContent,
      scheduleStream,
      headerText,
    } = options;

    // Add mature content warning if needed
    if (matureContent) {
      const warningFontSize = Math.max(16, Math.floor(height * 0.025));

      // Calculate banner dimensions
      const bannerHeight = warningFontSize * 1.6;
      const bannerY = currentY - warningFontSize * 0.8;

      // Draw full-width banner
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(0, bannerY, width, bannerHeight);

      // Calculate the vertical center of the banner for text placement
      const textY = bannerY + bannerHeight / 2 + warningFontSize * 0.35; // The 0.35 factor helps center text vertically

      // Draw text
      ctx.fillStyle = "#ff4040";
      ctx.font = `bold ${warningFontSize}px ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.fillText("🔞 MATURE/ADULT CONTENT", width / 2, textY);

      // Update currentY to be after the banner
      currentY = bannerY + bannerHeight + warningFontSize * 0.3; // Small additional spacing
    }

    // Add header text with proportional spacing
    currentY += sectionSpacing * 0.5; // Use the already declared sectionSpacing
    const headerFontSize = Math.max(20, Math.floor(height * 0.03));
    ctx.fillStyle = textColor;
    ctx.font = `bold ${headerFontSize}px ${fontFamily}`;

    // Use the custom header text if provided, otherwise use default
    const headerTextToUse = headerText || "UPCOMING STREAM";
    ctx.fillText(headerTextToUse, width / 2, currentY);

    // Add spacing for the next element
    currentY += sectionSpacing * 0.5;

    // Add game title with increased spacing
    currentY += sectionSpacing;
    const gameFontSize = Math.max(28, Math.floor(height * 0.045));
    ctx.font = `bold ${gameFontSize}px ${fontFamily}`;

    // Handle long game titles
    const maxGameWidth = width * 0.85;
    if (ctx.measureText(gameTitle).width > maxGameWidth) {
      let truncatedTitle = gameTitle;
      while (
        ctx.measureText(truncatedTitle + "...").width > maxGameWidth &&
        truncatedTitle.length > 0
      ) {
        truncatedTitle = truncatedTitle.slice(0, -1);
      }
      ctx.fillText(truncatedTitle + "...", width / 2, currentY);
    } else {
      ctx.fillText(gameTitle, width / 2, currentY);
    }

    // Add stream title with increased spacing
    currentY += sectionSpacing;
    const titleFontSize = Math.max(20, Math.floor(height * 0.035));
    ctx.font = `${titleFontSize}px ${fontFamily}`;
    const maxWidth = width * 0.85;
    const lineHeight = titleFontSize * 1.2;

    // Calculate max lines needed for a 140-character title
    const avgCharWidth =
      ctx.measureText(
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      ).width / 62;
    const charsPerLine = Math.floor(maxWidth / avgCharWidth);
    const maxPossibleLines = Math.ceil(140 / charsPerLine) + 1; // Add 1 for safety

    // Calculate space needed for schedule
    const scheduleSpaceNeeded = scheduleStream ? titleFontSize * 3 : 0;

    // Ensure we have enough space between title and schedule
    const maxTitleY = contentEndY - scheduleSpaceNeeded;

    // Debug - make sure streamTitle is not empty
    console.log("Stream title:", streamTitle);
    const titleToUse = streamTitle || "Come hang out with me!";

    // Check if the title fits within maxWidth
    if (ctx.measureText(titleToUse).width <= maxWidth) {
      // Center-align if the title fits
      ctx.textAlign = "center";
      ctx.fillText(titleToUse, width / 2, currentY);
      currentY += lineHeight; // Move to the next line
    } else {
      // Use left alignment and wrap text if the title is too long
      ctx.textAlign = "left";
      const leftMargin = (width - maxWidth) / 2;
      currentY = wrapTextLeft(
        ctx,
        titleToUse,
        leftMargin,
        currentY,
        maxWidth,
        lineHeight,
        maxTitleY
      );
    }

    // Reset to center alignment for the rest of the text
    ctx.textAlign = "center";

    // Add scheduled date and time if enabled
    if (scheduleStream) {
      const dateInput = document.getElementById("streamDate").value;
      const timeInput = document.getElementById("streamTime").value;
      const timeZone = document.getElementById("timeZone").value;

      if (dateInput && timeInput) {
        // Format the date nicely
        const dateObj = new Date(dateInput + "T" + timeInput);
        const options = {
          weekday: "long",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        };

        let formattedDate = dateObj.toLocaleDateString("en-US", options);

        // Add time zone if not local
        if (timeZone !== "local") {
          formattedDate += ` ${timeZone}`;
        }

        // Draw date/time
        const dateFontSize = Math.max(18, Math.floor(height * 0.03));
        const dateY = contentEndY - dateFontSize * 2;

        ctx.fillStyle = textColor;
        ctx.font = `bold ${dateFontSize}px ${fontFamily}`;
        ctx.textAlign = "center";
        ctx.fillText("GOING LIVE", width / 2, dateY);

        ctx.font = `${dateFontSize * 0.9}px ${fontFamily}`;
        ctx.fillText(formattedDate, width / 2, dateY + dateFontSize * 1.3);
      }
    }

    // Add "Set a reminder" text at bottom of content area
    const reminderFontSize = Math.max(20, Math.floor(height * 0.035));
    ctx.fillStyle = accentColor;
    ctx.font = `bold ${reminderFontSize}px ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.fillText(
      "Set a reminder!",
      width / 2,
      height - footerHeight + reminderFontSize
    );

    // Remove this extra closing brace
    // }
  } else if (storyType === "raid") {
    // Existing raid thanker code
    const { raids } = options;

    // Add "RAID THANKER" text
    const titleFontSize = Math.max(28, Math.floor(height * 0.045));
    ctx.fillStyle = textColor;
    ctx.font = `bold ${titleFontSize}px ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.fillText("RAID THANKER", width / 2, currentY);

    // Add thank you message
    currentY += titleFontSize * 1.5;
    const thanksFontSize = Math.max(20, Math.floor(height * 0.035));
    ctx.font = `bold ${thanksFontSize}px ${fontFamily}`;

    // Check if text fits within width
    const thanksText = "THANK YOU FOR THE RAIDS!";
    const thanksWidth = ctx.measureText(thanksText).width;
    if (thanksWidth > width * 0.9) {
      const scaledFontSize = Math.floor(
        ((width * 0.9) / thanksWidth) * thanksFontSize
      );
      ctx.font = `bold ${scaledFontSize}px ${fontFamily}`;
    }

    ctx.fillText(thanksText, width / 2, currentY);

    // Add each raider with their count
    currentY += thanksFontSize * 1.5;
    const raiderFontSize = Math.max(18, Math.floor(height * 0.03));

    // Calculate available space for raiders
    const maxY = contentEndY - raiderFontSize * 2; // Leave space for thank you message at bottom
    const availableHeight = maxY - currentY;

    // Distribute raiders evenly in the available space
    const itemHeight = Math.min(
      raiderFontSize * 2.5,
      availableHeight / raids.length
    );

    raids.forEach((raid, index) => {
      const y = currentY + index * itemHeight;

      // Skip if we're out of space
      if (y > maxY) return;

      // Draw raider name and count
      ctx.fillStyle = accentColor;
      ctx.font = `bold ${raiderFontSize}px ${fontFamily}`;

      // Check if raider name fits
      const raiderNameWidth = ctx.measureText(raid.raiderName).width;
      if (raiderNameWidth > width * 0.8) {
        let truncatedName = raid.raiderName;
        while (
          ctx.measureText(truncatedName + "...").width > width * 0.8 &&
          truncatedName.length > 0
        ) {
          truncatedName = truncatedName.slice(0, -1);
        }
        ctx.fillText(truncatedName + "...", width / 2, y);
      } else {
        ctx.fillText(raid.raiderName, width / 2, y);
      }

      ctx.fillStyle = textColor;
      ctx.font = `${raiderFontSize * 0.9}px ${fontFamily}`;
      ctx.fillText(
        `with ${raid.raiderCount} viewers`,
        width / 2,
        y + raiderFontSize * 1.2
      );
    });

    // Add "Thank you for supporting the channel!" text at bottom of content area
    const thankY = contentEndY - raiderFontSize;
    ctx.fillStyle = textColor;
    ctx.font = `bold ${raiderFontSize}px ${fontFamily}`;
    ctx.textAlign = "center";

    const supportText = "Thank you for supporting the channel!";
    const supportWidth = ctx.measureText(supportText).width;
    if (supportWidth > width * 0.9) {
      const scaledFontSize = Math.floor(
        ((width * 0.9) / supportWidth) * raiderFontSize
      );
      ctx.font = `bold ${scaledFontSize}px ${fontFamily}`;
    }

    ctx.fillText(supportText, width / 2, thankY);
  } else if (storyType === "subscriber") {
    // Subscriber thanker implementation
    const { subscribers } = options;

    // Add "SUBSCRIBER THANKER" text
    const titleFontSize = Math.max(28, Math.floor(height * 0.045));
    ctx.fillStyle = textColor;
    ctx.font = `bold ${titleFontSize}px ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.fillText("SUBSCRIBER THANKER", width / 2, currentY);

    // Add thank you message
    currentY += titleFontSize * 1.5;
    const thanksFontSize = Math.max(20, Math.floor(height * 0.035));
    ctx.font = `bold ${thanksFontSize}px ${fontFamily}`;

    const thanksText = "THANK YOU FOR THE SUPPORT!";
    const thanksWidth = ctx.measureText(thanksText).width;
    if (thanksWidth > width * 0.9) {
      const scaledFontSize = Math.floor(
        ((width * 0.9) / thanksWidth) * thanksFontSize
      );
      ctx.font = `bold ${scaledFontSize}px ${fontFamily}`;
    }

    ctx.fillText(thanksText, width / 2, currentY);

    // Add each subscriber with their details
    currentY += thanksFontSize * 1.5;
    const subFontSize = Math.max(18, Math.floor(height * 0.03));

    // Calculate available space for subscribers
    const maxY = contentEndY - subFontSize * 2;
    const availableHeight = maxY - currentY;

    // Distribute subscribers evenly in the available space
    const itemHeight = Math.min(
      subFontSize * 2.5,
      availableHeight / subscribers.length
    );

    subscribers.forEach((sub, index) => {
      const y = currentY + index * itemHeight;

      // Skip if we're out of space
      if (y > maxY) return;

      // Draw subscriber name
      ctx.fillStyle = accentColor;
      ctx.font = `bold ${subFontSize}px ${fontFamily}`;

      // Check if subscriber name fits
      const subNameWidth = ctx.measureText(sub.subName).width;
      if (subNameWidth > width * 0.8) {
        let truncatedName = sub.subName;
        while (
          ctx.measureText(truncatedName + "...").width > width * 0.8 &&
          truncatedName.length > 0
        ) {
          truncatedName = truncatedName.slice(0, -1);
        }
        ctx.fillText(truncatedName + "...", width / 2, y);
      } else {
        ctx.fillText(sub.subName, width / 2, y);
      }

      // Draw subscription type
      ctx.fillStyle = textColor;
      ctx.font = `${subFontSize * 0.9}px ${fontFamily}`;

      let subTypeText = "";
      if (sub.subType === "new") {
        subTypeText = "New Subscriber";
      } else if (sub.subType === "prime") {
        subTypeText = "Prime Subscriber";
      } else if (sub.subType === "resub") {
        subTypeText = `${sub.months} Month Resubscriber`;
      }

      ctx.fillText(subTypeText, width / 2, y + subFontSize * 1.2);
    });

    // Add thank you message at bottom
    const thankY = contentEndY - subFontSize;
    ctx.fillStyle = textColor;
    ctx.font = `bold ${subFontSize}px ${fontFamily}`;
    ctx.textAlign = "center";

    const supportText = "Your support means the world to me!";
    const supportWidth = ctx.measureText(supportText).width;
    if (supportWidth > width * 0.9) {
      const scaledFontSize = Math.floor(
        ((width * 0.9) / supportWidth) * subFontSize
      );
      ctx.font = `bold ${scaledFontSize}px ${fontFamily}`;
    }

    ctx.fillText(supportText, width / 2, thankY);
  } else if (storyType === "gifted") {
    // Gifted subs thanker implementation
    const { gifters } = options;

    // Add "GIFTED SUBS THANKER" text
    const titleFontSize = Math.max(28, Math.floor(height * 0.045));
    ctx.fillStyle = textColor;
    ctx.font = `bold ${titleFontSize}px ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.fillText("GIFTED SUBS THANKER", width / 2, currentY);

    // Add thank you message
    currentY += titleFontSize * 1.5;
    const thanksFontSize = Math.max(20, Math.floor(height * 0.035));
    ctx.font = `bold ${thanksFontSize}px ${fontFamily}`;

    const thanksText = "THANK YOU FOR THE GIFTED SUBS!";
    const thanksWidth = ctx.measureText(thanksText).width;
    if (thanksWidth > width * 0.9) {
      const scaledFontSize = Math.floor(
        ((width * 0.9) / thanksWidth) * thanksFontSize
      );
      ctx.font = `bold ${scaledFontSize}px ${fontFamily}`;
    }

    ctx.fillText(thanksText, width / 2, currentY);

    // Add each gifter with their count
    currentY += thanksFontSize * 1.5;
    const gifterFontSize = Math.max(18, Math.floor(height * 0.03));

    // Calculate available space for gifters
    const maxY = contentEndY - gifterFontSize * 2;
    const availableHeight = maxY - currentY;

    // Distribute gifters evenly in the available space
    const itemHeight = Math.min(
      gifterFontSize * 2.5,
      availableHeight / gifters.length
    );

    gifters.forEach((gifter, index) => {
      const y = currentY + index * itemHeight;

      // Skip if we're out of space
      if (y > maxY) return;

      // Draw gifter name
      ctx.fillStyle = accentColor;
      ctx.font = `bold ${gifterFontSize}px ${fontFamily}`;

      // Check if gifter name fits
      const gifterNameWidth = ctx.measureText(gifter.gifterName).width;
      if (gifterNameWidth > width * 0.8) {
        let truncatedName = gifter.gifterName;
        while (
          ctx.measureText(truncatedName + "...").width > width * 0.8 &&
          truncatedName.length > 0
        ) {
          truncatedName = truncatedName.slice(0, -1);
        }
        ctx.fillText(truncatedName + "...", width / 2, y);
      } else {
        ctx.fillText(gifter.gifterName, width / 2, y);
      }

      // Draw gift count
      ctx.fillStyle = textColor;
      ctx.font = `${gifterFontSize * 0.9}px ${fontFamily}`;

      const giftText =
        gifter.giftCount === 1
          ? "gifted 1 subscription"
          : `gifted ${gifter.giftCount} subscriptions`;

      ctx.fillText(giftText, width / 2, y + gifterFontSize * 1.2);
    });

    // Add thank you message at bottom
    const thankY = contentEndY - gifterFontSize;
    ctx.fillStyle = textColor;
    ctx.font = `bold ${gifterFontSize}px ${fontFamily}`;
    ctx.textAlign = "center";

    const supportText = "Your generosity helps grow our community!";
    const supportWidth = ctx.measureText(supportText).width;
    if (supportWidth > width * 0.9) {
      const scaledFontSize = Math.floor(
        ((width * 0.9) / supportWidth) * gifterFontSize
      );
      ctx.font = `bold ${scaledFontSize}px ${fontFamily}`;
    }

    ctx.fillText(supportText, width / 2, thankY);
  } else if (storyType === "follower") {
    // Follower thanker implementation
    const { followers } = options;

    // Add "NEW FOLLOWER THANKER" text
    const titleFontSize = Math.max(20, Math.floor(height * 0.035));
    ctx.fillStyle = textColor;
    ctx.font = `bold ${titleFontSize}px ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.fillText("NEW FOLLOWER THANKER", width / 2, currentY);

    // Add thank you message
    currentY += titleFontSize * 1.5;
    const thanksFontSize = Math.max(20, Math.floor(height * 0.035));
    ctx.font = `bold ${thanksFontSize}px ${fontFamily}`;

    const thanksText = "THANK YOU FOR FOLLOWING!";
    const thanksWidth = ctx.measureText(thanksText).width;
    if (thanksWidth > width * 0.9) {
      const scaledFontSize = Math.floor(
        ((width * 0.9) / thanksWidth) * thanksFontSize
      );
      ctx.font = `bold ${scaledFontSize}px ${fontFamily}`;
    }

    ctx.fillText(thanksText, width / 2, currentY);

    // Add each follower
    currentY += thanksFontSize * 1.5;
    const followerFontSize = Math.max(18, Math.floor(height * 0.03));

    // Calculate available space for followers
    const maxY = contentEndY - followerFontSize * 2;
    const availableHeight = maxY - currentY;

    // Distribute followers evenly in the available space
    const itemHeight = Math.min(
      followerFontSize * 1.8,
      availableHeight / followers.length
    );

    followers.forEach((follower, index) => {
      const y = currentY + index * itemHeight;

      // Skip if we're out of space
      if (y > maxY) return;

      // Draw follower name
      ctx.fillStyle = accentColor;
      ctx.font = `bold ${followerFontSize}px ${fontFamily}`;

      // Check if follower name fits
      const followerNameWidth = ctx.measureText(follower.followerName).width;
      if (followerNameWidth > width * 0.8) {
        let truncatedName = follower.followerName;
        while (
          ctx.measureText(truncatedName + "...").width > width * 0.8 &&
          truncatedName.length > 0
        ) {
          truncatedName = truncatedName.slice(0, -1);
        }
        ctx.fillText(truncatedName + "...", width / 2, y);
      } else {
        ctx.fillText(follower.followerName, width / 2, y);
      }
    });

    // Add thank you message at bottom
    const thankY = contentEndY - followerFontSize;
    ctx.fillStyle = textColor;
    ctx.font = `bold ${followerFontSize}px ${fontFamily}`;
    ctx.textAlign = "center";

    const supportText = "Welcome to the community!";
    const supportWidth = ctx.measureText(supportText).width;
    if (supportWidth > width * 0.9) {
      const scaledFontSize = Math.floor(
        ((width * 0.9) / supportWidth) * followerFontSize
      );
      ctx.font = `bold ${scaledFontSize}px ${fontFamily}`;
    }
    ctx.fillText(supportText, width / 2, thankY);
  }
}

// Function to draw background based on style options
function drawBackground(ctx, styleOptions, width, height) {
  const {
    backgroundStyle,
    gradientTopColor,
    gradientBottomColor,
    backgroundColor,
    backgroundImage,
    backgroundOpacity,
    overlayColor,
  } = styleOptions;

  if (backgroundStyle === "gradient") {
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, gradientTopColor || "#6441a5");
    gradient.addColorStop(1, gradientBottomColor || "#392e5c");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  } else if (backgroundStyle === "solid") {
    // Solid background
    ctx.fillStyle = backgroundColor || "#6441a5";
    ctx.fillRect(0, 0, width, height);
  } else if (backgroundStyle === "image" && backgroundImage) {
    // Background image with overlay
    const img = new Image();
    img.src = backgroundImage;

    if (img.complete) {
      drawBackgroundImage(
        ctx,
        img,
        width,
        height,
        overlayColor,
        backgroundOpacity
      );
    } else {
      img.onload = function () {
        drawBackgroundImage(
          ctx,
          img,
          width,
          height,
          overlayColor,
          backgroundOpacity
        );
      };

      // Fallback in case image doesn't load
      ctx.fillStyle = "#6441a5";
      ctx.fillRect(0, 0, width, height);
    }
  } else {
    // Default background if no valid style or image
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#6441a5");
    gradient.addColorStop(1, "#392e5c");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
}

// Helper function to draw background image with overlay
function drawBackgroundImage(ctx, img, width, height, overlayColor, opacity) {
  // Draw the image covering the entire canvas
  ctx.drawImage(img, 0, 0, width, height);

  // Apply semi-transparent overlay
  ctx.fillStyle = overlayColor || "rgba(100, 65, 165, 0.7)";
  ctx.globalAlpha = opacity || 0.7;
  ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = 1.0; // Reset alpha
}

// Function for left-aligned text wrapping
function wrapTextLeft(ctx, text, x, y, maxWidth, lineHeight, maxY) {
  if (!text) return y;

  // Limit text to Twitch's maximum of 140 characters
  if (text.length > 140) {
    text = text.substring(0, 140);
  }

  const words = text.split(" ");
  let line = "";
  let currentY = y;

  // If we can't fit even one line
  if (currentY + lineHeight > maxY) return y;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + (line ? " " : "") + words[i];
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && i > 0) {
      // This line is too long, output what we have so far
      ctx.fillText(line, x, currentY);
      line = words[i];
      currentY += lineHeight;

      // Check if we've exceeded the maximum Y position
      if (currentY + lineHeight > maxY) {
        // If we can't fit the next line, add ellipsis to the current line
        if (line) {
          while (
            ctx.measureText(line + "...").width > maxWidth &&
            line.length > 0
          ) {
            line = line.slice(0, -1);
          }
          ctx.fillText(line + "...", x, currentY);
        }
        return currentY + lineHeight;
      }
    } else {
      line = testLine;
    }
  }

  // Draw the last line
  if (line) {
    ctx.fillText(line, x, currentY);
    currentY += lineHeight;
  }

  return currentY; // Return the new Y position
}

// Add this function at the end of your script
function wrapTextCenteredWithMaxLines(
  ctx,
  text,
  x,
  y,
  maxWidth,
  lineHeight,
  maxY,
  maxLines
) {
  if (!text) return y;

  const words = text.split(" ");
  let line = "";
  let testLine = "";
  let currentY = y;
  let linesDrawn = 0;

  // If we can't fit even one line
  if (currentY + lineHeight > maxY) return y;

  for (let i = 0; i < words.length; i++) {
    testLine = line + words[i] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && i > 0) {
      ctx.fillText(line, x, currentY);
      line = words[i] + " ";
      currentY += lineHeight;
      linesDrawn++;

      // Check if we've reached the maximum number of lines
      if (linesDrawn >= maxLines - 1) {
        // If this is the last line and we have more words
        if (i < words.length - 1) {
          // Add ellipsis to indicate truncated text
          while (
            ctx.measureText(line + "...").width > maxWidth &&
            line.length > 0
          ) {
            line = line.slice(0, -1);
          }
          ctx.fillText(line + "...", x, currentY);
          return currentY + lineHeight;
        }
      }

      // Check if we've exceeded the maximum Y position
      if (currentY + lineHeight > maxY) {
        return currentY;
      }
    } else {
      line = testLine;
    }
  }

  // Draw the last line
  if (line.trim() !== "") {
    ctx.fillText(line, x, currentY);
    currentY += lineHeight;
  }

  return currentY; // Return the new Y position
}

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
