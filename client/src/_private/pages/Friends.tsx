/* eslint-disable @typescript-eslint/no-unused-vars */
import { getUserSyncs } from "@/api/api";
import { useAuthUserId } from "@/hooks/useAuthUserId";
import type { User } from "@/lib/types/types";
import { useQuery } from "@tanstack/react-query";

const Syncs = () => {
  const userId = useAuthUserId();

  const { data } = useQuery<User[]>({
    queryKey: ["user-syncs", userId, "syncs"],
    queryFn: function () {
      return getUserSyncs(userId ?? "", 50, 0);
    },
    enabled: Boolean(userId),
  });

  const syncs = data ?? [];

  return (
    <section className="max-w-xl mx-auto w-full p-4">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-xl font-bold">All Syncs</h1>
      </div>

      {/* Search */}
      <input
        placeholder="Search Syncs"
        className="w-full bg-dark-3 rounded-full px-4 py-2 mb-4 outline-none"
      />

      {/* Count */}
      <p className="text-sm text-light-3 mb-4">
        {syncs.length} Syncs
      </p>

      {/* Sync List */}
      <div className="space-y-4">
        {syncs.map(function (sync) {
          return <SyncItem key={sync.id} sync={sync} />;
        })}
      </div>

    </section>
  );
};

function SyncItem({ sync }: { sync: User }) {
  const initial = sync.username?.charAt(0).toUpperCase() || "U";

  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">

        {/* Avatar */}
        <div className="h-12 w-12 rounded-full bg-dark-4 overflow-hidden flex items-center justify-center">
          {sync.avatar ? (
            <img
              src={sync.avatar}
              className="h-full w-full object-cover"
            />
          ) : (
            initial
          )}
        </div>

        {/* Name */}
        <div>
          <p className="font-medium text-light-1">
            {sync.username}
          </p>
        </div>

      </div>

      {/* Menu */}
      <button className="text-xl text-light-3">
        ⋯
      </button>

    </div>
  );
}

export default Syncs;