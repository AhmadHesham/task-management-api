import { QueryInterface } from 'sequelize';
import { DataType, Sequelize } from 'sequelize-typescript';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        const tasksAtt = {
            id: { type: DataType.UUID, primaryKey: true },
            project_id: {
                type: DataType.UUID,
                references: {
                    model: 'projects',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
                name: DataType.STRING,
                description: DataType.TEXT,
            },
            created_at: DataType.DATE,
            updated_at: DataType.DATE,
        };

        await queryInterface.createTable('tasks', tasksAtt);
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
