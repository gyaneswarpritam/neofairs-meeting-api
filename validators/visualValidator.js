// validators/visualValidator.js
const { z } = require('zod');

const visualSchema = z.object({
    title: z.string().min(1, { message: 'Title is required.' }),
    description: z.string().min(1, { message: 'Description is required.' }),
    type: z.enum(['pdf', 'video']).min(1, { message: 'Type is required.' }),
    media: z.string().optional(),
    url: z.string().optional(),
    active: z.string().default(true),
    deleted: z.string().default(false),
});

module.exports = visualSchema;
