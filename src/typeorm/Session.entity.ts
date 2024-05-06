import { ISession } from "connect-typeorm";
import { Column, Index, PrimaryColumn } from "typeorm";

export class SessionEntity implements ISession {
    @Index()
    @Column("bigint")
    expiredAt: number;

    @PrimaryColumn("varchar", { length: 255 })
    id= '';

    @Column("text")
    json = '';
}