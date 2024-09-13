import React from 'react';

const DottedFeatureCard = ({ icon, title, description }) => (
    <div className="flex flex-col items-center border-dotted border-2 border-gray-400 p-4 h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <img src={icon} alt={`${title} icon`} className="w-16 h-16 mb-4" />
        <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-800">
                {title}
            </h2>
            <p className="text-sm md:text-base text-gray-600">
                {description}
            </p>
        </div>
    </div>
);

const DottedFeatureSection = () => (
    <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DottedFeatureCard
                icon="https://placehold.co/64x64"
                title="Custom AI Tools"
                description="Unlock the potential of artificial intelligence tailored specifically for your business needs. Together we can focus on success to ensure your life is easier."
            />
            <DottedFeatureCard
                icon="https://placehold.co/64x64"
                title="Creative Design"
                description="Our team can help you bring big aesthetics with technology, delivering stunning websites and engaging apps like you've never seen before."
            />
            <DottedFeatureCard
                icon="https://placehold.co/64x64"
                title="Digital Full Service"
                description="Turn your vision into reality! From setting up your digital presence to managing your online reputation, we've got you covered."
            />
            <DottedFeatureCard
                icon="https://placehold.co/64x64"
                title="Relationship Forward"
                description="Strong relationships are the foundation of success. We prioritize building lasting connections with our clients to ensure that their long-term goals are met."
            />
        </div>
    </div>
);

export default DottedFeatureSection;