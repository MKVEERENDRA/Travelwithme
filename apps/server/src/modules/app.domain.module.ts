import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { DestinationDomainModule } from './destination/domain'

import { JourneyDomainModule } from './journey/domain'

import { CompanionDomainModule } from './companion/domain'

import { MatchDomainModule } from './match/domain'

import { MessageDomainModule } from './message/domain'

import { ReviewDomainModule } from './review/domain'

import { ReportDomainModule } from './report/domain'

import { SubscriptionDomainModule } from './subscription/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    DestinationDomainModule,

    JourneyDomainModule,

    CompanionDomainModule,

    MatchDomainModule,

    MessageDomainModule,

    ReviewDomainModule,

    ReportDomainModule,

    SubscriptionDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
