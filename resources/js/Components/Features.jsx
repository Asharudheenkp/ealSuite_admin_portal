
const Features = ({features}) => {
    return (
        <section id="features" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-black text-center mb-12">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-8 bg-gray-100 rounded-lg shadow transition hover:shadow-md"
                        >
                            <h4 className="text-xl font-bold text-black mb-3">{feature.title}</h4>
                            <p className="text-gray-700">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
