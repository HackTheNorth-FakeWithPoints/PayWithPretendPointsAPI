# Pay With Pretend Points API

A Node.js API for managing points in a loyalty and rewards system.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/HackTheNorth-FakeWithPoints/PayWithPretendPointsAPI.git

   cd PayWithPretendPointsAPI
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the server in development mode:**

   ```bash
   npm run dev
   ```

## Development

### **Contributing**

**Commits must follow the format of:**

```bash
feat|fix|chore|docs|test|style|refactor|perf|build|ci|revert:(<scope>): "YOUR COMMIT MESSAGE"

git commit -m "feat(app): initial commit"

git commit -m "feat: initial commit"
```

### **Database**

**Spin up a local database instance:**

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

### **Commands**

**Run the `migrate` command to apply database migrations:**

```bash
npm run migrate
```

**Run the `swagger` command to generate oas.yml:**

```bash
npm run swagger
```

**Run the `validate` command to check errors and if build passes:**

```bash
npm run validate
```

**Run the `format` command to fix errors and check the build:**

```bash
npm run format
```

**Run the `build` command to create a production build of the app:**

```bash
npm run build
```

**Run the `start` command to start the app with a production build:**

```bash
npm run start
```

### **NPM Helpers**

```bash
# install dependencies
npm i

# check for latest minor and patch versions
npm outdated

# update all to latest minor and patch versions
npm update

# check for unused dependencies
npx depcheck

# update all packages to latest major versions
npm npm-check-updates -u
```
