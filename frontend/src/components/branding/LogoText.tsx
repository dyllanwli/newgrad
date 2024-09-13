export const LogoText: React.FC = () => {
    return (
        <span className="font-semibold">
            <span className="text-purple-600">New</span><span className="text-red-600">Grad</span><span className="text-purple-600">.works</span>
        </span>
    );
}

export const LogoTextHeader: React.FC = () => {
    return (
        <span className="font-semibold">
            <>
                New
                <span className="text-red-800">Grad</span>
                .works
            </>
        </span>
    );
}