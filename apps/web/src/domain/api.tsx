import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { BillingApi } from './billing/billing.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { DestinationApi } from './destination/destination.api'

import { JourneyApi } from './journey/journey.api'

import { CompanionApi } from './companion/companion.api'

import { MatchApi } from './match/match.api'

import { MessageApi } from './message/message.api'

import { ReviewApi } from './review/review.api'

import { ReportApi } from './report/report.api'

import { SubscriptionApi } from './subscription/subscription.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Billing extends BillingApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Destination extends DestinationApi {}

  export class Journey extends JourneyApi {}

  export class Companion extends CompanionApi {}

  export class Match extends MatchApi {}

  export class Message extends MessageApi {}

  export class Review extends ReviewApi {}

  export class Report extends ReportApi {}

  export class Subscription extends SubscriptionApi {}
}
