import {
  Model,
  Optional
} from "sequelize";

export interface ISector {
  id: string;
  name: string;
  type: string
  income?: number;
};

export interface ISectorQuery {
  id?: number;
  name?: string;
  type?: string;
}

interface ISectorCreation extends Optional<ISector, 'income'> {}

export class SectorInstance extends Model<ISector, ISectorCreation>{
  declare id: string;
  declare name: string;
  declare type: string | undefined;
  declare income?: number | undefined;
}