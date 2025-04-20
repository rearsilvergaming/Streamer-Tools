document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const canvas = document.getElementById('storyCanvas');
    const ctx = canvas.getContext('2d');
    const storyTypeSelect = document.getElementById('storyType');
    const upcomingStreamOptions = document.getElementById('upcomingStreamOptions');
    const raidThankerOptions = document.getElementById('raidThankerOptions');
    const raidCountInput = document.getElementById('raidCount');
    const raidEntriesContainer = document.getElementById('raidEntries');
    
    // Tab navigation
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    function updateRaidEntries() {
        const raidCount = parseInt(document.getElementById('raidCount').value) || 1;
        const raidEntriesContainer = document.getElementById('raidEntries');
    
        // Clear existing raid entries
        raidEntriesContainer.innerHTML = '';
    
        // Dynamically create raid input fields
        for (let i = 0; i < raidCount; i++) {
            const raidEntry = document.createElement('div');
            raidEntry.classList.add('form-group');
    
            // Raider name input
            const raiderNameLabel = document.createElement('label');
            raiderNameLabel.textContent = `Raider ${i + 1} Name:`;
            raidEntry.appendChild(raiderNameLabel);
    
            const raiderNameInput = document.createElement('input');
            raiderNameInput.type = 'text';
            raiderNameInput.id = `raider${i}`;
            raiderNameInput.placeholder = `Raider ${i + 1}`;
            raidEntry.appendChild(raiderNameInput);
    
            // Raider count input
            const raiderCountLabel = document.createElement('label');
            raiderCountLabel.textContent = `Raider ${i + 1} Viewer Count:`;
            raidEntry.appendChild(raiderCountLabel);
    
            const raiderCountInput = document.createElement('input');
            raiderCountInput.type = 'number';
            raiderCountInput.id = `raiderCount${i}`;
            raiderCountInput.min = 1;
            raiderCountInput.placeholder = 'Viewer Count';
            raidEntry.appendChild(raiderCountInput);
    
            // Append the raid entry to the container
            raidEntriesContainer.appendChild(raidEntry);
        }
    }
    
    // Background style options
    const backgroundStyleSelect = document.getElementById('backgroundStyle');
    const gradientOptions = document.getElementById('gradientOptions');
    const solidColorOptions = document.getElementById('solidColorOptions');
    const backgroundImageOptions = document.getElementById('backgroundImageOptions');
    
    backgroundStyleSelect.addEventListener('change', function() {
        gradientOptions.style.display = 'none';
        solidColorOptions.style.display = 'none';
        backgroundImageOptions.style.display = 'none';
        
        if (this.value === 'gradient') {
            gradientOptions.style.display = 'block';
        } else if (this.value === 'solid') {
            solidColorOptions.style.display = 'block';
        } else if (this.value === 'image') {
            backgroundImageOptions.style.display = 'block';
        }
    });
    
    // Color preview updates
    document.getElementById('gradientTopColor').addEventListener('input', function() {
        document.getElementById('topColorPreview').style.backgroundColor = this.value;
    });
    
    document.getElementById('gradientBottomColor').addEventListener('input', function() {
        document.getElementById('bottomColorPreview').style.backgroundColor = this.value;
    });
    
    document.getElementById('backgroundColor').addEventListener('input', function() {
        document.getElementById('bgColorPreview').style.backgroundColor = this.value;
    });
    
    document.getElementById('overlayColor').addEventListener('input', function() {
        document.getElementById('overlayColorPreview').style.backgroundColor = this.value;
    });
    
    document.getElementById('textColor').addEventListener('input', function() {
        document.getElementById('textColorPreview').style.backgroundColor = this.value;
    });
    
    document.getElementById('accentColor').addEventListener('input', function() {
        document.getElementById('accentColorPreview').style.backgroundColor = this.value;
    });
    
    // Initialize color previews
    document.getElementById('topColorPreview').style.backgroundColor = document.getElementById('gradientTopColor').value;
    document.getElementById('bottomColorPreview').style.backgroundColor = document.getElementById('gradientBottomColor').value;
    document.getElementById('bgColorPreview').style.backgroundColor = document.getElementById('backgroundColor').value;
    document.getElementById('overlayColorPreview').style.backgroundColor = document.getElementById('overlayColor').value;
    document.getElementById('textColorPreview').style.backgroundColor = document.getElementById('textColor').value;
    document.getElementById('accentColorPreview').style.backgroundColor = document.getElementById('accentColor').value;
    
    // Profile picture options
    const includeProfilePic = document.getElementById('includeProfilePic');
    const profilePicOptions = document.getElementById('profilePicOptions');
    const profilePicture = document.getElementById('profilePicture');
    const profilePreview = document.getElementById('profilePreview');
    const clearProfileBtn = document.getElementById('clearProfileBtn');
    
    includeProfilePic.addEventListener('change', function() {
        profilePicOptions.style.display = this.checked ? 'block' : 'none';
        
        // Load profile from localStorage if available
        if (this.checked && localStorage.getItem('profilePicture')) {
            profilePreview.src = localStorage.getItem('profilePicture');
            profilePreview.style.display = 'block';
        }
    });
    
    // Handle profile picture upload
    profilePicture.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                profilePreview.src = event.target.result;
                profilePreview.style.display = 'block';
                
                // Save to localStorage
                localStorage.setItem('profilePicture', event.target.result);
            };
            
            reader.readAsDataURL(e.target.files[0]);
        }
    });
    
    // Clear profile picture
    clearProfileBtn.addEventListener('click', function() {
        profilePreview.src = '';
        profilePreview.style.display = 'none';
        profilePicture.value = '';
        localStorage.removeItem('profilePicture');
    });
    
    // Background image handling
    const backgroundImage = document.getElementById('backgroundImage');
    let backgroundImageData = null;
    
    backgroundImage.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                backgroundImageData = event.target.result;
            };
            
            reader.readAsDataURL(e.target.files[0]);
        }
    });
    
    // Set default date and time
    const now = new Date();
    now.setHours(now.getHours() + 1);
    
    document.getElementById('streamDate').valueAsDate = now;
    document.getElementById('streamTime').value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    // Toggle schedule options visibility
    document.getElementById('scheduleStream').addEventListener('change', function() {
        document.getElementById('scheduleOptions').style.display = this.checked ? 'block' : 'none';
    });
    
