import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  reporterId?: string

  @Column({ nullable: true })
  reportedUserId?: string

  @Column({ nullable: true })
  reason?: string

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
