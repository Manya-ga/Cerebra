import { 
  Users, 
  Activity, 
  Target, 
  Zap, 
  Cpu, 
  HeartPulse, 
  Clock, 
  Box, 
  Database 
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, trendLabel, colorClass }) => (
  <div className="glass-card p-6 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${colorClass}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend && (
        <span className={`text-sm font-semibold px-2.5 py-1 rounded-full ${trend.startsWith('+') ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
          {trend}
        </span>
      )}
    </div>
    <div>
      <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-white">{value}</span>
        {trendLabel && <span className="text-xs text-gray-500 mb-1">{trendLabel}</span>}
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">System Overview</h2>
          <p className="text-gray-400">Monitor Cerebra AI performance and system health.</p>
        </div>
        <button className="btn-primary">Generate Report</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Patients" 
          value="1,248" 
          icon={Users} 
          trend="+12%" 
          trendLabel="vs last month"
          colorClass="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard 
          title="Scans Processed" 
          value="3,450" 
          icon={Activity} 
          trend="+5%"
          trendLabel="vs last month"
          colorClass="bg-gradient-to-br from-cyan-500 to-cyan-600"
        />
        <StatCard 
          title="Segmentation Accuracy" 
          value="98.2%" 
          icon={Target} 
          trend="+0.4%"
          trendLabel="avg confidence"
          colorClass="bg-gradient-to-br from-emerald-500 to-emerald-600"
        />
        <StatCard 
          title="Avg Inference Time" 
          value="1.2s" 
          icon={Zap} 
          trend="-0.1s"
          trendLabel="per scan"
          colorClass="bg-gradient-to-br from-amber-500 to-amber-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 lg:col-span-2">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary-cyan" />
            Recent Predictions
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="pb-3 font-medium">Scan ID</th>
                  <th className="pb-3 font-medium">Patient</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {[1, 2, 3, 4].map((i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 text-white font-medium">MRI-{8700 + i}</td>
                    <td className="py-4 text-gray-300">P-{2340 + i}</td>
                    <td className="py-4 text-gray-400">Oct {28 - i}, 2023</td>
                    <td className="py-4">
                      <span className="bg-success/10 text-success px-3 py-1 rounded-full text-xs font-semibold">Completed</span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="text-primary-cyan hover:text-white transition-colors text-sm font-medium">View Result</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-primary-blue" />
              System Health
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">GPU Status</span>
                </div>
                <span className="text-success font-medium">Optimal (42°C)</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">Storage Usage</span>
                </div>
                <span className="text-warning font-medium">68%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Box className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">Model Version</span>
                </div>
                <span className="text-white font-medium">SwinUNETR v2.1</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">Uptime</span>
                </div>
                <span className="text-white font-medium">99.98%</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 bg-gradient-to-br from-primary-blue/10 to-primary-cyan/10 border-primary-blue/20">
            <h3 className="text-lg font-bold text-white mb-2">Ready for Training</h3>
            <p className="text-gray-400 text-sm mb-4">New BraTS dataset batch is ready. Start fine-tuning to improve segmentation accuracy.</p>
            <button className="w-full btn-secondary">Initialize Training</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
