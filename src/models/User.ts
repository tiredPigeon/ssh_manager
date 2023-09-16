import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm"

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: Number

  @Column()
  userName?: String

  @Column()
  password?: String

  @Column()
  ips?: String

  @Column()
  createdDate?: Date

  @Column()
  updatedDate?: Date

  @Column()
  createdBy?: String

  @Column()
  durationInDays?: Number

  @Column()
  isActive?: Boolean

  @Column()
  countLimit?: Number

  @Column()
  toatalTraffic?: String
}
