import { showAlert } from "../utils/alerts.js";

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
              <label for="register-name" class="block font-sans text-base mb-2">Username</label>
              <input 
                type="text" 
                id="register-name" 
                required
                pattern="[a-zA-Z0-9_]+"
                title="Only letters, numbers, and underscores allowed"
                placeholder="username"
                style="width: 100%; padding: 12px 16px; border: 1px solid #D8D6D0; border-radius: 4px; background-color: #FEFBF4; font-family: Lora, serif; font-size: 16px;"
              >
              <p class="text-xs text-secondary-text mt-1">Only letters, numbers, and underscores. No spaces.</p>
            </div>
            
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
                minlength="8"
                placeholder="Password (min 8 characters)"
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

export async function initNavigation() {
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

  const { getUser, getToken } = await import("../storage/localStorage.js");
  const user = getUser();
  const token = getToken();
  const isLoggedIn = !!(user && token);

  if (isLoggedIn) {
    let userCredits = 0;
    try {
      const { getProfile } = await import("../api/profiles/getProfile.js");
      const { data } = await getProfile(user.name);
      userCredits = data.credits || 0;
    } catch (error) {
      console.error("Failed to load user credits:", error);
    }
    profileMainView.innerHTML = `
    <div class="pb-4 mb-4 border-b border-border">
      <h2 class="font-heading font-bold text-2xl mb-2">Welcome ${user.name}</h2>
      <p class="font-sans text-base text-secondary-text">Credit: <span class="font-bold text-button-gold">$${userCredits.toLocaleString()}</span></p>
    </div>
    <div class="space-y-4 pb-4 mb-4 border-b border-border">
      <a href="/profile/" class="flex items-center justify-between font-heading text-xl hover:text-button-gold transition-colors">
        My Profile
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </a>
      <a href="/listings/create/" class="flex items-center justify-between font-heading text-xl hover:text-button-gold transition-colors">
        Create New Listing
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </a>
    </div>
    <button id="logout-btn" class="btn-dark w-full">Logout</button>
  `;

    document
      .getElementById("logout-btn")
      ?.addEventListener("click", async () => {
        const { clearUser, clearToken } = await import(
          "../storage/localStorage.js"
        );
        clearUser();
        clearToken();

        showAlert("Logged out successfully!", "success");

        profileMenu.classList.add("translate-x-full");
        profileOverlay.classList.add("hidden");

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  }

  document.getElementById("show-signin")?.addEventListener("click", () => {
    hideAllProfileViews();
    profileSigninView.classList.remove("hidden");
  });

  document.getElementById("show-register")?.addEventListener("click", () => {
    hideAllProfileViews();
    profileRegisterView.classList.remove("hidden");
  });

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

  document.getElementById("goto-register")?.addEventListener("click", () => {
    hideAllProfileViews();
    profileRegisterView.classList.remove("hidden");
  });

  document.getElementById("goto-signin")?.addEventListener("click", () => {
    hideAllProfileViews();
    profileSigninView.classList.remove("hidden");
  });

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

  profileToggle?.addEventListener("click", () => {
    profileMenu.classList.remove("translate-x-full");
    profileOverlay.classList.remove("hidden");
    hideAllProfileViews();
    profileMainView.classList.remove("hidden");
  });

  profileClose?.addEventListener("click", () => {
    profileMenu.classList.add("translate-x-full");
    profileOverlay.classList.add("hidden");
  });

  profileOverlay?.addEventListener("click", () => {
    profileMenu.classList.add("translate-x-full");
    profileOverlay.classList.add("hidden");
  });

  document
    .getElementById("register-form")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("register-name").value.trim();
      const email = document.getElementById("register-email").value.trim();
      const password = document.getElementById("register-password").value;

      if (!/^[a-zA-Z0-9_]+$/.test(name)) {
        showAlert(
          "Username can only contain letters, numbers, and underscores.",
          "error",
        );
        return;
      }

      if (!email.endsWith("@stud.noroff.no")) {
        showAlert("Email must be a valid @stud.noroff.no address.", "error");
        return;
      }

      if (password.length < 8) {
        showAlert("Password must be at least 8 characters long.", "error");
        return;
      }

      try {
        const { registerUser } = await import("../api/auth/register.js");
        await registerUser({ name, email, password });

        showAlert("Registration successful! Please sign in.", "success");

        document.getElementById("register-form").reset();

        hideAllProfileViews();
        profileSigninView.classList.remove("hidden");
      } catch (error) {
        showAlert(error.message, "error");
      }
    });

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

        saveUser(data);
        saveToken(data.accessToken);

        showAlert("Login successful!", "success");

        profileMenu.classList.add("translate-x-full");
        profileOverlay.classList.add("hidden");

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        showAlert(error.message, "error");
      }
    });
}
