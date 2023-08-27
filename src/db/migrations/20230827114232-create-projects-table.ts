import { QueryInterface } from 'sequelize';
import { DataType, Sequelize } from 'sequelize-typescript';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        const projectsAtt = {
            id: { type: DataType.UUID, primaryKey: true },
            name: DataType.STRING,
            description: DataType.TEXT,
            owned_by: {
                type: DataType.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            created_at: DataType.DATE,
            updated_at: DataType.DATE,
        };
        await queryInterface.createTable('projects', projectsAtt);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};
