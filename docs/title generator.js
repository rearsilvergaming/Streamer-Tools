// Ensure this is in the global scope
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Add the content
document
  .getElementById("contentWarningsCheckbox")
  .addEventListener("change", function () {
    document.getElementById("contentWarningsSection").style.display = this
      .checked
      ? "block"
      : "none";
  });

document
  .getElementById("customWarningCheckbox")
  .addEventListener("change", function () {
    document.getElementById("customWarningSection").style.display = this.checked
      ? "block"
      : "none";
  });

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

// Tab navigation
document.addEventListener("DOMContentLoaded", function () {
  // Ensure the toggle functionality is initialized
  document
    .getElementById("customTitleCheckbox")
    .addEventListener("change", function () {
      document.getElementById("customTitleSection").style.display = this.checked
        ? "block"
        : "none";
    });

  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  // Ensure the default tab is styled as active on page load
  const defaultTab = document.querySelector(".tab.active");
  const defaultContent = document.querySelector(".tab-content.active");
  if (defaultTab && defaultContent) {
    defaultTab.classList.add("active");
    defaultContent.classList.add("active");
  }

  // Add click event listeners to tabs
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs and contents
      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      // Add active class to the clicked tab and its corresponding content
      this.classList.add("active");
      const tabId = this.getAttribute("id");
      const content = document.getElementById(`${tabId}-content`);
      if (content) {
        content.classList.add("active");
      }
    });
  });
});

// Tab navigation
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    // Remove active class from all tabs and contents
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("active"));
    document
      .querySelectorAll(".tab-content")
      .forEach((c) => c.classList.remove("active"));

    // Add active class to clicked tab
    this.classList.add("active");

    // Show corresponding content
    const tabId = this.getAttribute("data-tab");
    document.getElementById(`${tabId}-tab`).classList.add("active");
  });
});

// Define emoji sets
const emojiSets = {
  theme: {
    witty: ["😂", "🤣", "😏", "😎", "🤪", "😜", "🤓", "🧠"],
    cheeky: ["😉", "😜", "😏", "🤭", "😈", "🙊", "😝", "🤪"],
    sussy: ["💀", "👀", "🤨", "😳", "🧐", "🤔", "😒", "🙄"],
    energetic: ["⚡", "🔥", "💯", "🚀", "💪", "✨", "🎯", "🏆"],
    chilled: ["☕", "🧘", "🌿", "🍃", "🌱", "🌈", "🌞", "🌙"],
    focused: ["🎯", "👁️", "🧠", "💡", "🔍", "📊", "📈", "🧩"],
    community: ["🫂", "👋", "🤝", "💬", "🎮", "🎲", "🎭", "🎨"],
    chaotic: ["💥", "🌪️", "🔥", "⚡", "🎭", "🃏", "🎪", "🎢"],
    story: ["📖", "🔮", "🧙", "🏰", "🌌", "🧩", "🎬", "📚"],
    competitive: ["🏆", "🥇", "🎯", "⚔️", "🛡️", "🏅", "🎮", "🔝"],
    spooky: ["🎃", "👻", "🕸️", "🕷️", "🧟", "🧛", "💀", "☠️"],
    romantic: ["💖", "💘", "💞", "😘", "😍", "🥰", "🌹", "💌"],
    futuristic: ["🤖", "🛸", "🚀", "🔋", "🧬", "💾", "📡", "🧠"],
    magical: ["🧙", "🧝", "🪄", "🔮", "✨", "🌙", "📖", "🐉"],
    comfy: ["🛋️", "🧦", "🫖", "🧸", "🛏️", "🪵", "🍪", "🌧️"],
  },

  gaming: [
    "🎮",
    "🎯",
    "🎲",
    "🎪",
    "🎭",
    "🎨",
    "🎧",
    "🎬",
    "🏆",
    "🥇",
    "🥈",
    "🥉",
    "⚔️",
    "🛡️",
    "🧙",
    "🧝",
    "🧟",
    "👾",
    "👻",
    "🤖",
    "🦸",
    "🦹",
    "🔫",
    "💣",
    "🗡️",
    "🎮",
    "📦",
    "🪙",
  ],

  mood: [
    "😊",
    "😂",
    "🤣",
    "😍",
    "🥰",
    "😎",
    "🤩",
    "😴",
    "😭",
    "😱",
    "😡",
    "🥺",
    "😇",
    "🙃",
    "😌",
    "😔",
    "😤",
    "😳",
    "🥴",
    "🤔",
    "🤗",
    "🤫",
    "🤭",
    "🤯",
  ],

  vibes: [
    "🌅",
    "🌠",
    "🌌",
    "🛸",
    "🧘",
    "🎶",
    "📸",
    "🎈",
    "🧃",
    "🍕",
    "🍿",
    "🎨",
    "🧩",
    "🪄",
    "🧸",
    "🌧️",
  ],

  halloween: [
    "🎃",
    "👻",
    "🕸️",
    "🕷️",
    "🧛",
    "🧟",
    "💀",
    "☠️",
    "🕯️",
    "🧙",
    "🪦",
    "🍬",
    "🍭",
    "🍫",
    "🧪",
    "🦇",
  ],

  christmas: [
    "🎄",
    "🎅",
    "🤶",
    "❄️",
    "🎁",
    "🧑‍🎄",
    "🦌",
    "🍪",
    "☃️",
    "🧦",
    "🌟",
    "🕯️",
    "🔔",
    "🎶",
    "🧣",
    "⛄",
  ],

  nsfw: [
    "🍑",
    "🍆",
    "💋",
    "👅",
    "🖤",
    "🔥",
    "🥵",
    "🍌",
    "💋",
    "😈",
    "🥂",
    "🍾",
    "💀",
    "🌶️",
    "🍒",
    "🥒",
  ],
};

const predefinedGamesSupport = [
  {
    title: "Baldur's Gate 3",
    support: [
      "Have an epic adventure in Baldur's Gate 3!",
      "May your rolls be high in Baldur's Gate 3!",
      "Good luck exploring the Forgotten Realms in Baldur's Gate 3!",
    ],
  },
  {
    title: "The Witcher 3",
    support: [
      "Good luck on the monster hunt in The Witcher 3!",
      "Hope you have a legendary journey in The Witcher 3!",
      "Slay those beasts in The Witcher 3, you got this!",
    ],
  },
  {
    title: "Minecraft",
    support: [
      "Have fun crafting your world in Minecraft!",
      "Good luck with your builds in Minecraft!",
      "Hope you discover amazing things in your Minecraft adventure!",
    ],
  },
  {
    title: "VRChat",
    support: [
      "Have a blast hanging out in VRChat!",
      "Good luck with the virtual shenanigans in VRChat!",
      "Enjoy connecting with everyone in VRChat!",
    ],
  },
  {
    title: "Destiny 2",
    support: [
      "Good luck, Guardian, in your Destiny 2 adventures!",
      "Hope you get some great loot in Destiny 2!",
      "Eyes up, Guardian! You got this in Destiny 2!",
    ],
  },
  {
    title: "Stardew Valley",
    support: [
      "Have a relaxing time on your Stardew Valley farm!",
      "Good luck with your crops and critters in Stardew Valley!",
      "Hope you build a wonderful life in Stardew Valley!",
    ],
  },
  {
    title: "League of Legends",
    support: [
      "Good luck on the Rift!",
      "Hope you climb the ranks in League of Legends!",
      "Crush your opponents, you got this!",
    ],
  },
  {
    title: "Apex Legends",
    support: [
      "Good luck becoming the champion in Apex Legends!",
      "Hope your drops are good in Apex Legends!",
      "Squad up and dominate!",
    ],
  },
  {
    title: "Final Fantasy XIV",
    support: [
      "Have a fantastic adventure in Eorzea!",
      "Good luck with your quests in Final Fantasy XIV!",
      "Hope you have a wonderful time in Final Fantasy XIV!",
    ],
  },
  {
    title: "Cyberpunk 2077",
    support: [
      "Good luck navigating Night City!",
      "Hope you become a legend in Cyberpunk 2077!",
      "Enjoy the neon-soaked world of Cyberpunk 2077!",
    ],
  },
];

const hashtagSupportMessages = {
  "#FirstPlaythrough": [
    "Good luck on your first playthrough!",
    "Hope you enjoy experiencing this for the first time!",
    "Have fun discovering everything!",
  ],
  "#NoBackseating": [
    "Hope you have a smooth, uninterrupted playthrough!",
    "Enjoy figuring things out on your own!",
    "May your decisions be the right ones!",
  ],
  "#TwitchDrops": [
    "Hope your viewers grab some awesome drops!",
    "Good luck with the drops today!",
    "May the loot be plentiful!",
  ],
  "#NoSpoilers": [
    "Hope everyone respects the spoiler-free zone!",
    "Enjoy the story without any hints!",
    "May everyone experience the surprises together!",
  ],
  "#CosyVibes": [
    "Hope you have a lovely and relaxed stream!",
    "Enjoy the cosy atmosphere!",
    "May your viewers feel right at home!",
  ],
  "#ViewerInteractions": [
    "Hope you have some great interactions with your viewers!",
    "Enjoy connecting with your community!",
    "May the chat be lively and fun!",
  ],
  "#LiveNow": [
    "Good luck with your live stream!",
    "Hope you have a great broadcast!",
    "Wishing you a successful stream!",
  ],
  "#Gaming": [
    "Have fun gaming!",
    "Hope you have an enjoyable session!",
    "May your skills shine!",
  ],
  "#18Plus": [
    "Hope your mature content stream goes well!",
    "Enjoy your adult-oriented stream!",
    "Have a great 18+ stream!",
  ],
  "#AdultContent": [
    "Hope your adult content is well-received!",
    "Enjoy discussing mature topics!",
    "Have a great mature stream!",
  ],
  "#MatureStream": [
    "Hope your mature audience enjoys the stream!",
    "Have a successful adult-oriented broadcast!",
    "Enjoy your mature content stream!",
  ],
  "#NSFW": [
    "Hope your NSFW content goes over well!",
    "Enjoy your explicit content stream!",
    "Have a great adult-oriented broadcast!",
  ],
  "#AdultsOnly": [
    "Hope your adults-only stream is successful!",
    "Enjoy your mature audience stream!",
    "Have a great 18+ broadcast!",
  ],
  "#MatureAudience": [
    "Hope your mature audience enjoys the content!",
    "Have a successful adult-oriented stream!",
    "Enjoy your mature broadcast!",
  ],

  // Add more hashtag-specific support messages as needed
};

const generalSupportMessages = [
  "You got this!",
  "Have a fantastic stream!",
  "Good luck!",
  "Break a leg!",
  "Hope you have a great time!",
  "Enjoy the stream!",
  "Wishing you all the best!",
  "Let's go!",
  "You're gonna crush it!",
  "Have an awesome stream, chat!", // Added a community-focused one
  "Time to shine!",
  "Go get 'em!",
  "Believe in the hype!",
  "Make some memories today!",
  "Have fun and be yourself!",
  "Sending good vibes!",
  "You've got this in the bag!",
  "Knock 'em dead!", // Use cautiously based on your tone!
  "Let the good times roll!",
  "Here's to a great stream!",
  "Hope you reach your goals today!",
  "May your frames be high!",
  "May your ping be low!",
  "Let the adventure begin!",
  "Time to make some magic!",
  "You're a star!",
  "Shine bright!",
  "Have a wonderful stream, everyone!",
  "Let's have some fun!",
  "You're doing great!",
  "Keep up the amazing work!",
  "We're all here to support you!",
  "Enjoy every moment!",
  "Make it a stream to remember!",
  "You've got the energy!",
  "Let the good times flow!",
  "Here's to a successful stream!",
  "May your chat be engaging!",
  "Hope you hit all your targets!",
  "Time to rock and roll!",
  "You're a natural!",
  "Let your personality shine!",
  "Have a truly excellent stream!",
  "We're all cheering for you!",
  "Go out there and be awesome!",
  "Hope you connect with lots of viewers!",
  "May your stream be filled with joy!",
  "Here's to a positive and fun stream!",
  "You're going to do great things!",
  "Believe in yourself!",
  "Have a truly spectacular stream!",
  "We're excited to watch!",
  "Go forth and conquer!",
  "Hope you have a memorable stream!",
  "May your stream be filled with laughter!",
  "Here's to a fantastic broadcast!",
  "You're a streaming superstar!",
  "Let your passion guide you!",
  "Have a truly exceptional stream!",
  "We're all here with you!",
  "Go out there and shine!",
  "Hope you have a truly remarkable stream!",
  "May your stream be filled with positivity!",
  "Here's to a truly outstanding stream!",
  "You're an amazing streamer!",
  "Let your enthusiasm be contagious!",
  "Have a truly sensational stream!",
  "We're all sending you good energy!",
  "Go make it an unforgettable stream!",
  "Hope you have a truly exceptional and amazing stream!",
  "May your stream be filled with wonderful moments!",
  "Here's to a truly spectacular and phenomenal stream!",
  "You're a truly incredible streamer!",
  "Let your unique spark shine brightly!",
  "Have a truly sensational and outstanding stream!",
  "We're all sending you the best of luck and positive vibes!",
  "Go out there and create something truly amazing and unforgettable!",
  "Hope you have a truly wonderful, exceptional, and amazing stream filled with joy, laughter, and positive interactions!",
];

