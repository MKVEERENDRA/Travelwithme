import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Message } from './message.model'

export class MessageApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Message>,
  ): Promise<Message[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/messages${buildOptions}`)
  }

  static findOne(
    messageId: string,
    queryOptions?: ApiHelper.QueryOptions<Message>,
  ): Promise<Message> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/messages/${messageId}${buildOptions}`)
  }

  static createOne(values: Partial<Message>): Promise<Message> {
    return HttpService.api.post(`/v1/messages`, values)
  }

  static updateOne(
    messageId: string,
    values: Partial<Message>,
  ): Promise<Message> {
    return HttpService.api.patch(`/v1/messages/${messageId}`, values)
  }

  static deleteOne(messageId: string): Promise<void> {
    return HttpService.api.delete(`/v1/messages/${messageId}`)
  }
}
