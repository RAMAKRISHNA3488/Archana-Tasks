import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { BlogPost } from '../types';
import { BlogCard } from '../components/blog/BlogCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Search, Clock, Calendar, User, ArrowLeft } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  useEffect(() => {
    api.getBlogPosts().then((res) => setPosts(res));
  }, []);

  const categories = ['All', 'Buying Tips', 'Market News', 'Investment'];

  const filteredPosts = posts.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Top Banner matching Screen 10 */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Latest News & Tips</h1>
        <p className="text-sm text-slate-500 font-medium">
          Stay updated with the latest real estate news, market analysis, and home buying tips.
        </p>

        {/* Category Tabs & Search Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4 text-slate-400" />}
            />
          </div>
        </div>
      </div>

      {/* Blog Cards Grid matching Screen 10 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} post={post} onReadMore={(p) => setActivePost(p)} />
        ))}
      </div>

      {/* View All Articles Button matching Screen 10 */}
      <div className="text-center pt-4">
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            setSelectedCategory('All');
            setSearchQuery('');
          }}
        >
          View All Articles
        </Button>
      </div>

      {/* Full Post Reader Modal */}
      {activePost && (
        <Modal
          isOpen={!!activePost}
          onClose={() => setActivePost(null)}
          maxWidth="2xl"
          title={activePost.title}
        >
          <div className="space-y-6">
            <img
              src={activePost.featuredImage}
              alt={activePost.title}
              className="w-full h-64 object-cover rounded-2xl border border-slate-200"
            />

            <div className="flex items-center gap-4 text-xs text-slate-500 border-b border-slate-100 pb-3">
              <span className="flex items-center gap-1 font-semibold text-brand-600">
                <User className="w-3.5 h-3.5" />
                {activePost.authorName} ({activePost.authorRole})
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {activePost.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activePost.readTime}
              </span>
            </div>

            <div className="prose prose-slate text-sm leading-relaxed text-slate-700 space-y-4">
              <p className="font-semibold text-slate-900">{activePost.excerpt}</p>
              <p>{activePost.content}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setActivePost(null)}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Back to Blog
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