const titleStarters = {
  witty: [
    "Witty banter & wild adventures in",
    "Let's get clever with some",
    "Prepare for sharp humor & gameplay in",
    "Snarky commentary & solid plays in",
    "Brainy moves & amusing moments in",
    "Slinging smart remarks & spells in",
    "Sharp tongues & even sharper skills in",
    "Prepare for puns & power-ups in",
    "Intellectual escapades in",
    "Humorous highlights in",
    "Quick wit & quicker reflexes in",
    "Amusing antics & awesome plays in",
    "Clever commentary & captivating gameplay in",
    "Jesting journeys in",
    "Playful pronouncements in",
    "Snappy sayings & stunning victories in",
    "Intelligent interactions in",
    "Hilarious happenings in",
    "Comical clashes in",
    "Waggish wonders in",
    "Sharp-witted showdowns in",
    "Amusing undertakings in",
    "Clever capers in",
    "Jocular jaunts in",
    "Playful pursuits in",
    "Snappy strategies in",
    "Intelligent insights in",
    "Humorous hurdles in",
    "Comical conquests in",
    "Waggish wins in",
  ],
  cheeky: [
    "Cheeky business & bold moves in",
    "Getting playful with some",
    "Strap in for some lighthearted fun in",
    "A dash of mischief & some great gameplay in",
    "Waggish ways & winning moments in",
    "Naughty notions & noteworthy noscopes in",
    "Saucy remarks & serious raiding in",
    "A bit of silliness & a lot of skill in",
    "Impish inclinations in",
    "Playful provocations in",
    "Bold banter & brilliant plays in",
    "Mischievous moments & major victories in",
    "Saucy strategies & smooth gameplay in",
    "Impudent incursions in",
    "Playful ploys in",
    "Bold beginnings in",
    "Mischievous maneuvers in",
    "Saucy skirmishes in",
    "Impudent improvisations in",
    "Playful performances in",
    "Bold breakthroughs in",
    "Mischievous misadventures in",
    "Saucy successes in",
    "Impudent initiatives in",
    "Playful prowess in",
    "Bold brilliance in",
    "Mischievous mastery in",
    "Saucy surprises in",
    "Impudent insights in",
    "Playful power in",
  ],
  sussy: [
    "Something's a little sus in this",
    "Unraveling the mysteries (and maybe more) in",
    "Feelin' a bit sus, let's see what happens in",
    "Playing it cautiously in",
    "Trust your instincts (or don't) in",
    "Suspect shenanigans in",
    "Don't trust anyone (including me) in",
    "Things are getting a bit strange in",
    "Mysterious maneuvers in",
    "Questionable quests in",
    "Shady situations in",
    "Keep an eye on everyone in",
    "Something's not quite right in",
    "Dubious dealings in",
    "Fishy findings in",
    "Unsettling events in",
    "Be wary of everyone in",
    "Something's lurking in",
    "Ominous occurrences in",
    "Perplexing predicaments in",
    "Uncertain undertakings in",
    "Careful steps in",
    "Something's amiss in",
    "Doubtful decisions in",
    "Odd outcomes in",
    "Unreliable realities in",
    "Circumspect circumstances in",
    "Something's off in",
    "Dubious developments in",
    "Peculiar plays in",
  ],
  energetic: [
    "High energy vibes playing",
    "Let's goooo! Jumping into",
    "Get hyped for some action in",
    "Energetic gameplay & exciting moments in",
    "Pure energy engaging with",
    "Unleashing the energy in",
    "Maximum effort & major moments in",
    "Buckle up, it's gonna be wild in",
    "Adrenaline-fueled adventures in",
    "Electrifying escapades in",
    "High-octane husky hijinks in",
    "Unleashing the beast in",
    "Maximum intensity with",
    "Get ready for a rush in",
    "Dynamic domination in",
    "Power-packed plays in",
    "Vibrant ventures in",
    "Thrilling triumphs in",
    "Exhilarating encounters in",
    "Animated antics in",
    "High-powered performances in",
    "Vigorous victories in",
    "Thrilling takedowns in",
    "Exhilarating explorations in",
    "Animated adventures in",
    "High-speed happenings in",
    "Vivacious ventures in",
    "Thrilling times in",
    "Exhilarating experiences in",
    "Animated actions in",
  ],
  chilled: [
    "Chilled vibes & relaxed gaming in",
    "Come unwind with some",
    "Mellow gameplay & good company in",
    "Taking it easy with [Game Name] & chat",
    "Relaxing stream with",
    "Sippin' & slayin' in a relaxed way",
    "Calm commentary & casual gameplay in",
    "Unwinding with some peaceful",
    "Gentle gaming in",
    "Serene streaming of",
    "Easygoing entertainment with",
    "Laid-back adventures in",
    "Tranquil times playing",
    "Soothing streams of",
    "Mellow moments with",
    "Comfortable camaraderie in",
    "Leisurely levels in",
    "Peaceful plays of",
    "Serene sessions of",
    "Easy entertainment with",
    "Comfortable cruising through",
    "Leisurely loops in",
    "Peaceful progress in",
    "Serene sights in",
    "Easy escapades in",
    "Comfortable conquering of",
    "Leisurely learning of",
    "Peaceful pastimes in",
    "Serene stories of",
    "Easy exploration of",
  ],
  focused: [
    "Focused gameplay & deep dives into",
    "Concentrating on the intricacies of",
    "Serious business & strategic plays in",
    "Eyes on the objective in",
    "Dedicated gameplay of",
    "Laser focus & legendary loot in",
    "Deep dive into the details of",
    "Tactical takedowns & thoughtful plays in",
    "Mind on the mission in",
    "Intentional interactions with",
    "Sharp focus on the finer points of",
    "Deep analysis of",
    "Strategic skirmishes in",
    "Goal-oriented gaming in",
    "Deliberate decisions in",
    "Intense concentration on",
    "Deep exploration of",
    "Strategic successes in",
    "Purposeful plays of",
    "Determined dedication to",
    "Keen concentration on",
    "Deep understanding of",
    "Strategic solutions in",
    "Precise performances in",
    "Driven dedication to",
    "Sharp attention to detail in",
    "Deep investigation into",
    "Strategic thinking in",
    "Methodical movements in",
    "Disciplined dedication to",
  ],
  community: [
    "Community hangout & casual gaming in",
    "Hanging with chat & playing",
    "Let's chill & game together in",
    "Community stream of good times in",
    "Interactive fun with",
    "Pack hangout & playful pounces in",
    "Good company & chaotic combos in",
    "Chillin' with the crew in",
    "Let's get comfy & conquer with",
    "Tail wags & top plays with chat in",
    "Squad stream & shenanigans in",
    "Friendship fueled gameplay of",
    "Together we game in",
    "United in fun playing",
    "Teamwork triumphs in",
    "Group gathering for gaming in",
    "Shared adventures in",
    "Collective conquering of",
    "Partnered plays of",
    "Collaborative chaos in",
    "Crew camaraderie in",
    "Joint journeys in",
    "Combined campaigns in",
    "All together now playing",
    "United gaming front in",
    "Fellowship of frags in",
    "Shared stories in",
    "Collective creations in",
    "All hands on deck for",
    "United in victory with",
  ],
  chaotic: [
    "Chaotic fun & unexpected moments in",
    "Prepare for the beautiful chaos of",
    "Unleashing the mayhem in",
    "It's gonna get wild with",
    "Embrace the chaos playing",
    "Pure pandemonium in",
    "Unpredictable plays & hilarious fails in",
    "Where sanity goes to die: playing",
    "Unleashing my inner gremlin in",
    "Absolute anarchy in",
    "Wild and wacky times in",
    "Prepare for peak performance (and fails) in",
    "Controlled chaos (sort of) in",
    "Unforeseen events in",
    "Madness and mayhem with",
    "Unruly romps in",
    "Expect the unexpected in",
    "Turbulent times playing",
    "Unscripted silliness in",
    "Rambunctious rounds of",
    "Frenzied frolics in",
    "Brace for the bizarre in",
    "Unconventional conquests in",
    "Madcap maneuvers in",
    "Rowdy raids in",
    "Hectic happenings in",
    "Get ready for the ridiculous in",
    "Unorthodox undertakings in",
    "Manic moments in",
    "Wacky warfare in",
  ],
  story: [
    "Story-driven adventures in",
    "Unraveling the narrative of",
    "Diving into the world of",
    "Let's explore the rich story of",
    "Immersed in the tale of",
    "Unfurling the forbidden tales of",
    "Lost in the lore of",
    "Whispers of wicked wonders in",
    "Delving into the dark depths of",
    "Let's get immersed in the world of",
    "Exploring the epic saga of",
    "Discovering the secrets within",
    "Journeying through the realms of",
    "Following the fascinating plot of",
    "Engaged in the gripping story of",
    "Witnessing the unfolding events of",
    "Embarking on a narrative quest in",
    "Experiencing the captivating world of",
    "Uncovering the mysteries of the story in",
    "Following the intricate threads of",
    "Venturing into the lore-rich lands of",
    "Deciphering the ancient texts of",
    "Traversing the detailed world of",
    "Living the legend of",
    "Becoming part of the story in",
    "Unlocking the hidden histories of",
    "Interacting with the characters of",
    "Navigating the branching paths of",
    "Witnessing the dramatic climax of",
    "Experiencing the emotional depth of",
  ],
  competitive: [
    "Competitive action & rank climbing in",
    "Time to get serious with some",
    "High-stakes gameplay of",
    "The climb to the top in",
    "Competitive spirit engaged in",
    "Clawing my way to the top in",
    "Serious snout-to-snout action in",
    "Unleashing my competitive canine spirit in",
    "Time to dominate (and maybe flirt a little) in",
    "The hunt for victory begins in",
    "Ranked battles & relentless rivalry in",
    "Serious strategy for supremacy in",
    "Pushing the limits in",
    "Striving for the summit in",
    "Engaged in fierce competition in",
    "Intense matches & masterful plays in",
    "Serious skill on display in",
    "Aiming for the apex in",
    "Focused on the fray in",
    "Dedicated to domination in",
    "High-level gameplay of",
    "Strategic showdowns in",
    "Precision plays in",
    "Driven to dominate in",
    "Determined to defeat in",
    "Skilled skirmishes in",
    "Tactical triumphs in",
    "Masterful maneuvers in",
    "Relentless ranking in",
    "Victorious ventures in",
  ],
  inspirational: [
    "Inspiring moments & positive vibes in",
    "Bringing good energy to some",
    "Finding the fun & the wins in",
    "Let's create some great moments in",
    "Positive play through",
    "Inspiring (and maybe a little indecent) adventures in",
    "Spreading positivity (and playful obscenity) in",
    "Finding the light (and the lewd) in",
    "Let's build something beautiful (or break something spectacularly) in",
    "Chasing dreams & dropping deams in",
    "Uplifting experiences & engaging gameplay in",
    "Bringing smiles & solid plays in",
    "Focusing on the fun & the victories in",
    "Let's make some memorable moments in",
    "Positive power playing through",
    "Heartwarming highlights & happy gaming in",
    "Sharing the joy of gaming in",
    "Celebrating the wins & the laughs in",
    "Let's cultivate some good times in",
    "Positive progression through",
    "Encouraging entertainment with",
    "Spreading good vibes through",
    "Highlighting the best moments in",
    "Let's foster a positive community in",
    "Uplifting undertakings in",
    "Motivating moves & masterful moments in",
    "Sharing the passion for gaming in",
    "Emphasizing the fun & friendship in",
    "Let's build each other up through",
    "Encouraging engagement through",
  ],
  wholesome: [
    "Wholesome vibes & happy gaming in",
    "Join for some feel-good fun in",
    "Come experience some positive gameplay in",
    "Wholesome moments await in",
    "Pure and positive gaming with",
    "Wholesome husky hugs & happy gaming in",
    "Pure joy & playful pounces in",
    "Good vibes & great games in",
    "A little bit of fluff & a lot of fun in",
    "Come for the cuddles, stay for the chaos in",
    "Heartwarming highlights & happy gaming in",
    "Spreading smiles & sunshine through",
    "Focusing on the fun & friendship in",
    "Let's create a cozy atmosphere in",
    "Pure positivity playing through",
    "Comforting camaraderie in",
    "Sharing the joy of gaming in a wholesome way",
    "Celebrating the good times & good plays in",
    "Let's build a supportive space in",
    "Pure and pleasant gaming through",
    "Friendly faces & fantastic fun in",
    "Spreading kindness through gameplay in",
    "Highlighting the heartwarming moments in",
    "Let's foster a welcoming community in",
    "Pure and peaceful gaming through",
    "Gentle gameplay & genuine joy in",
    "Sharing the love of gaming in a sweet way",
    "Emphasizing the good sportsmanship in",
    "Let's cultivate a caring community in",
    "Pure and playful gaming through",
  ],
  flirty: [
    "Playful banter & fun times in",
    "Getting a little cheeky with some",
    "Prepare for some lighthearted fun in",
    "A bit of playful interaction with",
    "Fun & flirty (in a friendly way) in",
    "Flirty growls & fantastic frags in",
    "Wagging tails & wicked wins in",
    "Sweet talk & savage skills in",
    "Come get a little closer while we play",
    "Serving looks & securing victories in",
    "Playful pokes & pro plays in",
    "Witty whispers & wonderful wins in",
    "Charming challenges & captivating gameplay in",
    "Come for the laughs, stay for the plays",
    "Looking good & landing shots in",
    "Teasing triumphs & terrific times in",
    "Sweet strategies & stunning successes in",
    "Come have some fun & maybe some wins",
    "Looking sharp & playing well in",
    "Playful prowess & pleasant personalities in",
    "Charming chaos & clever clutches in",
    "Witty winks & wonderful worlds in",
    "Captivating camaraderie & cool conquests in",
    "Come for the good times & great plays",
    "Looking stylish & securing the dub in",
    "Teasing tactics & terrific teamwork in",
    "Sweet synergy & stunning streams in",
    "Come hang out & have some laughs",
    "Looking fabulous & fragging out in",
    "Playful power & pleasant presence in",
  ],
  sarcastic: [
    "Sarcastic commentary & questionable plays in",
    "Get ready for some dry humor in",
    "Sarcastic remarks & gaming in",
    "Witnessing my amazing skills (not really) in",
    "Lowering expectations now for some",
    "Oh joy, another round of [Game Name]",
    "Prepare for my insightful (and likely incorrect) commentary on",
    "Just trying my best (spoiler: it won't be good)",
    "Witnessing my stunning incompetence in",
    "Lowering your expectations now for",
    "Brace yourselves for my brilliance (or lack thereof) in",
    "Get ready for some expert (debatable) opinions on",
    "Just winging it (and probably failing spectacularly) in",
    "Witnessing my tactical genius (question mark?) in",
    "Prepare for a masterclass in mediocrity in",
    "Oh goody, we're playing this again",
    "Prepare for my profound (and possibly pointless) insights on",
    "Just surviving (barely) in",
    "Witnessing my strategic blunders in",
    "Lowering the bar for entertainment in",
    "Well, here we go again with",
    "Get ready for my highly accurate (citation needed) analysis of",
    "Just making it up as I go along in",
    "Witnessing my questionable decision-making in",
    "Prepare for peak performance (unlikely) in",
    "Fantastic. Just fantastic. Playing",
    "Get ready for my world-class (self-proclaimed) skills in",
    "Just existing in this game called",
    "Witnessing my epic fails in glorious detail in",
    "Lowering the collective IQ with some",
  ],
};

