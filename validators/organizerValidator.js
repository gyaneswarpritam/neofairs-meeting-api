// validators/organizerValidator.js
const { z } = require('zod');

const organizerSchema = z.object({
    firstName: z.string().min(1, { message: 'First name is required.' }),
    lastName: z.string().min(1, { message: 'Last name is required.' }),
    email: z.string().min(1, { message: 'Email is required.' }).email('Invalid email address.'),
    password: z.string().optional(),
    budget: z.string().min(1, { message: 'Budget is required.' }),
    interest: z.string().min(1, { message: 'Interest is required.' }),
    eventType: z.string().min(1, { message: 'Event type is required.' }),
});

module.exports = organizerSchema;
