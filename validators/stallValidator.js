// validators/stallValidator.js
const { z } = require('zod');

const stallSchema = z.object({
    stallName: z.string().min(1, { message: 'Stall Name is required.' }),
    hallId: z.string().min(1, { message: 'Hall Id is required.' }),
    exhibitor: z.string().min(1, { message: 'Exhibitor ID is required.' }),
});

module.exports = stallSchema;
