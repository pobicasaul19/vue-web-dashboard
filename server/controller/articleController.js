import moment from 'moment';
import { uuid, counter } from '../utils/index.js';
import validationMessage from '../utils/validationError.js';
import articleSchema from '../models/articleModel.js';
import { loadArticleCollection } from '../config/db.js';

// Get article lists
export const getArticles = async (req, res) => {
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

    const fields = {
      company,
      file,
      title,
      link,
      content
    }

    const errors = validationMessage(fields, articleSchema);
    if (errors) {
      return res.status(400).json({
        data: errors,
        metadata: {
          message: 'Please provied all the required fields.'
        }
      });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/assets/${file?.filename}`;
    const companyCollection = await loadCompanyCollection();
    const selectedCompany = companyCollection.data.companies.find(t => t.name === company);
    const lastArticle = counter(articleCollection.data, 'articles');

    const newArticle = {
      uuid,
      id: lastArticle ? lastArticle.id + 1 : 1,
      company: selectedCompany?.name,
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

    const fields = {
      company,
      file,
      title,
      link,
      content
    }

    const errors = validationMessage(fields, articleSchema);
    if (errors) {
      return res.status(400).json({
        data: errors,
        metadata: {
          message: 'Please provied all the required fields.'
        }
      });
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