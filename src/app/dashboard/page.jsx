export default function DashboardOverview() {


  return (
    <div>
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500">Total Recipes</p>
          <p className="text-4xl font-bold mt-2">12</p>
        </div>
      </div>
    </div>
  );
}