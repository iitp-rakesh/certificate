import { BadgeCheck } from "lucide-react";

function StatusBadge({ children = "Verified" }) {
  return (
    <span className="status-badge">
      <BadgeCheck size={17} strokeWidth={2.2} />
      {children}
    </span>
  );
}

export default StatusBadge;
