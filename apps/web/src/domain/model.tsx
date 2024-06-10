import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'
import {
  BillingPayment as BillingPaymentModel,
  BillingProduct as BillingProductModel,
  BillingSubscription as BillingSubscriptionModel,
} from './billing/billing.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Destination as DestinationModel } from './destination/destination.model'

import { Journey as JourneyModel } from './journey/journey.model'

import { Companion as CompanionModel } from './companion/companion.model'

import { Match as MatchModel } from './match/match.model'

import { Message as MessageModel } from './message/message.model'

import { Review as ReviewModel } from './review/review.model'

import { Report as ReportModel } from './report/report.model'

import { Subscription as SubscriptionModel } from './subscription/subscription.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}
  export class BillingProduct extends BillingProductModel {}
  export class BillingPayment extends BillingPaymentModel {}
  export class BillingSubscription extends BillingSubscriptionModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Destination extends DestinationModel {}

  export class Journey extends JourneyModel {}

  export class Companion extends CompanionModel {}

  export class Match extends MatchModel {}

  export class Message extends MessageModel {}

  export class Review extends ReviewModel {}

  export class Report extends ReportModel {}

  export class Subscription extends SubscriptionModel {}
}
