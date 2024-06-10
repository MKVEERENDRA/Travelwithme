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
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  reviewerId?: string

  @Column({ nullable: true })
  reviewedUserId?: string

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  rating?: number

  @Column({ nullable: true })
  comment?: string

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
