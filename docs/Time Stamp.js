document.addEventListener("DOMContentLoaded", function () {
  const textarea = document.getElementById("textarea");
  const copyButton = document.getElementById("copyButton");
  const copyTooltip = document.getElementById("copyTooltip");
  const themeToggle = document.getElementById("themeToggle");
  const backToTop = document.getElementById("backToTop");
  const styleButtons = document.querySelectorAll(".style-button");
  const colorButtons = document.querySelectorAll(".color-button");

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

  // Handle basic HTML escaping for pasted content
  textarea.addEventListener("paste", function (e) {
    // Prevent the default paste
    e.preventDefault();

    // Get text representation of clipboard
    const text = (e.originalEvent || e).clipboardData.getData("text/plain");

    // Insert text manually
    document.execCommand("insertText", false, text);
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
    if (ansiCode === "0") {
      // Reset all formatting
      textarea.innerHTML = textarea.innerText;
      return;
    }

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = selection.toString();

    if (!selectedText) return; // No text selected

    // Create a span with the appropriate class
    const span = document.createElement("span");
    span.textContent = selectedText;
    span.classList.add(`ansi-${ansiCode}`);

    // Replace the selected text with our formatted span
    range.deleteContents();
    range.insertNode(span);

    // Keep the selection on the newly formatted text
    range.selectNodeContents(span);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  // Convert HTML nodes to ANSI escape sequences
  function nodesToANSI(nodes, states = [{ fg: 0, bg: 0, st: 0 }]) {
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

      const ansiCode = parseInt(node.className.split("-")[1]);
      const newState = Object.assign({}, states[states.length - 1]);

      if (ansiCode < 30) newState.st = ansiCode;
      if (ansiCode >= 30 && ansiCode < 40) newState.fg = ansiCode;
      if (ansiCode >= 40) newState.bg = ansiCode;

      states.push(newState);

      // Add the appropriate ANSI code
      if (ansiCode < 30) {
        text += `\x1b[${ansiCode}m`;
      } else if (ansiCode >= 30 && ansiCode < 40) {
        text += `\x1b[${ansiCode}m`;
      } else if (ansiCode >= 40) {
        text += `\x1b[${ansiCode}m`;
      }

      // Process child nodes
      text += nodesToANSI(node.childNodes, states);

      // Reset formatting
      states.pop();
      text += `\x1b[0m`;

      // Reapply parent formatting if needed
      const currentState = states[states.length - 1];
      if (currentState.st !== 0) text += `\x1b[${currentState.st}m`;
      if (currentState.fg !== 0) text += `\x1b[${currentState.fg}m`;
      if (currentState.bg !== 0) text += `\x1b[${currentState.bg}m`;
    }

    return text;
  }

  // Copy button functionality
  copyButton.addEventListener("click", function () {
    // Generate the ANSI-formatted text
    const formattedText =
      "```ansi\n" + nodesToANSI(textarea.childNodes) + "\n```";

    // Use the clipboard API to copy
    navigator.clipboard
      .writeText(formattedText)
      .then(function () {
        // Show success message
        copyButton.classList.add("copied");
        copyButton.textContent = "Copied!";

        // Position the tooltip
        const rect = copyButton.getBoundingClientRect();
        copyTooltip.style.top = `${rect.top - 40}px`;
        copyTooltip.style.left = `${rect.left + rect.width / 2 - 50}px`;
        copyTooltip.classList.add("show");

        // Reset after 2 seconds
        setTimeout(function () {
          copyButton.classList.remove("copied");
          copyButton.textContent = "Copy Formatted Text";
          copyTooltip.classList.remove("show");
        }, 2000);
      })
      .catch(function (err) {
        console.error("Could not copy text: ", err);

        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = formattedText;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          const successful = document.execCommand("copy");
          if (successful) {
            copyButton.classList.add("copied");
            copyButton.textContent = "Copied!";
            setTimeout(function () {
              copyButton.classList.remove("copied");
              copyButton.textContent = "Copy Formatted Text";
            }, 2000);
          } else {
            alert("Failed to copy. Please select and copy manually.");
          }
        } catch (err) {
          console.error("Fallback: Could not copy text: ", err);
          alert("Failed to copy. Please select and copy manually.");
        }

        document.body.removeChild(textArea);
      });
  });

  // Initialize with some formatted text as an example
  textarea.innerHTML =
    'Welcome to the <span class="ansi-34">Discord</span> <span class="ansi-31">C</span><span class="ansi-33">o</span><span class="ansi-32">l</span><span class="ansi-36">o</span><span class="ansi-35">r</span><span class="ansi-34">e</span><span class="ansi-31">d</span> Text Generator! <span class="ansi-1">Select some text</span> and apply colors to it.';
});
