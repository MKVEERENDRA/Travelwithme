import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { JourneyDomainModule } from '../domain'
import { JourneyController } from './journey.controller'

@Module({
  imports: [AuthenticationDomainModule, JourneyDomainModule],
  controllers: [JourneyController],
  providers: [],
})
export class JourneyApplicationModule {}
