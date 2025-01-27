import { useState, useEffect } from "react";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { Head, Link } from "@inertiajs/react";
import Loader from "@/Components/Loader";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ type }) {
    const [customers, setCustomers] = useState([]);
    const [paginationData, setPaginationData] = useState({});
    const [loading, setLoading] = useState(false);

    const getCustomers = (page = 1) => {
        setLoading(true);
        axios.get("/sanctum/csrf-cookie").then(() => {
            axios
                .post(route("api.get.data", type), { page })
                .then(({ data }) => {
                    setPaginationData(data.data);
                    setCustomers(data.data.data);
                })
                .finally(() => {
                    setLoading(false);
                });
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
                        <div className="container mx-auto p-6 bg-gray-50">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-3xl font-bold text-gray-800">
                                    Customer List
                                </h1>
                                <Link
                                    href={route("customer.create")}
                                >
                                    <PrimaryButton>
                                        Create Customer
                                    </PrimaryButton>
                                </Link>
                            </div>

                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                {loading ? (
                                    <Loader />
                                ) : (
                                    <>
                                        {customers.length === 0 ? (
                                            <div className="text-center py-12 text-lg text-gray-500">
                                                No customers found.
                                            </div>
                                        ) : (
                                            <div className="overflow-x-auto">
                                                <table className="table-auto w-full text-left border-collapse">
                                                    <thead className="bg-black text-white">
                                                        <tr>
                                                            <th className="px-4 py-3">
                                                                #
                                                            </th>
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
                                                            (
                                                                customer,
                                                                index
                                                            ) => (
                                                                <tr
                                                                    className="hover:bg-gray-50"
                                                                    key={
                                                                        customer.id
                                                                    }
                                                                >
                                                                    <td className="px-4 py-3">
                                                                        {index +
                                                                            1}
                                                                    </td>
                                                                    <td className="px-4 py-3 font-semibold text-gray-700">
                                                                        {
                                                                            customer.name
                                                                        }
                                                                    </td>
                                                                    <td className="px-4 py-3 text-gray-600">
                                                                        {
                                                                            customer.phone
                                                                        }
                                                                    </td>
                                                                    <td className="px-4 py-3 text-gray-600">
                                                                        {
                                                                            customer.email
                                                                        }
                                                                    </td>
                                                                    <td className="px-4 py-3 text-gray-600">
                                                                        {
                                                                            customer.address
                                                                        }
                                                                    </td>
                                                                    <td className="px-4 py-3 text-center">
                                                                        <Link
                                                                            href={route(
                                                                                "customer.edit",
                                                                                customer.id
                                                                            )}
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
                                {customers.length > 0 && (
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
