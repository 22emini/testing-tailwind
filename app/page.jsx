"use client"
import { LoaderIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

const ContactsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/Contacts');
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        console.error('Failed to fetch contacts:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
        console.log('Submitting form data:', formData);
        
        const res = await fetch('/api/Contacts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            console.error('Server response error:', errorData);
            throw new Error('Failed to create contact');
        }

        const newContact = await res.json();
        console.log('Contact created:', newContact);
        
        // Clear form data
        setFormData({
          name: '',
          email: '',
          phone: ''
        });
        
        // Refresh contacts list
        await fetchContacts();
        
    } catch (error) {
        console.error('Error processing contact:', error);
    } finally {
        setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Manager</h1>
        
        {/* Test Connection Component */}
     
        
        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Contact</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"  disabled={loading}
            >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <LoaderIcon className="animate-spin w-4 h-4" />
                  </div>
                ) : (
                  "Add contact"
                )}
            </button>
          </form>
        </div>

        {/* Contacts List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Contacts List</h2>
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <h3 className="text-lg font-medium text-gray-900">{contact.name}</h3>
                <p className="text-gray-600">{contact.email}</p>
                <p className="text-gray-600">{contact.phone}</p>
              </div>
            ))}
            {contacts.length === 0 && (
              <p className="text-gray-500 text-center py-4">No contacts added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
