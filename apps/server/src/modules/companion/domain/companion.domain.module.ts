import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { CompanionDomainFacade } from './companion.domain.facade'
import { Companion } from './companion.model'

@Module({
  imports: [TypeOrmModule.forFeature([Companion]), DatabaseHelperModule],
  providers: [CompanionDomainFacade, CompanionDomainFacade],
  exports: [CompanionDomainFacade],
})
export class CompanionDomainModule {}
