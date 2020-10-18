const User = require('../../../models/user');
const catchAsync = require('../../../config/catchAsynch');
// const AppError = require('../../../config/AppError');

exports.searchByName = catchAsync(async (req, res, next) => {
 sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: user.length,
    data: {
      user,
    },
  });
});
