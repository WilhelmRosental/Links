import UserInfos from "../UserInfos";

const Sidebar: React.FC = () => {
  return (
    <div className="hidden md:flex p-10 flex-col w-sm h-screen z-40">
      <UserInfos />
    </div>
  );
};

export default Sidebar;
