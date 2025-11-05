import express from "express";
import cors from "cors";
import { randomUUID } from 'node:crypto';
import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';

const PORT = 4000;
const app = express();
app.use(express.json());
app.use(cors());

const users = [
  {
    id: randomUUID(),
    firstname: 'John',
    lastname: 'Doe',
    email: 'jd@yopmail.com',
    roles: [
      'user',
      'admin',
      'content',
    ],
  }
]

const capsules = [
  {
    id: randomUUID(),
    openingDate: dayjs().format('YYYY-MM-DD'),
    content: 'Salut !',
    openingMessage: 'Wow c\'est ouvert',
  },
  {
    id: randomUUID(),
    openingDate: dayjs().add(1, 'd').format('YYYY-MM-DD'),
    content: 'Salut 2 !',
  },
  {
    id: randomUUID(),
    openingDate: dayjs().add(-2, 'd').format('YYYY-MM-DD'),
    content: `
      <h1>Test</h1>
      <div style="background: red">
        <p style="font-size: 25px; color: green;">
          Another test
        </p>
      </div>
    `,
    openingMessage: 'Wow 2 c\'est ouvert',
  },
  {
    id: randomUUID(),
    openingDate: dayjs().add(1, 'month').add(6,'day').format('YYYY-MM-DD'),
    content: 'Salut !',
    openingMessage: 'Wow c\'est ouvert',
  },
  {
    id: randomUUID(),
    openingDate: dayjs().add(2, 'month').add(2,'day').format('YYYY-MM-DD'),
    content: 'Salut 2 !',
  },
  {
    id: randomUUID(),
    openingDate: dayjs().add(4, 'month').add(-5,'day').format('YYYY-MM-DD'),
    content: `
      <h1>Test</h1>
      <div style="background: red">
        <p style="font-size: 25px; color: green;">
          Another test
        </p>
      </div>
    `,
    openingMessage: 'Wow 2 c\'est ouvert',
  },

].sort((a, b) => a.openingDate.localeCompare(b.openingDate));

// /health
app.get("/health", (req, res) => {
  res.status(200).send("OK");
})

// /users
app.get("/users", (req, res) => {
  res.json({
    data: users,
  });
})

// /capsules
app.get('/capsules', (req, res) => {
  res.json({
    data: capsules,
  });
})

// /capsule/day/:day
app.get('/capsules/day/:day', (req, res) => {
  const day = req.params.day;

  res.json({
    data: capsules.filter(c => c.openingDate === day),
  })
})

// /capsule/month
app.get('/capsules/month', (req, res) => {
  const currentMonth = dayjs().format('YYYY-MM');

  res.json({
    data: capsules.filter(c => {
      return dayjs(c.openingDate).format('YYYY-MM') === currentMonth;
    }),
  })
})

// /capsule/:id
app.get('/capsules/:id', (req, res) => {
  const id = req.params.id;

  res.json({
    data: capsules.filter(c => c.id === id)[0] || null,
  })
})

// /users/:id
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  res.json({
    data: users.filter(c => c.id === id)[0] || null,
  })
})

// /users/login
app.post('/users/login', (req, res) => {
  const body = req.body;
  const username = body.username;

  const user = users.find(user => user.email === username);

  if (!user) {
    return res.status(401).send('Invalid username');
  }

  return res.json({
    token: jwt.sign({
      id: user.id,
      roles: user.roles,
      email: user.email,
    }, 'secret')
  })
})

app.post('/users/me', (req, res) => {
  const authorization = req.headers.authorization;
  console.log(authorization);
  if (!authorization) {
    return res.status(401).send('Invalid token');
  }
  const token = authorization.split(' ')[1];

  try {
    const verify = jwt.verify(token, 'secret')

    if (!verify || typeof verify === 'string') {
      return res.status(401).send('Invaliiid token');
    }

    const userId: string = verify?.id;

    return res.json({
      data: users.find(user => user.id === userId) || null,
    })

  } catch (err) {
    return res.status(401).send('Invaliid token');
  }
})

// /users/register
app.listen(PORT, () => {
  console.log(`🚀 Serveur dispo sur http://localhost:${PORT}`);
});

