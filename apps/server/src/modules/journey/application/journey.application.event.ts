export namespace JourneyApplicationEvent {
  export namespace JourneyCreated {
    export const key = 'journey.application.journey.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
