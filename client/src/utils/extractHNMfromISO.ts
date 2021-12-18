export default function extractHNMfromISO(isoTime: string): string {
  let timeHour = isoTime.split("T")[1];
  timeHour = String(String(timeHour).split(".")[0])
    .split(":")
    .slice(0, 2)
    .join(":");
  return timeHour;
}