const goLiveStarters = {
  witty: [
    "Going live with some witty gameplay in",
    "Time for some laughs and clever plays in",
    "Witty stream starting now for",
    "Get ready for some sharp humor playing",
    "Witty adventures live! Join me for",
    "Snarky stream incoming! Let's dive into",
    "Wit's end? Nope, just getting started with",
    "Time for some brainy plays & bold banter in",
    "Prepare your funny bone, we're playing",
    "Witty streams await! Live now with",
    "Quick wit & live gaming! Join me for",
    "Amusing antics are now live with",
    "Clever commentary & captivating stream starting!",
    "Jesting journey live! Come along for",
    "Playful pronouncements are now live!",
    "Snappy sayings & live victories incoming!",
    "Intelligent interactions are happening live!",
    "Hilarious happenings are now streaming!",
    "Comical clashes are about to begin live!",
    "Waggish wonders are now live!",
    "Sharp-witted showdowns are live! Tune in for",
    "Amusing undertakings are now live!",
    "Clever capers are starting live!",
    "Jocular jaunts are now live!",
    "Playful pursuits are live!",
    "Snappy strategies are live! Watch now!",
    "Intelligent insights are being shared live!",
    "Humorous hurdles are being faced live!",
    "Comical conquests are underway live!",
    "Waggish wins are happening live!",
    "Sharp-witted streams are now live for",
    "Amusing adventures are live! Come see!",
    "Clever challenges are live! Watch me try!",
    "Jocular gaming is live! Join the fun!",
    "Playful plays are live! Check it out!",
    "Snappy streams are now live!",
    "Intelligent gaming live now!",
    "Humorous gameplay live!",
    "Comical moments live!",
    "Waggish streams are live!",
  ],
  cheeky: [
    "Live and being playful in",
    "Come join the lighthearted fun in",
    "Cheeky stream now live for",
    "Having some fun and games with",
    "Getting playful with it! Live now",
    "Cheeky business live! Tune in for",
    "Live & ready to be a little bit naughty in",
    "Strap in for some waggish gameplay of",
    "Saucy remarks & live shenanigans in",
    "Cheeky streams are now live for",
    "Bold banter live! Come join the fun!",
    "Mischievous moments live! See what happens!",
    "Saucy strategies live! Watch me work!",
    "Impudent incursions live! Check it out!",
    "Playful ploys live! Come see!",
    "Bold beginnings live! Join the adventure!",
    "Mischievous maneuvers live! See what I'm up to!",
    "Saucy skirmishes live! Tune in!",
    "Impudent improvisations live! Watch me go!",
    "Playful performances live! Come see!",
    "Bold breakthroughs live! Don't miss it!",
    "Mischievous misadventures live! See what trouble I get into!",
    "Saucy successes live! Come celebrate!",
    "Impudent initiatives live! See what I try next!",
    "Playful prowess live! Check out the skills!",
    "Bold brilliance live! Tune in now!",
    "Mischievous mastery live! See how it's done!",
    "Saucy surprises live! You won't expect this!",
    "Impudent insights live! Hear my thoughts!",
    "Playful power live! Check out the plays!",
    "Cheeky vibes live! Come hang out!",
    "Live with some playful antics in",
    "Cheeky gameplay live now!",
    "Having some mischievous fun live!",
    "Playful streams are now live!",
  ],
  sussy: [
    "Live and things are getting a little sus in",
    "Who's the imposter? Find out live in",
    "Slightly suspicious gameplay live in",
    "Things are getting interesting with",
    "Sussy stream live! What's going on in",
    "Suspect shenanigans live! Come investigate!",
    "Don't trust anyone (including me) live!",
    "Things are getting a bit strange live!",
    "Mysterious maneuvers live! What's happening?",
    "Questionable quests live! Let's figure it out!",
    "Shady situations live! Be careful!",
    "Keep an eye on everyone live!",
    "Something's not quite right live!",
    "Dubious dealings live! Watch closely!",
    "Fishy findings live! What did I find?",
    "Unsettling events live! Brace yourselves!",
    "Be wary of everyone live! Trust no one!",
    "Something's lurking live! What could it be?",
    "Ominous occurrences live! Something's wrong!",
    "Perplexing predicaments live! Let's solve this!",
    "Uncertain undertakings live! What am I doing?",
    "Careful steps live! Proceed with caution!",
    "Something's amiss live! What is it?",
    "Doubtful decisions live! Will it work?",
    "Odd outcomes live! You won't believe this!",
    "Unreliable realities live! What's real?",
    "Circumspect circumstances live! Let's analyze!",
    "Something's off live! Can you spot it?",
    "Dubious developments live! What's next?",
    "Peculiar plays live! That was weird!",
    "Sussy vibes live! Something's up!",
    "Live with some suspect gameplay in",
    "Sussy moments live now!",
    "Things are a bit strange live!",
    "Suspicious streams are now live!",
  ],
  energetic: [
    "LIVE! Let's get energetic with",
    "High energy stream starting now for",
    "Get ready for some action! Playing",
    "Bringing the energy to some",
    "Energetic stream is now LIVE!",
    "Unleashing the energy live! Join the hype!",
    "Maximum effort live! Let's go!",
    "Buckle up buttercups, it's gonna be wild!",
    "Adrenaline-fueled stream LIVE!",
    "Electrifying gameplay LIVE!",
    "High-octane gaming LIVE now!",
    "Unleashing the beast live! Watch out!",
    "Maximum intensity live with",
    "Get ready for a rush LIVE!",
    "Dynamic domination LIVE!",
    "Power-packed plays LIVE! Don't miss it!",
    "Vibrant ventures LIVE! Come along!",
    "Thrilling triumphs LIVE! Watch now!",
    "Exhilarating encounters LIVE! Tune in!",
    "Animated antics LIVE! Check it out!",
    "High-powered performances LIVE! See the energy!",
    "Vigorous victories LIVE! Let's get it!",
    "Thrilling takedowns LIVE! Watch this!",
    "Exhilarating explorations LIVE! Come explore!",
    "Animated adventures LIVE! Join me!",
    "High-speed happenings LIVE! Don't blink!",
    "Vivacious ventures LIVE! Come see!",
    "Thrilling times LIVE! You won't want to miss!",
    "Exhilarating experiences LIVE! Join the fun!",
    "Animated actions LIVE! Check it out!",
    "Energetic vibes live! Let's go!",
    "Live with some high-energy gameplay in",
    "Energetic moments live now!",
    "Bringing the hype live!",
    "High-energy streams are now live!",
  ],
  chilled: [
    "Chilled stream live with some",
    "Come unwind with some relaxed",
    "Relaxed vibes and gameplay in",
    "Taking it easy and playing some",
    "Mellow stream starting now with",
    "Sippin' & slayin' live in a relaxed way!",
    "Calm commentary & casual stream starting!",
    "Unwinding with some peaceful gameplay live!",
    "Gentle gaming live! Come chill!",
    "Serene streaming of some relaxing",
    "Easygoing entertainment live! Join me!",
    "Laid-back adventures live! Come hang!",
    "Tranquil times playing live!",
    "Soothing streams of some calm",
    "Mellow moments live! Come relax!",
    "Comfortable camaraderie live! Let's chat!",
    "Leisurely levels live! Taking our time!",
    "Peaceful plays live! Come enjoy the vibes!",
    "Serene sessions live! Unwind with me!",
    "Easy entertainment live! Come hang out!",
    "Comfortable cruising through live!",
    "Leisurely loops live! Just relaxing!",
    "Peaceful progress live! No rush!",
    "Serene sights live! Come enjoy the view!",
    "Easy escapades live! Let's take it slow!",
    "Comfortable conquering live! No stress!",
    "Leisurely learning live! Taking it easy!",
    "Peaceful pastimes live! Come chill with me!",
    "Serene stories live! Relax and listen!",
    "Easy exploration live! Let's take our time!",
    "Chilled vibes live! Come relax!",
    "Live with some relaxed gameplay in",
    "Chilled moments live now!",
    "Taking it easy live!",
    "Relaxed streams are now live!",
  ],
  focused: [
    "Focused stream now live with some",
    "Diving deep into the world of",
    "Concentrating live on some serious",
    "Serious focus on some intense",
    "Dedicated gameplay live with",
    "Laser focus live! Let's get this done!",
    "Deep dive live! Prepare for some serious",
    "Tactical takedowns incoming! Live with",
    "Mind on the mission! Focused gameplay of",
    "Intentional interactions live with",
    "Sharp focus live on the finer points of",
    "Deep analysis live of",
    "Strategic skirmishes live! Watch the plays!",
    "Goal-oriented gaming live! Let's achieve!",
    "Deliberate decisions live! See the strategy!",
    "Intense concentration live on",
    "Deep exploration live of",
    "Strategic successes live! Watch how it's done!",
    "Purposeful plays live! See the plan!",
    "Determined dedication live to",
    "Keen concentration live on",
    "Deep understanding live of",
    "Strategic solutions live! Watch me solve it!",
    "Precise performances live! See the skill!",
    "Driven dedication live to",
    "Sharp attention to detail live in",
    "Deep investigation live into",
    "Strategic thinking live in",
    "Methodical movements live in",
    "Disciplined dedication live to",
    "Focused vibes live! Let's get it done!",
    "Live with some focused gameplay in",
    "Focused moments live now!",
    "Concentrating live!",
    "Dedicated streams are now live!",
  ],
  community: [
    "Community stream live! Hanging out for some",
    "Come chat and game with the community in",
    "Live with the community playing some",
    "It's a community hangout for some",
    "Community fun live! Join the chat for",
    "Pack hangout LIVE! Let's play together!",
    "Join the crew! Community stream of",
    "Chillin' with chat & conquering some",
    "Live with the best viewers in the world!",
    "It's a party! Community stream of",
    "Squad stream LIVE! Shenanigans incoming!",
    "Friendship fueled gameplay live of",
    "Together we game LIVE!",
    "United in fun playing some",
    "Teamwork triumphs LIVE!",
    "Group gathering for gaming LIVE!",
    "Shared adventures LIVE in",
    "Collective conquering LIVE of",
    "Partnered plays LIVE of",
    "Collaborative chaos LIVE in",
    "Crew camaraderie LIVE! Come hang out!",
    "Joint journeys LIVE in",
    "Combined campaigns LIVE in",
    "All together now playing LIVE!",
    "United gaming front LIVE in",
    "Fellowship of frags LIVE! Join the fun!",
    "Shared stories LIVE in",
    "Collective creations LIVE in",
    "All hands on deck for some LIVE",
    "United in victory LIVE with",
    "Community vibes live! Come hang!",
    "Live with the community playing in",
    "Community moments live now!",
    "Hanging with chat live!",
    "Community streams are now live!",
  ],
  chaotic: [
    "Chaos unleashed! Live with some",
    "Prepare for the pandemonium in some",
    "Unleashing the mayhem live with",
    "Things are about to get wild with some",
    "Chaotic stream starting NOW!",
    "Pure pandemonium LIVE! Join the madness!",
    "Unpredictable plays & hilarious fails LIVE!",
    "Where sanity goes to die: playing LIVE!",
    "Unleashing my inner gremlin LIVE!",
    "Absolute anarchy LIVE!",
    "Wild and wacky times LIVE in",
    "Prepare for peak performance (and fails) LIVE!",
    "Controlled chaos (sort of) LIVE in",
    "Unforeseen events LIVE! Anything can happen!",
    "Madness and mayhem LIVE with",
    "Unruly romps LIVE in",
    "Expect the unexpected LIVE in",
    "Turbulent times playing LIVE!",
    "Unscripted silliness LIVE!",
    "Rambunctious rounds LIVE of",
    "Frenzied frolics LIVE in",
    "Brace for the bizarre LIVE in",
    "Unconventional conquests LIVE in",
    "Madcap maneuvers LIVE!",
    "Rowdy raids LIVE in",
    "Hectic happenings LIVE! Don't miss the crazy!",
    "Get ready for the ridiculous LIVE in",
    "Unorthodox undertakings LIVE!",
    "Manic moments LIVE!",
    "Wacky warfare LIVE!",
    "Chaotic vibes live! Anything can happen!",
    "Live with some chaotic gameplay in",
    "Chaotic moments live now!",
    "Prepare for mayhem live!",
    "Wild streams are now live!",
  ],
  story: [
    "Story stream live! Let's explore the world of",
    "Diving into the narrative of",
    "Unraveling the story live with some",
    "Join me for a story-driven",
    "Live with a captivating story in",
    "Unfurling the forbidden tales live of",
    "Lost in the lore live of",
    "Whispers of wicked wonders live in",
    "Delving into the dark depths live of",
    "Let's get immersed in the world of",
    "Exploring the epic saga live of",
    "Discovering the secrets within live in",
    "Journeying through the realms live of",
    "Following the fascinating plot live of",
    "Engaged in the gripping story live of",
    "Witnessing the unfolding events live of",
    "Embarking on a narrative quest live in",
    "Experiencing the captivating world live of",
    "Uncovering the mysteries of the story live in",
    "Following the intricate threads live of",
    "Venturing into the lore-rich lands live of",
    "Deciphering the ancient texts live of",
    "Traversing the detailed world live of",
    "Living the legend live of",
    "Becoming part of the story live in",
    "Unlocking the hidden histories live of",
    "Interacting with the characters live of",
    "Navigating the branching paths live of",
    "Witnessing the dramatic climax live of",
    "Experiencing the emotional depth live of",
    "Story vibes live! Let's get into it!",
    "Live with some story-rich gameplay in",
    "Story moments live now!",
    "Diving into the lore live!",
    "Narrative streams are now live!",
  ],
  competitive: [
    "Competitive stream live! Climbing ranks in",
    "Time to get serious with some competitive",
    "Live competitive play of",
    "Let's get competitive in some",
    "Competitive action LIVE!",
    "Clawing my way to the top LIVE in",
    "Serious snout-to-snout action LIVE in",
    "Unleashing my competitive spirit LIVE in",
    "Time to dominate LIVE in",
    "The hunt for victory begins LIVE in",
    "Ranked battles & relentless rivalry LIVE!",
    "Serious strategy for supremacy LIVE!",
    "Pushing the limits LIVE in some",
    "Striving for the summit LIVE in",
    "Engaged in fierce competition LIVE in",
    "Intense matches & masterful plays LIVE!",
    "Serious skill on display LIVE in",
    "Aiming for the apex LIVE in",
    "Focused on the fray LIVE in some",
    "Dedicated to domination LIVE in",
    "High-level gameplay LIVE of",
    "Strategic showdowns LIVE in",
    "Precision plays LIVE of",
    "Driven to dominate LIVE in",
    "Determined to defeat LIVE in",
    "Skilled skirmishes LIVE in",
    "Tactical triumphs LIVE in",
    "Masterful maneuvers LIVE in",
    "Relentless ranking LIVE in",
    "Victorious ventures LIVE in",
    "Competitive vibes live! Let's go!",
    "Live with some competitive gameplay in",
    "Competitive moments live now!",
    "Getting serious live!",
    "Ranked streams are now live!",
  ],
  inspirational: [
    "Live and inspiring with some",
    "Bringing positive vibes live with some",
    "Inspiring gameplay stream starting with",
    "Get ready to be inspired in some",
    "Positive play through",
    "Uplifting experiences & engaging gameplay LIVE!",
    "Bringing smiles & solid plays LIVE!",
    "Focusing on the fun & the victories LIVE!",
    "Let's make some memorable moments LIVE!",
    "Positive power playing LIVE!",
    "Heartwarming highlights & happy gaming LIVE!",
    "Sharing the joy of gaming LIVE!",
    "Celebrating the wins & the laughs LIVE!",
    "Let's cultivate some good times LIVE!",
    "Positive progression LIVE!",
    "Encouraging entertainment LIVE with",
    "Spreading good vibes through some LIVE",
    "Highlighting the best moments LIVE in",
    "Let's foster a positive community LIVE in",
    "Uplifting undertakings LIVE in",
    "Motivating moves & masterful moments LIVE!",
    "Sharing the passion for gaming LIVE!",
    "Emphasizing the fun & friendship LIVE!",
    "Let's build each other up through some LIVE",
    "Encouraging engagement through some LIVE",
    "Creating positive moments LIVE!",
    "Spreading good energy through gameplay LIVE!",
    "Highlighting the awesome plays LIVE!",
    "Let's build a great community LIVE!",
    "Uplifting adventures LIVE!",
    "Inspirational vibes live! Let's go!",
    "Live with some inspiring gameplay in",
    "Inspirational moments live now!",
    "Bringing the positivity live!",
    "Uplifting streams are now live!",
  ],
  wholesome: [
    "Wholesome stream live! Join the fun for some",
    "Playing with some wholesome vibes live in",
    "Come and chill with some positive gameplay of",
    "Live now with some wholesome",
    "Wholesome gaming live! Come hang out for",
    "Heartwarming highlights & happy gaming LIVE!",
    "Spreading smiles & sunshine through some",
    "Focusing on the fun & friendship LIVE in",
    "Let's create a cozy atmosphere LIVE in",
    "Pure positivity playing LIVE through",
    "Comforting camaraderie LIVE in some",
    "Sharing the joy of gaming in a wholesome way LIVE!",
    "Celebrating the good times & good plays LIVE in",
    "Let's build a supportive space LIVE in",
    "Pure and pleasant gaming LIVE through",
    "Friendly faces & fantastic fun LIVE in",
    "Spreading kindness through gameplay LIVE in",
    "Highlighting the heartwarming moments LIVE in",
    "Let's foster a welcoming community LIVE in",
    "Pure and peaceful gaming LIVE through",
    "Gentle gameplay & genuine joy LIVE in",
    "Sharing the love of gaming in a sweet way LIVE!",
    "Emphasizing the good sportsmanship LIVE in",
    "Let's cultivate a caring community LIVE in",
    "Pure and playful gaming LIVE through",
    "Kindness and gaming live! Come join the good vibes!",
    "Positive interactions and gameplay live!",
    "A happy place for gaming, live now!",
    "Come share some wholesome moments live!",
    "Good vibes and great games, live!",
    "Wholesome adventures await! Live now!",
    "Spreading joy through gaming, live!",
    "A friendly stream for some fun gaming, live!",
    "Come relax and enjoy some wholesome gameplay!",
    "Live with all the good feels!",
    "Wholesome community gaming, live!",
    "Positive and welcoming stream, live now!",
    "Come make some friends and play some games!",
    "Live with a focus on good times and good people!",
    "A wholesome escape into gaming, live!",
    "Wholesome moments being made live!",
    "Spreading positivity one game at a time, live!",
    "A place for kind gamers, live now!",
    "Come join the wholesome fun!",
    "Live with nothing but good vibes and great games!",
  ],
  flirty: [
    "Live and having some playful fun with",
    "Getting a little cheeky with gameplay in",
    "Fun stream live now with some",
    "Get ready for some lighthearted banter with",
    "Playful stream starting now with",
    "Flirty growls & fantastic frags LIVE!",
    "Wagging my tail & winning hearts in some",
    "Sweet talk & slick plays LIVE!",
    "Come get a little closer while we play some",
    "Serving looks & securing victories in some",
    "Playful pokes & pro plays LIVE!",
    "Witty whispers & wonderful wins in some",
    "Charming challenges & captivating gameplay LIVE!",
    "Come for the laughs, stay for the plays in some",
    "Looking good & landing shots in some",
    "Teasing triumphs & terrific times LIVE in",
    "Sweet strategies & stunning successes in some",
    "Come have some fun & maybe some wins in",
    "Looking sharp & playing well in some",
    "Playful prowess & pleasant personalities LIVE!",
    "Charming chaos & clever clutches LIVE in",
    "Witty winks & wonderful worlds in some",
    "Captivating camaraderie & cool conquests LIVE in",
    "Come for the good times & great plays in some",
    "Looking stylish & securing the dub in some",
    "Teasing tactics & terrific teamwork LIVE!",
    "Sweet synergy & stunning streams LIVE!",
    "Come hang out & have some laughs with some",
    "Looking fabulous & fragging out in some",
    "Playful power & pleasant presence LIVE!",
    "Flirty vibes live! Come say hi!",
    "Live with some playful interactions in",
    "Cheeky gameplay live now!",
    "Having some fun banter live!",
    "Playful streams are now live!",
    "Come flirt with danger (and maybe me)! Live!",
    "Winking and winning live!",
    "Sweet moves and smooth talk live!",
    "Get ready for some playful teasing live!",
    "Live with a little bit of spice!",
    "Flirty fun and fantastic games live!",
    "Come for the charm, stay for the gameplay!",
    "Live with some playful competition!",
    "Ready to charm your socks off! Live!",
    "A little bit naughty, a lot of fun! Live!",
  ],
  sarcastic: [
    "Sarcastic stream live! Expect the unexpected with",
    "Going live with some sarcastic gameplay of",
    "Let's dive into sarcasm live with some",
    "Live with some dry humor incoming for",
    "Sarcastic fun live! Join me for some",
    "Oh goody, I'm live! Witness the majesty of my gameplay in",
    "Sarcasm levels critical! Playing",
    "Prepare for my expert (debatable) opinions on",
    "Just trying my best (spoiler: it won't be good) in",
    "Lowering your expectations now for",
    "Brace yourselves for my brilliance (or lack thereof) live!",
    "Get ready for some expert (debatable) opinions live on",
    "Just winging it (and probably failing spectacularly) live in",
    "Witnessing my tactical genius (question mark?) live in",
    "Prepare for a masterclass in mediocrity live in",
    "Oh goody, we're playing this again live!",
    "Prepare for my profound (and possibly pointless) insights live on",
    "Just surviving (barely) live in",
    "Witnessing my strategic blunders live in",
    "Lowering the bar for entertainment live in",
    "Well, here we go again live with",
    "Get ready for my highly accurate (citation needed) analysis live of",
    "Just making it up as I go along live in",
    "Witnessing my questionable decision-making live in",
    "Prepare for peak performance (unlikely) live in",
    "Fantastic. Just fantastic. Playing live!",
    "Get ready for my world-class (self-proclaimed) skills live in",
    "Just existing in this game called live",
    "Witnessing my epic fails in glorious detail live in",
    "Lowering the collective IQ with some live",
    "Sarcastic vibes live! You've been warned!",
    "Live with some cutting commentary on",
    "Dry humor live now!",
    "Prepare for the eye-rolls live!",
    "Sarcastic streams are now live!",
    "Come watch me fail ironically! Live!",
    "My commentary will be *amazing* (not really)! Live!",
    "Prepare for my insightful (and likely wrong) takes! Live!",
    "Just here for the participation trophy! Live!",
    "Live with a healthy dose of cynicism!",
    "Sarcasm and subpar gameplay live!",
    "Come witness my stunning lack of skill! Live!",
    "My predictions are always right (never)! Live!",
    "Just trying to have a good time (doubtful)! Live!",
    "Live with a side of sarcasm and a sprinkle of rage!",
  ],
};

