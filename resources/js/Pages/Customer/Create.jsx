import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Create = ({ type }) => {
    const [processing, setProcessing] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
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
                        setTimeout(() => router.visit(route("customer")), 1500);
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
                    Create Customer
                </h2>
            }
        >
            <Head title="Create Customer" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="container mx-auto p-6 bg-gray-50">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={handleChange}
                                    />

                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="Email" />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        className="mt-1 block w-full"
                                        onChange={handleChange}
                                    />

                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="phone" value="Phone" />

                                    <TextInput
                                        id="phone"
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        className="mt-1 block w-full"
                                        onChange={handleChange}
                                    />

                                    <InputError
                                        message={errors.phone}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="address"
                                        value="Address"
                                    />

                                    <textarea
                                        name="address"
                                        id="address"
                                        onChange={handleChange}
                                        value={formData.address}
                                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full"
                                    ></textarea>

                                    <InputError
                                        message={errors.address}
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
