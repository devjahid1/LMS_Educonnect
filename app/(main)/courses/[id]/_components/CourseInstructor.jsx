import Image from "next/image";
import {
  Presentation,
  UsersRound,
  MessageSquare,
  Star,
} from "lucide-react";
import { getCourseDetailsByInstructor } from "@/queries/courses";

const CourseInstructor = async ({ course }) => {
  const instructor = course?.instructor;

  if (!instructor) {
    return (
      <div className="bg-gray-50 rounded-md p-8">
        <p className="text-gray-600">Instructor information not available.</p>
      </div>
    );
  }

  const instructorId = instructor?.id || instructor?._id?.toString();

  if (!instructorId) {
    return (
      <div className="bg-gray-50 rounded-md p-8">
        <p className="text-gray-600">Instructor ID not found.</p>
      </div>
    );
  }

  const fullName = `${instructor?.first_name || ""} ${
    instructor?.last_name || ""
  }`.trim();

  const courseDetailsByInstructor =
    await getCourseDetailsByInstructor(instructorId);

  return (
    <div className="bg-gray-50 rounded-md p-8">
      <div className="md:flex md:gap-x-5 mb-8">
        <div className="h-[310px] w-[270px] max-w-full flex-none rounded mb-5 md:mb-0">
          <Image
            src={instructor?.profile_picture || "/assets/default-avatar.png"}
            alt={fullName || "Instructor"}
            className="w-full h-full object-cover rounded"
            width={500}
            height={700}
          />
        </div>

        <div className="flex-1">
          <div className="max-w-[300px]">
            <h4 className="text-[34px] font-bold leading-[51px]">
              {fullName}
            </h4>

            <div className="text-gray-600 font-medium mb-6">
              {instructor?.role || "Instructor"}
            </div>

            <ul className="list space-y-4">
              <li className="flex items-center space-x-3">
                <Presentation className="text-gray-600" />
                <div>{courseDetailsByInstructor?.courses || 0} Course(s)</div>
              </li>

              <li className="flex space-x-3">
                <UsersRound className="text-gray-600" />
                <div>
                  {courseDetailsByInstructor?.enrollments || 0} Student Learned
                </div>
              </li>

              <li className="flex space-x-3">
                <MessageSquare className="text-gray-600" />
                <div>{courseDetailsByInstructor?.reviews || 0} Reviews</div>
              </li>

              <li className="flex space-x-3">
                <Star className="text-gray-600" />
                <div>
                  {courseDetailsByInstructor?.ratings || "0.0"} Average Rating
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className="text-gray-600">{instructor?.bio || "No bio available."}</p>
    </div>
  );
};

export default CourseInstructor;