import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { remark } from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';

interface Props {
  title: string;
  contentUrl: string | null;
}

const TextPost: React.FC<Props> = ({ title, contentUrl }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!contentUrl) {
        return {
          notFound: true,
        };
      }
    
      const response = await fetch(contentUrl);
      const markdown = await response.text();
      const { content } = matter(markdown);
      const processedContent = await remark().use(html).process(content);
      const contentHtml = processedContent.toString();
      setContent(contentHtml);
    };
    fetchData();
  }, [contentUrl]);
  if (!contentUrl) {
    return null;
  }
  return (
    <div className="w-full prose prose-base max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
};

export default TextPost;