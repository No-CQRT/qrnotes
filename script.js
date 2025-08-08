const editor = document.getElementById('editor');
const charCount = document.getElementById('char-count');
const copyIcon = document.getElementById('copy-icon');
const copyPopup = document.getElementById('copy-popup');

// Decodifica hash all'avvio
if (location.hash.length > 1) {
  try {
    const decoded = decodeURIComponent(atob(location.hash.slice(1)));
    editor.value = decoded;
    charCount.textContent = 2000 - editor.value.length;
  } catch (e) {
    console.error("Errore nella decodifica:", e);
  }
} else {
  editor.value = "Benvenuto su Hash Notes! Condividi questa nota semplicemente copiando l'URL.";
  charCount.textContent = 2000 - editor.value.length;
  const encoded = btoa(encodeURIComponent(editor.value));
  location.hash = encoded;
}

// Aggiorna hash e contatore quando si scrive
editor.addEventListener('input', () => {
  const text = editor.value.slice(0, 2000);
  editor.value = text;
  const encoded = btoa(encodeURIComponent(text));
  location.hash = encoded;
  charCount.textContent = 2000 - text.length;
});

// Copia URL negli appunti
copyIcon.addEventListener('click', () => {
  navigator.clipboard.writeText(location.href).then(() => {
    copyPopup.style.display = 'block';
    setTimeout(() => {
      copyPopup.style.display = 'none';
    }, 2000);
  });
});
