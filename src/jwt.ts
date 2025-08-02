import jwt from 'jsonwebtoken';

const generateToken = (user: { _id: string; role: string }): string => {
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '1d',
    }
  );

  return token;
};

export default generateToken;
