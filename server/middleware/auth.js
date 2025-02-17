import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  // console.log("Auth Middleware Called!");
  // console.log("Authorization Header:", req.header('Authorization'));
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    console.log("midleware ke andar ka ", req.user)
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export const adminAuth = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin only.' });
  }
};