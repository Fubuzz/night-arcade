import { Panel } from "@/components/ui/panel";
import { userProfile } from "@/lib/data";

export function ActivityFeed() {
  return (
    <Panel className="p-6">
      <div className="mb-5">
        <p className="text-sm text-white/50">Recent activity</p>
        <h2 className="mt-1 text-2xl font-semibold text-white">What moved tonight</h2>
      </div>
      <div className="space-y-4">
        {userProfile.recentActivity.map((item) => (
          <div key={item.id} className="rounded-3xl border border-white/10 bg-slate-950/45 p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="font-medium text-white">{item.title}</p>
              <p className="text-sm text-white/45">{item.timestamp}</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-white/58">{item.detail}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
