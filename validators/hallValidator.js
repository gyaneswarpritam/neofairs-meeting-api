// validators/hallValidator.js
const { z } = require('zod');

const hallSchema = z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    description: z.string().optional(),
    active: z.string().default(true),
    deleted: z.string().default(false),
});

module.exports = hallSchema;
