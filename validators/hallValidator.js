// validators/hallValidator.js
const { z } = require('zod');

const hallSchema = z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    description: z.string().optional(),
});

module.exports = hallSchema;
