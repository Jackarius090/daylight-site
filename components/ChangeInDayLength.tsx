import { DataTypeMonth } from "./ShowData";

export default function ChangeInDayLength({
  days,
  city,
  timeUnit,
}: {
  days: DataTypeMonth;
  city: string;
  timeUnit: string;
}) {
  const changeInDayLength =
    days.length > 0 ? days[1].day_length - days[0].day_length : null;

  return (
    <div className="text-primary-foreground">
      In {city}, the daylength is increasing by {changeInDayLength} minutes
      every {timeUnit}.
    </div>
  );
}