const hashtagPhrases = {
  // Content hashtags
  "#FirstPlaythrough": [
    "Blind run!",
    "First time exploring!",
    "Fresh playthrough!",
    "Going in blind!",
    "New game adventure!",
    "Uncharted territory!",
    "Virgin voyage!",
    "First impression gameplay!",
    "No prior knowledge!",
    "Experiencing for the first time!",
    "Let's discover together!",
    "Completely new to this!",
    "Starting from scratch!",
    "The very beginning!",
    "A brand new journey!",
    "Initial experience!",
    "First contact!",
    "Untouched gameplay!",
    "A clean slate!",
    "Pure discovery!",
    "Maiden voyage!",
    "Fresh eyes on this!",
    "No spoilers, please!",
    "Learning as we go!",
    "The adventure begins now!",
    "First look!",
    "Untainted experience!",
    "A fresh perspective!",
    "Embarking on the unknown!",
    "Completely unspoiled!",
  ],
  "#NoBackseating": [
    "No hints please!",
    "Discovering things myself!",
    "Keep the advice to yourselves!",
    "Let me figure it out!",
    "Exploring at my own pace!",
    "Learning through experience!",
    "Hands-off guidance only!",
    "Silence of the backseat!",
    "My way or the highway (of learning)!",
    "Trial and error time!",
    "Let me stumble through!",
    "The joy of discovery!",
    "No unsolicited help!",
    "Figuring it out solo!",
    "The journey is the reward (and my mistakes)!",
    "Please refrain from advice!",
    "I've got this (maybe)!",
    "The path of learning is paved with my fails!",
    "Let me experiment!",
    "Keep your strategies to yourself!",
    "I'm on a learning curve!",
    "Enjoy the ride (of my confusion)!",
    "No backseat drivers!",
    "Let me lead the way (poorly)!",
    "The thrill of the unknown (and my bad decisions)!",
    "Just watching my journey!",
    "Experiencing it my way!",
    "Let me solve the puzzle!",
    "The satisfaction of figuring it out!",
    "No help needed (yet)!",
  ],
  "#NoSpoilers": [
    "Spoiler-free zone!",
    "Keep the story secrets!",
    "Let's experience this together!",
    "No spoilers allowed!",
    "Protect the surprises!",
    "Keep the plot twists hidden!",
    "Don't ruin the magic!",
    "A fresh, unspoiled experience!",
    "Let the story unfold naturally!",
    "Preserve the mystery!",
    "No future knowledge!",
    "Keep the surprises coming (naturally)!",
    "Let's react in real-time!",
    "Guard the narrative!",
    "Shield us from future events!",
    "Maintain the suspense!",
    "Keep the secrets safe!",
    "Let's be surprised together!",
    "Don't unveil the ending!",
    "Protect the journey's end!",
    "Keep the plot under wraps!",
    "Let the game speak for itself!",
    "No hints about what's to come!",
    "Experience the story as intended!",
    "Keep the twists and turns secret!",
    "A blind eye to the future!",
    "Let's enjoy the unknown!",
    "Don't give away the big reveal!",
    "Keep the narrative pure!",
    "Preserve the first-time wonder!",
  ],
  "#Gaming": [
    "Playing games!",
    "Gamer time!",
    "Let's game!",
    "Video games!",
    "Game on!",
    "Leveling up!",
    "Virtual adventures!",
    "Digital escapades!",
    "Console gaming!",
    "PC gaming!",
    "Mobile gaming!",
    "Indie gaming!",
    "Retro gaming!",
    "New releases!",
    "Playing through!",
    "Gaming session!",
    "Virtual worlds!",
    "Digital adventures!",
    "Controller in hand!",
    "Keyboard and mouse!",
    "Gaming community!",
    "Love gaming!",
    "Gamer for life!",
    "Just gaming!",
    "Time to play!",
    "Into the game!",
    "Virtual reality!",
    "Augmented reality!",
    "Cloud gaming!",
    "Streaming games!",
  ],
  "#Speedrun": [
    "Going fast!",
    "Optimizing routes!",
    "Speedrunning today!",
    "Racing the clock!",
    "Fastest time possible!",
    "Efficiency is key!",
    "Gotta go fast!",
    "Breaking records!",
    "Time attack!",
    "Quick completion!",
    "Speedy playthrough!",
    "Mastering the movement!",
    "Frame-perfect actions!",
    "Shaving off seconds!",
    "Pushing the limits of speed!",
    "Optimized gameplay!",
    "Fast and furious gaming!",
    "Blazing through!",
    "Record attempt!",
    "The need for speed!",
    "Speedy strategies!",
    "Precision movement!",
    "Fastest fingers first!",
    "Time trial!",
    "Conquering quickly!",
    "Speed demon!",
    "Velocity victory!",
    "Rapid run!",
    "Swift completion!",
    "Lightning fast!",
  ],
  "#Blind": [
    "First time playing!",
    "No spoilers please!",
    "Experiencing it fresh!",
    "Blind playthrough!",
    "New to this game!",
    "Completely unaware!",
    "Going in without knowledge!",
    "A fresh perspective!",
    "Learning as I go!",
    "Untouched experience!",
    "Discovering for the first time!",
    "No idea what to expect!",
    "A clean slate adventure!",
    "Pure, unspoiled gameplay!",
    "Maiden voyage into this game!",
    "Fresh eyes on this world!",
    "No prior experience here!",
    "Untainted by spoilers!",
    "A journey of pure discovery!",
    "Experiencing it raw!",
    "First contact with this game!",
    "Completely new to the mechanics!",
    "A truly blind run!",
    "Let's learn together!",
    "The thrill of the unknown!",
    "Starting from zero!",
    "A genuine first impression!",
    "Uncharted gameplay for me!",
    "Completely clueless (in a good way)!",
    "Embarking on this blindly!",
  ],
  // Stream Type hashtags
  "#CosyVibes": [
    "Cosy gaming session!",
    "Relax and watch!",
    "Comfortable vibes only!",
    "Chilled and gaming!",
    "Snug stream!",
    "Warm and welcoming!",
    "Relaxing atmosphere!",
    "Comfort zone gaming!",
    "Laid-back and playing!",
    "Soft and gentle vibes!",
    "Comfortable and chill!",
    "Easygoing gaming!",
    "Relaxed and ready!",
    "Snuggle up and watch!",
    "Warm and fuzzy feels!",
    "Comfortable gaming experience!",
    "Laid-back and loving it!",
    "Soft and peaceful vibes!",
    "Comfortable and content!",
    "Easy-breezy gaming!",
    "Relaxing and enjoyable!",
    "Snug as a bug!",
    "Warm and inviting stream!",
    "Comfortable and happy!",
    "Easy-listening gaming!",
    "Relaxing and unwinding!",
    "Snuggly stream time!",
    "Warm and friendly vibes!",
    "Comfortable and serene!",
    "Easy-paced gaming!",
  ],
  "#ChillStream": [
    "Taking it easy today!",
    "Relaxed stream vibes!",
    "Chilling with chat!",
    "Low-key stream!",
    "Easygoing stream!",
    "Mellow vibes here!",
    "Just hanging out and playing!",
    "Unwinding with some games!",
    "Casual gaming session!",
    "Laid-back streaming!",
    "Relaxed and chatting!",
    "Keeping it calm today!",
    "Just vibing and gaming!",
    "No pressure, just play!",
    "Easy does it stream!",
    "Chilled atmosphere here!",
    "Relaxed gaming experience!",
    "Just enjoying some downtime!",
    "Mellow gaming session!",
    "Laid-back and friendly!",
    "Relaxed and ready to game!",
    "Keeping it smooth and chill!",
    "Just enjoying the company and the game!",
    "Easy and breezy stream!",
    "Chilled gaming vibes!",
    "Relaxed and ready to chat!",
    "Keeping the energy low and the fun high!",
    "Just a casual gaming hangout!",
    "Easy-paced and enjoyable!",
    "Chilled vibes all around!",
  ],
  "#JustChatting": [
    "Hanging out and chatting!",
    "Let's talk!",
    "Just chatting with you!",
    "Come say hello!",
    "Open conversation!",
    "Talking about life, the universe, and games!",
    "Ask me anything!",
    "Let's catch up!",
    "Community hangout!",
    "Just me and you!",
    "Heart-to-heart time!",
    "Spill the tea!",
    "What's on your mind?",
    "Let's have a conversation!",
    "Your thoughts welcome!",
    "Chit-chatting live!",
    "Let's connect!",
    "Tell me about your day!",
    "Open floor for discussion!",
    "Interactive chat time!",
    "Just talking and chilling!",
    "Let's get to know each other!",
    "Your questions answered!",
    "A casual conversation stream!",
    "Come join the discussion!",
    "Talking about everything and nothing!",
    "Let's have a good chat!",
    "Your stories and my ears!",
    "A relaxed chat session!",
    "Come hang and talk!",
  ],
  "#ArtStream": [
    "Creating art live!",
    "Watch me draw!",
    "Artistic vibes!",
    "Making art for you!",
    "Live drawing session!",
    "Digital painting live!",
    "Sketching live!",
    "Illustrating live!",
    "Creative process!",
    "Art in progress!",
    "Watch art come to life!",
    "Live illustration!",
    "Digital art creation!",
    "Sketching and chatting!",
    "Art for the community!",
    "Painting live for you!",
    "Live digital art!",
    "Sketching session!",
    "Creating on the canvas!",
    "Artistic journey live!",
    "Watch the magic happen!",
    "Live illustration session!",
    "Digital art in the making!",
    "Sketching and vibing!",
    "Art requests open!",
    "Painting live and chatting!",
    "Live digital illustration!",
    "Sketching and creating!",
    "Artistic exploration live!",
    "Watch me create magic!",
  ],
  "#MusicStream": [
    "Music time!",
    "Jamming live!",
    "Tunes and vibes!",
    "Musical stream!",
    "Live music session!",
    "Playing some tunes!",
    "Live DJ set!",
    "Singing live!",
    "Instrumental performance!",
    "Music requests open!",
    "Live acoustic set!",
    "Playing my favorite songs!",
    "Music and chat!",
    "Vibing with some music!",
    "Live covers!",
    "Original music live!",
    "Jam session with chat!",
    "Musical journey live!",
    "Live instrumental covers!",
    "Music for your soul!",
    "Playing some chill tunes!",
    "Live music and good vibes!",
    "Jamming out live for you!",
    "Musical exploration live!",
    "Live covers and originals!",
    "Playing some upbeat music!",
    "Live music and fun times!",
    "Jamming with the community!",
    "Musical moments live!",
    "Live tunes and good company!",
  ],
  "#TalkShow": [
    "Let's discuss!",
    "Talking about topics!",
    "Chat show live!",
    "Discussion stream!",
    "Live talk session!",
    "Deep dive discussions!",
    "Talking about current events!",
    "Open forum for discussion!",
    "Let's debate!",
    "Your opinions matter!",
    "Talking about [topic]!",
    "Live panel discussion!",
    "Exploring different perspectives!",
    "Engaging in conversation!",
    "Thought-provoking discussions!",
    "Let's get into it!",
    "Live Q&A session!",
    "Talking about life and everything in between!",
    "Open mic discussion!",
    "Interactive talk show!",
    "Discussing the latest news!",
    "Live interview session!",
    "Exploring various viewpoints!",
    "Engaging with the audience!",
    "Thought-provoking conversations live!",
    "Let's have an open dialogue!",
    "Live discussion on [topic]!",
    "Sharing thoughts and ideas live!",
    "Engaging the community in discussion!",
    "Thoughtful conversations happening now!",
  ],
  // Community hashtags
  "#ViewerInteractions": [
    "Chatting with viewers!",
    "Your input welcome!",
    "Interactive stream!",
    "Let's hang out!",
    "Engaging with chat!",
    "Your opinions matter here!",
    "Making the stream interactive!",
    "Come join the conversation!",
    "Your voice is heard!",
    "Let's connect!",
    "Interactive fun with chat!",
    "Your participation encouraged!",
    "Making the stream about us!",
    "Come be a part of the show!",
    "Let's build this together!",
    "Interactive moments happening now!",
    "Your feedback is valued!",
    "Making the most of our time together!",
    "Come share your thoughts!",
    "Let's have some interactive fun!",
    "Engaging with the community live!",
    "Your questions and comments welcome!",
    "Making this a collaborative experience!",
    "Come join the interactive party!",
    "Let's make some memories together!",
    "Interactive games with viewers!",
    "Your suggestions are welcome!",
    "Making this a two-way street!",
    "Come be an active part of the stream!",
    "Let's interact and have a blast!",
  ],
  "#VTuber": [
    "VTubing!",
    "Virtual streamer!",
    "Animated adventures!",
    "See my virtual self!",
    "Virtual presence!",
    "Live as my avatar!",
    "Animated streaming!",
    "Digital persona!",
    "Virtual entertainment!",
    "VTuber life!",
    "Streaming in virtual reality!",
    "My animated adventures!",
    "The world of VTubing!",
    "See my virtual form!",
    "Animated gameplay!",
    "Virtual me playing games!",
    "Live with my avatar!",
    "Digital streaming persona!",
    "Experiencing the virtual world!",
    "Animated fun!",
    "VTuber community!",
    "Virtual streaming fun!",
    "My digital adventures live!",
    "See my virtual reactions!",
    "Animated chats!",
    "VTuber streamer here!",
    "Virtual gaming live!",
    "My digital self playing!",
    "Animated interactions!",
    "The power of VTubing!",
  ],
  "#Furry": [
    "Furry streamer!",
    "Pawsome gameplay!",
    "Into the furryverse!",
    "Fluffy fun!",
    "Furry and fabulous!",
    "Pawsitively gaming!",
    "Furry adventures live!",
    "Embrace the fluff!",
    "Furry community!",
    "Pawsome streams!",
    "Gaming with fur!",
    "Fluffy streamer here!",
    "Into the world of furries!",
    "Pawsome times!",
    "Furry friends unite!",
    "Streaming with my fursona!",
    "Furry gaming live!",
    "Fluffy and fantastic!",
    "Pawsome interactions!",
    "Furry love!",
    "Gaming in the furryverse!",
    "Fluffy adventures await!",
    "Pawsome community here!",
    "Furry and friendly!",
    "Streaming with pride!",
    "Furry fun and games!",
    "Pawsome moments live!",
    "Embracing my furry side!",
    "Furry and fantastic streams!",
    "Pawsitively the best community!",
  ],
  "#LGBTQ": [
    "LGBTQ+ friendly!",
    "Pride stream!",
    "Inclusive community!",
    "Everyone welcome!",
    "Love is love!",
    "Queer streamer!",
    "Celebrating pride!",
    "A safe space for all!",
    "Allies welcome here!",
    "Proud to be LGBTQ+!",
    "LGBTQ+ gaming!",
    "Pride and gaming!",
    "Inclusivity in gaming!",
    "A welcoming stream for everyone!",
    "Love wins!",
    "Queer community!",
    "Celebrating diversity!",
    "A place for everyone to be themselves!",
    "Support LGBTQ+ streamers!",
    "Proud and playing!",
    "LGBTQ+ streamer here!",
    "Pride and positivity!",
    "Inclusivity matters!",
    "A safe and supportive community!",
    "Love and acceptance!",
    "Queer gaming community!",
    "Celebrating our identities!",
    "A welcoming space for LGBTQ+ folks!",
    "Support queer creators!",
    "Proudly LGBTQ+ and gaming!",
  ],
  "#SmallStreamer": [
    "Growing community!",
    "Small but mighty!",
    "Building my channel!",
    "Join our community!",
    "Support small streams!",
    "New streamer on the rise!",
    "Every follow helps!",
    "Let's grow together!",
    "Building a positive space!",
    "Come be a part of something new!",
    "Small streamer love!",
    "Appreciate every viewer!",
    "Building a family here!",
    "Your support means the world!",
    "Join the journey!",
    "Small streamer trying to make it!",
    "Every view counts!",
    "Building a supportive community!",
    "Come hang out and grow with us!",
    "Your support is amazing!",
    "Small streamer with big dreams!",
    "Appreciate the support!",
    "Building a fun and friendly community!",
    "Come be an early supporter!",
    "Your follows and views are appreciated!",
    "Small streamer, big heart!",
    "Thank you for the support!",
    "Building a great community one step at a time!",
    "Come join the adventure!",
    "Your support fuels the dream!",
  ],
  "#SupportSmallStreamers": [
    "Supporting creators!",
    "Community love!",
    "Indie streamer!",
    "Growing together!",
    "Support the little guys!",
    "Love for small streamers!",
    "Helping each other grow!",
    "Small streamer support!",
    "Building a supportive network!",
    "Lift each other up!",
    "Support indie creators!",
    "Community supporting community!",
    "Growing together as streamers!",
    "Love and support for small channels!",
    "Helping dreams come true!",
    "Support the hard workers!",
    "Community strength!",
    "Indie streamer love and support!",
    "Growing together, stronger!",
    "Lift up the small creators!",
    "Support the passionate streamers!",
    "Community spirit!",
    "Indie love and support!",
    "Growing together, one stream at a time!",
    "Lift up the rising stars!",
    "Support the dedicated streamers!",
    "Community power!",
    "Indie pride and support!",
    "Growing together with every view!",
    "Lift up the future of streaming!",
  ],
  // Platform hashtags
  "#TwitchDrops": [
    "Drops enabled!",
    "Grab your loot!",
    "Twitch Drops are active!",
    "Don't miss the drops!",
    "Free in-game items!",
    "Claim your rewards!",
    "Twitch Drops are live!",
    "Get your free stuff!",
    "Earn rewards by watching!",
    "Don't forget to claim!",
    "Drops are happening now!",
    "Unlock exclusive items!",
    "Twitch Drops are here!",
    "Get rewarded for watching!",
    "Limited-time drops!",
    "Claim your free loot now!",
    "Twitch Drops are enabled for this stream!",
    "Earn while you watch!",
    "Don't miss out on freebies!",
    "Get your Twitch rewards!",
    "Drops are active, come get yours!",
    "Unlock exclusive content with Twitch Drops!",
    "Twitch is giving away free stuff!",
    "Make sure your accounts are linked for drops!",
    "Free loot just for watching!",
    "Twitch Drops are enabled, so watch and earn!",
    "Don't forget to claim your earned drops!",
    "Get exclusive in-game items with Twitch Drops!",
    "Twitch rewards you for watching!",
    "Free loot is waiting for you!",
  ],
  "#LiveNow": [
    "Streaming live!",
    "Come watch!",
    "Going live now!",
    "Join the stream!",
    "Live and in action!",
    "Tune in now!",
    "Live gameplay!",
    "Streaming right now!",
    "Come hang out live!",
    "Starting the stream!",
    "Live and ready to play!",
    "Click to watch live!",
    "The stream has begun!",
    "Join the live fun!",
    "Watch the action unfold live!",
    "Live entertainment!",
    "Streaming for you now!",
    "Don't miss the live show!",
    "Jump into the live chat!",
    "Live and kicking!",
    "The broadcast has started!",
    "Come see what's happening live!",
    "Your live entertainment is here!",
    "Live and interactive!",
    "Join the live party!",
    "Live stream alert!",
    "Now streaming live!",
    "Get your live dose of gaming!",
    "Live and ready for viewers!",
    "Come be part of the live audience!",
    "Live stream engaged!",
    "Streaming live for your enjoyment!",
    "Get your live fix now!",
    "Live and ready to entertain!",
    "Join the live experience!",
  ],
  "#Twitch": [
    "Live on Twitch!",
    "Twitch stream!",
    "Streaming platform!",
    "Watch on Twitch!",
    "Twitch gaming!",
    "Twitch community!",
    "Twitch and chill!",
    "Streaming on Twitch!",
    "Find me on Twitch!",
    "Twitch live!",
    "Twitch streamer!",
    "Twitch content!",
    "Twitch is the place to be!",
    "Join the Twitch fun!",
    "Live now on Twitch!",
    "Twitch streams!",
    "Twitch gaming community!",
    "Streaming live on Twitch!",
    "Come hang on Twitch!",
    "Twitch vibes!",
    "Twitch is where it's at!",
    "Twitch and game!",
    "Streaming exclusively on Twitch!",
    "Catch me live on Twitch!",
    "Twitch is my home!",
    "Twitch streamer life!",
    "Twitch content creator!",
    "Building a community on Twitch!",
    "See you on Twitch!",
    "Twitch powered!",
  ],
  "#TwitchAffiliate": [
    "Affiliate stream!",
    "Supporting the channel!",
    "Sub points growing!",
    "Affiliate vibes!",
    "Support the affiliate!",
    "Twitch Affiliate streamer!",
    "Helping my channel grow!",
    "Every sub counts!",
    "Affiliate love!",
    "Supporting the dream!",
    "Affiliate gaming!",
    "Building my affiliate journey!",
    "Subscribing helps a lot!",
    "Affiliate community!",
    "Thank you for the support!",
    "Twitch Affiliate live!",
    "Growing as an affiliate!",
    "Subscribing is appreciated!",
    "Affiliate pride!",
    "Supporting the grind!",
    "Affiliate streamer here!",
    "On the path to partnership!",
    "Sub love!",
    "Affiliate and proud!",
    "Supporting the growth!",
    "Twitch Affiliate and loving it!",
    "Building an awesome affiliate community!",
    "Subscribing makes a difference!",
    "Affiliate journey!",
    "Supporting the small streamer!",
  ],
  "#TwitchPartner": [
    "Partner stream!",
    "Official partner!",
    "Partnered content!",
    "Quality stream!",
    "Twitch Partner!",
    "Partnered streamer!",
    "High-quality content!",
    "Supporting a partner!",
    "Official Twitch Partner!",
    "Dedicated streamer!",
    "Partner gaming!",
    "Top-tier content!",
    "Supporting your favorite partner!",
    "Official Twitch content!",
    "Professional streaming!",
    "Twitch Partner live!",
    "Experienced streamer!",
    "Supporting the best!",
    "Official partner stream!",
    "High-quality entertainment!",
    "Partner streamer here!",
    "Committed to quality!",
    "Supporting the pros!",
    "Official Twitch content creator!",
    "Top-notch streaming!",
    "Twitch Partner and proud!",
    "Delivering quality content!",
    "Supporting the best on Twitch!",
    "Official partner community!",
    "The best of Twitch!",
  ],
  "#TwitchStreamer": [
    "Streaming on Twitch!",
    "Twitch content!",
    "Twitch community!",
    "Platform creator!",
    "Content creator!",
    "Gamer on Twitch!",
    "Building a community on Twitch!",
    "Sharing my passion on Twitch!",
    "Twitch streaming life!",
    "Live content on Twitch!",
    "Twitch streamer here!",
    "Creating content for you on Twitch!",
    "Building a positive community!",
    "Sharing the love of gaming on Twitch!",
    "Live entertainment on Twitch!",
    "Twitch streamer for life!",
    "Dedicated to creating content on Twitch!",
    "Building a fun community!",
    "Bringing you the best on Twitch!",
    "Live and creating on Twitch!",
    "Twitch streamer and proud!",
    "Passionate about content creation on Twitch!",
    "Building a supportive community!",
    "Sharing the joy of gaming with you on Twitch!",
    "Live and engaging on Twitch!",
    "Twitch streamer journey!",
    "Committed to my Twitch community!",
    "Building something special on Twitch!",
    "Bringing my world to you on Twitch!",
    "Live and loving Twitch!",
  ],
  // 18+ hashtags
  "#18Plus": [
    "Adults only stream!",
    "18+ content!",
    "Mature viewers only!",
    "Not for minors!",
    "Adult stream!",
    "18 and over only!",
    "Mature content stream!",
    "Strictly for adults!",
    "No underage viewers!",
    "Adult entertainment!",
    "18+ gaming!",
    "Mature themes only!",
    "Adult audience only!",
    "Not suitable for children!",
    "Adult fun!",
    "18+ community!",
    "Mature content ahead!",
    "Adults only please!",
    "Viewer discretion advised!",
    "Adult discussions!",
    "18+ vibes!",
    "Mature gaming!",
    "Adults are welcome!",
    "Content for adults!",
    "Adulting in the stream!",
    "18+ and proud!",
    "Mature content creators!",
    "Adults only zone!",
    "Not for the faint of heart (or under 18)!",
    "Adults unite!",
  ],
  "#AdultContent": [
    "Adult themes ahead!",
    "Mature content warning!",
    "Adult discussions!",
    "Explicit content!",
    "NSFW stream!",
    "Mature topics discussed!",
    "Adult language used!",
    "Content for grown-ups!",
    "Not family-friendly!",
    "Adult entertainment zone!",
    "Adult content gaming!",
    "Mature themes explored!",
    "Adult audience stream!",
    "Explicit language!",
    "Adult fun and games!",
    "Adult content community!",
    "Mature content discussed here!",
    "Adults only welcome for this!",
    "Viewer discretion is strongly advised!",
    "Explicit discussions!",
    "Adult content vibes!",
    "Mature gaming content!",
    "Adults only content!",
    "Explicit themes!",
    "Adulting in explicit detail!",
    "Adult content creators!",
    "Mature content and proud!",
    "Explicit content zone!",
    "Not for sensitive viewers!",
    "Adult content galore!",
  ],
  "#MatureStream": [
    "Mature stream today!",
    "Adult themes discussed!",
    "Mature audience required!",
    "Not kid-friendly!",
    "Adult-oriented stream!",
    "Stream for mature viewers!",
    "Adult topics and gameplay!",
    "Mature content throughout!",
    "Not for the young ones!",
    "Adult entertainment today!",
    "Mature gaming stream!",
    "Adult themes explored here!",
    "Mature audience only for this!",
    "Not suitable for a younger audience!",
    "Adult fun streaming!",
    "Mature stream community!",
    "Adult themes will be present!",
    "Mature viewers only please!",
    "Viewer discretion advised for this stream!",
    "Adult discussions and gameplay!",
    "Mature stream vibes!",
    "Adult gaming content today!",
    "Mature audience welcome!",
    "Content geared towards adults!",
    "Adulting on stream today!",
    "Mature content creators streaming!",
    "Adult themes and proud!",
    "Mature audience zone!",
    "Not intended for children!",
    "Mature and engaging stream!",
  ],
  "#NSFW": [
    "NSFW content!",
    "Not safe for work!",
    "Adult content warning!",
    "Explicit stream!",
    "Uncensored stream!",
    "Adults only - proceed with caution!",
    "Mature content - you've been warned!",
    "Explicit language and themes!",
    "Not for sensitive viewers!",
    "NSFW gaming!",
    "Adult content ahead - you've been warned!",
    "Mature themes - enter at your own risk!",
    "Explicit content and discussions!",
    "Not safe for the easily offended!",
    "NSFW fun!",
    "Adults only - this ain't your grandma's stream!",
    "Mature content - buckle up!",
    "Explicit language and gameplay!",
    "Not for the faint of heart!",
    "NSFW community!",
    "Adult content - you've been warned, seriously!",
    "Mature themes - don't say I didn't tell you!",
    "Explicit content - get ready!",
    "Not safe for the workplace!",
    "NSFW vibes!",
    "Adults only - enter if you dare!",
    "Mature content - prepare yourself!",
    "Explicit language and content - you know the drill!",
    "Not safe for innocent eyes!",
    "NSFW and proud!",
  ],
  "#AdultsOnly": [
    "Adults only please!",
    "18+ viewers only!",
    "Mature audience required!",
    "No minors allowed!",
    "Strictly for adults!",
    "Adults only beyond this point!",
    "18 and over only for this stream!",
    "Mature audience only - you've been warned!",
    "No one under 18 permitted!",
    "Adults only entertainment!",
    "Adults only gaming!",
    "18+ audience only!",
    "Mature viewers required for this!",
    "No kiddies allowed!",
    "Adults only fun!",
    "Adults only community!",
    "18+ viewers are welcome!",
    "Mature audience only please!",
    "This stream is for adults only!",
    "Adults only discussions!",
    "Adults only vibes!",
    "18+ gaming only!",
    "Mature audience - thank you!",
    "This content is for adults!",
    "Adults only hanging out!",
    "Adults only streamers!",
    "18+ and proud!",
    "Mature audience zone only!",
    "If you're under 18, please leave!",
    "Adults only - you're the best!",
  ],
  "#MatureAudience": [
    "For mature viewers!",
    "Adult audience stream!",
    "Mature themes discussed!",
    "Explicit content warning!",
    "Stream for adults!",
    "Intended for mature audiences!",
    "Adult themes and discussions here!",
    "Mature content throughout the stream!",
    "This stream is for adults!",
    "Adult audience entertainment!",
    "Mature audience gaming!",
    "Adult themes explored in this stream!",
    "Mature audience only - thank you!",
    "This content is geared towards adults!",
    "Adult audience fun!",
    "Mature audience community!",
    "Mature themes will be discussed!",
    "Adult audience only please - you've been warned!",
    "This stream is intended for mature viewers!",
    "Adult audience discussions and gameplay!",
    "Mature audience vibes!",
    "Adult audience gaming content!",
    "Mature audience welcome here!",
    "Content specifically for adults!",
    "Adult audience hanging out!",
    "Mature audience creators streaming!",
    "Intended for adults and proud!",
    "Mature audience zone only!",
    "This stream is not for children!",
    "Adult audience - thanks for being here!",
  ],
};

