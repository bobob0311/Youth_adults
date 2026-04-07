export function generateRoomPassword() {
  return Math.floor(10000 + Math.random() * 90000);
}
