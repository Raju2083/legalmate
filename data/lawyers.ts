export interface Lawyer {
    id: number;
    name: string;
    specialty: string;
    location: {
      lat: number;
      lng: number;
    };
    bio: string;
    phone: string;
    email: string;
  }
  
  export const lawyers: Lawyer[] = [
    {
      id: 1,
      name: 'Ananya Sharma',
      specialty: 'Property Law',
      location: { lat: 12.9716, lng: 77.5946 }, // Bangalore
      bio: "Specializing in residential and commercial property transactions with over 10 years of experience in Bangalore's real estate market.",
      phone: "+91 98765 43210",
      email: "ananya.sharma@example.com",
    },
    {
      id: 2,
      name: 'Vikram Singh',
      specialty: 'Criminal Law',
      location: { lat: 28.6139, lng: 77.2090 }, // New Delhi
      bio: "A seasoned criminal defense attorney known for his meticulous case preparation and strong courtroom presence.",
      phone: "+91 91234 56789",
      email: "vikram.singh@example.com",
    },
    {
      id: 3,
      name: 'Priya Desai',
      specialty: 'Family Law',
      location: { lat: 19.0760, lng: 72.8777 }, // Mumbai
      bio: "Compassionate and dedicated family law practitioner focused on mediation and amicable resolutions for divorce and custody cases.",
      phone: "+91 99887 76655",
      email: "priya.desai@example.com",
    },
    {
      id: 4,
      name: 'Rajesh Kumar',
      specialty: 'Corporate Law',
      location: { lat: 13.0827, lng: 80.2707 }, // Chennai
      bio: "Expert in corporate governance, mergers, and acquisitions, providing strategic legal advice to startups and established companies.",
      phone: "+91 87654 32109",
      email: "rajesh.kumar@example.com",
    },
    {
      id: 5,
      name: 'Meera Reddy',
      specialty: 'Intellectual Property',
      location: { lat: 17.3850, lng: 78.4867 }, // Hyderabad
      bio: "Helping innovators and creators protect their work through patent, trademark, and copyright law.",
      phone: "+91 88877 66655",
      email: "meera.reddy@example.com",
    },
    {
      id: 6,
      name: 'Arjun Mehta',
      specialty: 'Property Dispute Resolution',
      location: { lat: 12.9784, lng: 77.5935 }, // Bangalore (near Ananya)
      bio: "An expert mediator and litigator with a strong track record in resolving complex property disputes.",
      phone: "+91 77766 55544",
      email: "arjun.mehta@example.com",
    },
     {
      id: 7,
      name: 'Suresh Patil',
      specialty: 'Real Estate Law',
      location: { lat: 18.5204, lng: 73.8567 }, // Pune
      bio: "Focused on real estate documentation, RERA compliance, and transaction advisory for individuals and developers.",
      phone: "+91 76543 21098",
      email: "suresh.patil@example.com",
    },
    {
      id: 8,
      name: 'Deepika Rao',
      specialty: 'Family Law',
      location: { lat: 19.100, lng: 72.8800 }, // Mumbai (near Priya)
      bio: "Provides sensitive and robust legal support for matters of alimony, child support, and domestic disputes.",
      phone: "+91 65432 10987",
      email: "deepika.rao@example.com",
    },
    {
      id: 9,
      name: 'Kavitha Murugan',
      specialty: 'Cyber Law',
      location: { lat: 13.0604, lng: 80.2495 }, // Chennai
      bio: 'Specializes in data privacy, online fraud, and IT act compliance. Advises tech startups on legal frameworks.',
      phone: '+91 91122 33445',
      email: 'kavitha.murugan@example.com',
    },
    {
      id: 10,
      name: 'Anand Venkatesh',
      specialty: 'Labor Law',
      location: { lat: 13.0075, lng: 80.2575 }, // Chennai
      bio: 'Represents both employees and employers in disputes related to contracts, termination, and workplace harassment.',
      phone: '+91 95566 77889',
      email: 'anand.venkatesh@example.com',
    },
    {
      id: 11,
      name: 'Sunita Krishnan',
      specialty: 'Tax Law',
      location: { lat: 13.0878, lng: 80.2785 }, // Chennai
      bio: 'An expert in direct and indirect taxation, helping clients with tax planning, compliance, and litigation.',
      phone: '+91 99988 77766',
      email: 'sunita.krishnan@example.com',
    }
  ];