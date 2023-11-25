let cookies = 0;
let cookiesPerClick = 1;
let cookiesPerSecond = 0;

let upgrades = {
  autoClicker: { cost: 50, value: 1, cps: 1 },
  cursor: { cost: 100, value: 1, cps: 2 },
  grandma: { cost: 200, value: 1, cps: 5 },
  factory: { cost: 500, value: 1, cps: 10 },
  mine: { cost: 1000, value: 1, cps: 20 },
  shipment: { cost: 2000, value: 1, cps: 30 },
};

// Load saved game state on page load
window.onload = function() {
  loadGame();
  updateDisplay();
};

function clickCookie() {
  cookies += cookiesPerClick;
  updateDisplay();
  saveGame();
}

function buyUpgrade(upgradeType, cost) {
  if (cookies >= cost) {
    cookies -= cost;
    cookiesPerClick += upgrades[upgradeType].value;
    cookiesPerSecond += upgrades[upgradeType].cps;
    upgrades[upgradeType].value++;
    updateDisplay();
    saveGame();
  } else {
    alert("Not enough cookies!");
  }
}

function updateDisplay() {
  document.getElementById("cookie").innerHTML = `Click me! (${cookiesPerClick} cookies per click)`;
  document.getElementById("cookies").innerHTML = `${cookies} cookies`;
  document.getElementById("cps").innerHTML = `${cookiesPerSecond} cookies per second`;
}

function autoClick() {
  cookies += cookiesPerSecond;
  updateDisplay();
  saveGame(); // Save game state every second
}

setInterval(autoClick, 1000); // Update cookies per second every second

// Save the game state to cookies
function saveGame() {
  const saveData = {
    cookies: cookies,
    cookiesPerClick: cookiesPerClick,
    cookiesPerSecond: cookiesPerSecond,
    upgrades: upgrades,
  };

  document.cookie = "cookieClickerSave=" + JSON.stringify(saveData) + "; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
}

// Load the game state from cookies
function loadGame() {
  const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)cookieClickerSave\s*=\s*([^;]*).*$)|^.*$/, "$1");
  if (cookieValue) {
    const saveData = JSON.parse(cookieValue);
    cookies = saveData.cookies || 0;
    cookiesPerClick = saveData.cookiesPerClick || 1;
    cookiesPerSecond = saveData.cookiesPerSecond || 0;
    upgrades = saveData.upgrades || {};
  }
}
