import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Users } from "lucide-react";
import SidebarSkeleton from "./SidebarSkeleton";

const Sidebar = () => {
  const { userData } = useAuthStore();
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const onlineFriends = userData.friends.filter((friendId) =>
    onlineUsers.includes(friendId)
  );

  const filteredUsers = showOnlineOnly
    ? users?.filter((user) => onlineFriends?.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;
  return (
    <aside
      className={`h-full w-full xs:w-[35%] sm:w-[40%] md:w-[40%] lg:w-[30%] border-r border-base-300 flex flex-col transition-all duration-200 ${
        selectedUser ? "hidden" : "flex"
      } xs:flex`}
    >
      <div className="border-b border-base-300 w-full p-1 flex flex-col items-center justify-center">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium">Chat with Friends</span>
        </div>
        <div className="mt-3 items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineFriends.length > 0 ? onlineFriends.length - 1 : 0} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto h-full w-full py-3">
        {filteredUsers &&
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                selectedUser?._id === user._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }`}
            >
              <div className="avatar flex items-center justify-center">
                <div className="w-[60px] h-[60px] xs:w-[76px] xs:h-[74px] rounded-full">
                  <img src={`${user?.photoPath}`} />
                </div>
              </div>
              <div className="relative mx-auto">
                {onlineFriends.includes(user._id) && (
                  <span
                    className="absolute bottom-[-25px] right-[60px] size-3 bg-green-500 
              rounded-full ring-2 ring-zinc-900"
                  />
                )}
              </div>
              <div className="text-left">
                <div className="font-medium truncate">{user.uniqueName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineFriends.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))}
        {!filteredUsers && showOnlineOnly ? (
          <div className="text-center text-zinc-500 py-4">No online users!</div>
        ) : (
          <div className="text-center text-zinc-500 py-4">
            Friends added will appear here!
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
