// src/components/SummaryTable.jsx
const SummaryTable = ({ summary }) => (
    <div>
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        <table className="w-full border border-collapse border-gray-400 text-left mb-2">
            <thead>
                <tr className="bg-gray-200">
                    <th className="p-2 border">Element Type</th>
                    <th className="p-2 border">Count</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(summary).map(([type, count]) => (
                    <tr key={type}>
                        <td className="p-2 border">{type}</td>
                        <td className="p-2 border">{count}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default SummaryTable;
