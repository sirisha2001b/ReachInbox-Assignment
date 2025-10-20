import Email from "./fronted/Email"


const emailsList = [
  {
    id: '1',
    accountId: '1',
    folder: 'INBOX',
    subject: 'Meeting tomorrow at 10 AM',
    body: 'Hi John, looking forward to our meeting tomorrow.',
    from: 'manager@company.com',
    to: 'john@example.com',
    date: new Date('2025-10-18T09:00:00Z'),
    aiCategory: 'Interested',
  },
  {
    id: '2',
    accountId: '2',
    folder: 'Sent',
    subject: 'Meeting tomorrow at 11 AM',
    body: 'Hi Jessy, looking forward to our meeting tomorrow.',
    from: 'manager@company.com',
    to: 'jessy@example.com',
    date: new Date('2025-10-18T09:00:00Z'),
    aiCategory: 'Interested',
  },
  {
    id: '3',
    accountId: '3',
    folder: 'Draft',
    subject: 'Meeting tomorrow at 12 AM',
    body: 'Hi rahul, looking forward to our meeting tomorrow.',
    from: 'manager@company.com',
    to: 'rahul@example.com',
    date: new Date('2025-10-18T09:00:00Z'),
    aiCategory: 'Interested',
  },
  {
    id: '4',
    accountId: '4',
    folder: 'Spam',
    subject: 'Meeting tomorrow at 1 AM',
    body: 'Hi Ram, looking forward to our meeting tomorrow.',
    from: 'manager@company.com',
    to: 'ram@example.com',
    date: new Date('2025-10-18T09:00:00Z'),
    aiCategory: 'Interested',
  },
  {
    id: '5',
    accountId: '5',
    folder: 'INBOX',
    subject: 'Meeting tomorrow at 10 AM',
    body: 'Hi Raju, looking forward to our meeting tomorrow.',
    from: 'manager@company.com',
    to: 'raju@example.com',
    date: new Date('2025-10-18T09:00:00Z'),
    aiCategory: 'Interested',
  },
]

const App = <Email emailsList={emailsList} />

export default App
