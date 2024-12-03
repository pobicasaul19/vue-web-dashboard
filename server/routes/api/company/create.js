const express = require('express');
const { createCompany } = require('../../../controller/companyController');

/**
 * @swagger
 * /api/companies/create:
 *   post:
 *     summary: Create Company
 *     description: Create a new company with the provided details.
 *     tags:
 *       - Companies
 *     parameters:
 *       - in: query
 *         name: name
 *         description: Company Name
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: logo
 *         description: Company Logo
 *         required: true
 *         schema:
 *           type: file
 *       - in: query
 *         name: status
 *         description: Company Status
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Successfully registered
 *       400:
 *         description: Bad request
 */

const router = express.Router();
router.post('/create', createCompany);
module.exports = router;