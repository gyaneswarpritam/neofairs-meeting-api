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
 * /api/auditorium:
 *   post:
 *     summary: Create a new auditorium
 *     tags:
 *       - Auditorium
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuditoriumValidation'
 *     responses:
 *       '201':
 *         description: Auditorium created successfully
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
 *
 *   get:
 *     summary: Get all auditoriums
 *     tags:
 *       - Auditorium
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Auditorium'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /api/auditorium/{id}:
 *   get:
 *     summary: Get an auditorium by ID
 *     tags:
 *       - Auditorium
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auditorium'
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
 *       - Auditorium
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuditoriumValidation'
 *     responses:
 *       '200':
 *         description: Auditorium updated successfully
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 *       - Auditorium
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A brief description of the error.
 *       example:
 *         message: Internal server error
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
 * /api/activity:
 *   post:
 *     summary: Create a new activity
 *     tags:
 *       - Activity
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activity'
 *     responses:
 *       '201':
 *         description: Activity created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
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
 *
 *   get:
 *     summary: Get all activities
 *     tags:
 *       - Activity
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /api/activity/{id}:
 *   get:
 *     summary: Get an activity by ID
 *     tags:
 *       - Activity
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
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
 *       - Activity
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activity'
 *     responses:
 *       '200':
 *         description: Activity updated successfully
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 *       - Activity
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A brief description of the error.
 *       example:
 *         message: Internal server error
 *     Briefcase:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the briefcase.
 *         product:
 *           type: string
 *           description: The ID of the product associated with the briefcase.
 *         exhibitor:
 *           type: string
 *           description: The ID of the exhibitor associated with the briefcase.
 *         visitor:
 *           type: string
 *           description: The ID of the visitor associated with the briefcase.
 *         catalog:
 *           type: boolean
 *           description: Indicates whether the briefcase contains a catalog.
 *       required:
 *         - product
 *         - exhibitor
 *         - visitor
 */

/**
 * @swagger
 * /api/briefcase:
 *   post:
 *     summary: Create a new briefcase
 *     tags:
 *       - Briefcase
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Briefcase'
 *     responses:
 *       '201':
 *         description: Briefcase created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Briefcase'
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
 *
 *   get:
 *     summary: Get all briefcases
 *     tags:
 *       - Briefcase
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Briefcase'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /api/briefcase/{id}:
 *   get:
 *     summary: Get a briefcase by ID
 *     tags:
 *       - Briefcase
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Briefcase'
 *       '404':
 *         description: Briefcase not found
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
 *     summary: Update a briefcase by ID
 *     tags:
 *       - Briefcase
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Briefcase'
 *     responses:
 *       '200':
 *         description: Briefcase updated successfully
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '404':
 *         description: Briefcase not found
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
 *     summary: Delete a briefcase by ID
 *     tags:
 *       - Briefcase
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Briefcase deleted successfully
 *       '404':
 *         description: Briefcase not found
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
 *           description: The media type of the brochure.
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
 * /api/brochure:
 *   post:
 *     summary: Create a new brochure
 *     tags:
 *       - Brochure
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brochure'
 *     responses:
 *       '201':
 *         description: Brochure created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brochure'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '401':
 *         description: Unauthorized - Missing or invalid token
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
 *   get:
 *     summary: Get all brochures
 *     tags:
 *       - Brochure
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brochure'
 *       '401':
 *         description: Unauthorized - Missing or invalid token
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
 * /api/brochure/{id}:
 *   get:
 *     summary: Get a brochure by ID
 *     tags:
 *       - Brochure
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brochure'
 *       '401':
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 *       - Brochure
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brochure'
 *     responses:
 *       '200':
 *         description: Brochure updated successfully
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '401':
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 *       - Brochure
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Brochure deleted successfully
 *       '401':
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 * /api/companyProfile:
 *   post:
 *     summary: Create a new company profile
 *     tags:
 *       - CompanyProfile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompanyProfile'
 *     responses:
 *       '201':
 *         description: Company profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanyProfile'
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
 *
 *   get:
 *     summary: Get all company profiles
 *     tags:
 *       - CompanyProfile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CompanyProfile'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /api/companyProfile/{id}:
 *   get:
 *     summary: Get a company profile by ID
 *     tags:
 *       - CompanyProfile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanyProfile'
 *       '404':
 *         description: Company profile not found
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
 *     summary: Update a company profile by ID
 *     tags:
 *       - CompanyProfile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompanyProfile'
 *     responses:
 *       '200':
 *         description: Company profile updated successfully
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '404':
 *         description: Company profile not found
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
 *     summary: Delete a company profile by ID
 *     tags:
 *       - CompanyProfile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Company profile deleted successfully
 *       '404':
 *         description: Company profile not found
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

