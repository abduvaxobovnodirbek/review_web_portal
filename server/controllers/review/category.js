const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middlewares/async");
const Category = require("../../models/Category");

// description    Get all category
// route          GET /api/v1/categories
// access         Private
exports.getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({ success: true, data: categories });
});

// description   Create new category
// route         POST /api/v1/categories
// access        Private
exports.createCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    data: category,
  });
});

// description   Update Category
// route         PUT /api/v1/categories/:id
// access        Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  category.name = req.body.name;
  const updatedCategory = await category.save();

  res.status(200).json({ success: true, data: updatedCategory });
});

// description    Delete Category
// route          DELETE /api/v1/categories/:id
// access         Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  category.remove();

  res.status(200).json({ success: true, data: {} });
});
