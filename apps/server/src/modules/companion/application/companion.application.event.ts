export namespace CompanionApplicationEvent {
  export namespace CompanionCreated {
    export const key = 'companion.application.companion.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
