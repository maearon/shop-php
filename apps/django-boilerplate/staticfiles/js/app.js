// Hiển thị log khi DOM đã tải xong
document.addEventListener('DOMContentLoaded', () => {
  console.log('🌐 App loaded!');
  
  // Tự động focus vào phần tử đầu tiên có class .autofocus nếu có
  const firstInput = document.querySelector('.autofocus');
  if (firstInput) {
    firstInput.focus();
  }
});

// Ví dụ: thông báo click vào bất kỳ button nào
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    console.log(`🖱️ Clicked button: ${e.target.textContent}`);
  }
});
