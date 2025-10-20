// Conceptual System Instruction and Schema
const systemInstruction =
  'You are an expert email classifier. Your task is to analyze the provided email text and categorize it into one of the following labels: Interested, Meeting Booked, Not Interested, Spam, or Out of Office.'

const responseSchema = {
  type: 'OBJECT',
  properties: {
    category: {
      type: 'STRING',
      enum: [
        'Interested',
        'Meeting Booked',
        'Not Interested',
        'Spam',
        'Out of Office',
      ],
    },
  },
}
