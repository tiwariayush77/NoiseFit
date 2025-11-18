'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeviceSearchManualPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  const devices = [
    { id: 'colorfit-pro-6', name: 'ColorFit Pro 6 Max', category: 'Watch' },
    { id: 'colorfit-pulse', name: 'ColorFit Pulse Grand', category: 'Watch' },
    { id: 'luna-ring', name: 'Luna Ring', category: 'Ring' },
    { id: 'noisfit-halo', name: 'NoiseFit Halo', category: 'Watch' }
  ];
  
  const filteredDevices = searchQuery
    ? devices.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : devices;

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <button onClick={() => router.back()} className="text-muted-foreground mb-4">
            ← Back
          </button>
          <h1 className="text-2xl font-bold mb-2">Search by Name</h1>
          <p className="text-muted-foreground">Find your specific device model</p>
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search device name..."
          className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none mb-6"
        />

        {/* Results */}
        <div className="space-y-3">
          {filteredDevices.map(device => (
            <button
              key={device.id}
              onClick={() => router.push(`/device-connect-intro?devices=${device.id}&device=${encodeURIComponent(device.name)}`)}
              className="w-full bg-card/50 hover:bg-muted border border-border rounded-xl p-4 text-left transition-colors"
            >
              <p className="font-semibold">{device.name}</p>
              <p className="text-sm text-muted-foreground">{device.category}</p>
            </button>
          ))}
        </div>

        {filteredDevices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No devices found for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
