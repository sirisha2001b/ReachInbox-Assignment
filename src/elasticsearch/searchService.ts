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