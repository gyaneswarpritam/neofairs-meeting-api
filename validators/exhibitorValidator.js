// validators/exhibitorValidator.js
const { z } = require('zod');

const exhibitorSchema = z.object({
    title: z.string().min(1, { message: 'Title is required.' }),
    firstName: z.string().min(1, { message: 'First name is required.' }),
    lastName: z.string().min(1, { message: 'Last name is required.' }),
    email: z.string().min(1, { message: 'Email is required.' }).email('Invalid email address.'),
    designation: z.string().min(1, { message: 'Designation is required.' }),
    companyName: z.string().min(1, { message: 'Company name is required.' }),
    companyType: z.object().optional(),
    productInfo: z.object().optional(),
    optionalInfo: z.object().optional(),
    password: z.string().optional(),
    address: z.string().min(1, { message: 'Address is required.' }),
    country: z.string().min(1, { message: 'Country is required.' }),
    phoneNo: z.string().min(1, { message: 'Phone number is required.' }),
    deleted: z.boolean().optional(),
    active: z.string().default(false).optional(),
    reject: z.string().default(false).optional(),
    blocked: z.string().default(false).optional(),
});

module.exports = exhibitorSchema;
