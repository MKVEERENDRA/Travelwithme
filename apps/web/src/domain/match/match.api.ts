import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Match } from './match.model'

export class MatchApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Match>,
  ): Promise<Match[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/matchs${buildOptions}`)
  }

  static findOne(
    matchId: string,
    queryOptions?: ApiHelper.QueryOptions<Match>,
  ): Promise<Match> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/matchs/${matchId}${buildOptions}`)
  }

  static createOne(values: Partial<Match>): Promise<Match> {
    return HttpService.api.post(`/v1/matchs`, values)
  }

  static updateOne(matchId: string, values: Partial<Match>): Promise<Match> {
    return HttpService.api.patch(`/v1/matchs/${matchId}`, values)
  }

  static deleteOne(matchId: string): Promise<void> {
    return HttpService.api.delete(`/v1/matchs/${matchId}`)
  }
}
