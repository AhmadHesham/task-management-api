import {
    Column,
    CreatedAt,
    DataType,
    Model,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column
    first_name: string;

    @Column
    last_name: string;

    @Column
    email: string;

    @Column
    password: string;

    @CreatedAt
    @Column({ defaultValue: DataType.NOW })
    created_at: Date;

    @UpdatedAt
    @Column({ defaultValue: DataType.NOW })
    updated_at: Date;
}
