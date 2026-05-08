import { getEnrollmentsForUser } from "@/queries/enrollments";
import { auth } from "@/auth";

import { redirect } from "next/navigation";

import { getUserByEmail } from "@/queries/users";

import EnrolledCourseCard from "../../component/enrolled-coursecard";
import Link from "next/link";

async function EnrolledCourses() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    const loggedInUser = await getUserByEmail(session?.user?.email);

    const enrollments = await getEnrollmentsForUser(loggedInUser?.id);

    console.log(enrollments);

    return (
        <div className="grid sm:grid-cols-2 gap-6">
            {enrollments && enrollments.length > 0 ? (
                <>
                    {enrollments.map((enrollment) => {
                        // handle both populated object and plain id
                        const courseId =
                            enrollment?.course?._id ||
                            enrollment?.course?.id ||
                            enrollment?.course;

                        // skip invalid course
                        if (!courseId) return null;

                        return (
                            <Link
                                key={enrollment?.id}
                                href={`/courses/${courseId.toString()}/lesson`}
                            >
                                <EnrolledCourseCard
                                    enrollment={enrollment}
                                />
                            </Link>
                        );
                    })}
                </>
            ) : (
                <p>No Enrollments found!</p>
            )}
        </div>
    );
}

export default EnrolledCourses;