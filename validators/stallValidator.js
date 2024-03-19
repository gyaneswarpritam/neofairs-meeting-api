// validators/stallValidator.js
const { z } = require('zod');

const stallSchema = z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    description: z.string().optional(),
    hall_details: z.string().nonempty({ message: 'Hall details are required.' }),
    visitng_card_details: z.object().optional(),
    stall_details: z.object().optional(),
    social_media: z.object().optional(),
    products: z.array(z.object({ media: z.string().optional() })).optional(),
    company_profile: z.object().optional(),
    active: z.string().default(true),
    deleted: z.string().default(false),
    exhibitor: z.string().nonempty({ message: 'Exhibitor ID is required.' }),
});

module.exports = stallSchema;
