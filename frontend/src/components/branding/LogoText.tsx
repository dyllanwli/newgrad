export const LogoTextConfig = {
    "prefix": "New",
    "middle": "Grad",
    "suffix": "Works",
    "initial": "NG"
}

const LogoTextContent = ({ color }: { color: string }) => (
    <>
        <span className={`text-${color}`}>{LogoTextConfig.prefix}</span>
        <span className={`text-${color}`}>{LogoTextConfig.middle}</span>
        <span className="text-red-600">.{LogoTextConfig.suffix}</span>
    </>
);

export const LogoText: React.FC = () => {
    return (
        <span className="font-semibold">
            <LogoTextContent color="purple-600" />
        </span>
    );
}

export const LogoTextHeader: React.FC = () => {
    return (
        <span className="font-semibold">
            <span className="hidden md:inline">
                <LogoTextContent color="purple-800" />
            </span>
            <span className="md:hidden text-purple-800">{LogoTextConfig.initial}</span>
        </span>
    );
}