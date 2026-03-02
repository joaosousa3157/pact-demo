import express, { Request, Response } from 'express';

const app = express();

app.get('/users/:id', (req: Request, res: Response) => {
  res.status(200).json({
    id: '1',
    name: 'João',
    email: 'joao@email.com'
  });
});

export default app;