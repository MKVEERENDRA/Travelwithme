import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { DestinationDomainModule } from '../domain'
import { DestinationController } from './destination.controller'

@Module({
  imports: [AuthenticationDomainModule, DestinationDomainModule],
  controllers: [DestinationController],
  providers: [],
})
export class DestinationApplicationModule {}
