const { loadCompanyCollection } = require('../config/db');
const { uuid, counter } = require('../utils')

// Get company list
const getCompany = async (req, res) => {
  try {
    const companyCollection = await loadCompanyCollection();
    const companies = companyCollection.data.companies
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

// Create Company
const createCompany = async (req, res) => {
  try {
    const companyCollection = await loadCompanyCollection();
    const { name, status } = req.body;
    const file = req.file;
    console.log(file)

    if (!name || !status) {
      return res.status(400).json({ message: 'Please enter all fields.' });
    }

    const baseUrl =  req.referer;
    const imageUrl = `${baseUrl}-${file.filename}`;
    const lastCompany = counter(companyCollection.data, 'companies');
    const companyId = lastCompany ? lastCompany.id + 1 : 1;
    const newCompany = {
      uuid,
      id: companyId,
      name,
      logo: imageUrl,
      status
    };

    companyCollection.data.companies.push(newCompany);
    await companyCollection.write();

    res.status(201).json({
      data: { company: newCompany },
      metadata: { message: 'Company created successfully.' }
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Edit company
const editCompany = async (req, res) => {
  try {
    const companyCollection = await loadCompanyCollection();
    const { uuid } = req.params;
    const { name, status } = req.body;
    const file = req.file;

    if (!file || !name || !status) {
      return res.status(400).json({ message: 'Please enter all fields.' });
    }

    const companyIndex = companyCollection.data.companies.findIndex(t => t.uuid === uuid);
    companyCollection.data.companies[companyIndex] = {
      ...companyCollection.data.companies[companyIndex],
      name,
      logo: file.filename,
      status
    }
    res.status(200).json({
      data: { ...companyCollection.data.companies[companyIndex] },
      metadata: { message: 'Company updated successfully' }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { getCompany, createCompany, editCompany };
