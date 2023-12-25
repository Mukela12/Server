const Transaction = require('../models/Transactions');

exports.addTransaction = async (req, res) => {
  try {
    const { category, price } = req.body;

    const newTransaction = new Transaction({ category, price});
    await newTransaction.save();

    res.status(201).json({ message: 'Transaction added successfully', transaction: newTransaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getRecommendation = async (req, res) => {
  try {
    // Step 1: Fetch all transactions
    const transactions = await Transaction.find();

    // Step 2: Group transactions by category and calculate the total amount for each category
    const categoryAmounts = transactions.reduce((acc, transaction) => {
      const { category, price } = transaction;
      acc[category] = (acc[category] || 0) + price;
      return acc;
    }, {});

    // Step 3: Find the category with the highest total amount spent
    const highestSpendingCategory = Object.keys(categoryAmounts).reduce((maxCategory, category) => {
      return categoryAmounts[category] > categoryAmounts[maxCategory] ? category : maxCategory;
    }, '');

    // Step 4: Recommend a business offering a student discount in the highest spending category
    // For demonstration purposes, I'm providing a static recommendation. Replace this with your actual recommendation logic.
    const recommendation = {
      category: highestSpendingCategory,
      business: 'Sample Business',
      discount: '20%',
    };

    res.status(200).json(recommendation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
