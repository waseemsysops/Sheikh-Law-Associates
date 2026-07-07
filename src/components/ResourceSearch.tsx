/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Filter, BookOpen, Scale, FileText, HelpCircle, ArrowUpRight } from 'lucide-react';
import { Database } from '../lib/seedData';
import { LegalResource } from '../types';

export default function ResourceSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedResource, setSelectedResource] = useState<LegalResource | null>(null);

  const resources = Database.getResources();

  // Filter logic
  const filteredResources = resources.filter(res => {
    const matchesSearch = 
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === 'All' || res.type === selectedType;

    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Statute':
        return <Scale className="w-4 h-4 text-gold-500" />;
      case 'Precedent':
        return <BookOpen className="w-4 h-4 text-blue-400" />;
      case 'Form':
        return <FileText className="w-4 h-4 text-emerald-400" />;
      default:
        return <HelpCircle className="w-4 h-4 text-dark-300" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'Statute': return 'bg-gold-500/10 text-gold-500 border-gold-500/20';
      case 'Precedent': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Form': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default: return 'bg-dark-700 text-dark-300 border-dark-650';
    }
  };

  return (
    <section id="resources-search" className="py-20 bg-dark-950 border-y border-dark-650">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono tracking-widest text-gold-500 uppercase font-semibold">Jurisprudence Database</span>
          <h2 className="text-4xl font-serif font-semibold text-dark-5 mt-2 tracking-tight">Legal Resource Center</h2>
          <p className="text-dark-300 mt-4 leading-relaxed">
            Easily search and review binding Supreme Court precedents, land registry statutes, and draft contract templates maintained by our chamber library.
          </p>
        </div>

        {/* Search Toolbar */}
        <div className="bg-dark-800 rounded-lg p-5 border border-dark-650 shadow-sm max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="relative md:col-span-8">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-dark-400" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search precedents, Land Revenue Act sections, templates..."
                className="w-full pl-12 pr-4 py-3 bg-dark-700 border border-dark-650 rounded text-sm focus:border-gold-500 focus:outline-none transition-colors text-dark-100 placeholder:text-dark-400"
              />
            </div>

            {/* Type Filter */}
            <div className="relative md:col-span-4 flex items-center">
              <Filter className="absolute left-4 w-4 h-4 text-dark-400" />
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-dark-650 rounded text-sm focus:border-gold-500 focus:outline-none text-dark-100 cursor-pointer"
              >
                <option value="All">All Resources</option>
                <option value="Statute">Statutes / Laws</option>
                <option value="Precedent">Precedents / Cases</option>
                <option value="Form">Forms & Templates</option>
              </select>
            </div>

          </div>
        </div>

        {/* Search Results */}
        <div className="max-w-4xl mx-auto">
          {filteredResources.length === 0 ? (
            <div className="text-center py-12 bg-dark-800 rounded border border-dark-650">
              <p className="text-dark-400 text-sm">No resources match your search parameters. Try searching "Land Mutation", "Section 96", or "Contract".</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredResources.map(res => (
                <div 
                   key={res.id}
                   onClick={() => setSelectedResource(res)}
                   className="bg-dark-800 rounded border border-dark-650 p-6 hover:border-gold-500/50 cursor-pointer transition-all duration-200 shadow-sm flex flex-col justify-between group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-dark-750 border border-dark-650 rounded-md">
                        {getTypeIcon(res.type)}
                      </div>
                      <div>
                        <span className={`px-2 py-0.5 border text-[10px] font-mono font-semibold rounded uppercase tracking-wider ${getTypeBadgeColor(res.type)}`}>
                          {res.type}
                        </span>
                        <h4 className="text-base font-serif font-semibold text-dark-100 group-hover:text-gold-500 transition-colors mt-1">{res.title}</h4>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-dark-400 uppercase tracking-wider">{res.jurisdiction}</span>
                  </div>

                  <p className="text-dark-300 text-xs mt-3 leading-relaxed">
                    {res.summary}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-dark-650">
                    <div className="flex flex-wrap gap-1.5">
                      {res.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-dark-900 border border-dark-650 rounded text-[10px] text-gold-500 font-mono">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <button className="text-gold-500 text-[11px] font-bold flex items-center hover:text-gold-400 transition-colors cursor-pointer">
                      View Full Citation <ArrowUpRight className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Resource Detail Drawer / Modal */}
      {selectedResource && (
        <div id="resource-modal" className="fixed inset-0 z-50 bg-dark-950/80 backdrop-blur-sm flex justify-end">
          <div className="bg-dark-800 max-w-2xl w-full h-full p-8 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300 flex flex-col justify-between border-l border-dark-650">
            <div>
              <div className="flex items-center justify-between border-b border-dark-650 pb-5 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-dark-900 border border-dark-650 rounded text-gold-500">
                    {getTypeIcon(selectedResource.type)}
                  </div>
                  <div>
                    <span className={`px-2 py-0.5 border text-[10px] font-mono font-semibold rounded uppercase tracking-wider ${getTypeBadgeColor(selectedResource.type)}`}>
                      {selectedResource.type}
                    </span>
                    <h3 className="text-lg font-serif font-semibold text-gold-500 mt-1">{selectedResource.title}</h3>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedResource(null)}
                  className="text-xs font-mono text-dark-300 hover:text-gold-500 border border-dark-650 hover:border-gold-500 px-3 py-1 rounded transition-colors cursor-pointer"
                >
                  CLOSE
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono tracking-widest text-gold-500 uppercase">Executive Summary</h4>
                  <p className="text-dark-200 text-sm mt-2 leading-relaxed">
                    {selectedResource.summary}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono tracking-widest text-gold-500 uppercase">Statutory Text / Legal Ruling Citation</h4>
                  <div className="bg-dark-900 border border-dark-650 rounded p-5 mt-2 font-mono text-xs leading-relaxed text-emerald-400 whitespace-pre-wrap max-h-96 overflow-y-auto">
                    {selectedResource.content}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono tracking-widest text-gold-500 uppercase">Jurisdiction Scope</h4>
                  <p className="text-dark-200 text-xs mt-2 font-semibold">
                    {selectedResource.jurisdiction}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-dark-650 pt-6 mt-10 flex justify-between items-center text-xs text-dark-400">
              <span>Sheikh Law Associates Library Service</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(selectedResource.content);
                  alert("Legal citation copied to clipboard!");
                }}
                className="bg-gold-500 hover:bg-gold-600 text-dark-950 font-bold tracking-wider uppercase px-4 py-2 rounded text-[10px] transition-all cursor-pointer shadow-md shadow-gold-500/10"
              >
                Copy Text block
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