// Toggle between story types
storyTypeSelect.addEventListener('change', function() {
    const selectedStoryType = this.value;

    // Debugging: Log the selected story type
    console.log('Selected story type:', selectedStoryType);

    // Clear the canvas before redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (selectedStoryType === 'upcoming') {
        // Show "Upcoming Stream" options and hide "Raid Thanker" options
        upcomingStreamOptions.style.display = 'block';
        raidThankerOptions.style.display = 'none';

        // Update the preview with default "Upcoming Stream" values
        generateTwitchStory(ctx, {
            channelName: 'Your Channel',
            gameTitle: 'Awesome Stream',
            streamTitle: 'Come hang out with me!',
            matureContent: false,
            scheduleStream: true,
            includeQRCode: true,
            storyType: 'upcoming',
            styleOptions: {
                backgroundStyle: backgroundStyleSelect.value,
                gradientTopColor: document.getElementById('gradientTopColor').value,
                gradientBottomColor: document.getElementById('gradientBottomColor').value,
                backgroundColor: document.getElementById('backgroundColor').value,
                backgroundImage: backgroundImageData,
                backgroundOpacity: parseFloat(document.getElementById('backgroundOpacity').value),
                overlayColor: document.getElementById('overlayColor').value,
                fontStyle: document.getElementById('fontStyle').value,
                textColor: document.getElementById('textColor').value,
                accentColor: document.getElementById('accentColor').value
            },
            profileOptions: {
                includeProfilePic: document.getElementById('includeProfilePic').checked,
                profilePicture: document.getElementById('profilePreview').src,
                profileSize: parseInt(document.getElementById('profileSize').value)
            }
        });
    } else if (selectedStoryType === 'raid') {
        // Show "Raid Thanker" options and hide "Upcoming Stream" options
        upcomingStreamOptions.style.display = 'none';
        raidThankerOptions.style.display = 'block';
    
        // Clear the canvas before redrawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // Update the preview with default "Raid Thanker" values
        generateTwitchStory(ctx, {
            channelName: 'Your Channel',
            includeQRCode: true,
            storyType: 'raid',
            raids: [
                { raiderName: 'Raider1', raiderCount: 10 },
                { raiderName: 'Raider2', raiderCount: 15 }
            ],
            styleOptions: {
                backgroundStyle: backgroundStyleSelect.value,
                gradientTopColor: document.getElementById('gradientTopColor').value,
                gradientBottomColor: document.getElementById('gradientBottomColor').value,
                backgroundColor: document.getElementById('backgroundColor').value,
                backgroundImage: backgroundImageData,
                backgroundOpacity: parseFloat(document.getElementById('backgroundOpacity').value),
                overlayColor: document.getElementById('overlayColor').value,
                fontStyle: document.getElementById('fontStyle').value,
                textColor: document.getElementById('textColor').value,
                accentColor: document.getElementById('accentColor').value
            },
            profileOptions: {
                includeProfilePic: document.getElementById('includeProfilePic').checked,
                profilePicture: document.getElementById('profilePreview').src,
                profileSize: parseInt(document.getElementById('profileSize').value)
            }
        });
    
        // Update the raid entries dynamically
        updateRaidEntries();
    }

}); // Closing brace for storyTypeSelect event listener

