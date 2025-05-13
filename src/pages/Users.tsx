
import React from 'react';
import Layout from '@/components/Layout';
import { useSecurityContext } from '@/context/SecurityContext';
import Header from '@/components/Header';

const Users = () => {
  const { users } = useSecurityContext();

  return (
    <Layout activePage="users">
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <Header title="Users & Entities" />
        
        <div className="mt-6">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium">Users with High Risk</h3>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-gray-50">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Department</th>
                      <th className="px-4 py-3">Risk Score</th>
                      <th className="px-4 py-3">Anomalies</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{user.name}</td>
                        <td className="px-4 py-3">{user.role}</td>
                        <td className="px-4 py-3">{user.department}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.riskLevel === 'high' 
                              ? 'bg-red-100 text-red-800' 
                              : user.riskLevel === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                          }`}>
                            {user.riskScore}
                          </span>
                        </td>
                        <td className="px-4 py-3">{user.anomalies}</td>
                        <td className="px-4 py-3">
                          {new Date(user.lastActivity).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
