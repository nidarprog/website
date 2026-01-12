// This script tests the navbar functionality across all pages
// Run this in the browser console to test

function testNavbarFunctionality() {
  console.log("Testing navbar functionality...");
  
  // Test hamburger menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  
  if (hamburger && navMenu) {
    console.log("Initial nav-menu state:", navMenu.classList.contains("active") ? "active" : "inactive");
    console.log("Clicking hamburger menu...");
    hamburger.click();
    console.log("After click nav-menu state:", navMenu.classList.contains("active") ? "active" : "inactive");
    
    // Test dropdown toggle in mobile view
    const dropdownLink = document.querySelector(".dropdown > a");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    
    if (dropdownLink && dropdownMenu) {
      console.log("Initial dropdown-menu display:", dropdownMenu.style.display || "none");
      console.log("Clicking dropdown link...");
      dropdownLink.click();
      console.log("After click dropdown-menu display:", dropdownMenu.style.display);
      
      // Click again to hide
      console.log("Clicking dropdown link again...");
      dropdownLink.click();
      console.log("After second click dropdown-menu display:", dropdownMenu.style.display);
    } else {
      console.error("Dropdown elements not found");
    }
    
    // Reset nav-menu state
    console.log("Clicking hamburger menu again to reset...");
    hamburger.click();
    console.log("Final nav-menu state:", navMenu.classList.contains("active") ? "active" : "inactive");
  } else {
    console.error("Hamburger or nav-menu elements not found");
  }
  
  // Test XP HUD functionality
  const xpLevel = document.querySelector("[data-hm-level]");
  const xpValue = document.querySelector("[data-hm-xp]");
  const xpBar = document.querySelector("[data-hm-xpbar]");
  
  if (xpLevel && xpValue && xpBar) {
    console.log("XP HUD is present and properly initialized:");
    console.log("- Current level:", xpLevel.textContent);
    console.log("- Current XP:", xpValue.textContent);
    console.log("- XP bar width:", xpBar.style.width);
  } else {
    console.warn("XP HUD elements not found or not properly initialized");
  }
  
  console.log("Navbar testing complete");
}

// Instructions for testing
console.log("=== NAVBAR TEST INSTRUCTIONS ===");
console.log("1. Run this script in the browser console on each page");
console.log("2. Check that the hamburger menu toggles correctly");
console.log("3. Check that dropdown menus work in both desktop and mobile views");
console.log("4. Verify that the XP HUD is displayed and initialized");
console.log("5. Test on index.html, lessons/reference.html, and lessons/basics.html");
console.log("===============================");

// Call the test function
testNavbarFunctionality();