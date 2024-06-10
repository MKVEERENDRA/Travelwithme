import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { CompanionDomainModule } from '../domain'
import { CompanionController } from './companion.controller'

@Module({
  imports: [AuthenticationDomainModule, CompanionDomainModule],
  controllers: [CompanionController],
  providers: [],
})
export class CompanionApplicationModule {}
