import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { SubscriptionDomainModule } from '../domain'
import { SubscriptionController } from './subscription.controller'

@Module({
  imports: [AuthenticationDomainModule, SubscriptionDomainModule],
  controllers: [SubscriptionController],
  providers: [],
})
export class SubscriptionApplicationModule {}
