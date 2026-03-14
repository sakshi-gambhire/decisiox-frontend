import pool from "../config/db.js";

export const createSimulation = async (
  user_id,
  age,
  income,
  savings,
  investment_amount,
  risk_level,
  investment_horizon,
  investment_goal,
  strategy
) => {

  const query = `
    INSERT INTO simulations
    (user_id, age, income, savings, investment_amount, risk_level, investment_horizon, investment_goal, strategy)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING *;
  `;

  const values = [
    user_id,
    age,
    income,
    savings,
    investment_amount,
    risk_level,
    investment_horizon,
    investment_goal,
    strategy
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};
export const getSimulationsByUser = async (user_id) => {
//Insert new simulation record
//into simulations table
  const query = ` 
    SELECT * FROM simulations
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;

  const result = await pool.query(query, [user_id]);

  return result.rows;
};