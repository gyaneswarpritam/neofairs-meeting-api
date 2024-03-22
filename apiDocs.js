/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A brief description of the error.
 *       example:
 *         message: Internal server error
 *     VisitorRegistration:
 *       type: object
 *       properties:
  *         title:
 *           type: string
 *           minLength: 1
 *           description: Title of the visitor.
 *         firstName:
 *           type: string
 *           minLength: 1
 *           description: First name of the visitor.
 *         lastName:
 *           type: string
 *           minLength: 1
 *           description: Last name of the visitor.
 *         email:
 *           type: string
 *           format: email
 *           minLength: 1
 *           description: Email address of the visitor.
 *         designation:
 *           type: string
 *           minLength: 1
 *           description: Designation of the visitor.
 *         companyName:
 *           type: string
 *           minLength: 1
 *           description: Company name of the visitor.
 *         address:
 *           type: string
 *           minLength: 1
 *           description: Address of the visitor.
 *         country:
 *           type: string
 *           minLength: 1
 *           description: Country of the visitor.
 *         phoneNo:
 *           type: string
 *           minLength: 1
 *           description: Phone number of the visitor.
 *         companyType:
 *           type: object
 *           description: Object representing company type.
 *         productInfo:
 *           type: object
 *           description: Object representing product information.
 *         optionalInfo:
 *           type: object
 *           description: Object representing optional information.
 *         password:
 *           type: string
 *           description: Password for the visitor account.
 *       required:
 *         - title
 *         - firstName
 *         - lastName
 *         - email
 *         - designation
 *         - companyName
 *         - address
 *         - country
 *         - phoneNo
 *         - password
 *     ExhibitorRegistration:
 *       type: object
 *       properties:
 *         companyName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - companyName
 *         - email
 *         - password
 *     AdminRegistration:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - username
 *         - email
 *         - password
 */

/**
 * @swagger
 * /api/visitor/register:
 *   post:
 *     summary: Register a new visitor
 *     tags:
 *       - Visitor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VisitorRegistration'
 *     responses:
 *       '200':
 *         description: Successful registration
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/exhibitor/register:
 *   post:
 *     summary: Register a new exhibitor
 *     tags:
 *       - Exhibitor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExhibitorRegistration'
 *     responses:
 *       '200':
 *         description: Successful registration
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     summary: Register a new admin
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminRegistration'
 *     responses:
 *       '200':
 *         description: Successful registration
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A brief description of the error.
 *       example:
 *         message: Internal server error
 */

/**
 * @swagger
 * tags:
 *   - name: Visitor
 *     description: Operations related to visitor users
 *   - name: Exhibitor
 *     description: Operations related to exhibitor users
 *   - name: Admin
 *     description: Operations related to admin users
 */

/**
 * @swagger
 * /api/visitor/login:
 *   post:
 *     summary: Login for visitors
 *     tags:
 *       - Visitor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Successful login
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/exhibitor/login:
 *   post:
 *     summary: Login for exhibitors
 *     tags:
 *       - Exhibitor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Successful login
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Login for admins
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Successful login
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 */

/**
 * @swagger
 * /api/admin/fetch-all-visitor:
 *   post:
 *     summary: Fetch all registered visitors
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/admin/fetch-all-exhibitor:
 *   post:
 *     summary: Fetch all registered exhibitors
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
  *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/admin/approve-visitor/{visitorId}:
 *   put:
 *     summary: Approve a visitor by the admin
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: visitorId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the visitor to approve
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Visitor approved successfully
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * /api/admin/approve-exhibitor/{exhibitorId}:
 *   put:
 *     summary: Approve a exhibitor by the admin
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: exhibitorId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the exhibitor to approve
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Exhibitor approved successfully
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the activity.
 *         title:
 *           type: string
 *           description: The title of the activity.
 *         description:
 *           type: string
 *           description: The description of the activity.
 *         startTime:
 *           type: string
 *           description: The start time of the activity.
 *         endTime:
 *           type: string
 *           description: The end time of the activity.
 *         active:
 *           type: string
 *           description: Indicates whether the activity is active.
 *         deleted:
 *           type: string
 *           description: Indicates whether the activity is deleted.
 *       required:
 *         - title
 *         - description
 *         - startTime
 *         - endTime
 */

