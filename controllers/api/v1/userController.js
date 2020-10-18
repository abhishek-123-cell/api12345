const multer = require('multer');

const catchAsync = require('../../../config/catchAsynch');
const AppError = require('../../../config/AppError');
const handleFactory = require('./handleFactory');
const User = require('../../../models/user');
const Post = require('../../../models/posts');
const Comment = require('../../../models/comments');
const Like = require('../../../models/likes');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const signToken = (id) => {
  return jwt.sign(id, rest-api, {
    expiresIn: 60*60,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.toJSON());

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now()
    )
    
  });

  res.status(statusCode).json({
    status: 'success',
    data: {
      token,
      user,
    },
  });
};

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image. Please upload Image!', 400), false);
  }
};

// 




exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        'Password cannot be changed with this url. Please use /updatePassword url',
        400,
      ),
    );
  }
  const user = await User.findById(req.user._id);
  if (req.file) {
    if (user.photo != 'default.jpg') {
      fs.unlinkSync(
        path.join(__dirname, '../../../assets/img/users', user.photo),
      );
    }
  }


  const updateduser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
  });
  createSendToken(updateduser, 200, req, res);
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await Like.deleteMany({ user: req.user._id });
  await Comment.deleteMany({ user: req.user._id });
  await Post.deleteMany({ user: req.user._id });
  await User.findByIdAndDelete(req.user._id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getUser = handleFactory.getOne(User);
