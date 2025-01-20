import { useState, useEffect } from "react";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { Head, Link } from "@inertiajs/react";
import Loader from "@/Components/Loader";

export default function Index({ type }) {
    const [invoices, setInvoices] = useState([]);
    const [paginationData, setPaginationData] = useState({});
    const [loading, setLoading] = useState(false);

    const getInvoices = (page = 1) => {
        setLoading(true);
        axios
            .post(route("api.get.data", type), { page })
            .then(({ data }) => {
                setPaginationData(data.data);
                setInvoices(data.data.data);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getInvoices();
    }, []);

    const handlePageChange = (page) => {
        getInvoices(page);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Invoice
                </h2>
            }
        >
            <Head title="Invoice" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="container mx-auto p-6 bg-gray-50">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-3xl font-bold text-gray-800">
                                    Invoice List
                                </h1>
                                <Link
                                    href={route("invoice.create")}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                                >
                                    Create Invoice
                                </Link>
                            </div>

                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                {loading ? (
                                    <Loader />
                                ) : (
                                    <>
                                        {invoices.length === 0 ? (
                                            <div className="text-center py-12 text-lg text-gray-500">
                                                No invoices found.
                                            </div>
                                        ) : (
                                            <div className="overflow-x-auto">
                                                <table className="table-auto w-full text-left border-collapse">
                                                    <thead className="bg-blue-600 text-white">
                                                        <tr>
                                                            <th className="px-4 py-3">
                                                                #
                                                            </th>
                                                            <th className="px-4 py-3">
                                                                Customer Name
                                                            </th>
                                                            <th className="px-4 py-3">
                                                                Date
                                                            </th>
                                                            <th className="px-4 py-3">
                                                                Amount
                                                            </th>
                                                            <th className="px-4 py-3">
                                                                Status
                                                            </th>
                                                            <th className="px-4 py-3 text-center">
                                                                Actions
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        {invoices.map(
                                                            (
                                                                invoice,
                                                                index
                                                            ) => (
                                                                <tr
                                                                    className="hover:bg-gray-50"
                                                                    key={invoice.id}
                                                                >
                                                                    <td className="px-4 py-3">
                                                                        {index + 1}
                                                                    </td>
                                                                    <td className="px-4 py-3 font-semibold text-gray-700">
                                                                        { invoice.customer.name }
                                                                    </td>
                                                                    <td className="px-4 py-3 text-gray-600">
                                                                        { invoice.date }
                                                                    </td>
                                                                    <td className="px-4 py-3 text-gray-600">
                                                                        { invoice.amount }
                                                                    </td>
                                                                    <td className="px-4 py-3 text-gray-600">
                                                                        { invoice.status }
                                                                    </td>
                                                                    <td className="px-4 py-3 text-center">
                                                                        <Link
                                                                            href={ route("invoice.edit", invoice.id ) }
                                                                            className="text-sm text-blue-500 hover:underline"
                                                                        >
                                                                            Edit
                                                                        </Link>
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
                                {invoices.length > 0 && (
                                    <Pagination
                                        paginationData={paginationData}
                                        handlePageChange={handlePageChange}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
