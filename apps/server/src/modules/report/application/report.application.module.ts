import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ReportDomainModule } from '../domain'
import { ReportController } from './report.controller'

@Module({
  imports: [AuthenticationDomainModule, ReportDomainModule],
  controllers: [ReportController],
  providers: [],
})
export class ReportApplicationModule {}
