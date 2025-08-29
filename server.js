import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { buildUserId, classifyData } from './util.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

const FULL_NAME = process.env.FULL_NAME || 'john doe';
const DOB_DDMMYYYY = process.env.DOB_DDMMYYYY || '17091999';
const EMAIL = process.env.EMAIL || 'john@xyz.com';
const ROLL_NUMBER = process.env.ROLL_NUMBER || 'ABCD123';

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body || {};
    if (!Array.isArray(data)) {
      return res.status(200).json({
        is_success: false,
        user_id: buildUserId(FULL_NAME, DOB_DDMMYYYY),
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        message: 'Invalid payload: "data" must be an array.'
      });
    }

    const r = classifyData(data);
    return res.status(200).json({
      is_success: true,
      user_id: buildUserId(FULL_NAME, DOB_DDMMYYYY),
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: r.odd_numbers,
      even_numbers: r.even_numbers,
      alphabets: r.alphabets,
      special_characters: r.special_characters,
      sum: r.sum,
      concat_string: r.concat_string
    });
  } catch (e) {
    return res.status(200).json({
      is_success: false,
      user_id: buildUserId(FULL_NAME, DOB_DDMMYYYY),
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      message: 'Unexpected error'
    });
  }
});

app.get('/', (req, res) => res.json({ status: 'ok', route: '/bfhl' }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`BFHL API on :${port}`));