// Generate the story image
generateBtn.addEventListener('click', function() {
    const channelName = document.getElementById('channelName').value.trim() || 'Your Channel';
    const storyType = storyTypeSelect.value;
    const includeQRCode = document.getElementById('includeQRCode').checked;

    // Get style options
    const styleOptions = {
        backgroundStyle: backgroundStyleSelect.value,
        gradientTopColor: document.getElementById('gradientTopColor').value,
        gradientBottomColor: document.getElementById('gradientBottomColor').value,
        backgroundColor: document.getElementById('backgroundColor').value,
        backgroundImage: backgroundImageData,
        backgroundOpacity: parseFloat(document.getElementById('backgroundOpacity').value),
        overlayColor: document.getElementById('overlayColor').value,
        fontStyle: document.getElementById('fontStyle').value,
        textColor: document.getElementById('textColor').value,
        accentColor: document.getElementById('accentColor').value
    };

    // Get profile options
    const profileOptions = {
        includeProfilePic: document.getElementById('includeProfilePic').checked,
        profilePicture: document.getElementById('profilePreview').src,
        profileSize: parseInt(document.getElementById('profileSize').value)
    };

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (storyType === 'upcoming') {
        const gameTitle = document.getElementById('gameTitle').value.trim() || 'Awesome Stream';
        const streamTitle = document.getElementById('streamTitle').value.trim() || 'Come hang out with me!';
        const matureContent = document.getElementById('matureContent').checked;
        const scheduleStream = document.getElementById('scheduleStream').checked;

        // Generate the upcoming stream story
        generateTwitchStory(ctx, {
            channelName,
            gameTitle,
            streamTitle,
            matureContent,
            scheduleStream,
            includeQRCode,
            storyType,
            styleOptions,
            profileOptions
        });
    } else if (storyType === 'raid') {
        // Collect raid data
        const raidCount = parseInt(raidCountInput.value) || 1;
        const raids = [];

        for (let i = 0; i < raidCount; i++) {
            const raiderName = document.getElementById(`raider${i}`)?.value.trim() || `Raider${i + 1}`;
            const raiderCount = parseInt(document.getElementById(`raiderCount${i}`)?.value) || 10;
            raids.push({ raiderName, raiderCount });
        }

        // Generate the raid thanker story
        generateTwitchStory(ctx, {
            channelName,
            includeQRCode,
            storyType,
            raids,
            styleOptions,
            profileOptions
        });
    }

    // Enable download button
    downloadBtn.disabled = false;
});
    
    // Download the generated image
    downloadBtn.addEventListener('click', function() {
        if (this.disabled) return;
        
        const link = document.createElement('a');
        link.download = 'twitch-story.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
    
 // Generate a default story on page load
 generateTwitchStory(ctx, {
    channelName: 'Your Channel',
    gameTitle: 'Awesome Stream',
    streamTitle: 'Come hang out with me!',
    matureContent: false,
    scheduleStream: true,
    includeQRCode: true,
    storyType: 'upcoming',
    styleOptions: {
        backgroundStyle: 'gradient',
        gradientTopColor: '#6441a5',
        gradientBottomColor: '#392e5c',
        fontStyle: 'Arial, sans-serif',
        textColor: '#ffffff',
        accentColor: '#ff8c00'
    },
    profileOptions: {
        includeProfilePic: false
    }
});

// Initialize first raid entry
updateRaidEntries();

// Check if we have a saved profile picture
if (localStorage.getItem('profilePicture')) {
    profilePreview.src = localStorage.getItem('profilePicture');
}
});

