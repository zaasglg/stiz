// Альтернативная версия отправки заказа через mailto
// Замените код формы в index.js на этот, если EmailJS не настроен

// Form submission (Alternative version with mailto)
orderForm.addEventListener('submit', (e) => {
	e.preventDefault();
	
	const name = document.getElementById('customerName').value;
	const phone = phoneMask ? phoneMask.unmaskedValue : document.getElementById('customerPhone').value;
	const product = selectedProductDiv.textContent;
	
	console.log('Order submitted:', { name, phone, product });
	
	// Формируем данные для письма
	const subject = encodeURIComponent(`Новый заказ с сайта СТИЗ - ${name}`);
	const body = encodeURIComponent(`
Поступил новый заказ с сайта СТИЗ:

Клиент: ${name}
Телефон: ${phone}
Товар: ${product}
Дата заказа: ${new Date().toLocaleString('ru-RU')}

---
Автоматическое уведомление с сайта СТИЗ
	`.trim());
	
	// Открываем почтовый клиент
	const mailtoLink = `mailto:n4msin@mail.ru?subject=${subject}&body=${body}`;
	window.open(mailtoLink, '_blank');
	
	// Show success message
	orderForm.style.display = 'none';
	successMessage.classList.remove('hidden');
	
	// Auto close after 3 seconds
	setTimeout(() => {
		closeModal();
	}, 3000);
});
