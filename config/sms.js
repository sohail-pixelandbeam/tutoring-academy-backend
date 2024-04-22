const { SmsClient } = require('@azure/communication-sms');

// This code retrieves your connection string
// from an environment variable.
const connectionString = process.env['COMMUNICATION_SERVICES_CONNECTION_STRING'];

// Instantiate the SMS client.
const smsClient = new SmsClient(connectionString);
module.exports = smsClient