import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Companion } from './companion.model'

export class CompanionApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Companion>,
  ): Promise<Companion[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/companions${buildOptions}`)
  }

  static findOne(
    companionId: string,
    queryOptions?: ApiHelper.QueryOptions<Companion>,
  ): Promise<Companion> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/companions/${companionId}${buildOptions}`)
  }

  static createOne(values: Partial<Companion>): Promise<Companion> {
    return HttpService.api.post(`/v1/companions`, values)
  }

  static updateOne(
    companionId: string,
    values: Partial<Companion>,
  ): Promise<Companion> {
    return HttpService.api.patch(`/v1/companions/${companionId}`, values)
  }

  static deleteOne(companionId: string): Promise<void> {
    return HttpService.api.delete(`/v1/companions/${companionId}`)
  }
}
