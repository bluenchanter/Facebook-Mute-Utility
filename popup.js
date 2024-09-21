document.addEventListener('DOMContentLoaded', function () {
  const settingsButton = document.getElementById('settingsButton');
  const settingsDiv = document.getElementById('settings');
  const saveButton = document.getElementById('saveButton');
  const keywordsInput = document.getElementById('keywordsInput');
  const statsDiv = document.createElement('div');

  statsDiv.id = 'stats';
  statsDiv.style.marginTop = '20px';
  statsDiv.style.fontSize = '16px';
  document.body.appendChild(statsDiv);


  chrome.storage.local.get(['keywordsToHide'], function(result) {
      if (result.keywordsToHide) {
          keywordsInput.value = result.keywordsToHide.join(', '); 
          updateStats(result.keywordsToHide.length); 
      }
  });


  settingsButton.addEventListener('click', function () {
      settingsDiv.style.display = settingsDiv.style.display === 'none' ? 'block' : 'none';
  });


  saveButton.addEventListener('click', function () {
      const keywords = keywordsInput.value.split(',').map(word => word.trim()).filter(word => word !== '');
      chrome.storage.local.set({ keywordsToHide: keywords }, function () {
          alert('Ayarlar kaydedildi!');
          updateStats(keywords.length); 
          window.location.reload(); 
      });
  });

  function updateStats(count) {
      statsDiv.textContent = `${count} words or people are set to be hidden.`;
  }
});