// implement the randomiser function
let selectedRandomEmoji = ""; // Stores the emoji chosen by the randomizer

document.getElementById("randomizeBtn").addEventListener("click", function () {
  const themeSelect = document.getElementById("theme");
  const emojiSelector = document.getElementById("emojiSelector");

  // Get all available themes
  const themes = Array.from(themeSelect.options)
    .map((opt) => opt.value)
    .filter((val) => val);
  const randomTheme = themes[Math.floor(Math.random() * themes.length)];
  themeSelect.value = randomTheme;

  // Get all available emoji styles, excluding 'none'
  const emojiOptions = Array.from(emojiSelector.options)
    .map((opt) => opt.value)
    .filter((val) => val !== "none");
  const randomEmojiStyle =
    emojiOptions[Math.floor(Math.random() * emojiOptions.length)];
  emojiSelector.value = randomEmojiStyle;

  // Trigger change event to update any dependent UI elements
  const changeEvent = new Event("change");
  emojiSelector.dispatchEvent(changeEvent);

  // Select a random emoji based on the chosen style
  if (randomEmojiStyle === "theme") {
    const emojis = emojiSets.theme[randomTheme] || [];
    selectedRandomEmoji =
      emojis[Math.floor(Math.random() * emojis.length)] || "";
  } else {
    const emojis = emojiSets[randomEmojiStyle] || [];
    selectedRandomEmoji =
      emojis[Math.floor(Math.random() * emojis.length)] || "";
  }
});

// Event listener for the collab checkbox
document.getElementById("isCollab").addEventListener("change", function () {
  document.getElementById("collabSection").style.display = this.checked
    ? "block"
    : "none";
});

// Event listener for number of collaborators dropdown
document
  .getElementById("numCollaborators")
  .addEventListener("change", function () {
    generateCollaboratorInputs();
  });

// Function to generate collaborator input fields
function generateCollaboratorInputs() {
  const container = document.getElementById("collaboratorInputs");
  const numCollabs = parseInt(
    document.getElementById("numCollaborators").value
  );

  // Clear existing inputs
  container.innerHTML = "";

  // Create new inputs - always create at least one input field
  for (let i = 1; i <= numCollabs; i++) {
    const div = document.createElement("div");
    div.className = "form-group";

    const label = document.createElement("label");
    label.textContent = `Collaborator ${i}:`;
    label.setAttribute("for", `collaborator${i}`);

    const input = document.createElement("input");
    input.type = "text";
    input.className = "form-control";
    input.id = `collaborator${i}`;
    input.name = `collaborator${i}`;
    input.placeholder = "Enter username";

    div.appendChild(label);
    div.appendChild(input);
    container.appendChild(div);
  }
}

// Initialize collaborator inputs on page load
document.addEventListener("DOMContentLoaded", function () {
  // If the checkbox is already checked when the page loads
  if (document.getElementById("isCollab").checked) {
    document.getElementById("collabSection").style.display = "block";
    generateCollaboratorInputs();
  }
});

document.getElementById("kofiBtn").addEventListener("click", function () {
  window.open("https://ko-fi.com/rearsilver", "_blank");
});

document.getElementById("twitchBtn").addEventListener("click", function () {
  window.open("https://www.twitch.tv/RearSilver", "_blank");
});

document.getElementById("discordBtn").addEventListener("click", function () {
  window.open("https://discord.gg/RRbQ93Ceew", "_blank");
});

// Google Form logging function
function logToGoogleForm(game, tags) {
  const optOut = document.querySelector("#optOutCheckbox");
  if (optOut && optOut.checked) return;

  const formURL =
    "https://docs.google.com/forms/d/e/1FAIpQLSf0XdOjqD2oPmtI9uELfaEHcrnJKN_Jv2UjYaTSHfLDdQcPdQ/formResponse";

  const formData = new FormData();
  formData.append("entry.1228937960", game || ""); // Game title
  formData.append("entry.1095075717", tags.join(", ")); // Tags
  formData.append("entry.276544572", "1"); // Session marker

  fetch(formURL, {
    method: "POST",
    mode: "no-cors",
    body: formData,
  })
    .then((response) => {
      // Optionally, handle a successful response
      console.log("Form submitted successfully");
    })
    .catch((error) => {
      // Handle any errors that occur during the fetch request
      console.error("Error submitting the form", error);
    });
}

document.getElementById("generateBtn").addEventListener("click", function () {
  // Check for unsafe tags
  const customTagsInput = document.getElementById("customHashtags");
  const offensiveTagWarning = document.getElementById("offensive-tag-warning");

  if (customTagsInput && offensiveTagWarning) {
    const customTags = customTagsInput.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    const hasUnsafeTags = customTags.some((tag) => !isSafeTag(tag));

    offensiveTagWarning.style.display = hasUnsafeTags ? "block" : "none";
  }

  const gameTitle = document.getElementById("gameTitle").value.trim();
  const theme = document.getElementById("theme").value;
  const emojiPack = document.getElementById("emojiPack").checked;
  const customInput = document.getElementById("customHashtags").value.trim();
  const useCustomTitle = document.getElementById("customTitleCheckbox").checked;
  const customTitleText = document.getElementById("customTitle").value.trim();

  // Add this line to get the mature content checkbox state
  const matureContent = document.getElementById("matureContent").checked;

  const gameSupportArray = getGameSupport(gameTitle);

  // Create a bridge function to get emojis from either system
  function getEmoji(theme) {
    // Check if the new emoji selector exists and is visible
    const emojiSelector = document.getElementById("emojiSelector");
    if (emojiSelector) {
      // Use the new emoji system if it's available
      if (typeof window.getSelectedEmojis === "function") {
        return window.getSelectedEmojis(theme);
      }
    }

    // Fall back to the old system
    const emojiPack = document.getElementById("emojiPack").checked;
    return emojiPack ? getEmojiForTheme(theme) : "";
  }

  // Use the bridge function to get emojis
  const emoji = getEmoji(theme);

  // Combine checked hashtags + custom ones
  const checkedTags = [
    ...document.querySelectorAll(
      '.hashtag-options input[type="checkbox"]:checked'
    ),
  ].map((tag) => tag.value.trim());
  const customTags = customInput
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag !== "");
  const allTags = [...new Set([...checkedTags, ...customTags])] // Deduplicate hashtags
    .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`));

  const hashtags = allTags.join(" ");

  // Generate the title
  let title = "";
  if (useCustomTitle && customTitleText !== "") {
    // Use only the custom title text, hashtags, and emojis
    title = `${customTitleText} ${hashtags} ${emoji}`.trim();
  } else {
    // Get a random title starter based on the selected theme
    const themeStarters = titleStarters[theme] || titleStarters.witty;
    const randomStarter =
      themeStarters[Math.floor(Math.random() * themeStarters.length)];

    // Generate the default title
    title = `${randomStarter} ${gameTitle} ${hashtags} ${emoji}`.trim();
  }

  // Add this line to create the mature indicator
  if (matureContent) {
    title = `🔞 ${title}`;
  }

  // Add content warnings if the checkbox is checked
  if (
    document.getElementById("contentWarningsCheckbox") &&
    document.getElementById("contentWarningsCheckbox").checked
  ) {
    let warnings = [];
    if (
      document.getElementById("photosensitivity") &&
      document.getElementById("photosensitivity").checked
    ) {
      warnings.push("⚠️ Photosensitivity Warning");
    }
    if (
      document.getElementById("loudNoises") &&
      document.getElementById("loudNoises").checked
    ) {
      warnings.push("⚠️ Loud Noises");
    }
    if (
      document.getElementById("violence") &&
      document.getElementById("violence").checked
    ) {
      warnings.push("⚠️ Violence/Gore");
    }
    if (
      document.getElementById("anxiety") &&
      document.getElementById("anxiety").checked
    ) {
      warnings.push("⚠️ Anxiety Triggers");
    }
    if (
      document.getElementById("customWarningCheckbox") &&
      document.getElementById("customWarningCheckbox").checked &&
      document.getElementById("customWarningText") &&
      document.getElementById("customWarningText").value.trim() !== ""
    ) {
      warnings.push(
        `⚠️ ${document.getElementById("customWarningText").value.trim()}`
      );
    }

    // Add warnings to title if any are selected
    if (warnings.length > 0) {
      title += " | " + warnings.join(", ");
    }
  }

  // Update the UI with the generated title
  document.getElementById("generatedTitle").textContent = title;

  // Ensure hashtags are not appended again
  let goLiveMessage = "";

  // Get a random go live starter based on the selected theme
  const goLiveThemeStarters = goLiveStarters[theme] || goLiveStarters.witty;
  const randomGoLiveStarter =
    goLiveThemeStarters[Math.floor(Math.random() * goLiveThemeStarters.length)];

  // Generate the go live message
  goLiveMessage = `${randomGoLiveStarter} ${gameTitle}`;

  // ADD THIS: Add mature content indicator to the beginning if needed
  if (matureContent) {
    goLiveMessage = `🔞 ${goLiveMessage}`;
  }

  // Then update the UI with the generated go live message
  document.getElementById("goLiveMessage").textContent =
    `${goLiveMessage} ${emoji}`.trim();

  // Update character counters if needed
  updateCharacterCounters(title, goLiveMessage);

  // Add this collaborator handling code:
  if (
    document.getElementById("isCollab") &&
    document.getElementById("isCollab").checked
  ) {
    const numCollabs = parseInt(
      document.getElementById("numCollaborators").value
    );
    const collabType = document.getElementById("collabType").value;

    let collaborators = [];
    for (let i = 1; i <= numCollabs; i++) {
      const collabInput = document.getElementById(`collaborator${i}`);
      if (collabInput && collabInput.value.trim()) {
        collaborators.push(`@${collabInput.value.trim()}`);
      }
    }

    if (collaborators.length > 0) {
      // Add collaborators to title with the selected type
      if (collabType) {
        // For formats like "@user1 vs @user2" or "@user1 & @user2"
        if (collaborators.length === 1) {
          // If there's only one collaborator, just append with the type
          title += ` ${collabType} ${collaborators[0]}`;
        } else {
          // For multiple collaborators, insert the type between them
          // First, get the first collaborator
          title += ` with ${collaborators[0]}`;

          // Then add each additional collaborator with the type in between
          for (let i = 1; i < collaborators.length; i++) {
            title += ` ${collabType} ${collaborators[i]}`;
          }
        }
      } else {
        // If no collab type is selected, just join them with commas
        title += ` with ${collaborators.join(", ")}`;
      }

      // For Go Live message
      const messageCollaborators = collaborators
        .map((c) => c.substring(1))
        .join(" and "); // Remove @ symbols
      goLiveMessage += ` Collaborating with ${messageCollaborators}!`;
    }
  }

  for (const tag of checkedTags) {
    if (hashtagPhrases[tag]) {
      goLiveMessage += ` ${
        hashtagPhrases[tag][
          Math.floor(Math.random() * hashtagPhrases[tag].length)
        ]
      }`;
    }
    if (hashtagSupportMessages[tag]) {
      supportMessage += ` ${
        hashtagSupportMessages[tag][
          Math.floor(Math.random() * hashtagSupportMessages[tag].length)
        ]
      }`;
    }
  }

  if (
    document.getElementById("contentWarningsCheckbox") &&
    document.getElementById("contentWarningsCheckbox").checked
  ) {
    let warnings = [];
    if (
      document.getElementById("photosensitivity") &&
      document.getElementById("photosensitivity").checked
    ) {
      warnings.push("⚠️ Photosensitivity Warning");
    }
    if (
      document.getElementById("loudNoises") &&
      document.getElementById("loudNoises").checked
    ) {
      warnings.push("⚠️ Loud Noises");
    }
    if (
      document.getElementById("violence") &&
      document.getElementById("violence").checked
    ) {
      warnings.push("⚠️ Violence/Gore");
    }
    if (
      document.getElementById("anxiety") &&
      document.getElementById("anxiety").checked
    ) {
      warnings.push("⚠️ Anxiety Triggers");
    }
    if (
      document.getElementById("customWarningCheckbox") &&
      document.getElementById("customWarningCheckbox").checked &&
      document.getElementById("customWarningText") &&
      document.getElementById("customWarningText").value.trim() !== ""
    ) {
      warnings.push(
        `⚠️ ${document.getElementById("customWarningText").value.trim()}`
      );
    }

    // Add warnings to go live message if any are selected
    if (warnings.length > 0) {
      goLiveMessage += " | " + warnings.join(", ");
    }
  }

  document.getElementById("generatedTitle").textContent = title.trim();
  document.getElementById("goLiveMessage").textContent = goLiveMessage.trim();

  if (gameSupportArray) {
    const existingMessage =
      document.getElementById("supportMessage")?.textContent || "";
    supportMessage = `${
      gameSupportArray[Math.floor(Math.random() * gameSupportArray.length)]
    } ${existingMessage}`;
  } else if (gameTitle) {
    const existingMessage =
      document.getElementById("supportMessage")?.textContent || "";
    supportMessage = `Good luck streaming ${gameTitle}! ${existingMessage}`;
  }

  // Log the type and value of supportMessage
  console.log("Support Message Type:", typeof supportMessage);
  console.log("Support Message Value:", supportMessage);

  // Update the DOM element with the new message
  document.getElementById("supportMessage").textContent = supportMessage.trim();

  if (title.length > 140) {
    document.getElementById(
      "charWarning"
    ).textContent = `⚠️ This title is ${title.length} characters long, which exceeds Twitch's 140 character limit. Try reducing emojis or hashtags.`;
  } else {
    document.getElementById("charWarning").textContent = "";
  }

  saveToHistory(title.trim(), goLiveMessage.trim());

  // Add this new code for the character counter
  const charCount = title.length;
  const limit = 140;

  // Create or update the character counter element
  let counterElement = document.getElementById("charCounter");
  if (!counterElement) {
    counterElement = document.createElement("div");
    counterElement.id = "charCounter";
    // Insert before the copy button
    document
      .getElementById("previewArea")
      .insertBefore(counterElement, document.getElementById("copyBtn"));
  }

  // Add this function to check custom hashtags and show warning if needed
  function checkCustomHashtags() {
    const customTagsInput = document.getElementById("custom-hashtags");
    const warningElement = document.getElementById("offensive-tag-warning");

    if (!customTagsInput || !warningElement) return;

    const customTags = customTagsInput.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    // Check if any custom tag contains offensive content
    const hasOffensiveTags = customTags.some((tag) => !isSafeTag(tag));

    // Show or hide warning based on result
    warningElement.style.display = hasOffensiveTags ? "block" : "none";
  }

  // Call the log function to send the data to Google Form
  logToGoogleForm(gameTitle, allTags);

  counterElement.textContent = `Character count: ${charCount}/${limit}`;
  counterElement.style.color =
    charCount > 140 ? "red" : charCount > 120 ? "orange" : "green";
  counterElement.style.fontWeight = "bold";
  counterElement.style.marginTop = "10px";
  counterElement.style.marginBottom = "10px";

  // Add this new code for the Go Live message character counter
  const goLiveCharCount = goLiveMessage.length;
  const goLiveLimit = 140; // Twitter/X character limit (adjust if needed)

  // Create or update the Go Live character counter element
  let goLiveCounterElement = document.getElementById("goLiveCharCounter");
  if (!goLiveCounterElement) {
    goLiveCounterElement = document.createElement("div");
    goLiveCounterElement.id = "goLiveCharCounter";
    // Insert before the copy button in the Go Live section
    document
      .getElementById("goLiveMessageSection")
      .insertBefore(
        goLiveCounterElement,
        document.getElementById("copyGoLiveBtn")
      );
  }

  goLiveCounterElement.innerHTML = `
    <div>Character count: ${goLiveCharCount}/${goLiveLimit} 
    ${goLiveCharCount > goLiveLimit ? "⚠️ Exceeds limit for Twitch!" : ""}</div>
    <div style="font-size: 0.8em; color: var(--note-color); margin-top: 3px;">
        Note: Hashtags are included in your stream title but omitted from the Go Live message to keep it under character limits.<br>When sharing to social media, your channel URL will be added automatically.
        Keep your message shorter to accommodate this.
    </div>
`;
  goLiveCounterElement.style.color =
    goLiveCharCount > goLiveLimit
      ? "red"
      : goLiveCharCount > 120
      ? "orange"
      : "green";
  goLiveCounterElement.style.fontWeight = "bold";
  goLiveCounterElement.style.marginTop = "10px";
  goLiveCounterElement.style.marginBottom = "10px";

  this.textContent = "Regenerate Title/Go Live Notification";
});