/**
 * @swagger
 * /api/admin/activity:
 *   post:
 *     summary: Create a new activity
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activity'
 *     responses:
 *       '200':
 *         description: Activity created successfully
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   get:
 *     summary: Get all activities
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /api/admin/activity/{id}:
 *   get:
 *     summary: Get an activity by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the activity to retrieve
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Activity not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   put:
 *     summary: Update an activity by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the activity to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activity'
 *     responses:
 *       '200':
 *         description: Activity updated successfully
 *       '404':
 *         description: Activity not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   delete:
 *     summary: Delete an activity by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the activity to delete
 *     responses:
 *       '200':
 *         description: Activity deleted successfully
 *       '404':
 *         description: Activity not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Auditorium:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the auditorium.
 *         url:
 *           type: string
 *           description: The URL of the auditorium.
 *         active:
 *           type: string
 *           description: Indicates whether the auditorium is active.
 *         deleted:
 *           type: string
 *           description: Indicates whether the auditorium is deleted.
 *       required:
 *         - url
 *     AuditoriumValidation:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *           description: URL is required.
 *           minLength: 1
 *           example: "http://example.com"
 */
/**
 * @swagger
 * /api/admin/auditorium:
 *   post:
 *     summary: Create a new auditorium
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auditorium'
 *     responses:
 *       '200':
 *         description: Auditorium created successfully
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   get:
 *     summary: Get all auditoriums
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /api/admin/auditorium/{id}:
 *   get:
 *     summary: Get an auditorium by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the auditorium to retrieve
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Auditorium not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   put:
 *     summary: Update an auditorium by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the auditorium to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auditorium'
 *     responses:
 *       '200':
 *         description: Auditorium updated successfully
 *       '404':
 *         description: Auditorium not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   delete:
 *     summary: Delete an auditorium by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the auditorium to delete
 *     responses:
 *       '200':
 *         description: Auditorium deleted successfully
 *       '404':
 *         description: Auditorium not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Brochure:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the brochure.
 *         title:
 *           type: string
 *           description: The title of the brochure.
 *         media:
 *           type: string
 *           description: The media type of the brochure (e.g., image, video).
 *         url:
 *           type: string
 *           description: The URL of the brochure.
 *         active:
 *           type: string
 *           description: Indicates whether the brochure is active.
 *         deleted:
 *           type: string
 *           description: Indicates whether the brochure is deleted.
 *       required:
 *         - title
 *         - media
 *         - url
 */

/**
 * @swagger
 * /api/admin/brochure:
 *   post:
 *     summary: Create a new brochure
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brochure'
 *     responses:
 *       '200':
 *         description: Brochure created successfully
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   get:
 *     summary: Get all brochures
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /api/admin/brochure/{id}:
 *   get:
 *     summary: Get a brochure by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the brochure to retrieve
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Brochure not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   put:
 *     summary: Update a brochure by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the brochure to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brochure'
 *     responses:
 *       '200':
 *         description: Brochure updated successfully
 *       '404':
 *         description: Brochure not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   delete:
 *     summary: Delete a brochure by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the brochure to delete
 *     responses:
 *       '200':
 *         description: Brochure deleted successfully
 *       '404':
 *         description: Brochure not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Directory:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the directory.
 *         title:
 *           type: string
 *           description: The title of the directory.
 *         media:
 *           type: string
 *           description: The media type of the directory (e.g., image, video).
 *         description:
 *           type: string
 *           description: The description of the directory.
 *         active:
 *           type: string
 *           description: Indicates whether the directory is active.
 *         deleted:
 *           type: string
 *           description: Indicates whether the directory is deleted.
 *       required:
 *         - title
 *         - media
 *         - description
 */

