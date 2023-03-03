import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    type: INTEGER,
  },
  title: {
    allowNull: false,
    type: STRING,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  underscored: true,
  timestamps: false,
});

export default Teams;