// Add functionality to copy the go live message
document.getElementById("copyGoLiveBtn").addEventListener("click", function () {
  const goLiveMessage = document.getElementById("goLiveMessage").textContent;
  navigator.clipboard.writeText(goLiveMessage).then(() => {
    alert("Go Live Message copied to clipboard!");
  });
});

// Add these event listeners for the new share buttons
document.getElementById("shareFacebook").addEventListener("click", function () {
  const shareChoice = document.getElementById("shareContent").value;
  const title = document.getElementById("generatedTitle").textContent;
  const goLiveMessage = document.getElementById("goLiveMessage").textContent;
  const channel = document.getElementById("twitchChannel").value.trim();
  let shareText = "";

  if (shareChoice === "title") {
    shareText = `${title} Live now at twitch.tv/${channel}`;
  } else if (shareChoice === "golive") {
    shareText = `${goLiveMessage} Watch live at twitch.tv/${channel}`;
  }

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    `https://twitch.tv/${channel}`
  )}&quote=${encodeURIComponent(shareText)}`;
  window.open(facebookUrl, "_blank");
});

document.getElementById("shareThreads").addEventListener("click", function () {
  const shareChoice = document.getElementById("shareContent").value;
  const title = document.getElementById("generatedTitle").textContent;
  const goLiveMessage = document.getElementById("goLiveMessage").textContent;
  const channel = document.getElementById("twitchChannel").value.trim();
  let threadsMessage = "";

  if (shareChoice === "title") {
    threadsMessage = `${title} Live now at twitch.tv/${channel} #Twitch #LiveNow`;
  } else if (shareChoice === "golive") {
    threadsMessage = `${goLiveMessage} Watch live at twitch.tv/${channel} #Twitch #LiveNow`;
  }

  // Since Threads doesn't have a direct share API, copy to clipboard for manual sharing
  navigator.clipboard.writeText(threadsMessage).then(() => {
    alert("Message copied to clipboard! Paste it into Threads app manually.");
  });
});

document.getElementById("shareBluesky").addEventListener("click", function () {
  const shareChoice = document.getElementById("shareContent").value;
  const title = document.getElementById("generatedTitle").textContent;
  const goLiveMessage = document.getElementById("goLiveMessage").textContent;
  const channel = document.getElementById("twitchChannel").value.trim();
  let blueskyText = "";

  if (shareChoice === "title") {
    blueskyText = `${title} Live now at twitch.tv/${channel}`;
  } else if (shareChoice === "golive") {
    blueskyText = `${goLiveMessage} Watch live at twitch.tv/${channel}`;
  }

  // Bluesky doesn't have a direct web intent API yet, so we'll copy to clipboard
  navigator.clipboard.writeText(blueskyText).then(() => {
    alert("Message copied to clipboard! Paste it into Bluesky app manually.");
  });
});

document
  .getElementById("shareInstagram")
  .addEventListener("click", function () {
    const shareChoice = document.getElementById("shareContent").value;
    const title = document.getElementById("generatedTitle").textContent;
    const goLiveMessage = document.getElementById("goLiveMessage").textContent;
    const channel = document.getElementById("twitchChannel").value.trim();
    let instagramText = "";

    if (shareChoice === "title") {
      instagramText = `${title} Live now at twitch.tv/${channel} #Twitch #LiveNow`;
    } else if (shareChoice === "golive") {
      instagramText = `${goLiveMessage} Watch live at twitch.tv/${channel} #Twitch #LiveNow`;
    }

    // Instagram doesn't have a direct web share API, so copy to clipboard
    navigator.clipboard.writeText(instagramText).then(() => {
      alert(
        "Message copied to clipboard! Paste it into Instagram app manually."
      );
    });
  });

document.getElementById("shareTwitter").addEventListener("click", function () {
  const shareChoice = document.getElementById("shareContent").value;
  const title = document.getElementById("generatedTitle").textContent;
  const goLiveMessage = document.getElementById("goLiveMessage").textContent;
  const channel = document.getElementById("twitchChannel").value.trim();
  let tweetText = "";

  if (shareChoice === "title") {
    tweetText = `${title} Live now at twitch.tv/${channel} #Twitch #LiveNow`;
  } else if (shareChoice === "golive") {
    tweetText = `${goLiveMessage} Watch live at twitch.tv/${channel} #Twitch #LiveNow`;
  }

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweetText
  )}`;
  window.open(tweetUrl, "_blank");
});

document.getElementById("shareDiscord").addEventListener("click", function () {
  const shareChoice = document.getElementById("shareContent").value;
  const title = document.getElementById("generatedTitle").textContent;
  const goLiveMessage = document.getElementById("goLiveMessage").textContent;
  const channel = document.getElementById("twitchChannel").value.trim();
  let discordMessage = "";

  if (shareChoice === "title") {
    discordMessage = `${title} Live now at twitch.tv/${channel} #Twitch #LiveNow`;
  } else if (shareChoice === "golive") {
    discordMessage = `${goLiveMessage} Watch live at twitch.tv/${channel} #Twitch #LiveNow`;
  }

  navigator.clipboard.writeText(discordMessage).then(() => {
    alert(
      "Message with Twitch link copied to clipboard! Paste it into Discord."
    );
  });
});

function getEmojiForTheme(theme) {
  switch (theme) {
    case "witty":
      return "😂";
    case "cheeky":
      return "😉";
    case "sussy":
      return "💀";
    case "energetic":
      return "⚡";
    case "chilled":
      return "☕";
    case "focused":
      return "🎯";
    case "community":
      return "🫂";
    case "chaotic":
      return "💥";
    case "story":
      return "📖";
    case "competitive":
      return "🏆";
    default:
      return "";
  }
}

function getGameSupport(gameTitle) {
  const game = predefinedGamesSupport.find(
    (g) => g.title.toLowerCase() === gameTitle.toLowerCase()
  );
  return game ? game.support : null; // Return null if not found
}

document.getElementById("copyBtn").addEventListener("click", function () {
  const title = document.getElementById("generatedTitle").textContent;
  navigator.clipboard.writeText(title).then(() => {
    alert("Title copied to clipboard!");
  });
});

document.getElementById("exportBtn").addEventListener("click", function () {
  const title = document.getElementById("generatedTitle").textContent;
  const blob = new Blob([title], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "generated_title.txt";
  link.click();
});

// ❌ Offensive words to filter from custom hashtags
const offensiveWords = [
  "fuck",
  "shit",
  "bitch",
  "asshole",
  "cunt",
  "slut",
  "dick",
  "nigger",
  "faggot",
  "retard",
  "whore",
  "twat",
  "rape",
  "kill",
  "suicide",
  "gay", // add context-aware exceptions if needed
];

function isSafeTag(tag) {
  const bannedWords = ["18", "nsfw", "horny", "lewd", "sus", "fuck", "porn"];
  return !bannedWords.some((word) => tag.toLowerCase().includes(word));
}
function isOffensive(input) {
  const normalised = input
    .toLowerCase()
    .replace(/[^a-zA-Z\s,]/g, "") // Remove symbols like # or !
    .split(/[,\s]+/); // Split on commas or spaces

  return offensiveWords.some((word) => normalised.includes(word));
}

// Save preferences to localStorage
// Save preferences to localStorage
function savePreferences() {
  const gameTitle = document.getElementById("gameTitle").value;
  const theme = document.getElementById("theme").value;
  const emojiPack = document.getElementById("emojiPack").checked;
  const channel = document.getElementById("twitchChannel").value;

  // Get checked hashtags
  const checkedTags = [
    ...document.querySelectorAll(
      '.hashtag-options input[type="checkbox"]:checked'
    ),
  ].map((tag) => tag.value);

  const customTagInput = document.getElementById("customHashtags");
  const customTags = customTagInput.value;
  const customTagError = document.getElementById("customTagError");
  const offensiveTagWarning = document.getElementById("offensive-tag-warning");

  // Check for offensive language
  if (isOffensive(customTags)) {
    customTagError.textContent =
      "Please avoid using offensive or hateful language in custom hashtags.";
    customTagError.style.display = "block";
    return; // Stop saving if offensive input
  } else {
    customTagError.textContent = "";
    customTagError.style.display = "none";
  }

  // Check for unsafe tags (18+, NSFW, etc.)
  const customTagsList = customTags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
  const hasUnsafeTags = customTagsList.some((tag) => !isSafeTag(tag));

  if (hasUnsafeTags && offensiveTagWarning) {
    offensiveTagWarning.style.display = "block";
  } else if (offensiveTagWarning) {
    offensiveTagWarning.style.display = "none";
  }

  // Get content warning settings
  const contentWarningsEnabled = document.getElementById(
    "contentWarningsCheckbox"
  )
    ? document.getElementById("contentWarningsCheckbox").checked
    : false;

  // Create an object to store content warning settings
  const contentWarnings = {
    enabled: contentWarningsEnabled,
    photosensitivity: document.getElementById("photosensitivity")
      ? document.getElementById("photosensitivity").checked
      : false,
    loudNoises: document.getElementById("loudNoises")
      ? document.getElementById("loudNoises").checked
      : false,
    violence: document.getElementById("violence")
      ? document.getElementById("violence").checked
      : false,
    anxiety: document.getElementById("anxiety")
      ? document.getElementById("anxiety").checked
      : false,
    customWarningEnabled: document.getElementById("customWarningCheckbox")
      ? document.getElementById("customWarningCheckbox").checked
      : false,
    customWarningText: document.getElementById("customWarningText")
      ? document.getElementById("customWarningText").value
      : "",
  };

  // Save to localStorage
  localStorage.setItem(
    "streamTitleGenerator",
    JSON.stringify({
      gameTitle,
      theme,
      emojiPack,
      channel,
      checkedTags,
      customTags,
      matureContent: document.getElementById("matureContent").checked,
      contentWarnings: contentWarnings,
      lastSaved: new Date().toISOString(),
    })
  );
}

// Load preferences from localStorage
function loadPreferences() {
  const saved = localStorage.getItem("streamTitleGenerator");
  if (!saved) return;

  const prefs = JSON.parse(saved);

  // Restore values
  document.getElementById("gameTitle").value = prefs.gameTitle || "";
  document.getElementById("theme").value = prefs.theme || "witty";
  document.getElementById("emojiPack").checked = prefs.emojiPack || false;
  document.getElementById("twitchChannel").value = prefs.channel || "";
  document.getElementById("customHashtags").value = prefs.customTags || "";

  // Load mature content setting
  if ("matureContent" in prefs) {
    document.getElementById("matureContent").checked = prefs.matureContent;
  }

  // Restore hashtags
  if (prefs.checkedTags && prefs.checkedTags.length) {
    document
      .querySelectorAll('.hashtag-options input[type="checkbox"]')
      .forEach((checkbox) => {
        checkbox.checked = prefs.checkedTags.includes(checkbox.value);
      });
  }

  // Restore content warnings if they exist in preferences
  if (prefs.contentWarnings) {
    // Enable content warnings checkbox if it was enabled
    if (document.getElementById("contentWarningsCheckbox")) {
      document.getElementById("contentWarningsCheckbox").checked =
        prefs.contentWarnings.enabled;

      // Make the content warnings section visible if it was enabled
      const warningsSection = document.getElementById("contentWarningsSection");
      if (warningsSection) {
        warningsSection.style.display = prefs.contentWarnings.enabled
          ? "block"
          : "none";
      }
    }

    // Restore individual warning settings
    if (document.getElementById("photosensitivity")) {
      document.getElementById("photosensitivity").checked =
        prefs.contentWarnings.photosensitivity;
    }

    if (document.getElementById("loudNoises")) {
      document.getElementById("loudNoises").checked =
        prefs.contentWarnings.loudNoises;
    }

    if (document.getElementById("violence")) {
      document.getElementById("violence").checked =
        prefs.contentWarnings.violence;
    }

    if (document.getElementById("anxiety")) {
      document.getElementById("anxiety").checked =
        prefs.contentWarnings.anxiety;
    }

    // Restore custom warning
    if (document.getElementById("customWarningCheckbox")) {
      document.getElementById("customWarningCheckbox").checked =
        prefs.contentWarnings.customWarningEnabled;
    }

    if (document.getElementById("customWarningText")) {
      document.getElementById("customWarningText").value =
        prefs.contentWarnings.customWarningText || "";

      // Show/hide the custom warning text field based on checkbox
      const customWarningField = document.getElementById("customWarningField");
      if (customWarningField) {
        customWarningField.style.display = prefs.contentWarnings
          .customWarningEnabled
          ? "block"
          : "none";
      }
    }
  }
}

// Add event listeners to save preferences
document
  .getElementById("gameTitle")
  .addEventListener("change", savePreferences);
document.getElementById("theme").addEventListener("change", savePreferences);
document
  .getElementById("emojiPack")
  .addEventListener("change", savePreferences);
document
  .getElementById("twitchChannel")
  .addEventListener("change", savePreferences);
document
  .getElementById("customHashtags")
  .addEventListener("change", savePreferences);
document
  .getElementById("matureContent")
  .addEventListener("change", savePreferences);

// Add event listeners for content warnings
if (document.getElementById("contentWarningsCheckbox")) {
  document
    .getElementById("contentWarningsCheckbox")
    .addEventListener("change", function () {
      // Show/hide the content warnings section
      const warningsSection = document.getElementById("contentWarningsSection");
      if (warningsSection) {
        warningsSection.style.display = this.checked ? "block" : "none";
      }
      savePreferences();
    });
}

// Add event listeners for individual content warnings
["photosensitivity", "loudNoises", "violence", "anxiety"].forEach((warning) => {
  if (document.getElementById(warning)) {
    document
      .getElementById(warning)
      .addEventListener("change", savePreferences);
  }
});

// Add event listener for custom warning checkbox
if (document.getElementById("customWarningCheckbox")) {
  document
    .getElementById("customWarningCheckbox")
    .addEventListener("change", function () {
      // Show/hide the custom warning text field
      const customWarningField = document.getElementById("customWarningField");
      if (customWarningField) {
        customWarningField.style.display = this.checked ? "block" : "none";
      }
      savePreferences();
    });
}

// Add event listener for custom warning text
if (document.getElementById("customWarningText")) {
  document
    .getElementById("customWarningText")
    .addEventListener("change", savePreferences);
}

document
  .querySelectorAll('.hashtag-options input[type="checkbox"]')
  .forEach((checkbox) => {
    checkbox.addEventListener("change", savePreferences);
  });

// Load preferences when page loads
document.addEventListener("DOMContentLoaded", loadPreferences);
initThemeToggle();
// Add this function to display the history
displayHistory();
// add this function for the preview card generator
initPreviewCardGenerator();
// Add this function for the hashtag tabs
initHashtagTabs();
// Add this function for the URL param sharing
initUrlParamSharing();
// Add this function for the emoji picker
initEmojiPicker(); // ✅ now waits until DOM is ready

// Function to save a title to history
function saveToHistory(title, goLiveMessage) {
  // Get existing history or create empty array if none exists
  let history = JSON.parse(localStorage.getItem("titleHistory") || "[]");

  // Get content warning settings
  const contentWarningsEnabled = document.getElementById(
    "contentWarningsCheckbox"
  )
    ? document.getElementById("contentWarningsCheckbox").checked
    : false;

  // Create a content warnings object if enabled
  let contentWarnings = null;
  if (contentWarningsEnabled) {
    contentWarnings = {
      photosensitivity: document.getElementById("photosensitivity")
        ? document.getElementById("photosensitivity").checked
        : false,
      loudNoises: document.getElementById("loudNoises")
        ? document.getElementById("loudNoises").checked
        : false,
      violence: document.getElementById("violence")
        ? document.getElementById("violence").checked
        : false,
      anxiety: document.getElementById("anxiety")
        ? document.getElementById("anxiety").checked
        : false,
      customWarning:
        document.getElementById("customWarningCheckbox") &&
        document.getElementById("customWarningCheckbox").checked
          ? document.getElementById("customWarningText").value
          : "",
    };
  }

  // Create a new history entry
  const newEntry = {
    title: title,
    goLiveMessage: goLiveMessage,
    timestamp: new Date().toISOString(),
    game: document.getElementById("gameTitle").value,
    matureContent: document.getElementById("matureContent").checked,
    contentWarnings: contentWarningsEnabled ? contentWarnings : null,
  };

  // Add new entry to the beginning (most recent first)
  history.unshift(newEntry);

  // Keep only the 10 most recent entries to avoid filling localStorage
  if (history.length > 10) {
    history = history.slice(0, 10);
  }

  // Save back to localStorage
  localStorage.setItem("titleHistory", JSON.stringify(history));

  // Update the history display
  displayHistory();
}

// Function to display history
function displayHistory() {
  // Get history from localStorage
  const history = JSON.parse(localStorage.getItem("titleHistory") || "[]");

  // If no history, don't show anything
  if (history.length === 0) {
    // Remove history section if it exists but there's no history
    const existingSection = document.getElementById("historySection");
    if (existingSection) {
      existingSection.remove();
    }
    return;
  }

  // Check if history section already exists
  let historySection = document.getElementById("historySection");

  // If it doesn't exist, create it
  if (!historySection) {
    historySection = document.createElement("div");
    historySection.id = "historySection";
    historySection.className = "container";
    historySection.style.marginTop = "20px";

    // Add heading and container for history items
    historySection.innerHTML = `
            <h2>Title History</h2>
            <div id="historyItems"></div>
            <button id="clearHistoryBtn">Clear History</button>
        `;

    // Add it to the page after the preview card section
    document.getElementById("previewCardSection").after(historySection);

    // Add event listener for clear button
    document
      .getElementById("clearHistoryBtn")
      .addEventListener("click", function () {
        localStorage.removeItem("titleHistory");
        historySection.remove();
      });
  }

  // Get the container for history items
  const historyItems = document.getElementById("historyItems");
  historyItems.innerHTML = ""; // Clear existing items

  // Add each history entry
  history.forEach((entry, index) => {
    // Create a div for this history entry
    const entryDiv = document.createElement("div");
    entryDiv.className = "history-entry";
    entryDiv.style.padding = "10px";
    entryDiv.style.margin = "10px 0";
    entryDiv.style.backgroundColor = "#f9f9f9";
    entryDiv.style.borderRadius = "5px";
    entryDiv.style.border = "1px solid #ddd";

    // Format the date
    const date = new Date(entry.timestamp);
    const formattedDate = date.toLocaleString();

    // Add content to the entry
    entryDiv.innerHTML = `
            <div><strong>Game:</strong> ${entry.game || "Not specified"}</div>
            <div><strong>Title:</strong> ${entry.title}</div>
            <div><strong>Go Live Message:</strong> ${entry.goLiveMessage}</div>
            <div style="font-size: 0.8em; color: var(--note-color); margin-top: 5px;">${formattedDate}</div>
            <button class="useHistoryBtn" data-index="${index}">Use This Title</button>
        `;

    // Add to the history items container
    historyItems.appendChild(entryDiv);
  });

  // Add event listeners for "Use This Title" buttons
  document.querySelectorAll(".useHistoryBtn").forEach((button) => {
    button.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      const entry = history[index];

      // Set the title and go live message
      document.getElementById("generatedTitle").textContent = entry.title;
      document.getElementById("goLiveMessage").textContent =
        entry.goLiveMessage;

      // Update character counters if they exist
      updateCharacterCounters(entry.title, entry.goLiveMessage);

      // Scroll to the title section
      document
        .getElementById("previewArea")
        .scrollIntoView({ behavior: "smooth" });
    });
  });
}

