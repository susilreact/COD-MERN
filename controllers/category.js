const Category = require('../models/category');

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) => {
        if (err) {
            return res.status(400).json({
                error: 'Category not found in DB',
            });
        }
        req.category = cate;
        next();
    });
};

exports.createCategory = (req, res) => {
    const { name } = req.body;
    const category = new Category({
        name,
    });
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: 'not able to save category in BD',
            });
        }
        res.json({ category });
    });
};

exports.getCategory = (req, res) => {
    return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: 'No category found',
            });
        }
        res.json(categories);
    });
};

exports.updateCategory =(req, res)=>{
    const category = req.category;
    category.name = req.body.name;

    category.save((err, updatedCategory)=>{
      if (err) {
          return res.status(400).json({
              error: 'Failed to update Category',
          });
      }
      res.json(updatedCategory);
    });
}
exports.removeCategory = (req, res) => {
    const category = req.category;
    

    category.remove((err, removeCategory) => {
        if (err) {
            return res.status(400).json({
                error: 'Failed to delete the Category',
            });
        }
        res.json({
            message: `${removeCategory}Successfully deleted`,
        });
    });
};