const { loadCompanyCollection, loadArticleCollection } = require('../config/db');
const { uuid, counter } = require('../utils');
const moment = require('moment');

// Get article lists
const getArticles = async (req, res) => {
  try {
    const articleCollection = await loadArticleCollection();
    const article = articleCollection.data.articles
    res.status(200).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create article
const createArticle = async (req, res) => {
  try {
    const articleCollection = await loadArticleCollection();
    const { company, title, link, date, content, status, writer, editor } = req.body;
    const file = req.file;

    if (!file || !company || !title || !link || !content) {
      return res.status(400).json({ message: 'Please provide all required fields: Company, Image, Title, Link and Content.' });
    }

    // Validate URL format
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    if (!urlRegex.test(link)) {
      return res.status(400).json({ message: 'Invalid URL format' });
    }
    const fileUrl = `${req.protocol}://${req.get('host')}/assets/${file.filename}`;
    const companyCollection = await loadCompanyCollection();
    const selectedCompany = companyCollection.data.companies.find(t => t.name === company);
    const lastArticle = counter(articleCollection.data, 'articles');
    const articleId = lastArticle ? lastArticle.id + 1 : 1
    const newArticle = {
      uuid,
      id: articleId,
      company: selectedCompany.name,
      image: fileUrl,
      title,
      link,
      date: date ? moment(date).format('DD/MM/YYYY') : moment(new Date()).format('DD/MM/YYYY'),
      content,
      status: status || 'For Edit',
      writer: writer || null,
      editor: editor || null,
    };
    articleCollection.data.articles.push(newArticle);
    await articleCollection.write();
    res.status(201).json({ message: 'Article created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Edit article
const editArticle = async (req, res) => {
  try {
    const articleCollection = await loadArticleCollection();
    const { uuid } = req.params;
    const { company, title, link, date, content, status, writer, editor } = req.body;
    const file = req.file;

    if (!company || !title || !link || !content) {
      return res.status(400).json({ message: 'Please provide all required fields: Company, Title, Link and Content.' });
    }
    // Validate URL format
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    if (!urlRegex.test(link)) {
      return res.status(400).json({ message: 'Invalid URL format' });
    }

    let fileUrl = null;
    if (file) {
      fileUrl = `${req.protocol}://${req.get('host')}/assets/${file.filename}`;
    }
    const companyCollection = await loadCompanyCollection();
    const selectedCompany = companyCollection.data.companies.find(t => t.name === company);
    const articleIndex = articleCollection.data.articles.findIndex(t => t.uuid === uuid);
    articleCollection.data.articles[articleIndex] = {
      ...articleCollection.data.articles[articleIndex],
      company: selectedCompany.name,
      image: fileUrl || articleCollection.data.articles[articleIndex].image,
      title,
      link,
      date: moment(date).format('DD/MM/YYYY'),
      content,
      status,
      writer,
      editor
    }
    await articleCollection.write();
    res.status(200).json({
      data: { ...articleCollection.data.articles[articleIndex] },
      metadata: { message: 'Article updated successfully' }
    });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { getArticles, createArticle, editArticle }