// Helper function to update character counters
function updateCharacterCounters(title, goLiveMessage) {
  // Update title character counter
  const titleCharCount = title.length;
  const titleLimit = 140;

  let titleCounter = document.getElementById("charCounter");
  if (titleCounter) {
    titleCounter.textContent = `Character count: ${titleCharCount}/${titleLimit}`;
    titleCounter.style.color =
      titleCharCount > titleLimit
        ? "red"
        : titleCharCount > 120
        ? "orange"
        : "green";
  }

  // Update go live message character counter
  const goLiveCharCount = goLiveMessage.length;
  const goLiveLimit = 140;

  let goLiveCounter = document.getElementById("goLiveCharCounter");
  if (goLiveCounter) {
    goLiveCounter.innerHTML = `
            <div>Character count: ${goLiveCharCount}/${goLiveLimit} 
            ${goLiveCharCount > goLiveLimit ? "⚠️ Exceeds limit!" : ""}</div>
            <div style="font-size: 0.8em; color: var(--note-color); margin-top: 3px;">
                Note: When sharing to social media, your channel URL will be added automatically.
                Keep your message shorter to accommodate this.
            </div>
        `;
    goLiveCounter.style.color =
      goLiveCharCount > goLiveLimit
        ? "red"
        : goLiveCharCount > 120
        ? "orange"
        : "green";
  }
}

// Theme toggle functionality
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

// Ensure the script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  initThemeToggle();
});

// Event listener for the collab checkbox
document.getElementById("isCollab").addEventListener("change", function () {
  document.getElementById("collabSection").style.display = this.checked
    ? "block"
    : "none";

  // Generate the inputs when checkbox is checked
  if (this.checked) {
    generateCollaboratorInputs();
  }
});

// Event listener for number of collaborators dropdown
document
  .getElementById("numCollaborators")
  .addEventListener("change", function () {
    generateCollaboratorInputs();
  });

// Initialize collaborator inputs on page load
document.addEventListener("DOMContentLoaded", function () {
  // If the checkbox is already checked when the page loads
  if (
    document.getElementById("isCollab") &&
    document.getElementById("isCollab").checked
  ) {
    document.getElementById("collabSection").style.display = "block";
    generateCollaboratorInputs();
  }
});

// Preview Card Generator
function initPreviewCardGenerator() {
  const generateCardBtn = document.getElementById("generateCardBtn");
  const downloadCardBtn = document.getElementById("downloadCardBtn");
  const canvas = document.getElementById("previewCard");

  // Ensure the canvas element exists
  if (!canvas) {
    console.error('Canvas element with id "previewCard" not found.');
    return; // Exit the function if the canvas is not found
  }

  const ctx = canvas.getContext("2d");

  // Disable download button initially
  downloadCardBtn.disabled = true;

  generateCardBtn.addEventListener("click", function () {
    const title = document.getElementById("generatedTitle").textContent;
    const gameTitle = document.getElementById("gameTitle").value;
    const template = document.getElementById("cardTemplate").value;

    // Get the channel name from the share section
    const channelName = document.getElementById("twitchChannel").value.trim();

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Generate card based on selected template
    switch (template) {
      case "twitch":
        generateTwitchCard(ctx, gameTitle, title, channelName);
        break;
      case "minimal":
        generateMinimalCard(ctx, gameTitle, title, channelName);
        break;
      case "gaming":
        generateGamingCard(ctx, gameTitle, title, channelName);
        break;
      default:
        generateTwitchCard(ctx, gameTitle, title, channelName);
    }

    // Enable download button
    downloadCardBtn.disabled = false;
  });

  downloadCardBtn.addEventListener("click", function () {
    if (this.disabled) return;

    const link = document.createElement("a");
    link.download = "stream-preview.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

// Twitch style card - update the function
function generateTwitchCard(ctx, gameTitle, title, channelName) {
  const canvas = ctx.canvas;
  const width = canvas.width;
  const height = canvas.height;

  // Background gradient (Twitch purple)
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#6441a5"); // Twitch purple
  gradient.addColorStop(1, "#392e5c");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Check if mature content is enabled
  const matureContent = document.getElementById("matureContent").checked;

  // Add "LIVE" badge
  ctx.fillStyle = "#e91916"; // Red
  ctx.beginPath();
  ctx.roundRect(20, 20, 80, 40, 5);
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.font = "bold 24px Arial";
  ctx.textAlign = "center";
  ctx.fillText("LIVE", 60, 47);

  // Add mature content banner if enabled
  if (matureContent) {
    // Add a semi-transparent black banner across the top
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 70, width, 30);

    // Add text
    ctx.fillStyle = "#ff4040"; // Bright red for warning
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "center";
    ctx.fillText("🔞 MATURE/ADULT CONTENT", width / 2, 90);
  }

  // Game title - adjust position if mature banner is present
  const gameTitleY = matureContent ? 130 : 100;
  ctx.fillStyle = "white";
  ctx.font = "bold 28px Arial";
  ctx.textAlign = "left";
  ctx.fillText(gameTitle || "Awesome Stream", 20, gameTitleY);

  // Stream title - adjust starting position if mature banner is present
  const titleStartY = matureContent ? 180 : 150;
  ctx.font = "20px Arial";
  const maxWidth = width - 40;
  const lineHeight = 30;
  const maxY = height - 60; // Reserve space for footer

  // Use the modified wrapText function that respects max height
  wrapTextWithMaxHeight(
    ctx,
    title,
    20,
    titleStartY,
    maxWidth,
    lineHeight,
    maxY
  );

  // Add channel at bottom
  ctx.font = "bold 18px Arial";
  ctx.textAlign = "center";
  if (channelName) {
    ctx.fillText(
      `Join now at twitch.tv/${channelName}`,
      width / 2,
      height - 30
    );
  } else {
    ctx.fillText("Join now on Twitch!", width / 2, height - 30);
  }
}

// Minimal style card - update similarly
function generateMinimalCard(ctx, gameTitle, title, channelName) {
  const canvas = ctx.canvas;
  const width = canvas.width;
  const height = canvas.height;

  // Clean white background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  // Add a subtle border
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 5;
  ctx.strokeRect(0, 0, width, height);

  // Check if mature content is enabled
  const matureContent = document.getElementById("matureContent").checked;

  // Add mature content banner if enabled
  if (matureContent) {
    // Add a red banner across the top
    ctx.fillStyle = "#ff4040"; // Bright red for warning
    ctx.fillRect(0, 0, width, 40);

    // Add text
    ctx.fillStyle = "white";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.fillText("🔞 MATURE/ADULT CONTENT", width / 2, 25);
  }

  // Game title - adjust position if mature banner is present
  const gameTitleY = matureContent ? 80 : 60;
  ctx.fillStyle = "#333";
  ctx.font = "bold 32px Arial";
  ctx.textAlign = "center";
  ctx.fillText(gameTitle || "Awesome Stream", width / 2, gameTitleY);

  // Divider line - adjust position if mature banner is present
  const dividerY = matureContent ? 100 : 80;
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(100, dividerY);
  ctx.lineTo(width - 100, dividerY);
  ctx.stroke();

  // Stream title - adjust position if mature banner is present
  const titleStartY = matureContent ? 150 : 130;
  ctx.font = "22px Arial";
  ctx.textAlign = "center";
  const maxWidth = width - 100;
  const lineHeight = 35;
  const maxY = height - 60; // Reserve space for footer

  // Use the modified wrapTextCentered function that respects max height
  wrapTextCenteredWithMaxHeight(
    ctx,
    title,
    width / 2,
    titleStartY,
    maxWidth,
    lineHeight,
    maxY
  );

  // Footer
  ctx.fillStyle = "#333";
  ctx.font = "italic 18px Arial";
  if (channelName) {
    ctx.fillText(`Live Now • twitch.tv/${channelName}`, width / 2, height - 30);
  } else {
    ctx.fillText("Live Now", width / 2, height - 30);
  }
}

// Gaming style card - update similarly
function generateGamingCard(ctx, gameTitle, title, channelName) {
  const canvas = ctx.canvas;
  const width = canvas.width;
  const height = canvas.height;

  // Dark gaming background
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, width, height);

  // Add some "gaming" elements - hexagon pattern
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1;
  const hexSize = 30;
  for (let x = 0; x < width; x += hexSize * 1.5) {
    for (let y = 0; y < height; y += hexSize * 1.7) {
      drawHexagon(ctx, x, y, hexSize);
    }
  }

  // Check if mature content is enabled
  const matureContent = document.getElementById("matureContent").checked;

  // Add mature content banner if enabled
  if (matureContent) {
    // Add a dark banner with warning pattern
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, 40);

    // Add diagonal warning stripes
    ctx.fillStyle = "#ff4040";
    for (let x = -height; x < width + height; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 40, 40);
      ctx.lineTo(x + 30, 40);
      ctx.lineTo(x - 10, 0);
      ctx.fill();
    }

    // Add text
    ctx.fillStyle = "white";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.fillText("🔞 MATURE/ADULT CONTENT", width / 2, 25);
  }

  // Add a highlight bar - adjust position if mature banner is present
  const barY = matureContent ? 50 : 20;
  const barGradient = ctx.createLinearGradient(0, 0, width, 0);
  barGradient.addColorStop(0, "#ff4500"); // Orange-red
  barGradient.addColorStop(1, "#ff8c00"); // Dark orange
  ctx.fillStyle = barGradient;
  ctx.fillRect(0, barY, width, 60);

  // Game title - adjust position if mature banner is present
  const gameTitleY = matureContent ? 90 : 60;
  ctx.fillStyle = "white";
  ctx.font = "bold 28px Arial";
  ctx.textAlign = "center";
  ctx.fillText(gameTitle || "Awesome Stream", width / 2, gameTitleY);

  // Stream title - adjust position if mature banner is present
  const titleStartY = matureContent ? 180 : 150;
  ctx.font = "20px Arial";
  const maxWidth = width - 60;
  const lineHeight = 30;
  const maxY = height - 60; // Reserve space for footer

  // Use the modified wrapTextCentered function that respects max height
  wrapTextCenteredWithMaxHeight(
    ctx,
    title,
    width / 2,
    titleStartY,
    maxWidth,
    lineHeight,
    maxY
  );

  // Footer with "gamer" style
  ctx.fillStyle = "#ff4500";
  ctx.font = "bold 22px Arial";
  if (channelName) {
    ctx.fillText(`LIVE NOW • twitch.tv/${channelName}`, width / 2, height - 30);
  } else {
    ctx.fillText("LIVE NOW • JOIN THE ACTION", width / 2, height - 30);
  }
}

// Helper function to wrap text
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }

  ctx.fillText(line, x, y);
  return y;
}

// Helper function to wrap centered text
function wrapTextCentered(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }

  ctx.fillText(line, x, y);
  return y;
}

// Helper function to draw a hexagon
function drawHexagon(ctx, x, y, size) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = ((2 * Math.PI) / 6) * i;
    const xPos = x + size * Math.cos(angle);
    const yPos = y + size * Math.sin(angle);

    if (i === 0) {
      ctx.moveTo(xPos, yPos);
    } else {
      ctx.lineTo(xPos, yPos);
    }
  }
  ctx.closePath();
  ctx.stroke();
}

// Helper function to wrap text with maximum height
function wrapTextWithMaxHeight(ctx, text, x, y, maxWidth, lineHeight, maxY) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + " ";
      currentY += lineHeight;

      // Check if we've reached the maximum height
      if (currentY + lineHeight > maxY) {
        // Add ellipsis to indicate truncated text
        ctx.fillText(line + "...", x, currentY);
        return currentY;
      }
    } else {
      line = testLine;
    }
  }

  // Draw the last line if we haven't exceeded maxY
  if (currentY <= maxY) {
    ctx.fillText(line, x, currentY);
  }

  return currentY;
}

// Helper function to wrap centered text with maximum height
function wrapTextCenteredWithMaxHeight(
  ctx,
  text,
  x,
  y,
  maxWidth,
  lineHeight,
  maxY
) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + " ";
      currentY += lineHeight;

      // Check if we've reached the maximum height
      if (currentY + lineHeight > maxY) {
        // Add ellipsis to indicate truncated text
        ctx.fillText(line + "...", x, currentY);
        return currentY;
      }
    } else {
      line = testLine;
    }
  }

  // Draw the last line if we haven't exceeded maxY
  if (currentY <= maxY) {
    ctx.fillText(line, x, currentY);
  }

  return currentY;
}

// Polyfill for roundRect if not supported
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (
    x,
    y,
    width,
    height,
    radius
  ) {
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    this.beginPath();
    this.moveTo(x + radius, y);
    this.arcTo(x + width, y, x + width, y + height, radius);
    this.arcTo(x + width, y + height, x, y + height, radius);
    this.arcTo(x, y + height, x, y, radius);
    this.arcTo(x, y, x + width, y, radius);
    this.closePath();
    return this;
  };
}
// Hashtag tab functionality
function initHashtagTabs() {
  const tabs = document.querySelectorAll(".hashtag-tab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      tabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      // Hide all hashtag categories
      document.querySelectorAll(".hashtag-category").forEach((category) => {
        category.classList.remove("active");
        category.style.display = "none";
      });

      // Show the selected category
      const categoryId = this.getAttribute("data-category") + "-hashtags";
      const selectedCategory = document.getElementById(categoryId);
      if (selectedCategory) {
        selectedCategory.classList.add("active");
        selectedCategory.style.display = "block";
      }
    });
  });
}

// URL Parameter Sharing functionality
function initUrlParamSharing() {
  // Get DOM elements
  const shareConfigBtn = document.getElementById("shareConfigBtn");
  const shareConfigLink = document.getElementById("shareConfigLink");
  const configLinkInput = document.getElementById("configLinkInput");
  const copyConfigLinkBtn = document.getElementById("copyConfigLinkBtn");

  // Add click handler for the share config button
  shareConfigBtn.addEventListener("click", function () {
    // Get current settings
    const gameTitle = document.getElementById("gameTitle").value;
    const theme = document.getElementById("theme").value;
    const emojiPack = document.getElementById("emojiPack").checked;

    // Get selected hashtags
    const selectedHashtags = [
      ...document.querySelectorAll(".hashtagOption:checked"),
    ].map((tag) => tag.value);

    // Get custom hashtags
    const customHashtags = document.getElementById("customHashtags").value;

    // Create URL parameters
    const params = new URLSearchParams();
    if (gameTitle) params.set("game", encodeURIComponent(gameTitle));
    if (theme) params.set("theme", theme);
    const emojiSelector = document.getElementById("emojiSelector");
    if (emojiSelector) {
      const emojiType = emojiSelector.value;
      params.set("emojiType", emojiType);

      if (
        emojiType !== "none" &&
        emojiType !== "theme" &&
        typeof window.getSelectedEmojis === "function"
      ) {
        const selectedEmojis = window.getSelectedEmojis(theme);
        if (selectedEmojis) {
          params.set("selectedEmojis", selectedEmojis.replace(/ /g, ","));
        }
      }
    } else if (document.getElementById("emojiPack").checked) {
      params.set("emoji", "1");
    }
    if (selectedHashtags.length > 0)
      params.set("tags", selectedHashtags.join(","));
    if (customHashtags)
      params.set("custom", encodeURIComponent(customHashtags));

    // Get Twitch channel if available
    const twitchChannel = document.getElementById("twitchChannel").value;
    if (twitchChannel) params.set("channel", encodeURIComponent(twitchChannel));

    // Generate the full URL
    const url = `${window.location.href.split("?")[0]}?${params.toString()}`;

    // Show the link section and populate the input
    shareConfigLink.style.display = "block";
    configLinkInput.value = url;
    configLinkInput.focus();
    configLinkInput.select();
  });

  // Add click handler for the copy link button
  copyConfigLinkBtn.addEventListener("click", function () {
    configLinkInput.select();
    document.execCommand("copy");

    // Provide feedback
    const originalText = this.textContent;
    this.textContent = "Copied!";
    setTimeout(() => {
      this.textContent = originalText;
    }, 2000);
  });

  // Check for URL parameters when the page loads
  loadFromUrlParams();
}

