import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ForumPost, ForumReply, User } from '../entities';
import { createPageUrl } from '../utils/createPageUrl';
import {
  ArrowLeft,
  MessageSquare,
  ThumbsUp,
  User as UserIcon,
  CheckCircle,
  Clock,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

export default function PostDetails() {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('id');

  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newReply, setNewReply] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (postId) {
      loadPostAndReplies();
    }
  }, [postId]);

  const loadPostAndReplies = async () => {
    setIsLoading(true);
    try {
      const [postData, repliesData] = await Promise.all([
        ForumPost.get(postId),
        ForumReply.filter({ post_id: postId }, '-created_date')
      ]);
      setPost(postData);
      setReplies(repliesData);
    } catch (error) {
      console.error("Error loading post details:", error);
    }
    setIsLoading(false);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    setIsSubmitting(true);
    try {
      await ForumReply.create({
        post_id: postId,
        content: newReply
      });
      setNewReply("");
      // Update replies count on the post
      await ForumPost.update(postId, { replies_count: (post.replies_count || 0) + 1 });
      loadPostAndReplies(); // Reload to show the new reply
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
    setIsSubmitting(false);
  };

  if (isLoading) {
    return <div className="p-8">Loading post...</div>;
  }

  if (!post) {
    return <div className="p-8">Post not found.</div>;
  }

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link to={createPageUrl("Forum")} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Forum
        </Link>

        <Card className="mb-8 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <Badge className="w-fit mb-3">{post.category.replace('_', ' ')}</Badge>
            <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
            <div className="flex items-center text-sm text-gray-500 mt-2 gap-4">
              <div className="flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                <span>{post.created_by.split('@')[0]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{format(new Date(post.created_date), "MMM d, yyyy")}</span>
              </div>
              {post.is_solved && (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Solved</span>
                </div>
              )}
            </div>
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none text-gray-800">
              <p>{post.content}</p>
            </div>
            <div className="mt-6 pt-4 border-t flex items-center gap-4">
              <Button variant="outline" size="sm">
                <ThumbsUp className="w-4 h-4 mr-2" />
                Like ({post.likes_count || 0})
              </Button>
              <div className="flex items-center text-gray-600">
                <MessageSquare className="w-4 h-4 mr-2" />
                {replies.length} Replies
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Replies</h2>

          {/* Reply Form */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <form onSubmit={handleReplySubmit} className="space-y-4">
                <Textarea
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  placeholder="Write your reply..."
                  rows={4}
                  required
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Posting..." : "Post Reply"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Replies List */}
          {replies.map(reply => (
            <Card key={reply.id} className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${reply.created_by}`} />
                  <AvatarFallback>{reply.created_by.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-800">{reply.created_by.split('@')[0]}</p>
                    <p className="text-xs text-gray-500">{format(new Date(reply.created_date), "MMM d, yyyy")}</p>
                  </div>
                  <p className="text-gray-700 mt-2">{reply.content}</p>
                  <div className="mt-3">
                     <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600">
                      <ThumbsUp className="w-3 h-3" />
                      Helpful ({reply.likes_count || 0})
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {replies.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              Be the first to reply!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}