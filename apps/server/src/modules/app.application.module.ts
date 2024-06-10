import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { DestinationApplicationModule } from './destination/application'

import { JourneyApplicationModule } from './journey/application'

import { CompanionApplicationModule } from './companion/application'

import { MatchApplicationModule } from './match/application'

import { MessageApplicationModule } from './message/application'

import { ReviewApplicationModule } from './review/application'

import { ReportApplicationModule } from './report/application'

import { SubscriptionApplicationModule } from './subscription/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { BillingApplicationModule } from './billing/application'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,
    BillingApplicationModule,

    DestinationApplicationModule,

    JourneyApplicationModule,

    CompanionApplicationModule,

    MatchApplicationModule,

    MessageApplicationModule,

    ReviewApplicationModule,

    ReportApplicationModule,

    SubscriptionApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
