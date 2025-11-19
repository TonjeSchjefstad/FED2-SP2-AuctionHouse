export function renderNavigation() {
  return `
    <!-- Mobile Menu Overlay -->
    <div id="menu-overlay" class="hidden fixed inset-0 bg-black/50 z-40"></div>
    
    <!-- Mobile Menu (Navigation Only) -->
    <nav id="mobile-menu" class="fixed top-0 left-0 h-full w-full sm:w-100 bg-header shadow-lg transform -translate-x-full transition-transform duration-300 z-50 overflow-y-auto">
      <div class="p-6">
        
        <!-- Close Button -->
        <button id="menu-close" class="absolute top-4 left-4 text-primary-text hover:text-button-gold">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <!-- Navigation Links -->
        <div class="mt-12 space-y-4">
          <a href="/" class="block font-heading text-xl hover:text-button-gold transition-colors flex items-center justify-between">
            Home
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="/listings/" class="block font-heading text-xl hover:text-button-gold transition-colors flex items-center justify-between">
            Auctions
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="/about/" class="block font-heading text-xl hover:text-button-gold transition-colors flex items-center justify-between">
            About
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="/contact/" class="block font-heading text-xl hover:text-button-gold transition-colors flex items-center justify-between">
            Contact
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="/faq/" class="block font-heading text-xl hover:text-button-gold transition-colors flex items-center justify-between">
            FAQ
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

      </div>
    </nav>

    <!-- Profile Menu Overlay -->
    <div id="profile-overlay" class="hidden fixed inset-0 bg-black/50 z-40"></div>
    
    <!-- Profile Menu -->
    <nav id="profile-menu" class="fixed top-0 right-0 h-full w-full sm:w-100 bg-header shadow-lg transform translate-x-full transition-transform duration-300 z-50 overflow-y-auto">
      <div class="p-6">
        
        <!-- Close Button -->
        <button id="profile-close" class="absolute top-4 right-4 text-primary-text hover:text-button-gold">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <!-- Main View (Not Logged In) -->
        <div id="profile-main-view" class="mt-12">
          <h2 class="font-heading text-2xl mb-6">Sign In</h2>
          <p class="font-sans text-base mb-6">Sign in to access your profile, create listings, and place bids.</p>
          <button id="show-signin" class="btn-dark w-full mb-3">Sign In</button>
          <button id="show-register" class="btn-gold w-full">Create an account</button>
        </div>

        <!-- Sign In View -->
        <div id="profile-signin-view" class="hidden mt-12">
          <button id="back-to-profile-main-signin" class="flex items-center gap-2 text-primary-text hover:text-button-gold mb-6">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Back
          </button>
          
          <h2 class="font-heading text-3xl mb-6">Sign In</h2>
          
          <form id="signin-form" class="space-y-4">
            <div>
              <label for="signin-email" class="block font-sans text-base mb-2">Email</label>
              <input 
                type="email" 
                id="signin-email" 
                required
                placeholder="example@stud.noroff.no"
                style="width: 100%; padding: 12px 16px; border: 1px solid #D8D6D0; border-radius: 4px; background-color: #FEFBF4; font-family: Lora, serif; font-size: 16px;"
              >
            </div>
            
            <div>
              <label for="signin-password" class="block font-sans text-base mb-2">Password</label>
              <input 
                type="password" 
                id="signin-password" 
                required
                placeholder="Password"
                style="width: 100%; padding: 12px 16px; border: 1px solid #D8D6D0; border-radius: 4px; background-color: #FEFBF4; font-family: Lora, serif; font-size: 16px;"
              >
            </div>
            
            <a href="#" class="block text-sm font-sans hover:text-button-gold">Forgot your password?</a>
            
            <button type="submit" class="btn-dark w-full">Sign In</button>
            
            <button type="button" id="goto-register" class="btn-gold w-full">Create an account</button>
          </form>
        </div>

        <!-- Register View -->
        <div id="profile-register-view" class="hidden mt-12">
          <button id="back-to-profile-main-register" class="flex items-center gap-2 text-primary-text hover:text-button-gold mb-6">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Back
          </button>
          
          <h2 class="font-heading text-3xl mb-6">Create an account</h2>
          
          <form id="register-form" class="space-y-4">
            <div>
              <label for="register-email" class="block font-sans text-base mb-2">Email</label>
              <input 
                type="email" 
                id="register-email" 
                required
                placeholder="example@stud.noroff.no"
                style="width: 100%; padding: 12px 16px; border: 1px solid #D8D6D0; border-radius: 4px; background-color: #FEFBF4; font-family: Lora, serif; font-size: 16px;"
              >
            </div>
            
            <div>
              <label for="register-password" class="block font-sans text-base mb-2">Password</label>
              <input 
                type="password" 
                id="register-password" 
                required
                placeholder="Password"
                style="width: 100%; padding: 12px 16px; border: 1px solid #D8D6D0; border-radius: 4px; background-color: #FEFBF4; font-family: Lora, serif; font-size: 16px;"
              >
            </div>
            
            <button type="submit" class="btn-gold w-full">Register</button>
            
            <button type="button" id="goto-signin" class="btn-dark w-full">Sign In</button>
          </form>
        </div>

      </div>
    </nav>
  `;
}

