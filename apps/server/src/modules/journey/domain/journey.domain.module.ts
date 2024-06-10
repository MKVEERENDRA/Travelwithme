import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { JourneyDomainFacade } from './journey.domain.facade'
import { Journey } from './journey.model'

@Module({
  imports: [TypeOrmModule.forFeature([Journey]), DatabaseHelperModule],
  providers: [JourneyDomainFacade, JourneyDomainFacade],
  exports: [JourneyDomainFacade],
})
export class JourneyDomainModule {}
