import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Agent } from '../types';
import { AgentCard } from '../components/agent/AgentCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Search, Star, Phone, Mail, MessageSquare, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AgentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  useEffect(() => {
    api.getAgents().then((res) => setAgents(res));
  }, []);

  const filteredAgents = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Top Banner matching Screen 4 */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Our Top Agents</h1>
        <p className="text-sm text-slate-500 font-medium">
          Connect with our experienced and trusted real estate agents across the nation.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto pt-2">
          <Input
            placeholder="Search agents by name or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-4 h-4 text-slate-400" />}
          />
        </div>
      </div>

      {/* Agents Grid matching Screen 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAgents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onSelect={(selected) => setSelectedAgent(selected)}
          />
        ))}
      </div>

      {/* View All Agents Button matching Screen 4 */}
      <div className="text-center pt-6">
        <Button variant="primary" size="lg" onClick={() => setSearchQuery('')}>
          View All Agents
        </Button>
      </div>

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <Modal
          isOpen={!!selectedAgent}
          onClose={() => setSelectedAgent(null)}
          title="Agent Profile"
        >
          <div className="text-center space-y-6">
            <img
              src={selectedAgent.profileImage}
              alt={selectedAgent.name}
              className="w-28 h-28 rounded-full object-cover mx-auto ring-4 ring-brand-50 shadow-md"
            />
            <div>
              <h3 className="text-xl font-bold text-slate-900">{selectedAgent.name}</h3>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">{selectedAgent.role}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Rating</span>
                <span className="font-extrabold text-slate-800 text-sm flex items-center justify-center gap-1 mt-0.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {selectedAgent.rating} ({selectedAgent.reviewCount} reviews)
                </span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Properties Listed</span>
                <span className="font-extrabold text-slate-800 text-sm mt-0.5 block">
                  {selectedAgent.propertiesCount}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed text-left">
              {selectedAgent.bio ||
                'Experienced real estate advisor committed to finding high value investments and family homes for clients.'}
            </p>

            <div className="pt-4 border-t border-slate-100 flex gap-3">
              <Button
                variant="primary"
                fullWidth
                onClick={() => {
                  setSelectedAgent(null);
                  navigate('/messages');
                }}
                icon={<MessageSquare className="w-4 h-4" />}
              >
                Send Message
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={() => {
                  setSelectedAgent(null);
                  navigate(`/properties?search=${encodeURIComponent(selectedAgent.name)}`);
                }}
                icon={<Building className="w-4 h-4" />}
              >
                View Listings
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