// Function to generate the Twitch story
function generateTwitchStory(ctx, options) {
const {
channelName,
includeQRCode,
storyType,
styleOptions,
profileOptions
} = options;

const canvas = ctx.canvas;
const width = canvas.width;
const height = canvas.height;

// Draw background based on style
drawBackground(ctx, styleOptions, width, height);

// Set font style
const fontFamily = styleOptions.fontStyle || 'Arial, sans-serif';
const textColor = styleOptions.textColor || '#ffffff';
const accentColor = styleOptions.accentColor || '#ff8c00';

// Calculate proportional spacing
const headerHeight = height * 0.08; // 8% of canvas height
const footerHeight = includeQRCode ? height * 0.22 : height * 0.08; // Reduced from 0.28 to 0.22
const contentHeight = height - headerHeight - footerHeight;

// Start with proportional spacing from top
let currentY = headerHeight;

// Replace it with this (which essentially does nothing, just keeps the spacing consistent):
// Skip Twitch branding to save space
const headerFontSize = Math.max(20, Math.floor(height * 0.035));
// No text rendering here
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
    ctx.arc(profileX + profileSize / 2, profileY + profileSize / 2, profileSize / 2, 0, Math.PI * 2, true);
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

// Set text alignment to center for all subsequent text
ctx.textAlign = 'center';
ctx.fillStyle = textColor;

// Calculate remaining space for content
const contentStartY = currentY;
const contentEndY = height - footerHeight;
const availableContentHeight = contentEndY - contentStartY;
// Detect if profile is being used to adjust spacing throughout
const profileUsed = profileOptions.includeProfilePic && profileOptions.profilePicture;
// Adjust section spacing based on whether profile is used
const sectionSpacingFactor = profileUsed ? 0.08 : 0.15; // Smaller spacing when profile is used
const sectionSpacing = availableContentHeight * sectionSpacingFactor;

if (storyType === 'upcoming') {
const {
gameTitle,
streamTitle,
matureContent,
scheduleStream
} = options;


// Add mature content warning if needed
if (matureContent) {
const warningFontSize = Math.max(16, Math.floor(height * 0.025));

// Calculate banner dimensions
const bannerHeight = warningFontSize * 1.6;
const bannerY = currentY - warningFontSize * 0.8;

// Draw full-width banner
ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
ctx.fillRect(0, bannerY, width, bannerHeight);

// Calculate the vertical center of the banner for text placement
const textY = bannerY + (bannerHeight / 2) + (warningFontSize * 0.35); // The 0.35 factor helps center text vertically

// Draw text
ctx.fillStyle = '#ff4040';
ctx.font = `bold ${warningFontSize}px ${fontFamily}`;
ctx.textAlign = 'center';
ctx.fillText('🔞 MATURE/ADULT CONTENT', width / 2, textY);

// Update currentY to be after the banner
currentY = bannerY + bannerHeight + (warningFontSize * 0.3); // Small additional spacing
}



// Add "UPCOMING STREAM" text with proportional spacing
const sectionSpacing = availableContentHeight * 0.1; // Increased from 0.1 to 0.15
currentY += sectionSpacing * 0.5;
const upcomingFontSize = Math.max(20, Math.floor(height * 0.03));
ctx.fillStyle = textColor;
ctx.font = `bold ${upcomingFontSize}px ${fontFamily}`;
ctx.fillText('UPCOMING STREAM', width / 2, currentY);

// Add game title with increased spacing - THIS PART WAS MISSING
currentY += sectionSpacing; // Increased spacing here too
const gameFontSize = Math.max(28, Math.floor(height * 0.045));
ctx.font = `bold ${gameFontSize}px ${fontFamily}`;

// Handle long game titles
const maxGameWidth = width * 0.85;
if (ctx.measureText(gameTitle).width > maxGameWidth) {
let truncatedTitle = gameTitle;
while (ctx.measureText(truncatedTitle + '...').width > maxGameWidth && truncatedTitle.length > 0) {
truncatedTitle = truncatedTitle.slice(0, -1);
}
ctx.fillText(truncatedTitle + '...', width / 2, currentY);
} else {
ctx.fillText(gameTitle, width / 2, currentY);
}

// Add stream title with increased spacing
currentY += sectionSpacing; // Increased spacing here too
const titleFontSize = Math.max(20, Math.floor(height * 0.035));
ctx.font = `${titleFontSize}px ${fontFamily}`;
const maxWidth = width * 0.85;
const lineHeight = titleFontSize * 1.2;

// Calculate max lines needed for a 140-character title
const avgCharWidth = ctx.measureText('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789').width / 62;
const charsPerLine = Math.floor(maxWidth / avgCharWidth);
const maxPossibleLines = Math.ceil(140 / charsPerLine) + 1; // Add 1 for safety

// Calculate space needed for schedule
const scheduleSpaceNeeded = scheduleStream ? (titleFontSize * 3) : 0;

// Ensure we have enough space between title and schedule
const maxTitleY = contentEndY - scheduleSpaceNeeded;

// Debug - make sure streamTitle is not empty
console.log("Stream title:", streamTitle);
const titleToUse = streamTitle || "Come hang out with me!";

// Check if the title fits within maxWidth
if (ctx.measureText(titleToUse).width <= maxWidth) {
    // Center-align if the title fits
    ctx.textAlign = 'center';
    ctx.fillText(titleToUse, width / 2, currentY);
    currentY += lineHeight; // Move to the next line
} else {
    // Use left alignment and wrap text if the title is too long
    ctx.textAlign = 'left';
    const leftMargin = (width - maxWidth) / 2;
    currentY = wrapTextLeft(ctx, titleToUse, leftMargin, currentY, maxWidth, lineHeight, maxTitleY);
}

// Reset to center alignment for the rest of the text
ctx.textAlign = 'center';





// Add scheduled date and time if enabled
if (scheduleStream) {
    const dateInput = document.getElementById('streamDate').value;
    const timeInput = document.getElementById('streamTime').value;
    const timeZone = document.getElementById('timeZone').value;
    
    if (dateInput && timeInput) {
        // Format the date nicely
        const dateObj = new Date(dateInput + 'T' + timeInput);
        const options = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        };
        
        let formattedDate = dateObj.toLocaleDateString('en-US', options);
        
        // Add time zone if not local
        if (timeZone !== 'local') {
            formattedDate += ` ${timeZone}`;
        }
        
        // Draw date/time
        const dateFontSize = Math.max(18, Math.floor(height * 0.03));
        const dateY = contentEndY - dateFontSize * 2;
        
        ctx.fillStyle = textColor;
        ctx.font = `bold ${dateFontSize}px ${fontFamily}`;
        ctx.textAlign = 'center';
        ctx.fillText('GOING LIVE', width / 2, dateY);
        
        ctx.font = `${dateFontSize * 0.9}px ${fontFamily}`;
        ctx.fillText(formattedDate, width / 2, dateY + dateFontSize * 1.3);
    }
}

// Add "Set a reminder" text at bottom of content area
const reminderFontSize = Math.max(20, Math.floor(height * 0.035));
ctx.fillStyle = accentColor;
ctx.font = `bold ${reminderFontSize}px ${fontFamily}`;
ctx.textAlign = 'center';
ctx.fillText('Set a reminder!', width / 2, height - footerHeight + reminderFontSize);
} else if (storyType === 'raid') {
// Handle raid thanker story
const { raids } = options;

// Add "RAID THANKER" text
const titleFontSize = Math.max(28, Math.floor(height * 0.045));
ctx.fillStyle = textColor;
ctx.font = `bold ${titleFontSize}px ${fontFamily}`;
ctx.textAlign = 'center';
ctx.fillText('RAID THANKER', width / 2, currentY);

// Add thank you message
currentY += titleFontSize * 1.5;
const thanksFontSize = Math.max(20, Math.floor(height * 0.035));
ctx.font = `bold ${thanksFontSize}px ${fontFamily}`;

// Check if text fits within width
const thanksText = 'THANK YOU FOR THE RAIDS!';
const thanksWidth = ctx.measureText(thanksText).width;
if (thanksWidth > width * 0.9) {
    const scaledFontSize = Math.floor((width * 0.9 / thanksWidth) * thanksFontSize);
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
const itemHeight = Math.min(raiderFontSize * 2.5, availableHeight / raids.length);

raids.forEach((raid, index) => {
    const y = currentY + (index * itemHeight);
    
    // Skip if we're out of space
    if (y > maxY) return;
    
    // Draw raider name and count
    ctx.fillStyle = accentColor;
    ctx.font = `bold ${raiderFontSize}px ${fontFamily}`;
    
    // Check if raider name fits
    const raiderNameWidth = ctx.measureText(raid.raiderName).width;
    if (raiderNameWidth > width * 0.8) {
        let truncatedName = raid.raiderName;
        while (ctx.measureText(truncatedName + '...').width > width * 0.8 && truncatedName.length > 0) {
            truncatedName = truncatedName.slice(0, -1);
        }
        ctx.fillText(truncatedName + '...', width / 2, y);
    } else {
        ctx.fillText(raid.raiderName, width / 2, y);
    }
    
    ctx.fillStyle = textColor;
    ctx.font = `${raiderFontSize * 0.9}px ${fontFamily}`;
    ctx.fillText(`with ${raid.raiderCount} viewers`, width / 2, y + raiderFontSize * 1.2);
});

// Add "Thank you for supporting the channel!" text at bottom of content area
const thankY = contentEndY - raiderFontSize;
ctx.fillStyle = textColor;
ctx.font = `bold ${raiderFontSize}px ${fontFamily}`;
ctx.textAlign = 'center';

const supportText = 'Thank you for supporting the channel!';
const supportWidth = ctx.measureText(supportText).width;
if (supportWidth > width * 0.9) {
    const scaledFontSize = Math.floor((width * 0.9 / supportWidth) * raiderFontSize);
    ctx.font = `bold ${scaledFontSize}px ${fontFamily}`;
}

ctx.fillText(supportText, width / 2, thankY);
}

// Add QR code if enabled
if (includeQRCode) {
try {
    // Generate QR code for Twitch channel URL
    const qr = qrcode(0, 'L');
    qr.addData(`https://twitch.tv/${channelName}`);
    qr.make();
    
    // Calculate QR code size and position (centered at bottom)
    const qrSize = Math.min(width / 4, height * 0.12); // Reduced from 0.15 to 0.12
    const qrX = (width - qrSize) / 2;
    const qrY = height - qrSize - (height * 0.05); // Reduced spacing above QR code

    
    // Create a temporary canvas for the QR code
    const qrCanvas = document.createElement('canvas');
    qrCanvas.width = qrSize;
    qrCanvas.height = qrSize;
    const qrCtx = qrCanvas.getContext('2d');
    
    // Draw white background for QR code
    qrCtx.fillStyle = 'white';
    qrCtx.fillRect(0, 0, qrSize, qrSize);
    
    // Draw QR code cells
    const cellSize = qrSize / qr.getModuleCount();
    qrCtx.fillStyle = 'black';
    
    for (let row = 0; row < qr.getModuleCount(); row++) {
        for (let col = 0; col < qr.getModuleCount(); col++) {
            if (qr.isDark(row, col)) {
                qrCtx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            }
        }
    }
    
    // Draw QR code on main canvas
    ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);
    
    // Add "Scan to visit channel" text
    const scanFontSize = Math.max(12, Math.floor(height * 0.02)); // Reduced font size
    ctx.fillStyle = textColor;
    ctx.font = `${scanFontSize}px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.fillText('Scan to visit channel', width / 2, qrY + qrSize + scanFontSize);
} catch (e) {
    console.error('Error generating QR code:', e);
}
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
        overlayColor
    } = styleOptions;
    
    if (backgroundStyle === 'gradient') {
        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, gradientTopColor || '#6441a5');
        gradient.addColorStop(1, gradientBottomColor || '#392e5c');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
    } 
    else if (backgroundStyle === 'solid') {
        // Solid background
        ctx.fillStyle = backgroundColor || '#6441a5';
        ctx.fillRect(0, 0, width, height);
    } 
    else if (backgroundStyle === 'image' && backgroundImage) {
        // Background image with overlay
        const img = new Image();
        img.src = backgroundImage;
        
        if (img.complete) {
            drawBackgroundImage(ctx, img, width, height, overlayColor, backgroundOpacity);
        } else {
            img.onload = function() {
                drawBackgroundImage(ctx, img, width, height, overlayColor, backgroundOpacity);
            };
            
            // Fallback in case image doesn't load
            ctx.fillStyle = '#6441a5';
            ctx.fillRect(0, 0, width, height);
        }
    } 
    else {
        // Default background if no valid style or image
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#6441a5');
        gradient.addColorStop(1, '#392e5c');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
    }
}

// Helper function to draw background image with overlay
function drawBackgroundImage(ctx, img, width, height, overlayColor, opacity) {
    // Draw the image covering the entire canvas
    ctx.drawImage(img, 0, 0, width, height);
    
    // Apply semi-transparent overlay
    ctx.fillStyle = overlayColor || 'rgba(100, 65, 165, 0.7)';
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

const words = text.split(' ');
let line = '';
let currentY = y;

// If we can't fit even one line
if (currentY + lineHeight > maxY) return y;

for (let i = 0; i < words.length; i++) {
const testLine = line + (line ? ' ' : '') + words[i];
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
            while (ctx.measureText(line + '...').width > maxWidth && line.length > 0) {
                line = line.slice(0, -1);
            }
            ctx.fillText(line + '...', x, currentY);
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
function wrapTextCenteredWithMaxLines(ctx, text, x, y, maxWidth, lineHeight, maxY, maxLines) {
if (!text) return y;

const words = text.split(' ');
let line = '';
let testLine = '';
let currentY = y;
let linesDrawn = 0;

// If we can't fit even one line
if (currentY + lineHeight > maxY) return y;

for (let i = 0; i < words.length; i++) {
testLine = line + words[i] + ' ';
const metrics = ctx.measureText(testLine);
const testWidth = metrics.width;

if (testWidth > maxWidth && i > 0) {
    ctx.fillText(line, x, currentY);
    line = words[i] + ' ';
    currentY += lineHeight;
    linesDrawn++;
    
    // Check if we've reached the maximum number of lines
    if (linesDrawn >= maxLines - 1) {
        // If this is the last line and we have more words
        if (i < words.length - 1) {
            // Add ellipsis to indicate truncated text
            while (ctx.measureText(line + '...').width > maxWidth && line.length > 0) {
                line = line.slice(0, -1);
            }
            ctx.fillText(line + '...', x, currentY);
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
if (line.trim() !== '') {
ctx.fillText(line, x, currentY);
currentY += lineHeight;
}

return currentY; // Return the new Y position
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ Light Mode';
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙 Dark Mode';
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️ Light Mode';
        }
    });
}
// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ Light Mode';
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙 Dark Mode';
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️ Light Mode';
        }
    });
}

// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
});