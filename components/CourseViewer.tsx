import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Image from 'next/future/image'
import type { Course, Lesson, Video } from "@prisma/client"
import Heading from 'components/Heading'
import EmptyState from 'components/EmptyState'
import MuxPlayer from "@mux/mux-player-react/lazy";
import formatDuration from 'utils/formatDuration'
import clsx from 'clsx';
import type { UserLessonProgress } from '@prisma/client'
import TextPost from 'components/TextPost';


type Props = {
  course: (Course & {
    lessons: (Lesson & {
      video: (Video & { placeholder?: string }) | null;
    })[];
  });
  lessonProgress: number[];
  setLessonProgress: (lessonProgess: number[]) => void;
}
interface Thumbs {
  src: string;
  hoverSrc: string;
  alt: string;
  width: number;
  height: number;
  duration: number;
}

const CourseViewer = ({ course, lessonProgress = [], setLessonProgress }: Props) => {
  const router = useRouter()
  const slug = (router.query.slug as string[]) || []
  const lessonIndex = slug[2] ? parseInt(slug[2]) - 1 : 0

  const [activeLesson, setActiveLesson] = useState(course.lessons[lessonIndex]);
  const playbackId = activeLesson?.video?.publicPlaybackId
  const videoReady = activeLesson?.video?.status === "ready"
  const placeholder = activeLesson?.video?.placeholder
  const lessonType = activeLesson?.lessonType

  useEffect(() => {
    const lessonIndex = course.lessons.findIndex(lesson => lesson.id === activeLesson.id) + 1
    router.push(`/courses/${course.id}-${course.slug}/${lessonIndex}/${activeLesson.slug}`, undefined, { shallow: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLesson, course])

  const markLessonCompleted = async () => {
    try {
      const result: UserLessonProgress = await fetch(`/api/lessons/${activeLesson.id}/complete`, {
        method: 'POST'
      }).then(res => res.json())
      setLessonProgress([...lessonProgress, result.lessonId])
    } catch (error) {
      console.log('Something went wrong')
    }
  }
  

  if (!course.lessons.length) {
    return (
      <div className="max-w-lg mt-12 mx-8 lg:mx-auto">
        <EmptyState>
          This course does not have any lessons
        </EmptyState>
      </div>
    );
  }
  const HoverImage: React.FC<Thumbs> = ({ src, hoverSrc, alt, width, height, duration }) => {
    const [hover, setHover] = useState(false);
  
    const handleMouseEnter = () => {
      setHover(true);
    };
  
    const handleMouseLeave = () => {
      setHover(false);
    };

    return (
      <div className="lessonThumb">
        {duration && (
          <span className='sticky z-10 translate-y-4 translate-x-2 badge bg-[#e14a32] badge-md rounded-md text-base border-none font-medium text-slate-300 py-1 lg:translate-y-[118px]'>{formatDuration(Math.round(duration))}</span>
        )}
        <Image
          src={hover ? hoverSrc : src}
          alt={alt}
          width={width}
          height={height}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
    );
  };
  return (
    <div className='course-container mt-8 px-2 grid-cols-1 md:px-10 grid gap-6 xl:grid-cols-[60%_40%] 2xl:grid-cols-[66%_34%]'>
      <div className="card w-full rounded-md bg-[#0d0e0e8a] shadow-xl">
        {lessonType == 'video' && (playbackId && videoReady) ? (
          <MuxPlayer
            className='w-full aspect-video'
            streamType="on-demand"
            playbackId={playbackId}
            placeholder={placeholder}
            onEnded={markLessonCompleted}
            primary-color="#e04a32"
            metadata={{
              video_series: activeLesson.courseId,
              video_title: activeLesson.name,
              player_name: "Forge Univ3 Tutorial",
            }}
          />
        ) : (
          <div className='w-full  bg-red-200' />
        )}
          <div className="card-body">
            <h1 className="card-title text-2xl mb-2 flex-row justify-between">
               {activeLesson?.name}
               <div className="right-info justify-end">
                <div className="badge badge-outline rounded-md py-3 px-3">Lesson {activeLesson?.id} of {course.lessons.length}</div>
               </div>
            </h1>
            <div className="divider"></div>
            {lessonType == 'text' ? (
              <>
              <TextPost title={activeLesson?.name} contentUrl={activeLesson?.textURL} />
              </>
            ) : (
              <p className='prose prose-xl max-w-none'>{activeLesson?.description}</p>
            )}
          </div>
      </div>

      <div className='playlist ml-1 mr-1'>
        {course.lessons.map(lesson => (
          <a
            onClick={() => setActiveLesson(lesson)}
            key={lesson.id}
            className={clsx({
              'playlist-item flex gap-5 cursor-pointer hover:bg-[#0d0e0e] px-2 py-4': true,
              'bg-slate-800': playbackId === lesson.video?.publicPlaybackId
            })}
          >

            {lesson.video?.publicPlaybackId && lesson.video.status === "ready" && (
              
              <>
              <HoverImage 
              src={`https://image.mux.com/${lesson.video.publicPlaybackId}/thumbnail.jpg?width=314&height=178`} 
              hoverSrc={`https://image.mux.com/${lesson.video.publicPlaybackId}/animated.webp?width=314&height=178`} 
              alt={`Video thumbnail preview for ${lesson.name}`}
              width={314} height={178} 
              duration={lesson.video.duration || 1}
              />
                  </>
            )}

            <div className='overflow-hidden'>
              <h2>
                <span className='font-semibold text-lg text-slate-200 lg:text-base'>{lesson.name}</span>
              </h2>
              <p className='text-sm text-slate-300 my-1 line-clamp-5 xl:mt-1 xl:line-clamp-4'>{lesson.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CourseViewer;


