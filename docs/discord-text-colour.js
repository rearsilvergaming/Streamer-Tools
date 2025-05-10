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

document.addEventListener("DOMContentLoaded", function () {
  const textarea = document.getElementById("textarea");
  const copyButton = document.getElementById("copyButton");
  const copyTooltip = document.getElementById("copyTooltip");
  const themeToggle = document.getElementById("themeToggle");
  const backToTop = document.getElementById("backToTop");
  const styleButtons = document.querySelectorAll(".style-button");
  const colorButtons = document.querySelectorAll(
    ".color-picker-button, .color-button"
  );
  const initialText =
    "Welcome to the Discord Coloured Text Generator! Select some text and apply colours to it.";
  textarea.innerHTML = initialText;

  // Theme toggle functionality
  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "darkMode",
      document.body.classList.contains("dark-mode")
    );
  });

  // Check for saved theme preference
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }

  // Back to top button
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  textarea.addEventListener("focus", function () {
    // Trim whitespace when the textarea gets focus
    this.innerHTML = this.innerHTML.trim();
  });

  // Fix contenteditable whitespace issues
  function fixContentEditableWhitespace() {
    const textarea = document.getElementById("textarea");
    if (textarea) {
      // Store the current selection
      const selection = window.getSelection();
      const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

      // Fix whitespace
      const content = textarea.innerHTML;
      const trimmed = content.replace(/^\s+|\s+$/g, "");

      if (content !== trimmed) {
        textarea.innerHTML = trimmed;

        // Restore selection if possible
        if (range && textarea.contains(range.startContainer)) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }
  }

  // Call on page load
  document.addEventListener("DOMContentLoaded", fixContentEditableWhitespace);

  // Call periodically to ensure whitespace doesn't accumulate
  setInterval(fixContentEditableWhitespace, 5000);

  // Handle basic HTML escaping for pasted content
  textarea.addEventListener("input", function () {
    const base = textarea.innerHTML.replace(
      /<(\/?(br|span|span class="ansi-[0-9]*"))>/g,
      "[$1]"
    );
    if (base.includes("<") || base.includes(">")) {
      textarea.innerHTML = base
        .replace(/<.*?>/g, "")
        .replace(/[<>]/g, "")
        .replace(/\[(\/?(br|span|span class="ansi-[0-9]*"))\]/g, "<$1>");
    }
  });

  // Handle Enter key for line breaks
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && document.activeElement === textarea) {
      document.execCommand("insertLineBreak");
      event.preventDefault();
    }
  });

  // Style and color buttons functionality
  styleButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyFormatting(btn.dataset.ansi);
    });
  });

  colorButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyFormatting(btn.dataset.ansi);
    });
  });

  function applyFormatting(ansiCode) {
    console.log("applyFormatting called with ansiCode:", ansiCode);

    if (!ansiCode) {
      console.log("Reset all formatting triggered");

      // Force a complete reset by replacing the entire element
      const parent = textarea.parentNode;
      const plainText = textarea.textContent;

      // Create a new textarea element
      const newTextarea = document.createElement("div");
      newTextarea.id = "textarea";
      newTextarea.contentEditable = true;
      newTextarea.textContent = plainText;

      // Replace the old textarea with the new one
      parent.replaceChild(newTextarea, textarea);

      // Update the textarea reference
      textarea = newTextarea;

      // Reattach event listeners if needed
      textarea.addEventListener("input", handleTextareaInput);

      console.log("Reset completed with element replacement");
      return;
    }

    const selection = window.getSelection();
    const text = selection.toString();

    if (!text) return; // No text selected

    const span = document.createElement("span");
    span.innerText = text;
    span.classList.add(`ansi-${ansiCode}`);

    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(span);

    // Keep the selection on the newly formatted text
    range.selectNodeContents(span);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  // Convert HTML nodes to ANSI escape sequences
  function nodesToANSI(nodes, states) {
    let text = "";
    for (const node of nodes) {
      if (node.nodeType === 3) {
        // Text node
        text += node.textContent;
        continue;
      }

      if (node.nodeName === "BR") {
        text += "\n";
        continue;
      }

      if (!node.className || !node.className.includes("ansi-")) {
        // Not a formatting node, just process its children
        text += nodesToANSI(node.childNodes, states);
        continue;
      }

      const ansiCode = +node.className.split("-")[1];
      const newState = Object.assign({}, states.at(-1));

      if (ansiCode < 30) newState.st = ansiCode;
      if (ansiCode >= 30 && ansiCode < 40) newState.fg = ansiCode;
      if (ansiCode >= 40) newState.bg = ansiCode;

      states.push(newState);
      text += `\x1b[${newState.st};${
        ansiCode >= 40 ? newState.bg : newState.fg
      }m`;
      text += nodesToANSI(node.childNodes, states);
      states.pop();

      text += `\x1b[0m`;
      if (states.at(-1).fg !== 0)
        text += `\x1b[${states.at(-1).st};${states.at(-1).fg}m`;
      if (states.at(-1).bg !== 0)
        text += `\x1b[${states.at(-1).st};${states.at(-1).bg}m`;
    }
    return text;
  }

  // Copy button functionality
  copyButton.addEventListener("click", function () {
    const toCopy =
      "```ansi\n" +
      nodesToANSI(textarea.childNodes, [{ fg: 0, bg: 0, st: 0 }]) +
      "\n```";

    navigator.clipboard
      .writeText(toCopy)
      .then(function () {
        // Show success message
        copyButton.classList.add("copied");
        copyButton.textContent = "Copied!";

        // Position the tooltip
        const rect = copyButton.getBoundingClientRect();
        copyTooltip.style.top = `${rect.top - 40}px`;
        copyTooltip.style.left = `${
          rect.left + rect.width / 2 - copyTooltip.offsetWidth / 2
        }px`;
        copyTooltip.classList.add("show");

        // Reset after 2 seconds
        setTimeout(function () {
          copyButton.classList.remove("copied");
          copyButton.textContent = "Copy Formatted Text";
          copyTooltip.classList.remove("show");
        }, 2000);
      })
      .catch(function (err) {
        alert("Copying failed. Please try again or copy manually.");
        console.error("Could not copy text: ", err);
      });
  });
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