export function initNavigation() {
  const menuToggle = document.getElementById("menu-toggle");
  const menuClose = document.getElementById("menu-close");
  const menuOverlay = document.getElementById("menu-overlay");
  const mobileMenu = document.getElementById("mobile-menu");

  const profileToggle = document.getElementById("profile-toggle");
  const profileClose = document.getElementById("profile-close");
  const profileOverlay = document.getElementById("profile-overlay");
  const profileMenu = document.getElementById("profile-menu");

  const profileMainView = document.getElementById("profile-main-view");
  const profileSigninView = document.getElementById("profile-signin-view");
  const profileRegisterView = document.getElementById("profile-register-view");

  function hideAllProfileViews() {
    profileMainView.classList.add("hidden");
    profileSigninView.classList.add("hidden");
    profileRegisterView.classList.add("hidden");
  }

  const isLoggedIn = false;

  // Show Sign In
  document.getElementById("show-signin")?.addEventListener("click", () => {
    hideAllProfileViews();
    profileSigninView.classList.remove("hidden");
  });

  // Show Register
  document.getElementById("show-register")?.addEventListener("click", () => {
    hideAllProfileViews();
    profileRegisterView.classList.remove("hidden");
  });

  // Back to Main
  document
    .getElementById("back-to-profile-main-signin")
    ?.addEventListener("click", () => {
      hideAllProfileViews();
      profileMainView.classList.remove("hidden");
    });

  document
    .getElementById("back-to-profile-main-register")
    ?.addEventListener("click", () => {
      hideAllProfileViews();
      profileMainView.classList.remove("hidden");
    });

  // Switch between Sign In and Register
  document.getElementById("goto-register")?.addEventListener("click", () => {
    hideAllProfileViews();
    profileRegisterView.classList.remove("hidden");
  });

  document.getElementById("goto-signin")?.addEventListener("click", () => {
    hideAllProfileViews();
    profileSigninView.classList.remove("hidden");
  });

  // Mobile Menu Navigation
  menuToggle?.addEventListener("click", () => {
    mobileMenu.classList.remove("-translate-x-full");
    menuOverlay.classList.remove("hidden");
  });

  menuClose?.addEventListener("click", () => {
    mobileMenu.classList.add("-translate-x-full");
    menuOverlay.classList.add("hidden");
  });

  menuOverlay?.addEventListener("click", () => {
    mobileMenu.classList.add("-translate-x-full");
    menuOverlay.classList.add("hidden");
  });

  // Profile Icon
  profileToggle?.addEventListener("click", () => {
    if (isLoggedIn) {
      window.location.href = "/profile.html";
    } else {
      profileMenu.classList.remove("translate-x-full");
      profileOverlay.classList.remove("hidden");
      hideAllProfileViews();
      profileMainView.classList.remove("hidden");
    }
  });

  profileClose?.addEventListener("click", () => {
    profileMenu.classList.add("translate-x-full");
    profileOverlay.classList.add("hidden");
  });

  profileOverlay?.addEventListener("click", () => {
    profileMenu.classList.add("translate-x-full");
    profileOverlay.classList.add("hidden");
  });

  // Register form submit
  document
    .getElementById("register-form")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("register-email").value;
      const password = document.getElementById("register-password").value;

      const name = email.split("@")[0].replace(".", "_");

      try {
        const { registerUser } = await import("../api/auth/register.js");
        await registerUser({ name, email, password });

        alert("Registration successful! Please sign in.");

        // Switch to sign in view
        hideAllProfileViews();
        profileSigninView.classList.remove("hidden");
      } catch (error) {
        alert(error.message);
      }
    });

  // Sign in form submit
  document
    .getElementById("signin-form")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("signin-email").value;
      const password = document.getElementById("signin-password").value;

      try {
        const { loginUser } = await import("../api/auth/login.js");
        const { saveUser, saveToken } = await import(
          "../storage/localStorage.js"
        );

        const { data } = await loginUser({ email, password });

        // Save user data and token to localStorage
        saveUser(data);
        saveToken(data.accessToken);

        alert("Login successful!");

        // Close menu and reload page
        profileMenu.classList.add("translate-x-full");
        profileOverlay.classList.add("hidden");
        window.location.reload();
      } catch (error) {
        alert(error.message);
      }
    });
}
