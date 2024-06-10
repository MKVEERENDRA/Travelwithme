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
import { Journey, JourneyDomainFacade } from '@server/modules/journey/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { JourneyApplicationEvent } from './journey.application.event'
import { JourneyCreateDto, JourneyUpdateDto } from './journey.dto'

@Controller('/v1/journeys')
export class JourneyController {
  constructor(
    private eventService: EventService,
    private journeyDomainFacade: JourneyDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.journeyDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: JourneyCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.journeyDomainFacade.create(body)

    await this.eventService.emit<JourneyApplicationEvent.JourneyCreated.Payload>(
      JourneyApplicationEvent.JourneyCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:journeyId')
  async findOne(
    @Param('journeyId') journeyId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.journeyDomainFacade.findOneByIdOrFail(
      journeyId,
      queryOptions,
    )

    return item
  }

  @Patch('/:journeyId')
  async update(
    @Param('journeyId') journeyId: string,
    @Body() body: JourneyUpdateDto,
  ) {
    const item = await this.journeyDomainFacade.findOneByIdOrFail(journeyId)

    const itemUpdated = await this.journeyDomainFacade.update(
      item,
      body as Partial<Journey>,
    )
    return itemUpdated
  }

  @Delete('/:journeyId')
  async delete(@Param('journeyId') journeyId: string) {
    const item = await this.journeyDomainFacade.findOneByIdOrFail(journeyId)

    await this.journeyDomainFacade.delete(item)

    return item
  }
}
