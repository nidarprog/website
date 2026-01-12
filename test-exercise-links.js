// This script tests the exercise links functionality
// Run this in the browser console to test

function testExerciseLinks() {
  console.log("Testing exercise links functionality...");
  
  // Test if the startExercise function exists
  if (typeof window.startExercise !== 'function') {
    console.error("startExercise function not found!");
    return;
  }
  
  console.log("startExercise function exists");
  
  // Get the pages object from the startExercise function
  const startExerciseStr = window.startExercise.toString();
  const pagesMatch = startExerciseStr.match(/const pages = \{([^}]+)\}/);
  
  if (!pagesMatch) {
    console.error("Could not find pages object in startExercise function");
    return;
  }
  
  console.log("Pages object found in startExercise function");
  
  // Extract and display the exercise paths
  const pagesStr = pagesMatch[1];
  const paths = pagesStr.match(/["']([^"']+)["']/g);
  
  if (!paths) {
    console.error("Could not extract paths from pages object");
    return;
  }
  
  console.log("Exercise paths:");
  paths.forEach(path => {
    const cleanPath = path.replace(/["']/g, '');
    console.log(`- ${cleanPath}`);
    
    // Check if the file exists by creating a test request
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(`✅ ${cleanPath} exists`);
        } else {
          console.error(`❌ ${cleanPath} returned status ${xhr.status}`);
        }
      }
    };
    
    // Use HEAD request to check if file exists without downloading it
    xhr.open('HEAD', cleanPath, true);
    xhr.send();
  });
  
  console.log("Exercise links testing initiated. Check results above.");
}

// Call the test function
testExerciseLinks();