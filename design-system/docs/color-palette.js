// Color Palette Page - Copy to Clipboard

function copy(hex, el) {
  navigator.clipboard.writeText(hex).then(() => {
    const t = document.getElementById('toast');
    t.textContent = 'Copied: ' + hex;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 1800);
  }).catch(err => {
    console.error('Copy failed:', err);
    BD.Toast.error('Failed to copy');
  });
}

// Add click handlers to all swatches
document.addEventListener('DOMContentLoaded', () => {
  const swatches = document.querySelectorAll('.swatch, .token-card');
  swatches.forEach(swatch => {
    swatch.style.cursor = 'pointer';
  });
});
