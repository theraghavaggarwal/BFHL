import { buildUserId, classifyData } from '../util.js';

const FULL_NAME = process.env.FULL_NAME || 'john doe';
const DOB_DDMMYYYY = process.env.DOB_DDMMYYYY || '17091999';
const EMAIL = process.env.EMAIL || 'john@xyz.com';
const ROLL_NUMBER = process.env.ROLL_NUMBER || 'ABCD123';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).json({
      is_success: false,
      user_id: buildUserId(FULL_NAME, DOB_DDMMYYYY),
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      message: 'Use POST /bfhl'
    });
  }

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
}
