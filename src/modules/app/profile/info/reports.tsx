import UserReportsPanel from "~/modules/app/flags-reports/_components/user-reports-panel";

interface UserReportsProps {
  userId?: string;
}

const UserReports: React.FC<UserReportsProps> = ({ userId }) => {
  return <UserReportsPanel userId={userId} />;
};

export default UserReports;
