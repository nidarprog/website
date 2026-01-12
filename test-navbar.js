// This script tests the navbar functionality
// Run this in the browser console to test

function testNavbar() {
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
  
  console.log("Navbar testing complete");
}

// Call the test function
testNavbar();