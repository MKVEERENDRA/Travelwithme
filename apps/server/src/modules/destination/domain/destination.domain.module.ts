import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { DestinationDomainFacade } from './destination.domain.facade'
import { Destination } from './destination.model'

@Module({
  imports: [TypeOrmModule.forFeature([Destination]), DatabaseHelperModule],
  providers: [DestinationDomainFacade, DestinationDomainFacade],
  exports: [DestinationDomainFacade],
})
export class DestinationDomainModule {}
