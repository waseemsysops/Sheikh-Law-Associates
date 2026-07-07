/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, User, ArrowLeft, BookOpen, Clock } from 'lucide-react';
import { Database } from '../lib/seedData';
import { BlogArticle } from '../types';

export default function BlogSection() {
  const [blogs, setBlogs] = useState<BlogArticle[]>(Database.getBlogs());
  const [selectedBlog, setSelectedBlog] = useState<BlogArticle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Refresh blogs occasionally if we add one from Admin Dashboard
  React.useEffect(() => {
    setBlogs(Database.getBlogs().filter(b => b.isPublished));
  }, [selectedBlog]);

  const categories = ['All', 'Real Estate Law', 'Corporate Law', 'Criminal Defense'];

  const filteredBlogs = blogs.filter(blog => {
    return selectedCategory === 'All' || blog.category === selectedCategory;
  });

  return (
    <section id="blog" className="py-20 bg-dark-950 border-b border-dark-650">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-xs font-mono tracking-widest text-gold-500 uppercase font-semibold">Chamber Intellect</span>
            <h2 className="text-4xl font-serif font-semibold text-dark-50 mt-2 tracking-tight">Legal Insights & News</h2>
            <p className="text-dark-300 mt-3 max-w-xl text-sm leading-relaxed">
              Stay updated with recent regulatory modifications, land registration processes in Punjab, and trial defense frameworks written by our senior practitioners.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${selectedCategory === cat ? 'bg-gold-500 border-gold-500 text-dark-950 font-bold shadow-md shadow-gold-500/10' : 'bg-dark-800 border-dark-650 text-dark-300 hover:border-dark-400'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <article 
              key={blog.id}
              onClick={() => setSelectedBlog(blog)}
              className="group flex flex-col justify-between bg-dark-800 border border-dark-650 rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 hover:border-gold-500/50"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-dark-900">
                  <img 
                    src={blog.coverImage} 
                    alt={blog.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-dark-900/90 backdrop-blur-sm text-gold-500 text-[10px] font-mono font-semibold tracking-wider uppercase px-2.5 py-1 rounded border border-dark-650/40">
                    {blog.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-4 text-dark-400 text-[11px] font-mono mb-3">
                    <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1 text-gold-500" /> {new Date(blog.publishedAt).toLocaleDateString()}</span>
                    <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-gold-500" /> {blog.readTime}</span>
                  </div>

                  <h3 className="text-lg font-serif font-semibold text-dark-50 group-hover:text-gold-500 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-dark-300 text-xs mt-3 line-clamp-3 leading-relaxed">
                    {blog.content}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 mt-auto border-t border-dark-650 flex items-center justify-between text-dark-400 text-xs">
                <span className="flex items-center font-medium"><User className="w-3.5 h-3.5 mr-1 text-gold-500" /> {blog.author}</span>
                <span className="font-bold text-gold-500 group-hover:translate-x-1 transition-transform group-hover:text-gold-400">Read Article &rarr;</span>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Blog Reader Modal */}
      {selectedBlog && (
        <div id="blog-reader-modal" className="fixed inset-0 z-50 bg-dark-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-dark-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-dark-650">
            
            {/* Modal sticky bar */}
            <div className="sticky top-0 bg-dark-800/95 backdrop-blur-md px-6 py-4 border-b border-dark-650 flex justify-between items-center z-10">
              <button 
                onClick={() => setSelectedBlog(null)}
                className="inline-flex items-center text-xs font-semibold text-dark-300 hover:text-gold-500 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Articles
              </button>
              <span className="text-[10px] font-mono text-gold-500 uppercase tracking-widest">SHEIKH LAW BRIEFING</span>
            </div>

            {/* Banner cover */}
            <div className="h-64 md:h-80 w-full relative bg-dark-900">
              <img 
                src={selectedBlog.coverImage} 
                alt={selectedBlog.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-gold-500 text-dark-950 text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded">
                  {selectedBlog.category}
                </span>
                <h1 className="text-2xl md:text-3xl font-serif font-semibold text-dark-50 mt-3 leading-tight drop-shadow-sm">
                  {selectedBlog.title}
                </h1>
              </div>
            </div>

            {/* Author info */}
            <div className="px-6 md:px-10 py-6 border-b border-dark-650 flex flex-wrap items-center justify-between gap-4 bg-dark-900 text-xs text-dark-300">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-dark-700 border border-dark-650 flex items-center justify-center text-gold-500 font-semibold uppercase">
                  {selectedBlog.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-dark-100">{selectedBlog.author}</p>
                  <p className="text-[10px] text-dark-400">Legal Practice Partner</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 font-mono text-[10px] text-dark-400">
                <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1 text-gold-500" /> {new Date(selectedBlog.publishedAt).toLocaleDateString()}</span>
                <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-gold-500" /> {selectedBlog.readTime}</span>
              </div>
            </div>

            {/* Blog content */}
            <div className="px-6 md:px-10 py-8">
              <p className="text-dark-200 leading-relaxed text-sm md:text-base whitespace-pre-line font-serif first-letter:text-4xl first-letter:font-bold first-letter:text-gold-500 first-letter:mr-1 first-letter:float-left">
                {selectedBlog.content}
              </p>
            </div>

            {/* Footer */}
            <div className="bg-dark-900 border-t border-dark-650 px-6 md:px-10 py-6 rounded-b-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-dark-300 flex items-center">
                <BookOpen className="w-4 h-4 mr-1.5 text-gold-500" />
                <span>Want to consult on this specific legislation?</span>
              </div>
              <button 
                onClick={() => {
                  setSelectedBlog(null);
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gold-500 hover:bg-gold-600 text-dark-950 text-xs font-bold tracking-wider uppercase px-4 py-2 rounded transition-all cursor-pointer shadow-md shadow-gold-500/10"
              >
                Schedule Consultation
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
