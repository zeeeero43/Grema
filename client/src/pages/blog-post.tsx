import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  Building2, 
  Phone, 
  Calendar,
  User,
  Menu,
  X,
  ArrowLeft,
  MapPin,
  Clock,
  Share2,
  Mail,
  ArrowRight,
  CheckCircle,
  Tag,
  Eye,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Header } from "../components/Header";
import { SEOHead } from "../components/seo/SEOHead";
import { getBlogPostBySlug, getAllBlogPosts, type BlogPost } from "@/data/blogPosts";

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

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Try to get automated blog post first
  const { data: autoData, isLoading: autoLoading } = useQuery({
    queryKey: ['/api/blog', params?.slug],
    queryFn: async (): Promise<{ success: boolean; post: AutoBlogPost }> => {
      const response = await fetch(`/api/blog/${params?.slug}`);
      if (!response.ok) {
        throw new Error('Blog post not found');
      }
      return response.json();
    },
    enabled: !!params?.slug,
    retry: false,
  });

  // Get manual blog post as fallback
  const manualPost = params?.slug ? getBlogPostBySlug(params.slug) : null;
  const autoPost = autoData?.success ? autoData.post : null;
  
  // Get other automated blog posts for related articles
  const { data: otherAutoData } = useQuery({
    queryKey: ['/api/blog/other', params?.slug],
    queryFn: async (): Promise<{ success: boolean; posts: AutoBlogPost[] }> => {
      const response = await fetch('/api/blog');
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      const data = await response.json();
      return {
        success: true,
        posts: data.posts.filter((p: AutoBlogPost) => p.slug !== params?.slug).slice(0, 3)
      };
    },
    enabled: !!params?.slug && !!autoPost,
  });
  
  const post = autoPost || manualPost;
  const isAutoPost = !!autoPost;
  
  const manualOtherPosts = getAllBlogPosts().filter(p => p.slug !== params?.slug).slice(0, 3);
  const otherPosts = isAutoPost && otherAutoData?.success ? otherAutoData.posts : manualOtherPosts;

  if (autoLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Artikel wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Artikel nicht gefunden</h1>
          <p className="text-gray-600 mb-8">Der gewünschte Blog-Artikel existiert nicht.</p>
          <Button asChild className="bg-primary text-white hover:bg-primary/90">
            <Link href="/blog">Zurück zum Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Enhanced markdown-to-HTML converter for content
  const formatContent = (content: string) => {
    return content
      .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-gray-900 mb-6 mt-8 border-b-2 border-gray-200 pb-3">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8 border-l-4 border-primary pl-4">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-gray-900 mb-3 mt-6">$1</h3>')
      .replace(/^\*\*(.+):\*\*$/gm, '<h4 class="text-lg font-semibold text-gray-900 mb-2 mt-4 bg-gray-50 p-3 rounded-lg">$1:</h4>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-primary">$1</strong>')
      .replace(/^- (.+)$/gm, '<li class="mb-2 flex items-start"><span class="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span><span>$1</span></li>')
      .replace(/(<li.*<\/li>)/g, '<ul class="mb-6 space-y-2 text-gray-700">$1</ul>')
      .replace(/^- \[ \] (.+)$/gm, '<li class="flex items-center mb-2 p-2 bg-gray-50 rounded"><span class="w-4 h-4 border border-gray-300 rounded mr-3"></span>$1</li>')
      .replace(/^- \[x\] (.+)$/gm, '<li class="flex items-center mb-2 p-2 bg-green-50 rounded"><span class="w-4 h-4 bg-primary rounded mr-3 flex items-center justify-center"><svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></span>$1</li>')
      .replace(/\n\n/g, '</p><p class="text-gray-700 leading-relaxed mb-6 text-lg">')
      .replace(/^(.+)$/gm, (match, content) => {
        if (content.startsWith('<h') || content.startsWith('<ul') || content.startsWith('<li') || content.startsWith('</')) {
          return content;
        }
        return `<p class="text-gray-700 leading-relaxed mb-6 text-lg">${content}</p>`;
      });
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title={`${post.title} | Grema Gebäudeservice Blog Moers`}
        description={isAutoPost ? (post as AutoBlogPost).metaDescription : post.excerpt}
        keywords={isAutoPost ? (post as AutoBlogPost).keywords.join(', ') : `${post.category}, Reinigung Moers, Gebäudereinigung Tipps`}
        canonicalUrl={`/blog/${post.slug}`}
        ogType="article"
        ogImage={post.image}
      />
      
      {/* Header */}
      <Header currentPage="blog" />

      {/* Breadcrumb & Back Navigation */}
      <section className="py-6 bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" className="text-gray-600 hover:text-primary">
              <Link href="/blog" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück zum Blog
              </Link>
            </Button>
            
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-primary">Startseite</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-primary">Blog</Link>
              <span>/</span>
              <span className="text-gray-900">{post.category}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{isAutoPost ? new Date((post as AutoBlogPost).publishedAt || (post as AutoBlogPost).createdAt).toLocaleDateString('de-DE') : (post as any).date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}{isAutoPost ? '' : ' Lesezeit'}</span>
            </div>
          </div>

          {/* Hero Image */}
          {post.image && (
            <div className="mb-4">
              <img 
                src={post.image}
                alt={'imageAlt' in post ? (post as any).imageAlt : `Professionelle ${post.category} - ${post.title}`}
                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-xl shadow-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
      </section>

      {/* Tags for Auto Posts */}
      {isAutoPost && (post as AutoBlogPost).keywords && (post as AutoBlogPost).keywords.length > 0 && (
        <section className="py-6 bg-gray-50 mt-4">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600 font-medium">Tags:</span>
              {(post as AutoBlogPost).keywords.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <article className="py-0 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Article Meta */}
          <div className="flex items-center justify-center gap-6 mb-8 pb-4 border-b border-gray-200 mt-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{post.readTime}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-4 h-4" />
              <span className="text-sm">{post.author}</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: isAutoPost ? post.content : formatContent(post.content) 
              }}
              className="article-content text-gray-800 leading-relaxed"
            />
          </div>
        </div>
      </article>

      {/* FAQ Section for Auto Posts */}
      {isAutoPost && 'faqData' in post && (post as any).faqData && (post as any).faqData.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Häufig gestellte Fragen
            </h2>
            
            <div className="space-y-4">
              {(post as any).faqData.map((faq: {question: string, answer: string}, index: number) => (
                <div key={index} className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Share Section */}
      <section className="py-8 bg-gray-50 border-t">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">War dieser Artikel hilfreich?</h3>
              <p className="text-sm text-gray-600">Teilen Sie ihn mit anderen!</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.excerpt || post.metaDescription,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link kopiert!');
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Teilen</span>
              </button>
              
              <button
                onClick={() => {
                  const subject = encodeURIComponent(`Interessanter Artikel: ${post.title}`);
                  const body = encodeURIComponent(`Ich habe diesen interessanten Artikel gefunden:\n\n${post.title}\n\n${window.location.href}\n\nViele Grüße`);
                  window.open(`mailto:?subject=${subject}&body=${body}`);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">E-Mail</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Benötigen Sie professionelle Reinigungsdienstleistungen?
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Lassen Sie sich von unseren Experten beraten. Wir erstellen Ihnen 
              ein maßgeschneidertes Angebot für Ihre spezifischen Anforderungen.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90">
                <a href="tel:017634446399" className="flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Jetzt anrufen
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                <Link href="/#angebot" className="flex items-center justify-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Angebot anfordern
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {otherPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Weitere interessante Artikel
              </h2>
              <p className="text-gray-600">
                Entdecken Sie mehr Expertentipps und Fachwissen
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((relatedPost) => (
                <article key={relatedPost.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300">
                  <div className="relative">
                    <img 
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        {relatedPost.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{
                          isAutoPost && 'publishedAt' in relatedPost 
                            ? new Date(relatedPost.publishedAt || relatedPost.createdAt).toLocaleDateString('de-DE')
                            : 'date' in relatedPost 
                            ? relatedPost.date 
                            : new Date().toLocaleDateString('de-DE')
                        }</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                    
                    <Button asChild variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white">
                      <Link href={`/blog/${relatedPost.slug}`} className="flex items-center">
                        Weiterlesen
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-primary flex items-center justify-center rounded">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Grema Gebäudeservice GmbH</h3>
            </div>
            
            <p className="text-gray-400 mb-6">
              Professionelle Gebäudereinigung in Moers seit 2014
            </p>
            
            <div className="flex justify-center items-center space-x-8 text-gray-400 text-sm mb-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:017634446399" className="hover:text-white">0176/3444 6399</a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Moers, NRW</span>
              </div>
            </div>
            
            <div className="text-gray-500 text-sm">
              <p>&copy; 2025 Grema Gebäudeservice GmbH. Alle Rechte vorbehalten.</p>
              <div className="flex justify-center space-x-6 mt-3">
                <Link href="/" className="hover:text-white">Startseite</Link>
                <Link href="/blog" className="hover:text-white">Blog</Link>
                <a href="/impressum" className="hover:text-white">Impressum</a>
                <a href="/datenschutz" className="hover:text-white">Datenschutz</a>

              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Simple Phone Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="tel:017634446399"
          className="flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}