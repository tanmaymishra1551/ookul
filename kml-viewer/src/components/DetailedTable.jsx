// src/components/DetailedTable.jsx
const DetailedTable = ({ detailedData }) => (
    <div>
        <h2 className="text-xl font-semibold mb-2">Detailed</h2>
        <table className="w-full border border-collapse border-gray-400 text-left mb-2">
            <thead>
                <tr className="bg-gray-200">
                    <th className="p-2 border">Element Type</th>
                    <th className="p-2 border">Total Length (km)</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(detailedData).map(([type, length]) => (
                    <tr key={type}>
                        <td className="p-2 border">{type}</td>
                        <td className="p-2 border">{length.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default DetailedTable;
