import http from '../../http';

export async function joinRoom(roomId: string, password?: string) {
  await http.post('/rooms/join', {
    roomId: roomId,
    password: password || '',
  });
}
