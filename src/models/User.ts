import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  private id?: Number;

  @Column()
  private userName?: String;

  @Column()
  private password?: String;
  
  @Column()
  private ips?: String;
  
  @Column()
  private createdDate?: Date;

  @Column()
  private updatedDate?: Date;

  @Column()
  private endDate?: Date;

  @Column()
  private isActive?: Boolean;

  @Column()
  private countLimit?: Number;

  @Column()
  private toatalTraffic?: Number;
}
