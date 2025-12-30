import { useEffect, useState } from 'react';
import { usePost } from '../PostContext';
import { usePostActions } from './usePostActions';
import { parseBlocksToTiptap } from '../contentParser';

export function useLoadPost() {
  const { setPostData, postData } = usePost();
  const { getPostById } = usePostActions();
  
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('isLoadingPost');
    }
    return false;
  });

  useEffect(() => {
    const loadPost = async () => {
      if (postData.id) return;

      const editPostId = localStorage.getItem('editPostId');
      if (!editPostId) {
        localStorage.removeItem('isLoadingPost');
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);

      const waitForClerk = async () => {
        let attempts = 0;
        while (attempts < 50) {
          if (window.Clerk && window.Clerk.session) return true;
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
        }
        return false;
      };

      const clerkReady = await waitForClerk();
      if (!clerkReady) {
        alert('Error de autenticación. Por favor recarga la página.');
        localStorage.removeItem('editPostId');
        return;
      }

      try {
        const post = await getPostById(editPostId);
        
        if (post) {
          const tiptapContent = parseBlocksToTiptap(post.content);
          
          setPostData({
            id: post.id,
            title: post.title || '',
            slug: post.slug || '',
            excerpt: post.excerpt || '',
            category: (post as any).categorie || post.category || '',
            tags: post.tags || [],
            content: tiptapContent,
            featuredImage: (post as any).featuredImage,
            status: post.status,
          });

          localStorage.removeItem('editPostId');
          localStorage.removeItem('isLoadingPost');
          setIsLoading(false);
        } else {
          alert('Error al cargar el post para edición');
          localStorage.removeItem('editPostId');
          localStorage.removeItem('isLoadingPost');
          setIsLoading(false);
        }
      } catch (error) {
        alert('Error al cargar el post para edición');
        localStorage.removeItem('editPostId');
        localStorage.removeItem('isLoadingPost');
        setIsLoading(false);
      }
    };

    loadPost();
  }, []);

  return { isLoading };
}
