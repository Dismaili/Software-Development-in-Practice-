# Changelog

All notable changes to this project will be documented in this file.


---

## [1.1.0] - 2025-05-28

### Added
- Implemented tail collision logic: allows moving into another snake’s tail only if that snake is not going to eat (Iteration 3 – Task 17).
- Developed flood fill algorithm using Test-Driven Development for improved space evaluation (Iteration 3 – Task 18).
- Set up test suite infrastructure using Jest and eslint-jest-plugin (Iteration 3 – Task 19).
- Achieved 50%+ automated test coverage across the project (Iteration 3 – Task 20).

### Notes
- This release completes **Iteration 3** as defined in the CCS2430 requirements.
- All future logic will build on top of the testing and pathfinding foundation established in this version.

---

## [1.0.0] - 2025-05-27

### Added
- Implemented Pull Request template in `.github/pull_request_template.md` to standardize future contributions.
- Created `CHANGELOG.md` to track versioned changes.
- Developed Manhattan Distance logic for pathfinding to the nearest food tile.
- Set up GitHub Project Board to track tasks across all iterations.
- Integrated GitHub Actions for automated testing and deployment workflows.
- Established code formatting guidelines and integrated linting tools.

### Improved
- Enhanced decision-making logic: Snake now chooses the closest food tile rather than moving randomly.
- Organized repository with consistent branching and structured commits following GitFlow.

### Notes
- This release completes **Iteration 2** as defined in the CCS2430 requirements.

---

## [1.0.0] - 2025-05-26

### Added
- Initial release version
- Add pull request template