/**
 * @swagger
 * /api/admin/directory:
 *   post:
 *     summary: Create a new directory entry
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Directory'
 *     responses:
 *       '200':
 *         description: Directory entry created successfully
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   get:
 *     summary: Get all directory entries
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /api/admin/directory/{id}:
 *   get:
 *     summary: Get a directory entry by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the directory entry to retrieve
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Directory entry not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   put:
 *     summary: Update a directory entry by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the directory entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Directory'
 *     responses:
 *       '200':
 *         description: Directory entry updated successfully
 *       '404':
 *         description: Directory entry not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   delete:
 *     summary: Delete a directory entry by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the directory entry to delete
 *     responses:
 *       '200':
 *         description: Directory entry deleted successfully
 *       '404':
 *         description: Directory entry not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the event.
 *         name:
 *           type: string
 *           description: The name of the event.
 *         status:
 *           type: string
 *           description: The status of the event.
 *         startDateTime:
 *           type: string
 *           format: date-time
 *           description: The start date and time of the event.
 *         endDateTime:
 *           type: string
 *           format: date-time
 *           description: The end date and time of the event.
 *         active:
 *           type: string
 *           description: Indicates whether the event is active.
 *         deleted:
 *           type: string
 *           description: Indicates whether the event is deleted.
 *       required:
 *         - name
 *         - status
 *         - startDateTime
 *         - endDateTime
 */

/**
 * @swagger
 * /api/admin/event:
 *   post:
 *     summary: Create a new event
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       '200':
 *         description: Event created successfully
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   get:
 *     summary: Get all events
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /api/admin/event/{id}:
 *   get:
 *     summary: Get an event by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the event to retrieve
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   put:
 *     summary: Update an event by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the event to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       '200':
 *         description: Event updated successfully
 *       '404':
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   delete:
 *     summary: Delete an event by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the event to delete
 *     responses:
 *       '200':
 *         description: Event deleted successfully
 *       '404':
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Faq:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the FAQ.
 *         title:
 *           type: string
 *           description: The title of the FAQ.
 *         description:
 *           type: string
 *           description: The description of the FAQ.
 *         active:
 *           type: string
 *           description: Indicates whether the FAQ is active.
 *         deleted:
 *           type: string
 *           description: Indicates whether the FAQ is deleted.
 *       required:
 *         - title
 *         - description
 */

/**
 * @swagger
 * /api/admin/faq:
 *   post:
 *     summary: Create a new FAQ
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FAQ'
 *     responses:
 *       '200':
 *         description: FAQ created successfully
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   get:
 *     summary: Get all FAQs
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /api/admin/faq/{id}:
 *   get:
 *     summary: Get a FAQ by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the FAQ to retrieve
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: FAQ not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   put:
 *     summary: Update a FAQ by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the FAQ to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FAQ'
 *     responses:
 *       '200':
 *         description: FAQ updated successfully
 *       '404':
 *         description: FAQ not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   delete:
 *     summary: Delete a FAQ by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the FAQ to delete
 *     responses:
 *       '200':
 *         description: FAQ deleted successfully
 *       '404':
 *         description: FAQ not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Hall:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the hall.
 *         description:
 *           type: string
 *           description: The description of the hall.
 *       required:
 *         - name
 *         - description
 */

