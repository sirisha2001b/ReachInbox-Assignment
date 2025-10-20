**npm install typescript @types/node ts-node --save-dev**:
    above commend is used to Install TypeScript and related tools.

**IMAP Client**:
   Connect to email servers.

**Elasticsearch Client**:
  Connect Node.js to Elasticsearch for storing and searching emails.

**Gemini API**:
  AI classification & suggested replies.


**Docker Compose configuration**:
   version: '3.8'
services:
  # 1. Elasticsearch for Full-Text Search
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.17.1
    container_name: es-onebox
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - esdata:/usr/share/elasticsearch/data
    ports:
      - 9200:9200
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:9200 || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5

  # 2. Qdrant (Vector Database) for RAG
  qdrant:
    image: qdrant/qdrant
    container_name: qdrant-onebox
    ports:
      - 6333:6333 # REST API
      - 6334:6334 # gRPC
    volumes:
      - qdrant_storage:/qdrant/storage

volumes:
  esdata:
    driver: local
  qdrant_storage:
    driver: local

This file is typically named docker-compose.yml and is used to run multiple containers together.


**TypeScript interface**:
  // Conceptual Interface
interface EmailDocument {
    id: string; // Unique message ID
    accountId: string;
    folder: string; // INBOX, Sent, etc.
    subject: string;
    body: string; // Plain text content
    from: string;
    to: string[];
    date: Date;
    aiCategory: 'Interested' | 'Meeting Booked' | 'Not Interested' | 'Spam' | 'Out of Office' | 'Uncategorized';
    // Elasticsearch metadata
    indexedAt: Date;
}

this is the Typescript interface for the email data tobe stored.
in this
id(property)->string(type)->it is the Unique identifier for the email
accountId(property)->string(type)->it is the which email belongs to
folder(property)->string(type)->it is the The folder where the email is stored (INBOX, Sent, Drafts).
subject(property)->string(type)->it is the The Subject line of the email.
body(property)->string(type)->it is the body of the email.
from(property)->string(type)->it is the Sender’s email address.
to(property)->string(type)->it is the receiver,s email address.
date(property)->Date(type)->it is the Time of when the email was sent or received.
aiCategory(property)->Union type(type)->it is the AI classification label. Must be one of the following: 'Interested', 'Meeting Booked', 'Not Interested', 'Spam', 'Out of Office', 'Uncategorized'.
indexedAt(property)-> Date(type)->it is the Time when this email was indexed into Elasticsearch for search.


**Phase 2: Searchable Storage using Elasticsearch**:

// Conceptual Elasticsearch Index Mapping setup
await client.indices.create({
    index: 'emails',
    mappings: {
        properties: {
            subject: { type: 'text' },
            body: { type: 'text' },
            accountId: { type: 'keyword' },
            folder: { type: 'keyword' },
            date: { type: 'date' },
            aiCategory: { type: 'keyword' }
        }
    }
});


in this
subject(property)->text(type)->	Full-text search for the email’s subject. 
body(property)->	text(type)->	Full-text search for the email body. 
accountId(property)->	keyword(type)->	Exact match filtering for account IDs . 
folder(property)->	keyword(type)->	Exact match filtering for email folder (INBOX, Sent, etc.).
date(property)->	date(type)->	Stores the email date for sorting or filtering by date range.
aiCategory(property)->	keywordtype)->	Stores the AI-generated category (e.g., 'Interested'). 


**Search and Filtering Implementation**:
// Conceptual Search Query Body for Elasticsearch
const esQuery = {
  query: {
    bool: {
      must: [
        { multi_match: { query: 'search term', fields: ['subject', 'body'] } }
      ],
      filter: [
        { term: { accountId: 'user@example.com' } }
      ]
    }
  }
};

The bool query allows combining different conditions:
  must → Conditions that must match
  filter → Conditions used for filtering.

must Clause:
  multi_match: Searches for the query text in multiple fields.
  query: 'search term' → The text we want to search.
  fields: ['subject', 'body'] →  in both the email subject and body.


filter Clause:
  term: Exact match


**Phase 3: AI-Based Email Categorization**:
const systemInstruction = "You are an expert email classifier. Your task is to analyze the provided email text and categorize it into one of the following labels: Interested, Meeting Booked, Not Interested, Spam, or Out of Office.";

This is the instruction or prompt sent to the AI model.
It tells the AI exactly what its role is.The AI is expected to return only one of the above  labels.

const responseSchema = {
  type: "OBJECT",
  properties: {
    category: {
      type: "STRING",
      enum: ["Interested", "Meeting Booked", "Not Interested", "Spam", "Out of Office"]
    }
  }
};

type: "OBJECT" → The AI should return a JSON object.
properties → Defines fields in the object: here, only category.
enum → Restricts the possible values for category to the five labels.


**Phase 4: Slack & Webhook Integration**:
// Conceptual Webhook Sending Function
async function triggerWebhook(emailData) {
  const webhookUrl = process.env.WEBHOOK_SITE_URL;
  const slackUrl = process.env.SLACK_WEBHOOK_URL;

  // 1. Slack Notification
  await fetch(slackUrl, { /* ... payload for Slack ... */ });

  // 2. Generic Webhook for Automation
  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: 'InterestedLead', email: emailData })
  });
}


if 
  AI classifies an email as “Interested”.
Backend calls triggerWebhook(emailData).
Slack gets notified → “New Interested Lead 🚀”.
CRM system receives webhook → creates lead automatically.


**Phase 5: Frontend Interface (Simple UI)**:
implemented in this with two files are app.js and Email Component

Email Component:
   it is a react classcomponent.
   in this implemented(Email List,filtering,and searcgbar)












