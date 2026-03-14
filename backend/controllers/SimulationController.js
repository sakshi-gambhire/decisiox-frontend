import { createSimulation, getSimulationsByUser } from "../models/SimulationModel.js";
import pool from "../config/db.js";
export const saveSimulation = async (req, res) => {
  try {

    const {
      age,
      income,
      savings,
      investment_amount,
      risk_level,
      investment_horizon,
      investment_goal,
      strategy
    } = req.body;

    const user_id = req.user.id;

    const simulation = await createSimulation(
      user_id,
      age,
      income,
      savings,
      investment_amount,
      risk_level,
      investment_horizon,
      investment_goal,
      strategy
    );

    res.status(201).json({
      message: "Simulation saved successfully",
      simulation
    });

  } catch (error) {

    console.error("Simulation Error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }
};


export const getUserSimulations = async (req, res) => {
  try {

    const user_id = req.user.id;

    const simulations = await getSimulationsByUser(user_id);

    res.status(200).json(simulations);

  } catch (error) {

    console.error("Fetch Simulation Error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }
};
export const getRiskAnalytics = async (req, res) => {
  try {

    const user_id = req.user.id;

    const query = `
      SELECT risk_level, COUNT(*) 
      FROM simulations
      WHERE user_id = $1
      GROUP BY risk_level
    `;

    const result = await pool.query(query, [user_id]);

    res.json(result.rows);

  } catch (error) {

    console.error("Analytics Error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }
};
