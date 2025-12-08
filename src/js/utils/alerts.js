export function showAlert(message, type = "info") {
  const container = document.getElementById("alert-container");
  if (!container) {
    console.error("Alert container not found");
    return;
  }

  const alert = document.createElement("div");
  alert.className = `flex items-start gap-2 p-3 rounded-lg shadow-lg bg-white border-l-4 animate-slide-in sm:gap-3 sm:p-4`;

  const configs = {
    success: {
      icon: `<svg class="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#C6A24A"/><path d="M9 12l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      title: "Success",
      borderColor: "border-button-gold",
    },
    error: {
      icon: `<svg class="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#EF4444"/><path d="M15 9l-6 6M9 9l6 6" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>`,
      title: "Error",
      borderColor: "border-red-500",
    },
    info: {
      icon: `<svg class="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#3B82F6"/><path d="M12 16v-4M12 8h.01" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>`,
      title: "Info",
      borderColor: "border-blue-500",
    },
    warning: {
      icon: `<svg class="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 20h20L12 2z" fill="#F59E0B"/><path d="M12 9v4M12 17h.01" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>`,
      title: "Warning",
      borderColor: "border-yellow-500",
    },
  };

  const config = configs[type] || configs.info;

  alert.classList.add(config.borderColor);
  alert.innerHTML = `
    ${config.icon}
    <div class="flex-1 min-w-0">
      <h3 class="font-heading font-bold text-lg mb-1">${config.title}</h3>
      <p class="font-sans text-sm text-secondary-text">${message}</p>
    </div>
    <button class="alert-close text-gray-400 hover:text-gray-600 transition-colors shrink-0">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
      </svg>
    </button>
  `;

  container.appendChild(alert);

  const closeBtn = alert.querySelector(".alert-close");
  closeBtn.addEventListener("click", () => {
    removeAlert(alert);
  });

  const autoCloseDelay = {
    success: 4000,
    info: 4000,
    warning: 4000,
    error: 4000,
  };

  const delay = autoCloseDelay[type] || 5000;

  if (delay > 0) {
    setTimeout(() => {
      if (alert.parentElement) {
        removeAlert(alert);
      }
    }, delay);
  }
}

function removeAlert(alert) {
  alert.classList.remove("animate-slide-in");
  alert.classList.add("animate-slide-out");
  setTimeout(() => {
    if (alert.parentElement) {
      alert.remove();
    }
  }, 300);
}
