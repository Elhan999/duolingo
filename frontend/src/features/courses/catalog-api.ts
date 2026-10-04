import { z } from 'zod';
import { api, publicApi } from '@/services/api/client';
import { sessionStore } from '@/features/auth/session';
import type { components } from '@/types/api.generated';
export const courseSchema = z.object({
  id: z.number().int(),
  language_id: z.number().int(),
  title: z.string(),
  description: z.string(),
  level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
  order: z.number().int(),
}) satisfies z.ZodType<components['schemas']['CourseResponse']>;
export const languageSchema = z.object({
  id: z.number().int(),
  code: z.string(),
  name: z.string(),
  is_active: z.boolean(),
}) satisfies z.ZodType<components['schemas']['LanguageResponse']>;
export async function getCourses(signal?: AbortSignal) {
  const [response, languages] = await Promise.all([
    publicApi.get<unknown>('/courses', { signal }),
    getLanguages(signal),
  ]);
  const courses = z.array(courseSchema).parse(response.data);
  if (!hasSession()) return courses;
  const active = new Set(languages.map((language) => language.id));
  return courses.filter((course) => active.has(course.language_id));
}
function hasSession() {
  sessionStore.initialize();
  const { accessToken, refreshToken } = sessionStore.getSnapshot();
  return !!(accessToken || refreshToken);
}
// `/languages` requires a session; signed-out visitors get an empty list.
export async function getLanguages(signal?: AbortSignal) {
  if (!hasSession()) return [];
  const response = await api.get<unknown>('/languages', { signal });
  return z
    .array(languageSchema)
    .parse(response.data)
    .filter((language) => language.is_active);
}

export async function getCourse(id: number, signal?: AbortSignal) {
  const { data } = await publicApi.get<unknown>('/courses/' + id, { signal });
  const course = courseSchema.parse(data);
  if (course.id !== id) throw new Error('Course identity mismatch');
  return course;
}
