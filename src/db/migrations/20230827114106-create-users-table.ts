import { QueryInterface } from 'sequelize';
import { DataType, Sequelize } from 'sequelize-typescript';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
        const usersAtt = {
            id: {
                type: DataType.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            password: DataType.STRING,
            email: DataType.STRING,
            first_name: DataType.STRING,
            last_name: DataType.STRING,
            created_at: DataType.DATE,
            updated_at: DataType.DATE,
        };

        await queryInterface.createTable('users', usersAtt);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
