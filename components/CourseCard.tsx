import { Course, Lesson, Video } from "@prisma/client";
import Link from 'next/link'
import Image from 'next/future/image'
import Heading from './Heading'

type Props = {
  isAdmin: boolean;
  course: Course & {
    lessons: (Lesson & {
      video: Video | null;
    })[];
  }
}

const CourseCard = ({ course, isAdmin }: Props) => {
  const href = isAdmin ? `/admin/courses/${course.id}` : `/courses/${course.id}`
  return (
    <>
      <Link href={href}>
        <a className='w-full transition shadow-sm hover:shadow-md cursor-pointer rounded-sm'>
          {course.lessons[0]?.video?.publicPlaybackId && (
            <Image
              className="w-full"
              src={`https://image.mux.com/${course.lessons[0]?.video?.publicPlaybackId}/thumbnail.jpg?width=640`}
              alt={`Video thumbnail preview for ${course.lessons[0]?.video?.publicPlaybackId}`}
              width={320}
              height={240}
            />
          )}

          <div className="p-8 bg-gray-600">
            {!course.published && (<span className="bg-orange-300 text-slate-900 rounded-full text-xs py-1 px-3 mb-2 inline-block">Draft</span>)}

            <Heading as="h3">
              {course.name}
            </Heading>
            <p className="text-slate-100">
              {course.description}
            </p>
          </div>
        </a>
      </Link>
    </>
  );
};

export default CourseCard;