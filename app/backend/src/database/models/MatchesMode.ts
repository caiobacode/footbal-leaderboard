import { BOOLEAN, Model, INTEGER } from 'sequelize';
import db from '.';

class Matches extends Model {
  declare id: number;
  declare teamName: string;
}

Matches.init({
  id: {
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeamId: {
    allowNull: false,
    type: INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamId: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  underscored: true,
  timestamps: false,
});

export default Matches;
