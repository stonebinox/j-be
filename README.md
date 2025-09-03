# Jouster Backend Sample

This is a minimal Express.js backend in TypeScript that exposes a `/api/analyze` endpoint and a `/api/history` endpoint. This allows for large text to be analysed and for users to see a history of past runs.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root with:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```
3. Run in development mode:
   ```bash
   npm run dev
   ```

## Build and Run

```bash
npm run build
npm start
```

## Endpoint

- **POST** `/api/analyze`

  - Body: `{ "text": "your text here" }`
  - Returns: `{ "data": "..." }`

- **GET** `/api/history`
  - Returns `{ "data": [] }`

## Explanation

This projedct is meant to remain simple, exposing just two endpoints. The analyze endpoint uses `gpt-5-mini` to generate an output and this is then written to the database. I've personally found `gpt-5-mini` to be useful and more precise when defining rough schema in instructions as opposed to using a formal scHema structure.

Since we now have this data in the DB, it made sense to have this be fetched too.

I opted to _not_ use Postgres or any other service bearing in mind that this had to be quick to setup. SQLite seemed ideal here.

---
