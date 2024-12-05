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

    if (!file || !name || !status) {
      return res.status(400).json({ message: 'Please provide all required fields: name, status, and logo.' });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/assets/${file.filename}`;
    const lastCompany = counter(companyCollection.data, 'companies');
    const companyId = lastCompany ? lastCompany.id + 1 : 1;
    const newCompany = {
      uuid,
      id: companyId,
      logo: fileUrl,
      name,
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
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Edit company
const editCompany = async (req, res) => {
  try {
    const companyCollection = await loadCompanyCollection();
    const { uuid } = req.params;
    const { name, status } = req.body;
    const file = req.file;

    if (!name || !status) {
      return res.status(400).json({ message: 'Please provide all required fields: name, status.' });
    }

    let fileUrl = null;
    if (file) {
      fileUrl = `${req.protocol}://${req.get('host')}/assets/${file.filename}`;
    }

    const companyIndex = companyCollection.data.companies.findIndex(t => t.uuid === uuid);
    companyCollection.data.companies[companyIndex] = {
      ...companyCollection.data.companies[companyIndex],
      logo: fileUrl || companyCollection.data.companies[companyIndex].logo,
      name,
      status
    }
    await companyCollection.write();
    res.status(200).json({
      data: { ...companyCollection.data.companies[companyIndex] },
      metadata: { message: 'Company updated successfully' }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { getCompany, createCompany, editCompany };
