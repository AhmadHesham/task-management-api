import {
    Column,
    DataType,
    Table,
    Model,
    CreatedAt,
    UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'projects' })
export class Project extends Model {
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

    @Column
    owned_by: number;

    @UpdatedAt
    @Column({ defaultValue: DataType.NOW })
    updated_at: Date;
}
