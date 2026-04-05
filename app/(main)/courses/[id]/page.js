import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import Testimonials from "./_components/Testimonials";
import RelatedCourses from "./_components/RelatedCourses";
import CourseDetails from "./_components/CourseDetails";

import { getCourseDetails } from "@/queries/courses";
import { replaceMongoIdInArray } from "@/lib/convertData";

export const runtime = "nodejs";

const SingleCoursePage = async ({ params }) => {
  const { id } = params;

  if (!id || id === "undefined") {
    return <div className="container py-10">Invalid course id</div>;
  }

  const course = await getCourseDetails(id);

  if (!course) {
    return <div className="container py-10">Course not found</div>;
  }

  return (
    <>
      <CourseDetailsIntro
        title={course?.title}
        subtitle={course?.subtitle}
        thumbnail={course?.thumbnail}
      />

      <CourseDetails course={course} />

      {course?.testimonials && (
        <Testimonials
          testimonials={replaceMongoIdInArray(course?.testimonials)}
        />
      )}

      {/* <RelatedCourses /> */}
    </>
  );
};

export default SingleCoursePage;