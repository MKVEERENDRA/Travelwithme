import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationDestinationSubscriber } from './subscribers/notification.destination.subscriber'

import { NotificationJourneySubscriber } from './subscribers/notification.journey.subscriber'

import { NotificationCompanionSubscriber } from './subscribers/notification.companion.subscriber'

import { NotificationMatchSubscriber } from './subscribers/notification.match.subscriber'

import { NotificationMessageSubscriber } from './subscribers/notification.message.subscriber'

import { NotificationReviewSubscriber } from './subscribers/notification.review.subscriber'

import { NotificationReportSubscriber } from './subscribers/notification.report.subscriber'

import { NotificationSubscriptionSubscriber } from './subscribers/notification.subscription.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationDestinationSubscriber,

    NotificationJourneySubscriber,

    NotificationCompanionSubscriber,

    NotificationMatchSubscriber,

    NotificationMessageSubscriber,

    NotificationReviewSubscriber,

    NotificationReportSubscriber,

    NotificationSubscriptionSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
