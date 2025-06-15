document.addEventListener("DOMContentLoaded", () => {
	console.log('JavaScript loaded successfully!');

	// Tabbar
	const buttons = document.querySelectorAll(".tab-btn");
	const contents = document.querySelectorAll(".tab-content");

	function activateTab(tabId) {
		buttons.forEach(btn => btn.classList.remove("border", "border-[#979797]", "bg-white", "border-b-white", "rounded-t-xl"));
		contents.forEach(content => content.classList.add("hidden"));

		document.querySelector(`[data-tab="${tabId}"]`).classList.add("border", "border-[#979797]", "bg-white", "border-b-white", "rounded-t-xl");
		document.getElementById(`tab-${tabId}`).classList.remove("hidden");
	}

	buttons.forEach(btn => {
		btn.addEventListener("click", () => activateTab(btn.dataset.tab));
	});

	activateTab(1);

	// Modal functionality
	const modal = document.getElementById('orderModal');
	const closeModalBtn = document.getElementById('closeModal');
	const orderForm = document.getElementById('orderForm');
	const successMessage = document.getElementById('successMessage');
	const selectedProductDiv = document.getElementById('selectedProduct');

	// Initialize phone mask when DOM is loaded
	let phoneMask = null;
	
	// Function to initialize phone mask
	function initPhoneMask() {
		const phoneInput = document.getElementById('customerPhone');
		if (phoneInput && !phoneMask) {
			phoneMask = IMask(phoneInput, {
				mask: '+{7} (000) 000-00-00',
				lazy: false,
				placeholderChar: '_'
			});
		}
	}

	// Function to open modal
	function openModal(productName = 'Герметик Стиз') {
		selectedProductDiv.textContent = `Выбранный товар: ${productName}`;
		modal.classList.remove('hidden');
		document.body.style.overflow = 'hidden';
		
		// Initialize phone mask after modal is shown
		setTimeout(() => {
			initPhoneMask();
		}, 100);
	}

	// Function to close modal
	function closeModal() {
		modal.classList.add('hidden');
		document.body.style.overflow = 'auto';
		orderForm.reset();
		orderForm.style.display = 'block';
		successMessage.classList.add('hidden');
		
		// Reset phone mask
		if (phoneMask) {
			phoneMask.value = '';
		}
	}

	// Add event listeners to all "Заказть" buttons
	document.addEventListener('click', (e) => {
		const target = e.target;
		
		// Check if clicked element is an order button
		if (target.tagName === 'A' && target.textContent.trim() === 'Заказть') {
			e.preventDefault();
			
			// Try to find product name from the same card
			let productName = 'Герметик Стиз';
			const productCard = target.closest('.group');
			if (productCard) {
				const productSpan = productCard.querySelector('.f-bebas');
				if (productSpan) {
					productName = productSpan.textContent.trim();
				}
			}
			
			openModal(productName);
		}
	});

	// Close modal events
	closeModalBtn.addEventListener('click', closeModal);
	
	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			closeModal();
		}
	});

	// Close modal on Escape key
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
			closeModal();
		}
	});

	// Form submission
	orderForm.addEventListener('submit', (e) => {
		e.preventDefault();
		
		const name = document.getElementById('customerName').value;
		const phone = phoneMask ? phoneMask.unmaskedValue : document.getElementById('customerPhone').value;
		const product = selectedProductDiv.textContent;
		
		console.log('Order submitted:', { name, phone, product });
		
		// Отправляем данные на PHP
		const formData = new FormData();
		formData.append('name', name);
		formData.append('phone', phone);
		formData.append('product', product);
		
		// Показываем индикатор загрузки
		const submitButton = orderForm.querySelector('button[type="submit"]');
		const originalButtonText = submitButton.textContent;
		submitButton.textContent = 'Отправляем...';
		submitButton.disabled = true;
		
		fetch('send_order.php', {
			method: 'POST',
			body: formData
		})
		.then(response => response.json())
		.then(data => {
			if (data.success) {
				// Show success message
				orderForm.style.display = 'none';
				successMessage.classList.remove('hidden');
				
				// Auto close after 3 seconds
				setTimeout(() => {
					closeModal();
				}, 3000);
			} else {
				alert(data.message || 'Произошла ошибка при отправке заказа');
			}
		})
		.catch(error => {
			console.error('Error:', error);
			alert('Произошла ошибка при отправке заказа. Попробуйте еще раз или свяжитесь с нами по телефону.');
		})
		.finally(() => {
			// Восстанавливаем кнопку
			submitButton.textContent = originalButtonText;
			submitButton.disabled = false;
		});
	});

	AOS.init();

});


