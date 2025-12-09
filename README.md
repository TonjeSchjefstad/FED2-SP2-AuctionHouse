# Maison Ardéne Auction House

![image](https://i.imghippo.com/files/gifw1005sAE.png)

## Description
This project is the frontend for Maison Ardéne, a fictional high-end auction house. Built for my Semester Project 2 at Noroff using vanilla JavaScript and Tailwind CSS. It allows users to browse luxury items, place bids, and manage their own listings. The site integrates with the Noroff Auction House API v2, providing a clean, modern, and fully functional auction experience.

Live Demo: https://maison-ardene.netlify.app/



## Getting Started

### Prerequisites
- Node.js (v20+)
- npm

### Installing

1. Clone the repository:

```bash
git clone https://github.com/TonjeSchjefstad/FED2-SP2-AuctionHouse.git
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file in the root directory:
```
VITE_API_BASE_URL=https://v2.api.noroff.dev
VITE_API_KEY=your-api-key-here
```

### Running

Start the development server with:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```



## Environment Variables
This project uses environment variables. Create a .env file in the root of your project:
```bash
VITE_API_BASE_URL=https://v2.api.noroff.dev
VITE_API_KEY=your-noroff-api-key
```
Never commit your .env file to version control. It's included in .gitignore.



## Available Scripts

### Development
- `npm run dev` – Start Vite development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build locally

### Code Quality
- `npm run lint` – Run ESLint to check code quality
- `npm run format` – Format code with Prettier
- `npm run prepare` – Install Husky git hooks



## Project Structure

```bash
FED2-SP2-AuctionHouse
├── about/
│  └── index.html
├── contact/
│  └── index.html
├── faq/
│  └── index.html
├── listings/
│   ├── create/
│       └── index.html
│   ├── edit/
│       └── index.html
│   ├── listing/
│       └── index.html
│   └── index.html
├── profile/
│   ├── edit/
│       └── index.html
│   └── index.html
├── public/
│   └── assets/
├── src/
│   ├── css/
│   │  └── style.css
│   └── js/
│      ├── api/
│          └── auth/
│          └── listings/
│          └── profiles/
│          └── constants.js
│      ├── components/
│      ├── pages/
│      ├── storage/
│      ├── utils/
│      └── main.js
├── .env.example
├── .gitignore
├── .prettierrc
├── 404.html
├── README.md
├── eslint.config.mjs
├── index.html
├── netlify.toml
├── package-lock.json
├── package.json
└── vite.config.js

```

## Folder Highlights
- public/assets/ → Favicon and static images
- src/css/ → Tailwind configuration and custom styles
- src/js/api/ → API integration (auth, listings, profiles)
- src/js/components/ → Reusable components (header, footer)
- src/js/pages/ → Page-specific JavaScript
- src/js/utils/ → Helper functions (validation, alerts, image optimization)



## Tech Stack
- HTML5 - Semantic markup
- Tailwind CSS v4 - Utility-first styling
- Vanilla JavaScript - ES6 modules (no frameworks)
- Vite - Build tool and dev server
- ESLint - Code linting
- Prettier - Code formatting
- Husky - Git hooks for code quality
- Netlify - Deployment
- Noroff Auction House API v2 - Backend integration
- Google Fonts - Playfair Display & Lora



## User Features
#### Authentication:
- Register new user
- Login and logout

#### Listings:
- View all auction listings with search and filters
- View single listing with image gallery and bid history
- Create new listings (title, description, images, end date)
- Edit and delete own listings

#### Bidding:
- Place bids on active auctions
- View bid history
- Credit balance validation
- See current highest bid

#### Profile Management:
- Customize profile with banner and avatar
- Edit bio
- View credit balance
- See active listings, previous listings, bids, and wins
- View other users' profiles
- Watchlist feature (localStorage)

#### UI/UX:
- Responsive design (mobile-first)
- Category filtering (Watches, Handbags, Jewelry, etc.)
- Form validation with instant feedback
- Success/error alert notifications
- Accessible navigation with ARIA labels



## Future Improvements
- Light/Dark Mode
- Unit and E2E testing

## JSDocs
- `loginUser` (src\js\api\auth\login.js) → Handles user authentication
- `registerUser` (src/js/api/auth/register.js) → Creates a new user account
- `createListing` (src\js\api\listings\createListing.js) → Creates new listing with title, description, images and end date. 
- `placeBid`  (src\js\api\listings\placeBid.js) → Places bid on listing with credit balance validation.

## Contact
### Tonje Schjefstad
Frontend Development Student
Noroff School of Technology and Digital Media

- LinkedIn: https://www.linkedin.com/in/tonjeschjefstad/
- GitHub: https://github.com/TonjeSchjefstad
- Student email: tonsch03841@stud.noroff.no
- Private email: Tonje_schjefen@hotmail.com
