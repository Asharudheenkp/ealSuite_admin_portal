import { useState, useEffect } from "react";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { Head } from "@inertiajs/react";
import Loader from "@/Components/Loader";

export default function Customer({ type }) {
    const [customers, setCustomers] = useState([]);
    const [paginationData, setPaginationData] = useState({});
    const [loading, setLoading] = useState(false);

    const getCustomers = (page = 1) => {
        setLoading(true);
        axios
            .post(route("api.get.data", type), { page })
            .then(({ data }) => {
                setPaginationData(data.data);
                setCustomers(data.data.data);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getCustomers();
    }, []);

    const handlePageChange = (page) => {
        getCustomers(page);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Customer
                </h2>
            }
        >
            <Head title="Customer" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-3xl font-bold text-gray-800">
                                    Customer List
                                </h1>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
                                    Add New Customer
                                </button>
                            </div>

                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                {loading ? (
                                    <Loader/>
                                ) : (
                                    <>
                                        {customers.length === 0 ? (
                                            <div className="text-center py-12 text-lg text-gray-500">
                                                No customers found.
                                            </div>
                                        ) : (
                                            <div className="overflow-x-auto">
                                                <table className="table-auto w-full text-left border-collapse">
                                                    <thead className="bg-blue-600 text-white">
                                                        <tr>
                                                            <th className="px-4 py-3">#</th>
                                                            <th className="px-4 py-3">
                                                                Name
                                                            </th>
                                                            <th className="px-4 py-3">
                                                                Phone
                                                            </th>
                                                            <th className="px-4 py-3">
                                                                Email
                                                            </th>
                                                            <th className="px-4 py-3">
                                                                Address
                                                            </th>
                                                            <th className="px-4 py-3 text-center">
                                                                Actions
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        {customers.map(
                                                            (customer, index) => (
                                                                <tr
                                                                    className="hover:bg-gray-50"
                                                                    key={customer.id}
                                                                >
                                                                    <td className="px-4 py-3">
                                                                        {index + 1}
                                                                    </td>
                                                                    <td className="px-4 py-3 font-semibold text-gray-700">
                                                                        {customer.name}
                                                                    </td>
                                                                    <td className="px-4 py-3 text-gray-600">
                                                                        {customer.phone}
                                                                    </td>
                                                                    <td className="px-4 py-3 text-gray-600">
                                                                        {customer.email}
                                                                    </td>
                                                                    <td className="px-4 py-3 text-gray-600">
                                                                        {customer.address}
                                                                    </td>
                                                                    <td className="px-4 py-3 text-center">
                                                                        <button className="text-sm text-blue-500 hover:underline">
                                                                            Edit
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </>
                                )}

                                <Pagination
                                    paginationData={paginationData}
                                    handlePageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
