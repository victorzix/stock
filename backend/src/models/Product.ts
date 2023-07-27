import { Sequelize, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

const randomId: string[] = uuidv4().split('-')



interface Sector {
  id: number;
  name: string;
  income: number;
  type: string | null;
};

