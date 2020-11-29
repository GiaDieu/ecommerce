import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    },
  );
};

//middleware checking valid user (token)
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    //validation for token
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (error, decode) => {
        if (error) {
          res.status(401).send({ msg: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      },
    );
  } else {
    res.status(401).send({ msg: 'NO TOKEN' });
  }
};
