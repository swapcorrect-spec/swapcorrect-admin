import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);
import ReactTimeAgo from "react-time-ago";

interface IProps {
  createdAt: string;
}
export default function MomentAgo({ createdAt }: IProps) {
  if (!createdAt) {
    return <span>Date not available</span>;
  }
  
  const createdAtDate = new Date(createdAt);
  
  // Check if date is valid
  if (isNaN(createdAtDate.getTime())) {
    return <span>Invalid date</span>;
  }
  
  return (
    <>
      <ReactTimeAgo date={createdAtDate} locale="en-US" />
    </>
  );
}
