export class CreateRoomDTO {
  roomTitle: string;
  roomPrivate: boolean;
  roomPassword?: string;
  roomCreatorId: string;
}
