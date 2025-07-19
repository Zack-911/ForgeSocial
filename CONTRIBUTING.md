# Contributing to Forgereddit

Thanks for your interest in contributing to **Forgereddit**!  
We welcome bugfixes, features, documentation, and thoughtful ideas. This guide covers how to get started, how we work, and how to contribute effectively.

---

## 🧭 Table of Contents

- [Getting Started](#getting-started)
- [Code of Conduct](#code-of-conduct)
- [Development Setup](#development-setup)
- [Branching & Workflow](#branching--workflow)
- [Code Standards](#code-standards)
- [Commit Conventions](#commit-conventions)
- [Issue Reporting](#issue-reporting)
- [Pull Request Process](#pull-request-process)
- [Security](#security)
- [Community](#community)

---

## Getting Started

- Check for open issues first.
- For new features, open a [discussion](https://github.com/your-org/forgereddit/discussions) before coding.
- For small fixes or improvements, feel free to jump in.

---

## Code of Conduct

We follow the [Contributor Covenant](https://www.contributor-covenant.org/).  
See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for details.

---

## Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/forgereddit.git
cd forgereddit
````

### 2. Install Dependencies

```bash
npm install
```

### 4. Start the Dev Server

```bash
npm run dev
```

---

## Branching & Workflow

We follow a strict `main`/`dev` split:

* `main`: Always stable and production-ready.
* `dev`: Active development. **All pull requests must target `dev`**.

## Code Standards

* Use modern JavaScript / TypeScript.
* Prefer **clarity over cleverness**.
* Include **JSDoc** for exported functions and non-trivial logic.
* Follow our configured ESLint and Prettier rules:

  ```bash
  npm run lint
  npm run format
  ```

---

## Commit Conventions

Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to label commits:

```
feat: add post sorting by score
fix: prevent crash on empty comments
docs: update README with setup steps
```

---

## Issue Reporting

### Bug Reports

* Describe the issue clearly.
* Include steps to reproduce.
* Mention browser, OS, or Node version if relevant.

### Feature Requests

* Explain the need and use case.
* Link related discussions or issues if available.

---

## Pull Request Process

1. Fork and create a branch off of `dev`.
2. Make your changes.
3. Run tests and linter:

   ```bash
   npm run lint
   npm test
   ```
4. Open a PR **into `dev`** with a clear title and description.
5. Link related issues in the description (e.g. `Closes #12`).

PRs will be reviewed for clarity, scope, and alignment with project goals. Feedback is common — stay engaged.

---

## Security

If you find a security vulnerability, **do not open a public issue**.

Instead, email me at: [muhammadbinasim471@gmail.com](mailto:muhammadbinasim471@gmail.com)

---

## Community

* 💬 [GitHub Discussions](https://github.com/your-org/forgereddit/discussions)
* 🐛 [Issue Tracker](https://github.com/your-org/forgereddit/issues)

We're glad you're here. Thanks for helping build Forgereddit!
