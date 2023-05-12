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
  const [embed, setEmbed] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!contentUrl) {
        return {};
      }
    
      const response = await fetch(contentUrl);
      const markdown = await response.text();
      const { data, content } = matter(markdown);
      const processedContent = await remark().use(html).process(content);
      const contentHtml = processedContent.toString();
      setContent(contentHtml);
      console.log(data)
      if (data.embed){
        setEmbed(data.embed);
      }
      
    };
    fetchData();
  }, [contentUrl]);

  return (
    <div className="w-full prose prose-base max-w-none">
      <iframe id="ytplayer" className="ytvideo"
        src={`https://www.youtube.com/embed/${embed}?enablejsapi=1&modestbranding=1&color=white&iv_load_policy=3`}
        frameBorder="0" allowFullScreen></iframe>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
};

export default TextPost;