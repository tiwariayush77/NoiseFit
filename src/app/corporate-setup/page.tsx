'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Mock database of Top 20 Indian Companies
// NOTE: Currently, NONE of these companies have partnerships with Noise
// This data structure allows for future partnership additions
const INDIAN_COMPANIES: Record<string, any> = {
  // IT Services
  'tcs.com': { 
    name: 'Tata Consultancy Services', 
    shortName: 'TCS',
    industry: 'IT Services',
    employees: '616,000+',
    headquarters: 'Mumbai',
    partnered: false // Currently no partnership
  },
  'infosys.com': { 
    name: 'Infosys Limited', 
    shortName: 'Infosys',
    industry: 'IT Services',
    employees: '335,000+',
    headquarters: 'Bengaluru',
    partnered: false
  },
  'wipro.com': { 
    name: 'Wipro Limited', 
    shortName: 'Wipro',
    industry: 'IT Services',
    employees: '234,000+',
    headquarters: 'Bengaluru',
    partnered: false
  },
  'hcltech.com': { 
    name: 'HCL Technologies', 
    shortName: 'HCL',
    industry: 'IT Services',
    employees: '237,000+',
    headquarters: 'Noida',
    partnered: false
  },
  'techmahindra.com': { 
    name: 'Tech Mahindra', 
    shortName: 'Tech Mahindra',
    industry: 'IT Services',
    employees: '158,000+',
    headquarters: 'Pune',
    partnered: false
  },
  
  // Conglomerates & Manufacturing
  'ril.com': { 
    name: 'Reliance Industries Limited', 
    shortName: 'Reliance',
    industry: 'Conglomerate',
    employees: '347,000+',
    headquarters: 'Mumbai',
    partnered: false
  },
  'tatasteel.com': { 
    name: 'Tata Steel', 
    shortName: 'Tata Steel',
    industry: 'Steel & Mining',
    employees: '268,000+',
    headquarters: 'Mumbai',
    partnered: false
  },
  'larsentoubro.com': { 
    name: 'Larsen & Toubro', 
    shortName: 'L&T',
    industry: 'Engineering & Construction',
    employees: '407,000+',
    headquarters: 'Mumbai',
    partnered: false
  },
  'mahindra.com': { 
    name: 'Mahindra & Mahindra', 
    shortName: 'Mahindra',
    industry: 'Automobiles',
    employees: '260,000+',
    headquarters: 'Mumbai',
    partnered: false
  },
  
  // Banking & Financial Services
  'hdfcbank.com': { 
    name: 'HDFC Bank', 
    shortName: 'HDFC',
    industry: 'Banking',
    employees: '213,000+',
    headquarters: 'Mumbai',
    partnered: false
  },
  'icicibank.com': { 
    name: 'ICICI Bank', 
    shortName: 'ICICI',
    industry: 'Banking',
    employees: '141,000+',
    headquarters: 'Mumbai',
    partnered: false
  },
  'sbi.co.in': { 
    name: 'State Bank of India', 
    shortName: 'SBI',
    industry: 'Banking',
    employees: '245,000+',
    headquarters: 'Mumbai',
    partnered: false
  },
  'bajajfinserv.in': { 
    name: 'Bajaj Finance', 
    shortName: 'Bajaj Finance',
    industry: 'Financial Services',
    employees: '40,000+',
    headquarters: 'Pune',
    partnered: false
  },
  
  // FMCG & Consumer Goods
  'hul.co.in': { 
    name: 'Hindustan Unilever Limited', 
    shortName: 'HUL',
    industry: 'FMCG',
    employees: '21,000+',
    headquarters: 'Mumbai',
    partnered: false
  },
  'itcportal.com': { 
    name: 'ITC Limited', 
    shortName: 'ITC',
    industry: 'FMCG & Hotels',
    employees: '25,000+',
    headquarters: 'Kolkata',
    partnered: false
  },
  'asianpaints.com': { 
    name: 'Asian Paints', 
    shortName: 'Asian Paints',
    industry: 'Paints & Coatings',
    employees: '7,000+',
    headquarters: 'Mumbai',
    partnered: false
  },
  
  // Telecom
  'airtel.in': { 
    name: 'Bharti Airtel', 
    shortName: 'Airtel',
    industry: 'Telecommunications',
    employees: '25,000+',
    headquarters: 'New Delhi',
    partnered: false
  },
  'jio.com': { 
    name: 'Reliance Jio', 
    shortName: 'Jio',
    industry: 'Telecommunications',
    employees: '15,000+',
    headquarters: 'Mumbai',
    partnered: false
  },
  
  // Others
  'adani.com': { 
    name: 'Adani Group', 
    shortName: 'Adani',
    industry: 'Conglomerate',
    employees: '45,000+',
    headquarters: 'Ahmedabad',
    partnered: false
  },
  'coalindia.in': { 
    name: 'Coal India Limited', 
    shortName: 'Coal India',
    industry: 'Mining',
    employees: '248,000+',
    headquarters: 'Kolkata',
    partnered: false
  },
  'licindia.in': { 
    name: 'Life Insurance Corporation of India', 
    shortName: 'LIC',
    industry: 'Insurance',
    employees: '110,000+',
    headquarters: 'Mumbai',
    partnered: false
  }
};

