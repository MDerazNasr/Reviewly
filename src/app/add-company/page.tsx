import CompanyRegistrationForm from "@/components/company/CompanyRegistrationForm";

export default function AddCompanyPage() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Add New Company</h1>
            <p className="text-gray-300">Register your company to start generating authentic reviews</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-lg border border-white/10 p-6">
            <CompanyRegistrationForm />
          </div>
        </div>
      </div>
    </div>
  );
} 