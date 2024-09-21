import SearchJobs from '../components/JobSearchPage';
import Footer from '../components/Footer';

export default function SearchPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <SearchJobs />
            <Footer />
        </div>
    );
}