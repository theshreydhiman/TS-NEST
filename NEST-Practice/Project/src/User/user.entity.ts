
import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class User extends Model {
    @Column
    Name: string;

    @Column
    UserName: string;

    @Column
    Age: number;

    @Column
    Location: string;

    @Column
    Email: string;

    @Column
    Hash: string;

    @Column
    Salt: string;

    @Column
    RefToken: string;

    @Column
    Token: string;

    @Column
    LastActive: Date;
}