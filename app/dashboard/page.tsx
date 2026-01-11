import { getDashboardStats } from "@/actions/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Users,
  Alert02Icon,
  TrendingUp,
  AlertCircle,
  Activity,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export const dynamic = "force-dynamic";

export default async function Page() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      description: "Registered users",
      show: stats.isAdmin,
    },
    {
      title: "Total Items",
      value: stats.totalItems,
      icon: Package,
      description: "In inventory",
      show: true,
    },
    {
      title: "Total Stock",
      value: stats.totalInventoryValue,
      icon: TrendingUp,
      description: "Items in stock",
      show: true,
    },
    {
      title: "Total Complaints",
      value: stats.totalComplaints,
      icon: Alert02Icon,
      description: `${stats.complaintsByStatus.pending} pending`,
      show: true,
    },
  ];

  return (
    <div className="space-y-6 py-10 px-5">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your system statistics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards
          .filter((card) => card.show)
          .map((card, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <HugeiconsIcon
                  icon={card.icon}
                  className="h-4 w-4 text-muted-foreground"
                />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Complaint Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Complaint Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Pending</span>
                <Badge variant="outline">
                  {stats.complaintsByStatus.pending}
                </Badge>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500"
                  style={{
                    width: `${
                      stats.totalComplaints > 0
                        ? (stats.complaintsByStatus.pending /
                            stats.totalComplaints) *
                          100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">In Progress</span>
                <Badge variant="secondary">
                  {stats.complaintsByStatus.inProgress}
                </Badge>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{
                    width: `${
                      stats.totalComplaints > 0
                        ? (stats.complaintsByStatus.inProgress /
                            stats.totalComplaints) *
                          100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Resolved</span>
                <Badge variant="default">
                  {stats.complaintsByStatus.resolved}
                </Badge>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{
                    width: `${
                      stats.totalComplaints > 0
                        ? (stats.complaintsByStatus.resolved /
                            stats.totalComplaints) *
                          100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon icon={Activity} className="h-5 w-5" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.recentTransactions.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No recent transactions
                </p>
              ) : (
                stats.recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between border-b pb-2 last:border-0"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {transaction.item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        by {transaction.user.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          transaction.actionType === "RESTOCK"
                            ? "default"
                            : transaction.actionType === "DISTRIBUTION"
                            ? "secondary"
                            : "outline"
                        }
                        className="text-xs"
                      >
                        {transaction.actionType}
                      </Badge>
                      <p
                        className={`text-xs font-semibold ${
                          transaction.quantityChanged > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.quantityChanged > 0 ? "+" : ""}
                        {transaction.quantityChanged}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon icon={AlertCircle} className="h-5 w-5" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.lowStockItems.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  All items are well stocked
                </p>
              ) : (
                stats.lowStockItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-2 last:border-0"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      {item.description && (
                        <p className="text-xs text-muted-foreground truncate max-w-xs">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <Badge
                      variant={item.count === 0 ? "destructive" : "outline"}
                      className="ml-2"
                    >
                      {item.count} left
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Complaints */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon icon={Alert02Icon} className="h-5 w-5" />
            Recent Complaints
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.recentComplaints.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No recent complaints
              </p>
            ) : (
              stats.recentComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="flex items-start justify-between border-b pb-3 last:border-0"
                >
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium">{complaint.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {complaint.description}
                    </p>
                    {stats.isAdmin && "complaintBy" in complaint && (
                      <p className="text-xs text-muted-foreground">
                        by{" "}
                        {
                          (complaint as { complaintBy: { name: string } })
                            .complaintBy.name
                        }
                      </p>
                    )}
                  </div>
                  <Badge
                    variant={
                      complaint.status === "resolved"
                        ? "default"
                        : complaint.status === "in-progress"
                        ? "secondary"
                        : "outline"
                    }
                    className="ml-2"
                  >
                    {complaint.status.toUpperCase()}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
