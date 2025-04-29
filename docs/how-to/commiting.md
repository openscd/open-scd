# 📝 Commit Message Guidelines

## Purpose

To maintain a clean, readable, and automated commit history, we enforce the [Conventional Commits ↗](https://www.conventionalcommits.org/en/v1.0.0/) specification across this repository.

All commits **must** follow the format described below. Commits that do not comply will be automatically rejected by our Git hooks.

---

## 📋 Commit Format

```
<type>(<scope>): <subject>
```

- `type`: the kind of change you're committing.
- `scope`: the specific part of the codebase affected (optional but encouraged).
- `subject`: a brief description of the change.

---
## ✏️ Examples

Good examples:
```
feat(core): add authentication module
fix(openSCD): resolve login redirect bug
docs: update contributing guidelines
chore: update eslint config
```

Bad examples (these would be rejected):
```
"fix bug"
"updated stuff"
"small changes"
```

---
## 🔖 Some of the allowed Types

⚠️ Disclaimer: For a full list please visit the [conventional commits ↗](https://www.conventionalcommits.org/en/v1.0.0/) page

| Type       | Purpose                                                  |
|------------|-----------------------------------------------------------|
| feat       | A new feature                                              |
| fix        | A bug fix                                                  |
| docs       | Documentation only changes                                |
| style      | Changes that do not affect meaning (formatting, etc.)      |
| refactor   | Code change that neither fixes a bug nor adds a feature    |
| perf       | A code change that improves performance                   |
| test       | Adding or correcting tests                                |
| chore      | Maintenance tasks (build process, tooling, dependencies)  |

---

## 🧠 Additional Notes

- The commit hook will automatically validate your message.
- If your commit is rejected, edit your message and try again.
- For complex changes, you can add a longer body after the subject, separated by a blank line.

Example:
```
feat(core): support new user roles

This adds support for multiple user role types in the core module. Also refactors the existing permission system to be more scalable.
```

---

# ✅ Quick Checklist Before Committing

- [ ] Is my commit message following the format?
- [ ] Is the type correct (`feat`, `fix`, `chore`, etc.)?
- [ ] Did I specify the correct scope (`core`, `openSCD`, `distribution`, etc...) if applicable?
- [ ] Is the message short, clear, and imperative?

