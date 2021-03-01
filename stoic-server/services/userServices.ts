import { Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as db from '../db';
import AppError from '../utils/AppError';

export const getUser = async (req: Request) => {
  const { token } = req.params;

  const id = jwt.verify(
    token,
    'my-ultra-hyper-power-secret-json-web-token',
    (err, decoded: any) => {
      if (decoded) {
        return decoded.id;
      }
    }
  );

  const {
    rows: users,
  } = await db.query('SELECT username FROM users WHERE id = $1', [id]);
  const user = users[0];

  return user;
};

export const addUser = async (req: Request) => {
  const {
    signupUsername: username,
    signupPasswordConf: passwordConfirm,
  } = req.body;
  let { signupPassword: password } = req.body;

  if (!username || username.length < 4 || username.length > 12) {
    throw new AppError(
      'Username is required and must be more than to 3 and less than to 13 characters.',
      400
    );
  }

  if (!password || password.length < 4 || password.length > 12) {
    throw new AppError(
      'Password is required and must be more than to 3 and less than to 13 characters.',
      400
    );
  }

  if (password !== passwordConfirm) {
    throw new AppError('Password and password confirm are not the same.', 400);
  }

  // Encrypt password
  password = await bcrypt.hash(password, 12);

  // Insert new user to db.
  const {
    rows: users,
  } = await db.query(
    `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id`,
    [username, password]
  );

  const userId = users[0];

  // Generate token
  const token = jwt.sign(userId, 'my-ultra-hyper-power-secret-json-web-token', {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

export const login = async (req: Request) => {
  const { loginUsername: username, loginPassword: password } = req.body;

  if (!username || !password)
    throw new AppError('Preencha todos os campos.', 400);

  const {
    rows: users,
  }: any = await db.query(
    'SELECT id, password FROM users WHERE username = $1',
    [username]
  );

  const user = users[0];

  if (!user || !(await bcrypt.compare(password, user.password)))
    throw new AppError('Usuário ou senha incorreta.', 401);

  const token = jwt.sign(
    { id: user.id },
    'my-ultra-hyper-power-secret-json-web-token',
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return token;
};
