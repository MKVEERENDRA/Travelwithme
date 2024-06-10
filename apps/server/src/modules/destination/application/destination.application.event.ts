export namespace DestinationApplicationEvent {
  export namespace DestinationCreated {
    export const key = 'destination.application.destination.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
