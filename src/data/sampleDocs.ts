import { MarkdownDoc } from "../types";

// Import markdown files as raw strings
import welcomeContent from './welcome.md?raw';
import journalContent from './journal.md?raw';

const now = new Date().toISOString();

export const sampleDocs: MarkdownDoc[] = [
  {
    id: "welcome",
    title: "Welcome Guide",
    source: "sample",
    updatedAt: now,
    content: welcomeContent,
  },
  {
    id: "journal",
    title: "Field Notes",
    source: "sample",
    updatedAt: now,
    content: journalContent,
  }
];