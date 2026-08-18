import React from 'react';
import { BlogPost } from '../../types';
import { Badge } from '../ui/Badge';
import { Clock, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  onReadMore: (post: BlogPost) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onReadMore }) => {
  return (
    <div
      onClick={() => onReadMore(post)}
      className="group bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden bg-slate-100 shrink-0">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="category">{post.category}</Badge>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
            <span>{post.publishedAt}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-800 group-hover:text-brand-600 transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-3 mb-4 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-brand-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
            Read More
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