export default function CorporateSetupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<'none' | 'official' | 'no-partnership'>('none');
  const [companyData, setCompanyData] = useState<any>(null);

  const extractDomain = (emailInput: string): string => {
    const parts = emailInput.toLowerCase().split('@');
    if (parts.length !== 2) return '';
    return parts[1];
  };

  const extractCompanyName = (domain: string): string => {
    // Extract company name from domain for unknown companies
    const parts = domain.split('.');
    if (parts.length > 1) {
      return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    }
    return 'Your Company';
  };

  const checkPartnership = async () => {
    if (!email.includes('@')) {
      return;
    }

    setChecking(true);
    
    const domain = extractDomain(email);
    
    // Simulate API call delay
    setTimeout(() => {
      const companyInfo = INDIAN_COMPANIES[domain];
      
      if (companyInfo) {
        // Company recognized but check partnership status
        if (companyInfo.partnered) {
          // Official partnership exists (future state)
          setResult('official');
          setCompanyData({
            ...companyInfo,
            id: domain.split('.')[0],
            domain: domain
          });
        } else {
          // Company recognized but no partnership
          setResult('no-partnership');
          setCompanyData({
            ...companyInfo,
            id: domain.split('.')[0],
            domain: domain,
            recognized: true
          });
        }
      } else {
        // Company not in database
        setResult('no-partnership');
        setCompanyData({
          name: extractCompanyName(domain),
          shortName: extractCompanyName(domain),
          domain: domain,
          recognized: false,
          partnered: false
        });
      }
      
      setChecking(false);
    }, 1500);
  };

  const handleOfficialContinue = () => {
    // Store official partnership data
    localStorage.setItem('corporateEnabled', 'true');
    localStorage.setItem('corporateType', 'official');
    localStorage.setItem('companyId', companyData.id);
    localStorage.setItem('companyName', companyData.name);
    localStorage.setItem('companyEmail', email);
    
    router.push('/corporate-verified');
  };

  const handleCreateGroup = () => {
    const params = new URLSearchParams({
      company: companyData.name,
      domain: companyData.domain
    });
    router.push('/create-company-group?' + params.toString());
  };

  const handleInviteCompany = () => {
    const params = new URLSearchParams({
      email: email,
      company: companyData.name
    });
    router.push('/invite-company?' + params.toString());
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground mb-4">
            ← Back
          </button>
          <h1 className="text-2xl font-bold mb-2">Enable Team Features</h1>
          <p className="text-muted-foreground">Connect with your workplace wellness</p>
        </div>

        {/* Email Input */}
        {result === 'none' && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Your Work Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@tcs.com"
              className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none mb-2"
            />
            <p className="text-xs text-muted-foreground mb-4">
              We'll check if your company has a partnership with Noise
            </p>
            <button
              onClick={checkPartnership}
              disabled={!email.includes('@') || checking}
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground font-semibold py-4 rounded-xl transition-colors"
            >
              {checking ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2">⏳</span>
                  Checking Partnership...
                </span>
              ) : (
                'Check Partnership'
              )}
            </button>
          </div>
        )}

        {/* Official Partnership Found (Future State) */}
        {result === 'official' && (
          <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 border-2 border-green-500 rounded-2xl p-6">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">✓</div>
              <h2 className="text-2xl font-bold mb-2">Partnership Detected!</h2>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-1">{companyData.name}</h3>
              <p className="text-sm text-muted-foreground mb-1">{companyData.industry}</p>
              <p className="text-xs text-muted-foreground/80 mb-4">
                {companyData.employees} employees · {companyData.headquarters}
              </p>
              
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4">
                <p className="text-sm text-green-400 font-medium">✓ Official Wellness Program Active</p>
              </div>
              
              <p className="text-sm font-medium mb-3">Your Benefits:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">- </span>
                  <span>Official team challenges & leaderboards</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">- </span>
                  <span>Company-sponsored rewards & incentives</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">- </span>
                  <span>Manager dashboards & analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">- </span>
                  <span>Priority support from Noise team</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleOfficialContinue}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-xl transition-colors"
            >
              Continue to Setup →
            </button>
          </div>
        )}

        {/* No Partnership Found */}
        {result === 'no-partnership' && (
          <div>
            <div className="bg-card/50 border border-border rounded-xl p-4 mb-6">
              <div className="flex items-start">
                <span className="text-2xl mr-3">🏢</span>
                <div>
                  <p className="font-semibold mb-1">{companyData.name}</p>
                  {companyData.recognized && (
                    <div className="text-xs text-muted-foreground mb-2">
                      <p>{companyData.industry}</p>
                      <p>{companyData.employees} employees · {companyData.headquarters}</p>
                    </div>
                  )}
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded px-2 py-1 inline-block">
                    <p className="text-xs text-orange-400">⚠️ No official partnership yet</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6 text-center">
              But you can still connect with your colleagues:
            </p>

            {/* Create Group Option */}
            <button
              onClick={handleCreateGroup}
              className="w-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-500 rounded-2xl p-6 mb-4 text-left hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-start mb-4">
                <span className="text-3xl mr-3">👥</span>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Create Company Group</h3>
                  <p className="text-xs text-muted-foreground">Unofficial wellness group</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Start your own wellness group and invite colleagues
              </p>
              
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">- </span>
                  <span>Compete on leaderboards</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">- </span>
                  <span>Join challenges together</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">- </span>
                  <span>Track team progress</span>
                </li>
              </ul>
              
              <div className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg text-center font-semibold transition-colors">
                Create Group →
              </div>
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-border"></div>
              <span className="px-4 text-muted-foreground text-sm">OR</span>
              <div className="flex-1 border-t border-border"></div>
            </div>

            {/* Invite Company Option */}
            <button
              onClick={handleInviteCompany}
              className="w-full bg-card border border-border rounded-xl p-6 text-left hover:border-muted-foreground transition-colors"
            >
              <div className="flex items-start mb-4">
                <span className="text-3xl mr-3">📧</span>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Invite Your Company</h3>
                  <p className="text-xs text-muted-foreground">Help {companyData.shortName} partner with Noise</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Send a proposal to your HR department for an official wellness program.
              </p>
              
              <div className="flex items-center text-accent text-sm font-medium">
                <span>Send Invitation</span>
                <span className="ml-2">→</span>
              </div>
            </button>

            {/* Info Note */}
            <div className="mt-6 bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
              <p className="text-xs text-muted-foreground">
                💡 <strong className="text-foreground">Did you know?</strong> Official partnerships unlock rewards, 
                budgets, and priority features. Your HR can reach us at partnerships@noise.com
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
