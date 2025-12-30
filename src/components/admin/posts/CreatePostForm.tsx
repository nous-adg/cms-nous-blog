import { PostProvider } from './PostContext';
import { ContentData } from './ContentData';
import { RichTextEditor } from '@/components/admin/editor/Editor/RichTextEditor';
import { PostActions } from './PostActions';
import { PostLoader } from './PostLoader';
import { useLoadPost } from './hooks/useLoadPost';
import { useState, useEffect } from 'react';

const FormContent = () => {
  const { isLoading } = useLoadPost();
  const [showLoader, setShowLoader] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('isLoadingPost');
    }
    return false;
  });

  useEffect(() => {
    if (!isLoading && showLoader) {
      setShowLoader(false);
    }
  }, [isLoading, showLoader]);

  if (showLoader || isLoading) {
    return <PostLoader />;
  }

  return (
    <div className="space-y-6">
      <ContentData />
      <RichTextEditor />
      <PostActions />
    </div>
  );
};

export const CreatePostForm = () => {
  return (
    <PostProvider>
      <FormContent />
    </PostProvider>
  );
};
