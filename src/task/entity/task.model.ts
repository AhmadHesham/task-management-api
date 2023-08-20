import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'tasks' })
export class Task extends Model {
    @Column({
        type: DataType.UUIDV4,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
    })
    id: string;

	@Column
	name: string;

	@Column
	description: string;

	@CreatedAt
	@Column({ defaultValue: DataType.NOW })
	created_at: Date;

	@UpdatedAt
	@Column({ defaultValue: DataType.NOW })
	updated_at: Date;

	@Column
	project_id: string;

}
