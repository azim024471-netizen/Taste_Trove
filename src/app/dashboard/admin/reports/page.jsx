import { getReports } from '@/lib/api_actions/reports_api';
import { FaShieldAlt } from 'react-icons/fa';
import ReportsContainer from '@/Components/AdminDashboard/ReportsContainer';

const ReportsPage = async () => {
    const reports = await getReports() || [];

    return (
        <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8 text-zinc-900">
            <div className="max-w-7xl mx-auto">
                
                <div className="mb-8 flex items-center gap-4 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                    <div className="p-3.5 bg-rose-50 rounded-xl text-rose-600 border border-rose-100 shadow-sm">
                        <FaShieldAlt className="text-3xl" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-zinc-900 tracking-tight sm:text-3xl">
                            Reported Recipes
                        </h1>
                        <p className="text-sm text-zinc-500 mt-1 font-medium">
                            Review and manage user reports for community safety ({reports.length} total reports)
                        </p>
                    </div>
                </div>

                <ReportsContainer initialReports={reports} />

            </div>
        </div>
    );
};

export default ReportsPage;