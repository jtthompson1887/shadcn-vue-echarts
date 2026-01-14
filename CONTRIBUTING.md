# Contributing to shadcn-vue-echarts

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Getting Started

1. Fork the repository and clone your fork
2. Install dependencies: `pnpm install`
3. Create a feature branch: `git checkout -b feat/amazing-feature`
4. Make your changes
5. Run tests: `pnpm -r test`
6. Run linter: `pnpm -r lint`
7. Commit with a clear message
8. Push to your fork
9. Open a Pull Request

### Commit Messages

Use conventional commits:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `test:` for tests
- `refactor:` for code refactoring
- `chore:` for maintenance

Example: `feat: add support for custom legend positioning`

### Code Style

- Use TypeScript for all code
- Follow the existing code style
- Run `pnpm format` to auto-format
- Ensure `pnpm lint` passes

### Testing

- Add tests for new features
- Ensure all tests pass: `pnpm -r test`
- Maintain >80% code coverage

### Documentation

- Update documentation for new features
- Add examples to relevant guides
- Run docs locally: `cd docs && pnpm dev`

## Release Process

We use Changesets for semantic versioning:

1. After your PR is merged, create a changeset: `pnpm changeset`
2. Select the bump type (major, minor, patch)
3. Provide a summary of changes
4. Commit the changeset file
5. Maintainers will handle version bumping and publishing

## License

By contributing, you agree that your contributions will be licensed under its MIT License.

## Questions?

Open an issue with the `question` label, and we'll respond as soon as we can.
