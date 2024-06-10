import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { MessageDomainModule } from '../domain'
import { MessageController } from './message.controller'

@Module({
  imports: [AuthenticationDomainModule, MessageDomainModule],
  controllers: [MessageController],
  providers: [],
})
export class MessageApplicationModule {}
