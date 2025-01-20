import ApplicationLogo from '@/Components/ApplicationLogo';
import Features from '@/Components/Features';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const features = [
        {
            title: "Customer Management",
            description: "Add, edit, and view customers with ease.",
        },
        {
            title: "Invoice Management",
            description: "Effortlessly manage and generate invoices.",
        },
        {
            title: "Unified API",
            description: "Simplified API for managing both customers and invoices.",
        },
    ];

    return (
        <>
            <Head title="Welcome" />

            <header className="bg-black text-white py-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center px-6">
                    <ApplicationLogo />
                    <nav className="text-white">
                        {auth.user ? (
                            <Link
                                href={route('customer')}
                                className="rounded px-4 py-2 bg-white text-black font-medium transition hover:bg-gray-100"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={route('login')}
                                className="rounded px-4 py-2 bg-white text-black font-medium transition hover:bg-gray-100"
                            >
                                Log in
                            </Link>
                        )}
                    </nav>
                </div>
            </header>

            <section className="bg-gray-100 py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-5xl font-bold text-black mb-6">
                        Welcome to <span className="font-extrabold">MachineTest</span> Admin Portal
                    </h1>
                    <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                        Manage customers and invoices effortlessly with our intuitive tools and streamlined interface.
                    </p>
                    <Link href={route('customer')}>
                        <PrimaryButton >
                            Get Started
                        </PrimaryButton>
                    </Link>
                </div>
            </section>

            <Features features={features}/>
        </>
    );


}
