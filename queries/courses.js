import "server-only";

import { Course } from "@/model/course-model";
import { Category } from "@/model/category-model";
import { User } from "@/model/user-model";
import { Testimonial } from "@/model/testimonial-model";
import { Module } from "@/model/module.model";

import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";

import { dbConnect } from "@/service/mongo";
import { getEnrollmentsForCourse } from "./enrollments";
import { getTestimonialsForCourse } from "./testimonials";

export async function getCourseList() {
  await dbConnect();

  try {
    const courses = await Course.find({})
      .select([
        "title",
        "subtitle",
        "thumbnail",
        "modules",
        "price",
        "category",
        "instructor",
        "testimonials",
      ])
      .populate({
        path: "category",
        model: Category,
      })
      .populate({
        path: "instructor",
        model: User,
      })
      .populate({
        path: "testimonials",
        model: Testimonial,
      })
      .populate({
        path: "modules",
        model: Module,
      })
      .lean();

    return replaceMongoIdInArray(courses);
  } catch (error) {
    console.error("Mama, course list query te jhamela hoise:", error);
    return [];
  }
}

export async function getCourseDetails(id) {
  await dbConnect();

  try {
    const course = await Course.findById(id)
      .populate({
        path: "category",
        model: Category,
      })
      .populate({
        path: "instructor",
        model: User,
      })
      .populate({
        path: "testimonials",
        model: Testimonial,
        populate: {
          path: "user",
          model: User,
        },
      })
      .populate({
        path: "modules",
        model: Module,
      })
      .lean();

    return course ? replaceMongoIdInObject(course) : null;
  } catch (error) {
    console.error("Mama, single course query te jhamela hoise:", error);
    return null;
  }
}

export async function getCourseDetailsByInstructor(instructorId) {
  await dbConnect();

  const courses = await Course.find({ instructor: instructorId }).lean();

  const enrollments = await Promise.all(
    courses.map(async (course) => {
      return await getEnrollmentsForCourse(course._id.toString());
    })
  );

  const totalEnrollments = enrollments.reduce((total, current) => {
    return total + current.length;
  }, 0);

  const testimonials = await Promise.all(
    courses.map(async (course) => {
      return await getTestimonialsForCourse(course._id.toString());
    })
  );

  const totalTestimonials = testimonials.flat();

  const avgRating =
    totalTestimonials.length > 0
      ? totalTestimonials.reduce((acc, obj) => acc + obj.rating, 0) /
        totalTestimonials.length
      : 0;

  return {
    courses: courses.length,
    enrollments: totalEnrollments,
    reviews: totalTestimonials.length,
    ratings: avgRating ? avgRating.toPrecision(2) : "0.0",
  };
}