/**
 * @swagger
 * /api/admin/hall:
 *   post:
 *     summary: Create a new hall
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hall'
 *     responses:
 *       '200':
 *         description: Hall created successfully
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   get:
 *     summary: Get all halls
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /api/admin/hall/{id}:
 *   get:
 *     summary: Get a hall by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the hall to retrieve
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Hall not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   put:
 *     summary: Update a hall by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the hall to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hall'
 *     responses:
 *       '200':
 *         description: Hall updated successfully
 *       '404':
 *         description: Hall not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   delete:
 *     summary: Delete a hall by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the hall to delete
 *     responses:
 *       '200':
 *         description: Hall deleted successfully
 *       '404':
 *         description: Hall not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Live:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the live event.
 *         title:
 *           type: string
 *           description: The title of the live event.
 *         description:
 *           type: string
 *           description: The description of the live event.
 *         url:
 *           type: string
 *           description: The URL of the live event.
 *         active:
 *           type: string
 *           description: Indicates whether the live event is active.
 *         deleted:
 *           type: string
 *           description: Indicates whether the live event is deleted.
 *       required:
 *         - title
 *         - description
 *         - url
 */

/**
 * @swagger
 * /api/admin/live:
 *   post:
 *     summary: Create a new live session
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Live'
 *     responses:
 *       '200':
 *         description: Live session created successfully
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   get:
 *     summary: Get all live sessions
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /api/admin/live/{id}:
 *   get:
 *     summary: Get a live session by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the live session to retrieve
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Live session not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   put:
 *     summary: Update a live session by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the live session to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Live'
 *     responses:
 *       '200':
 *         description: Live session updated successfully
 *       '404':
 *         description: Live session not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   delete:
 *     summary: Delete a live session by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the live session to delete
 *     responses:
 *       '200':
 *         description: Live session deleted successfully
 *       '404':
 *         description: Live session not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Visual:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the visual content.
 *         title:
 *           type: string
 *           description: The title of the visual content.
 *         description:
 *           type: string
 *           description: The description of the visual content.
 *         type:
 *           type: string
 *           enum: [pdf, video]
 *           description: The type of the visual content (pdf or video).
 *         media:
 *           type: string
 *           description: The media type of the visual content.
 *         url:
 *           type: string
 *           description: The URL of the visual content.
 *         active:
 *           type: string
 *           description: Indicates whether the visual content is active.
 *         deleted:
 *           type: string
 *           description: Indicates whether the visual content is deleted.
 *       required:
 *         - title
 *         - description
 *         - type
 */

/**
 * @swagger
 * /api/admin/visual:
 *   post:
 *     summary: Create a new visual
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Visual'
 *     responses:
 *       '200':
 *         description: Visual created successfully
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   get:
 *     summary: Get all visuals
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /api/admin/visual/{id}:
 *   get:
 *     summary: Get a visual by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the visual to retrieve
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Visual not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   put:
 *     summary: Update a visual by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the visual to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Visual'
 *     responses:
 *       '200':
 *         description: Visual updated successfully
 *       '404':
 *         description: Visual not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   delete:
 *     summary: Delete a visual by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the visual to delete
 *     responses:
 *       '200':
 *         description: Visual deleted successfully
 *       '404':
 *         description: Visual not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Webinar:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the webinar.
 *         title:
 *           type: string
 *           description: The title of the webinar.
 *         description:
 *           type: string
 *           description: The description of the webinar.
 *         url:
 *           type: string
 *           description: The URL of the webinar.
 *         active:
 *           type: string
 *           description: Indicates whether the webinar is active.
 *         deleted:
 *           type: string
 *           description: Indicates whether the webinar is deleted.
 *       required:
 *         - title
 *         - description
 *         - url
 */

/**
 * @swagger
 * /api/admin/webinar:
 *   post:
 *     summary: Create a new webinar
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Webinar'
 *     responses:
 *       '200':
 *         description: Webinar created successfully
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   get:
 *     summary: Get all webinars
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /api/admin/webinar/{id}:
 *   get:
 *     summary: Get a webinar by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the webinar to retrieve
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Webinar not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   put:
 *     summary: Update a webinar by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the webinar to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Webinar'
 *     responses:
 *       '200':
 *         description: Webinar updated successfully
 *       '404':
 *         description: Webinar not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   delete:
 *     summary: Delete a webinar by ID
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the webinar to delete
 *     responses:
 *       '200':
 *         description: Webinar deleted successfully
 *       '404':
 *         description: Webinar not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
