const express = require('express');
const { createArticle } = require('../../../controller/articleController');

/**
 * @swagger
 * /api/articles/create:
 *   post:
 *     summary: Create article
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: query
 *         name: company
 *         description: Company ID related to the article
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: title
 *         description: Article title
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: link
 *         description: Article link
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         description: Article publication date (defaults to the current date if not provided)
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: content
 *         description: Article content
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: image
 *         description: URL of the article image
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Bad request
 */

const router = express.Router();
router.post('/create', createArticle);
module.exports = router;
