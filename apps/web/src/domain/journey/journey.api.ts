import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Journey } from './journey.model'

export class JourneyApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Journey>,
  ): Promise<Journey[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/journeys${buildOptions}`)
  }

  static findOne(
    journeyId: string,
    queryOptions?: ApiHelper.QueryOptions<Journey>,
  ): Promise<Journey> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/journeys/${journeyId}${buildOptions}`)
  }

  static createOne(values: Partial<Journey>): Promise<Journey> {
    return HttpService.api.post(`/v1/journeys`, values)
  }

  static updateOne(
    journeyId: string,
    values: Partial<Journey>,
  ): Promise<Journey> {
    return HttpService.api.patch(`/v1/journeys/${journeyId}`, values)
  }

  static deleteOne(journeyId: string): Promise<void> {
    return HttpService.api.delete(`/v1/journeys/${journeyId}`)
  }
}
