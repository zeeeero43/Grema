import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { useState } from "react";
import { ArrowRight, Clock, User, Tag, Calendar, RefreshCw, TrendingUp, FileText, Zap } from "lucide-react";

interface AutoBlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  metaDescription: string;
  keywords: string[];
  category: string;
  author: string;
  readTime: string;
  image: string;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
}

interface BlogStatus {
  isRunning: boolean;
  nextGeneration?: string;
  stats: {
    totalGenerated: number;
    totalPublished: number;
    todayGenerated: number;
    lastGeneration?: string;
    unusedTopics: number;
  };
}

export default function AutoBlogPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  // Query for published blog posts
  const { data: blogData, isLoading: postsLoading, refetch: refetchPosts } = useQuery({
    queryKey: ['/api/blog'],
    queryFn: async (): Promise<{ success: boolean; posts: AutoBlogPost[] }> => {
      const response = await fetch('/api/blog?limit=20');
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      return response.json();
    },
  });

  // Query for blog automation status
  const { data: statusData, isLoading: statusLoading, refetch: refetchStatus } = useQuery({
    queryKey: ['/api/admin/blog-status'],
    queryFn: async (): Promise<{ success: boolean } & BlogStatus> => {
      const response = await fetch('/api/admin/blog-status');
      if (!response.ok) throw new Error('Failed to fetch blog status');
      return response.json();
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const handleManualGeneration = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/admin/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      const result = await response.json();
      
      if (result.success) {
        await refetchPosts();
        await refetchStatus();
      } else {
        console.error('Generation failed:', result.message);
      }
    } catch (error) {
      console.error('Manual generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const posts = blogData?.posts || [];
  const status = statusData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">KI-Blog System</h1>
              <p className="mt-2 text-gray-600">
                Automatisierte Blog-Artikel Generierung für Grema Gebäudeservice
              </p>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Öffentlicher Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statusLoading ? (
            Array(4).fill(0).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        {status?.stats.totalGenerated || 0}
                      </p>
                      <p className="text-sm text-gray-600">Generiert Gesamt</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        {status?.stats.totalPublished || 0}
                      </p>
                      <p className="text-sm text-gray-600">Veröffentlicht</p>
                    </div>
                    <FileText className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-orange-600">
                        {status?.stats.todayGenerated || 0}
                      </p>
                      <p className="text-sm text-gray-600">Heute Generiert</p>
                    </div>
                    <Zap className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-purple-600">
                        {status?.stats.unusedTopics || 0}
                      </p>
                      <p className="text-sm text-gray-600">Ungenutzte Themen</p>
                    </div>
                    <Tag className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Control Panel */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Automation Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant={status?.isRunning ? "default" : "secondary"}>
                    {status?.isRunning ? "Aktiv" : "Gestoppt"}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    Automation Status
                  </span>
                </div>
                {status?.nextGeneration && (
                  <p className="text-sm text-gray-600">
                    Nächste Generation: {new Date(status.nextGeneration).toLocaleString('de-DE')}
                  </p>
                )}
              </div>
              <Button
                onClick={handleManualGeneration}
                disabled={isGenerating}
                className="flex items-center gap-2"
              >
                {isGenerating ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Zap className="h-4 w-4" />
                )}
                {isGenerating ? "Generiert..." : "Manuell Generieren"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Generated Blog Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Generierte Blog-Artikel</CardTitle>
          </CardHeader>
          <CardContent>
            {postsLoading ? (
              <div className="space-y-4">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : posts.length > 0 ? (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                          <Badge variant={post.isPublished ? "default" : "secondary"} className="text-xs">
                            {post.isPublished ? "Veröffentlicht" : "Entwurf"}
                          </Badge>
                        </div>
                        
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.createdAt).toLocaleDateString('de-DE')}
                          </div>
                        </div>
                        
                        {post.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {post.keywords.slice(0, 3).map((keyword, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs text-gray-500">
                                {keyword}
                              </Badge>
                            ))}
                            {post.keywords.length > 3 && (
                              <Badge variant="outline" className="text-xs text-gray-500">
                                +{post.keywords.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Link href={`/blog/${post.slug}`}>
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            Ansehen
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Noch keine Blog-Artikel generiert</p>
                <p className="text-sm">Klicken Sie "Manuell Generieren" um zu beginnen</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}