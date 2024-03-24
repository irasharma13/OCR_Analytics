let selectedFile;

document.getElementById('selectImage').addEventListener('click', function() {
  document.getElementById('imageInput').click();
});

document.getElementById('imageInput').addEventListener('change', function(event) {
  selectedFile = event.target.files[0];
  if (selectedFile) {
    const imageUrl = URL.createObjectURL(selectedFile);
    let img = document.querySelector('#step1 .box img');
    if (!img) {
      img = document.createElement('img');
      img.style.width = '100%'; 
      document.querySelector('#step1 .box').appendChild(img);
    }
    img.src = imageUrl;
  }
});

document.getElementById('ocrAnalyze').addEventListener('click', function() {
  if (!selectedFile) {
    alert('Please select an image first.');
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile);

  formData.append('apikey', 'K82290775288957');

  fetch('https://api.ocr.space/parse/image', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const outputBox = document.querySelector('#step3 #outputText');
    outputBox.value = ''; 
    if (data.ParsedResults && data.ParsedResults.length > 0) {
    const parsedText = data.ParsedResults[0].ParsedText;
    outputBox.value = parsedText; 
    } else {
    outputBox.value = 'No text could be detected or an error occurred.';
    }
    outputBox.scrollTop = 0;
  })
  .catch(error => {
    console.error('Error:', error);
    const outputBox = document.querySelector('#step3 .box');
    outputBox.textContent = 'An error occurred while processing the image.';
  });
});