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

export const isAuth = (req, res, next) => {
  const authorizarion = req.headers.authorizarion;
  if (authorizarion) {
    const token = authorizarion.slice(7, authorizarion.length); // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (error, decode) => {
        if (error) {
          res.status(401).send({ msg: 'Invalid Token' });
        } else {
          //decode = {
          // _id: user._id,
          // email: user.email,
          // name: user.name,
          // isAdmin: user.isAdmin,
          // }
          req.user = decode;
          next();
        }
      },
    );
  } else {
    res.status(401).send({ msg: 'NO TOKEN' });
  }
};
