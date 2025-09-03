# Jouster Backend Sample

This is a minimal Express.js backend in TypeScript that exposes a `/api/analyze` endpoint. It accepts text from the frontend, sends it to OpenAI for summarization, and returns the summary.

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
