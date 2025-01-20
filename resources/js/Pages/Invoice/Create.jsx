import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Create = ({ type, status, customers }) => {
    const [processing, setProcessing] = useState(false);

    const [formData, setFormData] = useState({
        customer_id: "",
        date: "",
        amount: "",
        status: "",
    });

    const [errors, setErrors] = useState({
        customer_id: "",
        date: "",
        amount: "",
        status: "",
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        axios.get("/sanctum/csrf-cookie").then(() => {
            axios
                .post(route("api.create.data", type), formData)
                .then(({ data }) => {
                    setProcessing(false);
                    const { status, message } = data;
                    if (status) {
                        toast.success(message);
                        setErrors({
                            customer_id: "",
                            date: "",
                            amount: "",
                            status: "",
                        });
                        setTimeout(() => router.visit(route("invoice")), 1500);
                    } else {
                        toast.error(message);
                    }
                })
                .catch(({ response }) => {
                    setProcessing(false);
                    const { errors } = response.data || {};
                    if (errors) {
                        Object.entries(errors).forEach(([key, value]) => {
                            setErrors({ ...errors, [key]: value.join(", ") });
                        });
                    }
                });
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Invoice
                </h2>
            }
        >
            <Head title="Create Invoice" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="container mx-auto p-6 bg-gray-50">
                            <form onSubmit={submit}>
                                <div className="my-4">
                                    <InputLabel
                                        htmlFor="customer"
                                        value="Customer"
                                    />
                                    <select
                                        id="customer"
                                        name="customer_id"
                                        value={formData.customer_id}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        onChange={handleChange}
                                    >
                                        <option value="">
                                            Select a customer
                                        </option>
                                        {customers.length > 0 && customers.map((customer) => (
                                            <option
                                                key={customer.id}
                                                value={customer.id}
                                            >
                                                {customer.name}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError
                                        message={errors.customer_id}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="date" value="Date" />

                                    <TextInput
                                        id="date"
                                        name="date"
                                        type="date"
                                        value={formData.date}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={handleChange}
                                    />

                                    <InputError
                                        message={errors.date}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="amount"
                                        value="Amount"
                                    />

                                    <TextInput
                                        id="amount"
                                        type="number"
                                        name="amount"
                                        value={formData.amount}
                                        className="mt-1 block w-full"
                                        onChange={handleChange}
                                    />

                                    <InputError
                                        message={errors.amount}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="phone" value="Phone" />
                                    <select
                                        id="status"
                                        name="status"
                                        value={formData.status}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        onChange={handleChange}
                                    >
                                        <option value="">
                                            Select a status
                                        </option>
                                        {Object.entries(status).map(
                                            ([key, value]) => (
                                                <option key={key} value={key}>
                                                    {value}
                                                </option>
                                            )
                                        )}
                                    </select>

                                    <InputError
                                        message={errors.status}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton
                                        className="ms-4"
                                        disabled={processing}
                                    >
                                        Create
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
