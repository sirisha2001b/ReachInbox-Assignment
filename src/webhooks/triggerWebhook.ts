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