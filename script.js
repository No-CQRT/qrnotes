
const editor = document.getElementById('editor');
const canvas = document.getElementById('qrcode');
const qrSize = canvas.parentElement.clientHeight;

canvas.width = qrSize;
canvas.height = qrSize;

function updateQR() {
  const text = editor.value.slice(0, 500);
  const encoded = btoa(encodeURIComponent(text));
  location.hash = encoded;

  const qr = qrcode(0, 'L');
  qr.addData(location.href);
  qr.make();

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const tileW = canvas.width / qr.getModuleCount();
  const tileH = canvas.height / qr.getModuleCount();

  for (let row = 0; row < qr.getModuleCount(); row++) {
    for (let col = 0; col < qr.getModuleCount(); col++) {
      ctx.fillStyle = qr.isDark(row, col) ? '#000' : '#fff';
      ctx.fillRect(col * tileW, row * tileH, tileW, tileH);
    }
  }
}

if (location.hash.length > 1) {
  try {
    const decoded = decodeURIComponent(atob(location.hash.slice(1)));
    editor.value = decoded;
  } catch (e) {
    console.error("Errore nella decodifica:", e);
  }
}

editor.addEventListener('input', updateQR);
window.addEventListener('load', updateQR);
window.addEventListener('resize', () => {
  const qrSize = canvas.parentElement.clientHeight;
  canvas.width = qrSize;
  canvas.height = qrSize;
  updateQR();
});
