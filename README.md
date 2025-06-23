# CommonShare Dashboard

A data-driven admin dashboard for the CommonShare impact-investing platform, built with Nuxt 3, Vue 3, Tailwind CSS, SCSS (BEM), Pinia, and Vitest. Provides secure login, user metrics, country rankings, and a paginated/searchable user table.

---

## 📦 Tech Stack

- **Framework:** [Nuxt 3](https://v3.nuxtjs.org) (Vue 3 + Vite)
- **State Management:** [Pinia](https://pinia.vuejs.org) + [pinia-plugin-persistedstate](https://github.com/prazdevs/pinia-plugin-persistedstate)
- **Styling:**
  - [Tailwind CSS](https://tailwindcss.com) for utility-first styles
  - SCSS with **BEM** naming and `@apply` to bundle Tailwind utilities
- **API & Server:** Nitro serverless in `server/api/`
- **Testing:** [Vitest](https://vitest.dev) with unit, integration, and component tests
- **CI/CD:** GitHub Actions (matrix builds, lint, test, build)

---

## 🚀 Features

- **Auth**: Secure login via `/api/auth/login`
- **Dashboard**:
  - Total users, admin/viewer percentages, average age
  - Top 5 countries by user count
- **Users Page**:
  - Server-fetched `/api/users`
  - Search by name/email
  - Filter by country
  - Pagination (10 users per page)
- **Responsive Layout**: Sidebar + Navbar with mobile-friendly toggles
- **Accessibility**: Semantic HTML, ARIA labels, keyboard focus styles
- **BEM + SCSS**: Modular, maintainable styling with Tailwind via `@apply`
- **Persistence**: Auth state persisted via cookies
- **Full Test Coverage**:
  - Store unit tests
  - API handler integration tests
  - Component tests (Navbar, Sidebar)

---

## 📁 Folder Structure

```
.
├── assets/
│   └── scss/
│       └── main.scss          # global variables & CSS custom-properties
├── components/
│   ├── Navbar.vue
│   └── layouts/
│       └── Sidebar.vue
├── composables/                # reusable composable functions
├── layouts/
│   ├── default.vue             # wraps Navbar + Sidebar + <NuxtPage>
│   └── empty.vue               # blank layout for login
├── pages/
│   ├── index.vue               # Dashboard
│   ├── users.vue               # Users table, search, filter, pagination
│   └── login.vue               # Login form
├── server/
│   ├── api/
│   │   ├── users.ts            # GET /api/users (strips passwords)
│   │   └── auth/
│   │       └── login.post.ts   # POST /api/auth/login
│   └── data/
│       └── users.json          # sample user data
├── stores/
│   └── auth.ts                 # Pinia auth store with persistedstate
├── tests/
│   ├── unit/                   # store & composable unit tests
│   ├── integration/            # API handler tests
│   └── components/             # Navbar, Sidebar component tests
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI
├── docs/
│   └── api.md                  # API documentation
├── tailwind.config.js
├── nuxt.config.ts
├── postcss.config.js
├── vitest.config.ts
└── package.json
```

---

## 🔧 Getting Started

### Prerequisites

- Node.js 18+ (we test on 18 and 20 in CI)
- npm (or pnpm/yarn)

### Install & Dev

```bash
git clone https://github.com/your-org/commonshare-dashboard.git
cd commonshare-dashboard
npm ci
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## 📜 Scripts

| Command                      | Description                      |
| ---------------------------- | -------------------------------- |
| `npm run dev`              | Start dev server (hot-reload)    |
| `npm run build`            | Production build                 |
| `npm run preview`          | Preview production build locally |
| `npm run lint`             | Run ESLint on JS/TS/Vue files    |
| `npm test`                 | Run all Vitest tests             |
| `npm run test:unit`        | Run unit tests only              |
| `npm run test:integration` | Run integration tests            |

---

## 📖 API Documentation

See [docs/api.md](./docs/api.md) for full request/response specs and examples.

---

## 📈 CI/CD

Continuous Integration is configured in `.github/workflows/ci.yml`:

- **Matrix** builds on Node 16, 18, 20+
- **Jobs**: lint → unit & integration tests → production build
- **Concurrency**: cancels in-progress runs on new commits

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Commit your changes (`git commit -m "feat: add ..."`)
4. Push to your branch (`git push origin feat/my-feature`)
5. Open a Pull Request against `main`

Please include tests and update docs where applicable.

---

## 📜 License

[MIT](./LICENSE)

---

*Made with ❤️ by a Front-end Engineer (Vue/Nuxt) - Anton Vorobiov -*
