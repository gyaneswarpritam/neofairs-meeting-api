// validators/stallValidator.js
const { z } = require('zod');

const stallSchema = z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    hall_details: z.string().min(1, { message: 'Hall details are required.' }),
    exhibitor: z.string().min(1, { message: 'Exhibitor ID is required.' }),
});

module.exports = stallSchema;
