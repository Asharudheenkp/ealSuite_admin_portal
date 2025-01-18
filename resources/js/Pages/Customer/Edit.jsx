import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const edit = () => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Customer Edit
                </h2>
            }
        >
            <Head title="Customer Edit" />
        </AuthenticatedLayout>
    );
};

export default edit;
