export const LogoText: React.FC = () => {
    return (
        <span className="font-semibold">
            <span className="text-purple-600">New</span><span className="text-purple-600">Grad</span><span className="text-red-600">.works</span>
        </span>
    );
}

export const LogoTextHeader: React.FC = () => {
    return (
        <span className="font-semibold">
            <span className="hidden md:inline">
                <span className="text-purple-800">New</span>
                <span className="text-purple-800">Grad</span>
                <span className="text-red-800">.works</span>
            </span>
            <span className="md:hidden text-purple-800">NG</span>
        </span>
    );
}