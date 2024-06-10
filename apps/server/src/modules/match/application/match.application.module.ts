import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { MatchDomainModule } from '../domain'
import { MatchController } from './match.controller'

@Module({
  imports: [AuthenticationDomainModule, MatchDomainModule],
  controllers: [MatchController],
  providers: [],
})
export class MatchApplicationModule {}
