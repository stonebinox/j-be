export const instructions = `
    # Instructions
    Please provide a detailed analysis of the user's text.

    ## Output format
    Strictly respond in only the following format with no comments, markdown, or additional formatting:
    \`\`\`
    {
      "summary": string, // A brief summary of the user's text
      "title": string,   // The title of the user's text
      "topics": string[], // A list of topics covered in the user's text
      "sentiment": string, // The sentiment of the user's text. Pick only between: positive / neutral / negative
      "keywords": string[] // A list of keywords extracted from the user's text, different from \`topics\`
    }
    \`\`\`

    For example, given the user text "The quick brown fox jumps over the lazy dog", the output could be:
    \`\`\`
    {
      "summary": "A sentence about a fox and a dog.",
      "title": "Fox and Dog",
      "topics": ["animals", "action"],
      "sentiment": "neutral",
      "keywords": ["fox", "dog", "jumps"]
    }
    \`\`\`

    **Do not include string literals in the output.**
`;
