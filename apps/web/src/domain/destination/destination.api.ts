import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Destination } from './destination.model'

export class DestinationApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Destination>,
  ): Promise<Destination[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/destinations${buildOptions}`)
  }

  static findOne(
    destinationId: string,
    queryOptions?: ApiHelper.QueryOptions<Destination>,
  ): Promise<Destination> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/destinations/${destinationId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Destination>): Promise<Destination> {
    return HttpService.api.post(`/v1/destinations`, values)
  }

  static updateOne(
    destinationId: string,
    values: Partial<Destination>,
  ): Promise<Destination> {
    return HttpService.api.patch(`/v1/destinations/${destinationId}`, values)
  }

  static deleteOne(destinationId: string): Promise<void> {
    return HttpService.api.delete(`/v1/destinations/${destinationId}`)
  }
}
