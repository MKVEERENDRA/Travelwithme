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
  Destination,
  DestinationDomainFacade,
} from '@server/modules/destination/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { DestinationApplicationEvent } from './destination.application.event'
import { DestinationCreateDto, DestinationUpdateDto } from './destination.dto'

@Controller('/v1/destinations')
export class DestinationController {
  constructor(
    private eventService: EventService,
    private destinationDomainFacade: DestinationDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.destinationDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: DestinationCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.destinationDomainFacade.create(body)

    await this.eventService.emit<DestinationApplicationEvent.DestinationCreated.Payload>(
      DestinationApplicationEvent.DestinationCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:destinationId')
  async findOne(
    @Param('destinationId') destinationId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.destinationDomainFacade.findOneByIdOrFail(
      destinationId,
      queryOptions,
    )

    return item
  }

  @Patch('/:destinationId')
  async update(
    @Param('destinationId') destinationId: string,
    @Body() body: DestinationUpdateDto,
  ) {
    const item =
      await this.destinationDomainFacade.findOneByIdOrFail(destinationId)

    const itemUpdated = await this.destinationDomainFacade.update(
      item,
      body as Partial<Destination>,
    )
    return itemUpdated
  }

  @Delete('/:destinationId')
  async delete(@Param('destinationId') destinationId: string) {
    const item =
      await this.destinationDomainFacade.findOneByIdOrFail(destinationId)

    await this.destinationDomainFacade.delete(item)

    return item
  }
}
