// validators/eventValidator.js
const { z } = require('zod');

const eventSchema = z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    status: z.string().min(1, { message: 'Status is required.' }),
    startDateTime: z.date().min(new Date(), { message: 'Start date should be in the future.' }),
    endDateTime: z.date().min(z.$parent.startDateTime, { message: 'End date should be after start date.' }),
});

module.exports = eventSchema;
