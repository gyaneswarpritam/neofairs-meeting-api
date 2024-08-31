// validators/visitorValidator.js
const { z } = require('zod');

const visitorSchema = z.object({
    title: z.string().min(1, { message: 'Title is required.' }),
    firstName: z.string().min(1, { message: 'firstName is required.' }),
    lastName: z.string().min(1, { message: 'lastName is required.' }),
    email: z.string().min(1, { message: 'email is required.' }).email('Invalid email address.'),
    designation: z.string().min(1, { message: 'designation is required.' }),
    companyName: z.string().min(1, { message: 'companyName is required.' }),
    address: z.string().min(1, { message: 'address is required.' }),
    country: z.string().min(1, { message: 'country is required.' }),
    phoneNo: z.string().min(1, { message: 'phoneNo is required.' }),
});

const visitorLoginSchema = z.object({
    email: z.string().min(1, { message: 'email is required.' }).email('Invalid email address.'),
    password: z.string().min(1, { message: 'Password is required.' })
});

module.exports = { visitorSchema, visitorLoginSchema };
