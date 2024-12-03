const express = require('express');
const { editCompany } = require('../../../controller/companyController');

/**
 * @swagger
 * /api/companies/{uuid}:
 *   put:
 *     summary: Edit company
 *     tags:
 *       - Companies
 *     parameters:
 *       - in: path
 *         name: uuid
 *         description: Company UUID
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: firstName
 *         description: User Firstname
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: lastName
 *         description: User Lastname
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         description: User Type
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         description: User Status
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Successfully updated
 *       400:
 *         description: Bad request
 */

const router = express.Router();
router.put('/:uuid', editCompany);
module.exports = router;
