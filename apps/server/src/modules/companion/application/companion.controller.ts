import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import {
  Companion,
  CompanionDomainFacade,
} from '@server/modules/companion/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { CompanionApplicationEvent } from './companion.application.event'
import { CompanionCreateDto, CompanionUpdateDto } from './companion.dto'

@Controller('/v1/companions')
export class CompanionController {
  constructor(
    private eventService: EventService,
    private companionDomainFacade: CompanionDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.companionDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: CompanionCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.companionDomainFacade.create(body)

    await this.eventService.emit<CompanionApplicationEvent.CompanionCreated.Payload>(
      CompanionApplicationEvent.CompanionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:companionId')
  async findOne(
    @Param('companionId') companionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.companionDomainFacade.findOneByIdOrFail(
      companionId,
      queryOptions,
    )

    return item
  }

  @Patch('/:companionId')
  async update(
    @Param('companionId') companionId: string,
    @Body() body: CompanionUpdateDto,
  ) {
    const item = await this.companionDomainFacade.findOneByIdOrFail(companionId)

    const itemUpdated = await this.companionDomainFacade.update(
      item,
      body as Partial<Companion>,
    )
    return itemUpdated
  }

  @Delete('/:companionId')
  async delete(@Param('companionId') companionId: string) {
    const item = await this.companionDomainFacade.findOneByIdOrFail(companionId)

    await this.companionDomainFacade.delete(item)

    return item
  }
}
