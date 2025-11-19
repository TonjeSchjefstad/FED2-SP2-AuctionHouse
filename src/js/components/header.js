export function renderHeader() {
  return `
    <div class=" bg-header border-b border-border py-4 shadow-md">
        <div class="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-4">
            <div class="flex items-center justify-between">

                <button id="menu-toggle" class="text-primary-text hover:text-button-gold transition-colors"
                    aria-label="Toggle menu">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <a href="/" class="text-center">
                    <h1 class="font-logo font-bold text-2xl md:text-3xl">Maison Ardéne</h1>
                    <p class="font-logo-small text-xs uppercase tracking-wider">Auction House</p>
                </a>

                <button id="profile-toggle" class="text-primary-text hover:text-button-gold transition-colors"
                    aria-label="Profile">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </button>

            </div>
        </div>
    </div>
`;
}
