// validators/exhibitorValidator.js
const { z } = require('zod');

const exhibitorSchema = z.object({
    title: z.string().min(1, { message: 'Title is required.' }),
    firstName: z.string().min(1, { message: 'First name is required.' }),
    lastName: z.string().min(1, { message: 'Last name is required.' }),
    email: z.string().min(1, { message: 'Email is required.' }).email('Invalid email address.'),
    designation: z.string().min(1, { message: 'Designation is required.' }),
    companyName: z.string().min(1, { message: 'Company name is required.' }),
    address: z.string().min(1, { message: 'Address is required.' }),
    country: z.string().min(1, { message: 'Country is required.' }),
    phoneNo: z.string().min(1, { message: 'Phone number is required.' }),
});

const exhibitorLoginSchema = z.object({
    email: z.string().min(1, { message: 'email is required.' }).email('Invalid email address.'),
    password: z.string().min(1, { message: 'Password is required.' })
});

module.exports = { exhibitorSchema, exhibitorLoginSchema };
