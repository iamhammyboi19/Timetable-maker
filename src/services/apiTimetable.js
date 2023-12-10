import supabase from "./supabase";

// all can be referred to supabase javascript client session docs

export async function getCourse(courseName) {
  const { data: timetable, error } = await supabase
    .from("timetable")
    .select("*")
    .or(
      [
        `SALON.fts.${courseName}`,
        `LOCATION.fts.${courseName}`,
        `CAPACITY.fts.${courseName}`,
        `CLASSPROJECTION.fts.${courseName}`,
        `monday.fts.${courseName}`,
        `MONDAY1.fts.${courseName}`,
        `MONDAY2.fts.${courseName}`,
        `MONDAY3.fts.${courseName}`,
        `MONDAY4.fts.${courseName}`,
        `MONDAY5.fts.${courseName}`,
        `MONDAY6.fts.${courseName}`,
        `MONDAY7.fts.${courseName}`,
        `MONDAY8.fts.${courseName}`,
        `MONDAY9.fts.${courseName}`,
        `MONDAY10.fts.${courseName}`,
        `TUESDAY.fts.${courseName}`,
        `TUESDAY1.fts.${courseName}`,
        `TUESDAY2.fts.${courseName}`,
        `TUESDAY3.fts.${courseName}`,
        `TUESDAY4.fts.${courseName}`,
        `TUESDAY5.fts.${courseName}`,
        `TUESDAY6.fts.${courseName}`,
        `TUESDAY7.fts.${courseName}`,
        `TUESDAY8.fts.${courseName}`,
        `TUESDAY9.fts.${courseName}`,
        `TUESDAY10.fts.${courseName}`,
        `WEDNESDAY.fts.${courseName}`,
        `WEDNESDAY1.fts.${courseName}`,
        `WEDNESDAY2.fts.${courseName}`,
        `WEDNESDAY3.fts.${courseName}`,
        `WEDNESDAY4.fts.${courseName}`,
        `WEDNESDAY5.fts.${courseName}`,
        `WEDNESDAY6.fts.${courseName}`,
        `WEDNESDAY7.fts.${courseName}`,
        `WEDNESDAY8.fts.${courseName}`,
        `WEDNESDAY9.fts.${courseName}`,
        `WEDNESDAY10.fts.${courseName}`,
        `THURSDAY.fts.${courseName}`,
        `THURSDAY1.fts.${courseName}`,
        `THURSDAY2.fts.${courseName}`,
        `THURSDAY3.fts.${courseName}`,
        `THURSDAY4.fts.${courseName}`,
        `THURSDAY5.fts.${courseName}`,
        `THURSDAY6.fts.${courseName}`,
        `THURSDAY7.fts.${courseName}`,
        `THURSDAY8.fts.${courseName}`,
        `THURSDAY9.fts.${courseName}`,
        `THURSDAY10.fts.${courseName}`,
        `FRIDAY.fts.${courseName}`,
        `FRIDAY1.fts.${courseName}`,
        `FRIDAY2.fts.${courseName}`,
        `FRIDAY3.fts.${courseName}`,
        `FRIDAY4.fts.${courseName}`,
        `FRIDAY5.fts.${courseName}`,
        `FRIDAY6.fts.${courseName}`,
        `FRIDAY7.fts.${courseName}`,
        `FRIDAY8.fts.${courseName}`,
        `FRIDAY9.fts.${courseName}`,
        `FRIDAY10.fts.${courseName}`,
        `SATURDAY.fts.${courseName}`,
        `SATURDAY1.fts.${courseName}`,
        `SATURDAY2.fts.${courseName}`,
        `SATURDAY3.fts.${courseName}`,
        `SATURDAY4.fts.${courseName}`,
        `SATURDAY5.fts.${courseName}`,
        `SATURDAY6.fts.${courseName}`,
        `SATURDAY7.fts.${courseName}`,
        `SATURDAY8.fts.${courseName}`,
        `SATURDAY9.fts.${courseName}`,
        `SUNDAY.fts.${courseName}`,
        `SUNDAY1.fts.${courseName}`,
        `SUNDAY2.fts.${courseName}`,
        `SUNDAY3.fts.${courseName}`,
        `SUNDAY4.fts.${courseName}`,
        `SUNDAY5.fts.${courseName}`,
        `SUNDAY6.fts.${courseName}`,
        `SUNDAY7.fts.${courseName}`,
        `SUNDAY8.fts.${courseName}`,
      ].join(",")
    );

  if (timetable.length === 0 || error)
    throw new Error("Failed, there is no course with this code");

  return timetable;
}

export async function getCourseTime(courseDay) {
  const { data: timetable, error } = await supabase
    .from("timetable")
    .select(courseDay);

  if (error) throw new Error("Course time unavailable");

  return timetable;
}