// Function to load settings from URL parameters
function loadFromUrlParams() {
  const params = new URLSearchParams(window.location.search);

  // Load game title
  if (params.has("game")) {
    const gameTitle = decodeURIComponent(params.get("game"));
    document.getElementById("gameTitle").value = gameTitle;
  }

  // Load theme
  if (params.has("theme")) {
    const theme = params.get("theme");
    document.getElementById("theme").value = theme;
  }

  // Load emoji pack setting
  if (params.has("emojiType")) {
    const emojiSelector = document.getElementById("emojiSelector");
    if (emojiSelector) {
      emojiSelector.value = params.get("emojiType");

      // Trigger the change event to update the UI
      const event = new Event("change");
      emojiSelector.dispatchEvent(event);

      // Load selected emojis if available
      if (
        params.has("selectedEmojis") &&
        typeof window.getSelectedEmojis === "function"
      ) {
        // This will be handled in the initEmojiPicker function
      }
    }
  } else if (params.has("emoji")) {
    document.getElementById("emojiPack").checked = params.get("emoji") === "1";
  }

  // Load hashtags
  if (params.has("tags")) {
    const tags = params.get("tags").split(",");
    // Uncheck all hashtags first
    document.querySelectorAll(".hashtagOption").forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Check the ones from the URL
    tags.forEach((tag) => {
      const checkbox = document.querySelector(`.hashtagOption[value="${tag}"]`);
      if (checkbox) checkbox.checked = true;
    });
  }

  // Load custom hashtags
  if (params.has("custom")) {
    document.getElementById("customHashtags").value = decodeURIComponent(
      params.get("custom")
    );
  }

  // Load Twitch channel
  if (params.has("channel")) {
    document.getElementById("twitchChannel").value = decodeURIComponent(
      params.get("channel")
    );
  }

  // If any parameters were provided, automatically generate a title
  if (window.location.search && params.size > 0) {
    // Trigger the generate button click after a short delay to ensure all settings are loaded
    setTimeout(() => {
      document.getElementById("generateBtn").click();
    }, 500);
  }
}
// Enhanced Emoji Selection functionality
function initEmojiPicker() {
  const themeSelector = document.getElementById("theme");
  const emojiSelector = document.getElementById("emojiSelector");
  const emojiPickerContainer = document.getElementById("emojiPickerContainer");
  const emojiGrid = document.querySelector(".emoji-grid");

  // Selected emojis
  let selectedEmojis = [];

  // Handle emoji selector change
  emojiSelector.addEventListener("change", function () {
    const selectedOption = this.value;

    if (selectedOption === "none") {
      emojiPickerContainer.style.display = "none";
      selectedEmojis = [];
    } else if (selectedOption === "theme") {
      // For theme-based, we'll use the theme dropdown to determine emojis
      emojiPickerContainer.style.display = "none";
      selectedEmojis = [];
    } else {
      // For other options, show the emoji picker
      emojiPickerContainer.style.display = "block";
      populateEmojiGrid(selectedOption);
    }
  });

  // Populate the emoji grid based on selection
  function populateEmojiGrid(type) {
    // Clear the grid
    emojiGrid.innerHTML = "";

    // Get the appropriate emoji set
    let emojis = [];
    if (type === "custom") {
      // For custom, show all available emojis
      Object.values(emojiSets).forEach((set) => {
        if (Array.isArray(set)) {
          emojis = [...emojis, ...set];
        } else {
          Object.values(set).forEach((subset) => {
            emojis = [...emojis, ...subset];
          });
        }
      });
      // Remove duplicates
      emojis = [...new Set(emojis)];
    } else {
      emojis = emojiSets[type];
    }

    // Add emojis to the grid
    emojis.forEach((emoji) => {
      const emojiItem = document.createElement("div");
      emojiItem.className = "emoji-item";
      emojiItem.textContent = emoji;
      emojiItem.setAttribute("data-emoji", emoji);

      // Check if this emoji is already selected
      if (selectedEmojis.includes(emoji)) {
        emojiItem.classList.add("selected");
      }

      // Add click handler
      emojiItem.addEventListener("click", function () {
        const emoji = this.getAttribute("data-emoji");

        if (this.classList.contains("selected")) {
          // Remove from selection
          this.classList.remove("selected");
          selectedEmojis = selectedEmojis.filter((e) => e !== emoji);
        } else {
          // Add to selection
          this.classList.add("selected");
          selectedEmojis.push(emoji);
        }
      });

      emojiGrid.appendChild(emojiItem);
    });
  }

  // Create a function to get emojis for the title
  window.getSelectedEmojis = function (theme) {
    const emojiType = emojiSelector.value;

    if (emojiType === "none") {
      return "";
    } else if (emojiType === "theme") {
      // For theme-based, use random emojis from the theme
      const themeEmojis = emojiSets.theme[theme] || [];
      if (themeEmojis.length === 0) return "";
      const count = Math.floor(Math.random() * 2) + 1;
      const randomEmojis = [];
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * themeEmojis.length);
        randomEmojis.push(themeEmojis[randomIndex]);
      }
      return randomEmojis.join(" ");
    } else if (emojiType === "custom") {
      // For custom selection, use the manually selected emojis
      return selectedEmojis.join(" ");
    } else {
      // For gaming and mood, check if there are manually selected emojis
      if (selectedEmojis.length > 0) {
        return selectedEmojis.join(" ");
      } else {
        // Fallback to random selection
        const styleEmojis = emojiSets[emojiType] || [];
        if (styleEmojis.length === 0) return "";
        const count = Math.floor(Math.random() * 2) + 1;
        const randomEmojis = [];
        for (let i = 0; i < count; i++) {
          const randomIndex = Math.floor(Math.random() * styleEmojis.length);
          randomEmojis.push(styleEmojis[randomIndex]);
        }
        return randomEmojis.join(" ");
      }
    }
  };

  // Randomizer Button Functionality
  document
    .getElementById("randomizeBtn")
    .addEventListener("click", function () {
      const themeSelect = document.getElementById("theme");
      const emojiSelector = document.getElementById("emojiSelector");
      const emojiPickerContainer = document.getElementById(
        "emojiPickerContainer"
      );

      // Get all available themes
      const themes = Array.from(themeSelect.options)
        .map((opt) => opt.value)
        .filter((val) => val);
      const randomTheme = themes[Math.floor(Math.random() * themes.length)];
      themeSelect.value = randomTheme;

      // Get all available emoji styles, excluding 'none' AND 'custom'
      const emojiOptions = Array.from(emojiSelector.options)
        .map((opt) => opt.value)
        .filter((val) => val !== "none" && val !== "custom");
      const randomEmojiStyle =
        emojiOptions[Math.floor(Math.random() * emojiOptions.length)];

      // IMPORTANT: Hide the emoji picker container BEFORE changing the dropdown value
      if (emojiPickerContainer) {
        emojiPickerContainer.style.display = "none";
      }

      // Now set the value
      emojiSelector.value = randomEmojiStyle;

      // Instead of triggering the change event, which would show the emoji picker,
      // we'll directly select a random emoji based on the chosen style
      if (randomEmojiStyle === "theme") {
        const themeEmojis = emojiSets.theme[randomTheme] || [];
        if (themeEmojis.length > 0) {
          selectedRandomEmoji =
            themeEmojis[Math.floor(Math.random() * themeEmojis.length)];
        }
      } else if (randomEmojiStyle === "gaming") {
        const gamingEmojis = emojiSets.gaming || [];
        if (gamingEmojis.length > 0) {
          selectedRandomEmoji =
            gamingEmojis[Math.floor(Math.random() * gamingEmojis.length)];
        }
      } else if (randomEmojiStyle === "mood") {
        const moodEmojis = emojiSets.mood || [];
        if (moodEmojis.length > 0) {
          selectedRandomEmoji =
            moodEmojis[Math.floor(Math.random() * moodEmojis.length)];
        }
      }
    });
}

// Global toggles (set from checkboxes)
let enableSFW = false;
let sortByCount = true;

let processedGames = [];
let processedTags = [];

//function for filtering games and tags
function filterGames() {
  const searchQuery = document
    .getElementById("searchGames")
    .value.toLowerCase();
  const popularityFilter = document.getElementById(
    "gamePopularityFilter"
  ).value;

  let filteredGames = processedGames.filter(({ name }) =>
    name.toLowerCase().includes(searchQuery)
  );

  if (popularityFilter === "high") {
    filteredGames.sort((a, b) => b.count - a.count); // Descending
  } else if (popularityFilter === "low") {
    filteredGames.sort((a, b) => a.count - b.count); // Ascending
  }

  displayGames(filteredGames);
}

function filterTags() {
  const searchQuery = document.getElementById("searchTags").value.toLowerCase();
  const popularityFilter = document.getElementById("tagPopularityFilter").value;

  let filteredTags = processedTags.filter(({ name }) =>
    name.toLowerCase().includes(searchQuery)
  );

  if (popularityFilter === "high") {
    filteredTags.sort((a, b) => b.count - a.count); // Descending
  } else if (popularityFilter === "low") {
    filteredTags.sort((a, b) => a.count - b.count); // Ascending
  }

  displayTags(filteredTags);
}

// Function to display games and tags
function displayGames(games) {
  const gameList = document.getElementById("games-list");
  gameList.innerHTML = "";

  games.forEach(({ name, count }) => {
    const li = document.createElement("li");
    li.textContent = `${name} (${count})`;
    gameList.appendChild(li);
  });
}

function displayTags(tags) {
  const tagList = document.getElementById("tags-list");
  tagList.innerHTML = "";

  tags.forEach(({ name, count }) => {
    const li = document.createElement("li");
    li.textContent = `${name} (${count})`;
    tagList.appendChild(li);
  });
}

async function fetchTrendingData() {
  try {
    const [gamesRes, tagsRes] = await Promise.all([
      fetch("community-games.json"),
      fetch("community-tags.json"),
    ]);

    processedGames = await gamesRes.json();
    processedTags = await tagsRes.json();

    const gameList = document.getElementById("games-list");
    const tagList = document.getElementById("tags-list");
    gameList.innerHTML = "";
    tagList.innerHTML = "";

    // 🧼 SFW filter
    if (enableSFW) {
      processedTags = processedTags.filter(({ name }) => isSafeTag(name));
    }

    // 🎮 Display Games
    processedGames.forEach(({ name, count }) => {
      const li = document.createElement("li");
      li.textContent = `${name} (${count})`;
      gameList.appendChild(li);
    });

    // 🏷️ Display Tags
    processedTags.forEach(({ name, count }) => {
      const li = document.createElement("li");
      li.textContent = `${name} (${count})`;
      tagList.appendChild(li);
    });
  } catch (err) {
    console.error("Failed to load trending data:", err);
  }
}
// event listener for game autofill
document
  .getElementById("gameTitle")
  .addEventListener("input", async (event) => {
    const query = event.target.value.toLowerCase();
    const filteredGames = processedGames.filter(({ name }) =>
      name.toLowerCase().includes(query)
    );
    const gameSuggestions = document.getElementById("gameSuggestions");
    gameSuggestions.innerHTML = "";

    filteredGames.forEach(({ name }) => {
      const li = document.createElement("li");
      li.textContent = name;
      li.addEventListener("click", () => {
        document.getElementById("gameTitle").value = name;
        gameSuggestions.innerHTML = "";
      });
      gameSuggestions.appendChild(li);
    });
  });

// event listener for tag autofill
document
  .getElementById("customHashtags")
  .addEventListener("input", async (event) => {
    const query = event.target.value.toLowerCase();
    const filteredTags = processedTags.filter(({ name }) =>
      name.toLowerCase().includes(query)
    );
    const tagSuggestions = document.getElementById("tagSuggestions");
    tagSuggestions.innerHTML = "";

    filteredTags.forEach(({ name }) => {
      const li = document.createElement("li");
      li.textContent = name;
      li.addEventListener("click", () => {
        const currentValue = document.getElementById("customHashtags").value;
        document.getElementById("customHashtags").value = currentValue
          ? `${currentValue}, ${name}`
          : name;
        tagSuggestions.innerHTML = "";
      });
      tagSuggestions.appendChild(li);
    });
  });

// Event listeners to update the toggles
document.addEventListener("DOMContentLoaded", () => {
  const sortToggle = document.getElementById("sort-toggle");
  const sfwToggle = document.getElementById("sfw-toggle");

  // Set initial checkbox states

  sfwToggle.checked = enableSFW;

  sfwToggle.addEventListener("change", () => {
    enableSFW = sfwToggle.checked;
    localStorage.setItem("enableSFW", enableSFW);
    fetchTrendingData();
  });

  // Initial load
  fetchTrendingData();
});

// Make sure this runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get references to elements
  const customTagsInput = document.getElementById("customHashtags");
  const savedTags = JSON.parse(localStorage.getItem("customTags")) || [];
  if (customTagsInput && savedTags.length > 0) {
    customTagsInput.value = savedTags.join(", ");
  }
  const customTagError = document.getElementById("customTagError");
  const offensiveTagWarning = document.getElementById("offensive-tag-warning");
  const generateBtn = document.getElementById("generateBtn");
  const tagPillsContainer = document.getElementById("customTagPills"); // First declaration

  // Debug element existence
  console.log("Custom tags input exists:", !!customTagsInput);
  console.log("Custom tag error exists:", !!customTagError);
  console.log("Offensive tag warning exists:", !!offensiveTagWarning);
  console.log("Generate button exists:", !!generateBtn);
  console.log("Tag pills container exists:", !!tagPillsContainer);

  // Function to find specific offensive words in the input
  function findOffensiveWords(input) {
    if (!input) return [];
    const normalised = input
      .toLowerCase()
      .replace(/[#@]/g, "") // Remove # and @ symbols but keep other punctuation
      .split(/[,\s]+/); // Split on commas or spaces
    return offensiveWords.filter((word) =>
      normalised.some((term) => term.includes(word))
    );
  }

  // Modified isOffensive function to handle hashtags better
  function isOffensive(input) {
    console.log("Checking if offensive:", input);
    if (!input) return false;
    const normalised = input
      .toLowerCase()
      .replace(/[#@]/g, "") // Remove # and @ symbols but keep other punctuation
      .split(/[,\s]+/); // Split on commas or spaces
    console.log("Normalized input:", normalised);
    const result = offensiveWords.some((word) =>
      normalised.some((term) => term.includes(word))
    );
    console.log("Is offensive:", result);
    return result;
  }

  // Function to check both offensive words and unsafe tags
  function checkCustomTags() {
    console.log("Checking custom tags");
    if (!customTagsInput) {
      console.log("Custom tags input not found");
      return;
    }
    const customTags = customTagsInput.value;
    console.log("Custom tags value:", customTags);
    const badWords = findOffensiveWords(customTags);
    console.log("Found offensive words:", badWords);
    if (badWords.length > 0 && customTagError) {
      customTagError.textContent = `Please note: ${badWords.join(
        ", "
      )} will be added to the generated content but not saved to the Community Trending Data`;
      customTagError.style.display = "block";
    } else if (customTagError) {
      customTagError.style.display = "none";
    }
    const tagsList = customTags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    console.log("Tags list:", tagsList);
    const hasUnsafeTags = tagsList.some((tag) => !isSafeTag(tag));
    console.log("Has unsafe tags:", hasUnsafeTags);
    if (hasUnsafeTags && offensiveTagWarning) {
      console.log("Showing unsafe tags warning");
      offensiveTagWarning.style.display = "block";
      offensiveTagWarning.style.visibility = "visible";
      offensiveTagWarning.style.opacity = "1";
    } else if (offensiveTagWarning) {
      console.log("Hiding unsafe tags warning");
      offensiveTagWarning.style.display = "none";
    }
  }

  // Function to render custom tags as pills
  function renderCustomTags() {
    if (!customTagsInput || !tagPillsContainer) {
      console.log("Custom tags input or pills container not found");
      return;
    }

    const input = customTagsInput.value;
    const tags = input
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    console.log("Rendering tags as pills:", tags);

    tagPillsContainer.innerHTML = "";
    tags.forEach((tag) => {
      const pill = document.createElement("div");
      pill.classList.add("tag-pill");

      // Flag as unsafe if needed
      if (isOffensive(tag) || !isSafeTag(tag)) {
        pill.classList.add("unsafe");
      }

      pill.textContent = tag;
      const removeBtn = document.createElement("button");
      removeBtn.innerHTML = "&times;";
      removeBtn.setAttribute("aria-label", "Remove tag");
      removeBtn.setAttribute("role", "button");
      removeBtn.setAttribute("title", "Remove Tag");

      pill.appendChild(removeBtn);
      tagPillsContainer.appendChild(pill);
    });
  }

  // Add event listeners
  customTagsInput.addEventListener("input", function () {
    checkCustomTags();
    renderCustomTags();
    const inputTags = customTagsInput.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    localStorage.setItem("customTags", JSON.stringify(inputTags));
  });

  if (customTagsInput) {
    console.log("Adding input event listener");
    customTagsInput.addEventListener("input", function () {
      checkCustomTags();
      renderCustomTags(); // Also render pills on input
    });
    customTagsInput.addEventListener("change", checkCustomTags);
    customTagsInput.addEventListener("blur", function () {
      checkCustomTags();
      renderCustomTags(); // Also render pills on blur
    });
  }

  if (generateBtn) {
    console.log("Adding click event listener to generate button");
    generateBtn.addEventListener("click", function (e) {
      console.log("Generate button clicked");
      checkCustomTags();
      // Don't prevent default - let the original handler run
    });
  }

  // Run once on page load
  console.log("Running initial check");
  setTimeout(function () {
    checkCustomTags();
    renderCustomTags(); // Initial render of pills
  }, 500);

  // Modify the tag removal event listener
  if (tagPillsContainer) {
    tagPillsContainer.addEventListener("click", function (event) {
      if (
        event.target.tagName === "BUTTON" &&
        event.target.textContent === "×"
      ) {
        console.log("Remove button (delegated) clicked!");
        const tagToRemove = event.target.previousSibling.textContent;
        console.log("Tag to remove (delegated):", tagToRemove);
        const currentInputValue = customTagsInput.value;
        console.log("Current input value (delegated):", currentInputValue);
        const currentTagsArray = currentInputValue
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
        console.log("Current tags array (delegated):", currentTagsArray);
        const newTagsArray = currentTagsArray.filter((t) => t !== tagToRemove);
        console.log("New tags array (delegated):", newTagsArray);
        customTagsInput.value = newTagsArray.join(", ");
        console.log(
          "Input value after removal (delegated):",
          customTagsInput.value
        );

        // Save to both storage mechanisms

        // 1. Save to customTags localStorage
        localStorage.setItem("customTags", JSON.stringify(newTagsArray));

        // 2. Trigger the main savePreferences function to update streamTitleGenerator
        // Create and dispatch a change event on the customHashtags input
        const changeEvent = new Event("change", { bubbles: true });
        customTagsInput.dispatchEvent(changeEvent);

        renderCustomTags();
        checkCustomTags();
      }
    });
  }
  function loadTotalUses() {
    fetch("total-uses.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update the total uses counter on the page
        if (document.getElementById("totalUses")) {
          // Use the correct property name 'total'
          if (data && typeof data.total !== "undefined") {
            document.getElementById("totalUses").textContent =
              data.total.toLocaleString();
          } else {
            console.error("Unexpected data format:", data);
            document.getElementById("totalUses").textContent = "unavailable";
          }
        }
      })
      .catch((error) => {
        console.error("Error loading total uses data:", error);
        if (document.getElementById("totalUses")) {
          document.getElementById("totalUses").textContent = "unavailable";
        }
      });
  }

  // Call the function to load total uses
  loadTotalUses();
});

window.onload = function () {
  const customTitleCheckbox = document.getElementById("customTitle");
  const customTitleSection = document.getElementById("customTitleSection");
};
