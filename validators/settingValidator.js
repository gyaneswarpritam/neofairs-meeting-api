// validators/activityValidator.js
const { z } = require('zod');

const settingSchema = z.object({
    startDateTime: z.string().min(1, { message: 'Start Date & time is required.' }),
    endDateTime: z.string().min(1, { message: 'End Date & time is required.' }),
    timezone: z.string().min(1, { message: 'Timezone is required.' }),
    duration: z.string().min(1, { message: 'Duration is required.' }),
});

module.exports = settingSchema;
