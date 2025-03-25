'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function CompanyRegistrationForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    membershipType: '',
    keywords: '',
    googleReviewLink: '',
    logo: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, logo: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value);
        }
      });

      const response = await fetch('/api/companies', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Company added successfully!');
        router.push('/'); // Redirect to home page
      } else {
        toast.error(data.error || 'Failed to add company');
      }
    } catch (error) {
      toast.error('An error occurred while adding the company');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-white">Company Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Enter company name"
            className="w-full bg-white text-black border-2 border-black focus:border-black focus:ring-black"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="membershipType" className="text-sm font-medium text-white">Membership Type *</Label>
          <Select
            value={formData.membershipType}
            onValueChange={(value) => setFormData(prev => ({ ...prev, membershipType: value }))}
          >
            <SelectTrigger className="w-full bg-white text-black border-2 border-black focus:border-black focus:ring-black">
              <SelectValue placeholder="Select membership type" />
            </SelectTrigger>
            <SelectContent className="bg-white border-2 border-black">
              <SelectItem value="basic" className="text-black hover:bg-gray-200 focus:bg-gray-200">Basic</SelectItem>
              <SelectItem value="premium" className="text-black hover:bg-gray-200 focus:bg-gray-200">Premium</SelectItem>
              <SelectItem value="enterprise" className="text-black hover:bg-gray-200 focus:bg-gray-200">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium text-white">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter company description"
          className="min-h-[100px] bg-white text-black border-2 border-black focus:border-black focus:ring-black"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm font-medium text-white">Address *</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
          placeholder="Enter company address"
          className="bg-white text-black border-2 border-black focus:border-black focus:ring-black"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="keywords" className="text-sm font-medium text-white">Keywords (comma-separated)</Label>
        <Input
          id="keywords"
          name="keywords"
          value={formData.keywords}
          onChange={handleInputChange}
          placeholder="e.g., great service, friendly staff, fast delivery"
          className="bg-white text-black border-2 border-black focus:border-black focus:ring-black"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="googleReviewLink" className="text-sm font-medium text-white">Google Review Link *</Label>
        <Input
          id="googleReviewLink"
          name="googleReviewLink"
          value={formData.googleReviewLink}
          onChange={handleInputChange}
          required
          placeholder="Enter Google Review link"
          className="bg-white text-black border-2 border-black focus:border-black focus:ring-black"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="logo" className="text-sm font-medium text-white">Company Logo</Label>
        <Input
          id="logo"
          name="logo"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-black/90 bg-white text-black border-2 border-black focus:border-black focus:ring-black"
        />
        <p className="text-sm text-gray-300">Recommended size: 200x200px. Max size: 2MB</p>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/')}
          disabled={isLoading}
          className="border-2 border-black text-black hover:bg-black hover:text-white"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-black text-white hover:bg-black/90"
        >
          {isLoading ? 'Adding Company...' : 'Add Company'}
        </Button>
      </div>
    </form>
  );
} 