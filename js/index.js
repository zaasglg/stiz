document.addEventListener("DOMContentLoaded", () => {

	// Tabbar
	const buttons = document.querySelectorAll(".tab-btn");
	const contents = document.querySelectorAll(".tab-content");

	function activateTab(tabId) {
		buttons.forEach(btn => btn.classList.remove("border", "border-[#979797]", "bg-white", "border-b-white", "rounded-t-xl"));
		contents.forEach(content => content.classList.add("hidden"));
		// contents.forEach(content => content.classList.add("border", "border-[#979797]", "bg-white", "border-b-white", "rounded-t-xl"));

		document.querySelector(`[data-tab="${tabId}"]`).classList.add("border", "border-[#979797]", "bg-white", "border-b-white", "rounded-t-xl");
		document.getElementById(`tab-${tabId}`).classList.remove("hidden");
	}

	buttons.forEach(btn => {
		btn.addEventListener("click", () => activateTab(btn.dataset.tab));
	});

	activateTab(1);

	AOS.init();

});


