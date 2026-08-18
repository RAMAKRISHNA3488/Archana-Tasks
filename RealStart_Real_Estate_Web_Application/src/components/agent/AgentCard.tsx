import React from 'react';
import { Agent } from '../../types';
import { Button } from '../ui/Button';
import { Star, Phone, Mail, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AgentCardProps {
  agent: Agent;
  onSelect?: (agent: Agent) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onSelect }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col items-center text-center">
      {/* Avatar */}
      <div className="relative mb-4">
        <img
          src={agent.profileImage}
          alt={agent.name}
          className="w-24 h-24 rounded-full object-cover ring-4 ring-brand-50 shadow-sm"
        />
        <div className="absolute bottom-0 right-0 bg-emerald-500 w-4 h-4 rounded-full border-2 border-white" />
      </div>

      {/* Info */}
      <h3 className="text-base font-bold text-slate-800 mb-0.5">{agent.name}</h3>
      <p className="text-xs text-slate-500 font-medium mb-3">{agent.role}</p>

      {/* Properties count & Rating */}
      <div className="w-full bg-slate-50 rounded-xl p-2.5 mb-4 flex items-center justify-around text-xs border border-slate-100">
        <div>
          <span className="block font-bold text-slate-800 text-sm">{agent.propertiesCount}</span>
          <span className="text-slate-400">Properties</span>
        </div>
        <div className="h-6 w-px bg-slate-200" />
        <div>
          <div className="flex items-center gap-1 font-bold text-slate-800 text-sm">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{agent.rating}</span>
          </div>
          <span className="text-slate-400">({agent.reviewCount})</span>
        </div>
      </div>

      {/* Action icons bar matching Screen 4 */}
      <div className="flex items-center justify-center gap-2 mb-4 w-full">
        <a
          href={`tel:${agent.phone}`}
          className="p-2.5 rounded-xl border border-slate-200 text-brand-600 hover:bg-brand-50 transition-colors"
          title="Call Agent"
        >
          <Phone className="w-4 h-4" />
        </a>
        <a
          href={`mailto:${agent.email.trim().replace(/^['"]|['"]$/g, '')}`}
          className="p-2.5 rounded-xl border border-slate-200 text-brand-600 hover:bg-brand-50 transition-colors"
          title="Email Agent"
        >
          <Mail className="w-4 h-4" />
        </a>
        <button
          onClick={() => navigate('/messages')}
          className="p-2.5 rounded-xl border border-slate-200 text-brand-600 hover:bg-brand-50 transition-colors"
          title="Message Agent"
        >
          <MessageSquare className="w-4 h-4" />
        </button>
      </div>

      <Button
        variant="outline"
        size="sm"
        fullWidth
        onClick={() => (onSelect ? onSelect(agent) : navigate(`/properties?search=${encodeURIComponent(agent.name)}`))}
      >
        View Agent Profile
      </Button>
    </div>
  );
};
