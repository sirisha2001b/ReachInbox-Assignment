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