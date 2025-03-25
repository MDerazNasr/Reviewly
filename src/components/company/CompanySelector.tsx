'use client';

import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Company {
  id: string;
  name: string;
  description: string;
  logo_url: string | null;
  address: string;
  membership_type: string;
  keywords: string[];
  google_review_link: string;
}

interface CompanySelectorProps {
  onCompanySelect: (company: Company) => void;
}

export default function CompanySelector({ onCompanySelect }: CompanySelectorProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('/api/companies');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setCompanies(data.data);
        } else {
          throw new Error(data.error || 'Failed to fetch companies');
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch companies');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleCompanyChange = (companyId: string) => {
    const selectedCompany = companies.find(company => company.id === companyId);
    if (selectedCompany) {
      onCompanySelect(selectedCompany);
    }
  };

  if (isLoading) {
    return (
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Loading companies..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="loading">Loading...</SelectItem>
        </SelectContent>
      </Select>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="company">Select Company</Label>
      <Select onValueChange={handleCompanyChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a company" />
        </SelectTrigger>
        <SelectContent>
          {companies.map((company) => (
            <SelectItem key={company.id} value={company.id}>
              {company.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
} 