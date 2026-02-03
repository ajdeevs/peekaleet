#  Contributing to PeekALeet

First off, thank you for considering contributing to **PeekALeet**!  
Your time and effort help improve the project for everyone.

This document outlines how to contribute effectively and maintain the quality and architecture of the project.

---

##  Project Philosophy

PeekALeet is designed to:

- Use a **single GraphQL request**
- Remain lightweight
- Avoid unnecessary dependencies
- Stay backend-friendly
- Keep public profile support only
- Maintain performance efficiency

Please respect this architecture when contributing.

---

#  How to Contribute

## 1. Fork the Repository

Click the **Fork** button at the top-right of the GitHub repository.

---

## 2️. Clone Your Fork

```bash
git clone https://github.com/your-username/PeekALeet.git
cd PeekALeet
```
## 3. Create a feature branch
```bash
git checkout -b feature/your-feature-name
```

## 4. Commit Changes
```bash
git commit -m "Add: TypeScript support"
```
## 5. Raise a PR
```bash
git push origin feature/your-feature-name
```

# Architectural Rules

These are important:

❗ Do NOT convert to multiple GraphQL calls

❗ Do NOT add scraping logic

❗ Do NOT introduce authentication dependencies

❗ Keep it public-profile only

❗ Maintain single-request efficiency

Performance is a **core** principle of this project.