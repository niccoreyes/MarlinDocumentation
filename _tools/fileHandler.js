let dropZone = document.getElementById('drop_zone');
let fileInfo = document.getElementById('fileInfo');

// Function to handle file
function handleFile(file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const gcode = e.target.result;
    parseGcode(gcode);
    genGcode();
  };
  reader.readAsText(file);
}

// Event listener for file input change
document.getElementById("gcodeFile").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    handleFile(file);
  }
});

// Highlight drop zone when file is dragged over it
dropZone.addEventListener('dragover', function(event) {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
  dropZone.style.backgroundColor = '#eee'; // Change the color or add a class to change the style
});

// Reset drop zone's style when file is dragged out of it
dropZone.addEventListener('dragleave', function(event) {
  dropZone.style.backgroundColor = ''; // Reset the color or remove the class added earlier
});

// Handle the file that is dropped
dropZone.addEventListener('drop', function(event) {
  event.stopPropagation();
  event.preventDefault();
  dropZone.style.backgroundColor = ''; // Reset the color or remove the class added earlier

  let file = event.dataTransfer.files[0]; // Get the file
  document.getElementById('gcodeFile').files = event.dataTransfer.files; // Assign it to the file input field

  // Update file info
  fileInfo.textContent = `Loaded file: ${file.name}`;

  // Handle the file
  handleFile(file);
}); 