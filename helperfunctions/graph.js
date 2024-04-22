const { startDateTimeAsync, endDateTimeAsync } = require('./dateTimeFormat');
const { ClientSecretCredential } = require('@azure/identity');
const { Client } = require('@microsoft/microsoft-graph-client');
const { TokenCredentialAuthenticationProvider } = require('@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials');
require('isomorphic-fetch');
require('dotenv').config()

let clientSecretCredential;
let appGraphClient;

function ensureGraphForAppOnlyAuth() {
    if (!clientSecretCredential) {
        clientSecretCredential = new ClientSecretCredential(
            process.env.AZURE_TENANT_ID,
            process.env.AZURE_CLIENT_ID,
            process.env.AZURE_CLIENT_SECRET
        );
    }

    if (!appGraphClient) {
        const authProvider = new TokenCredentialAuthenticationProvider(
            clientSecretCredential, {
            scopes: ['https://graph.microsoft.com/.default']
        });

        appGraphClient = Client.initWithMiddleware({
            authProvider: authProvider
        });
    }
}

async function createNewMeetingAsync(userId) {
    ensureGraphForAppOnlyAuth();
    let startTime = await startDateTimeAsync();
    let endTime = await endDateTimeAsync();
    userId = `8:acs:77bac1c4-cf55-4b91-b60c-5a396df98b1c_0000001e-f63c-164b-9f3b-8e3a0d00568e`
    const newMeeting = `/users/${userId}/calendar/events`;

    const event = {
        subject: 'Customer Service Meeting',
        start: {
            dateTime: startTime,
            timeZone: 'UTC'
        },
        end: {
            dateTime: endTime,
            timeZone: 'UTC'
        },
        isOnlineMeeting: true,
        // isOrganizer: true
    };

    try {
        const newEvent = await appGraphClient.api(newMeeting).post(event);
        return newEvent;
    } catch (error) {
        console.error('Error creating new meeting:', error);
        throw error;
    }
}

module.exports = createNewMeetingAsync;
