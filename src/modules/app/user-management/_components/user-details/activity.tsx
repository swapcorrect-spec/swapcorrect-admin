import UserRecentActivity from "~/modules/shared/widgets/user-recent-activity";

interface UserActivityProps {
  userId?: string;
}

const UserActivity: React.FC<UserActivityProps> = ({ userId }) => {
  return <UserRecentActivity userId={userId} />;
};

export default UserActivity;
