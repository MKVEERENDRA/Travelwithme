import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ReviewDomainModule } from '../domain'
import { ReviewController } from './review.controller'

@Module({
  imports: [AuthenticationDomainModule, ReviewDomainModule],
  controllers: [ReviewController],
  providers: [],
})
export class ReviewApplicationModule {}
