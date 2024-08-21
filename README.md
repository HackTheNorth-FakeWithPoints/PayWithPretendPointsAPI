# Pay With Pretend Points API

A Node.js API for managing points in a loyalty and rewards system.

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/PayWithPretendPointsAPI.git

   cd PayWithPretendPointsAPI
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Run the Server in Development Mode:**

   ```bash
   npm run dev
   ```

## Development

**Commits must follow the format of:**

```bash
feat|fix|chore|docs|test|style|refactor|perf|build|ci|revert:(<scope>): "YOUR COMMIT MESSAGE"

e.g. feat(app): initial commit
```

**Run the `format` command to lint code:**

```bash
npm run format
```

**Run the `swagger` command to generate oas.yml:**:

```bash
npm run swagger
```

**Spin up a local database instance:**:

```bash
# on first run or changes made
docker compose -f docker-compose.local.yml up --build

# if not changes made, this is faster
docker compose up
```

**Sequelize migration template:**

```js
'use strict'

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize & import('sequelize').DataTypes} Sequelize
   * @returns {Promise<void>}
   */
  up: async (queryInterface, Sequelize) => {
    // your up migration here...
  },
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @returns {Promise<void>}
   */
  down: async (queryInterface) => {
    // your down migration here...
  }
}
```
