import { AlertTriangle, ShieldAlert, BadgeInfo } from "lucide-react";

interface OverviewAlertsProps {
  alerts: Array<{ type: string; message: string }>;
}

export const OverviewAlerts = ({ alerts }: OverviewAlertsProps) => {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {alerts.map((alert, idx) => {
        const isCritical = alert.type === "CRITICAL";
        const isWarning = alert.type === "WARNING";

        return (
          <div
            key={idx}
            className={`flex items-start gap-4 p-4 border-l-4 rounded-r-[2px] backdrop-blur-sm
              ${
                isCritical
                  ? "border-destructive bg-destructive/10 text-on-surface"
                  : isWarning
                  ? "border-yellow-500 bg-yellow-500/10 text-on-surface"
                  : "border-primary bg-primary/10 text-on-surface"
              }`}
          >
            <div
              className={`p-2 rounded-full ${
                isCritical
                  ? "bg-destructive/20 text-destructive"
                  : isWarning
                  ? "bg-yellow-500/20 text-yellow-500"
                  : "bg-primary/20 text-primary"
              }`}
            >
              {isCritical ? (
                <ShieldAlert className="w-5 h-5" />
              ) : isWarning ? (
                <AlertTriangle className="w-5 h-5" />
              ) : (
                <BadgeInfo className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1 mt-1">
              <h4
                className={`text-xs font-bold uppercase tracking-widest mb-1 
                  ${
                    isCritical
                      ? "text-destructive"
                      : isWarning
                      ? "text-yellow-500"
                      : "text-primary"
                  }`}
              >
                {alert.type} ALERT
              </h4>
              <p className="text-sm font-ui leading-relaxed opacity-90">
                {alert.message}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
