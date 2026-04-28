-- =============================================
-- LINGUA INTERNATIONAL ACADEMY — Database Schema
-- Exécuter dans Supabase SQL Editor (supabase.com/dashboard)
-- =============================================

-- 1. PROFILES (linked to auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('admin', 'student')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE
);

INSERT INTO categories (name, slug) VALUES
  ('Business', 'business'),
  ('Finance', 'finance'),
  ('Vente', 'vente'),
  ('Design 3D', 'design-3d'),
  ('Langues', 'langues'),
  ('Développement', 'developpement')
ON CONFLICT (slug) DO NOTHING;

-- 3. COURSES
CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  instructor TEXT NOT NULL,
  duration TEXT,
  level TEXT,
  price INTEGER DEFAULT 0,
  youtube_id TEXT,
  image TEXT,
  category_id INTEGER REFERENCES categories(id),
  category TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. LESSONS
CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY,
  course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  duration TEXT,
  youtube_id TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ENROLLMENTS
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- 6. LESSON PROGRESS
CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, lesson_id)
);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Courses: everyone can read published courses
CREATE POLICY "Anyone can view published courses" ON courses FOR SELECT USING (is_published = TRUE);

-- Lessons: everyone can read lessons
CREATE POLICY "Anyone can view lessons" ON lessons FOR SELECT USING (TRUE);

-- Categories: everyone can read
CREATE POLICY "Anyone can view categories" ON categories FOR SELECT USING (TRUE);

-- Enrollments: users see their own
CREATE POLICY "Users can view own enrollments" ON enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can enroll" ON enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Lesson progress: users see/update their own
CREATE POLICY "Users can view own progress" ON lesson_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON lesson_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON lesson_progress FOR UPDATE USING (auth.uid() = user_id);

-- =============================================
-- SEED DATA
-- =============================================

INSERT INTO courses (id, title, description, instructor, duration, level, price, youtube_id, image, category) VALUES
  ('project-management-trello', 'Project Management with Trello', 'Apprenez à gérer vos projets de manière agile et efficace avec Trello. De la configuration de base aux automatisations avancées.', 'Sarah Jenkins', '4 semaines', 'Débutant', 49, 'vBvPzE2x-4o', 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80', 'Business'),
  ('financial-analyst-course', 'Complete Financial Analyst Course', 'Le cours complet pour devenir un analyste financier performant. Modélisation, Excel avancé, et analyse de données.', 'Michael Chen', '8 semaines', 'Intermédiaire', 199, '9o4v0GjE49o', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', 'Finance'),
  ('sales-training', 'Sales Training: Master the Art of Selling', 'Techniques de vente B2B et B2C, négociation, et psychologie de l''acheteur pour exploser vos quotas.', 'David Rodriguez', '6 semaines', 'Avancé', 129, '4bZJ_a6w23M', 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80', 'Vente'),
  ('blender-creator', 'Complete Blender Creator', 'Créez des modèles 3D époustouflants, des animations et des rendus photoréalistes avec Blender 4.0.', 'Elena Rostova', '12 semaines', 'Débutant à Avancé', 149, 'TPrnSACiTJ4', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80', 'Design 3D')
ON CONFLICT (id) DO NOTHING;

-- Lessons for each course
INSERT INTO lessons (id, course_id, title, duration, youtube_id, sort_order) VALUES
  ('pmt-l1', 'project-management-trello', 'Introduction et présentation', '05:20', 'vBvPzE2x-4o', 1),
  ('pmt-l2', 'project-management-trello', 'Créer votre premier board', '12:45', '9o4v0GjE49o', 2),
  ('pmt-l3', 'project-management-trello', 'Automatiser avec Butler', '08:15', '4bZJ_a6w23M', 3),
  ('pmt-l4', 'project-management-trello', 'Gestion d''équipe avancée', '25:30', 'TPrnSACiTJ4', 4),
  ('pmt-l5', 'project-management-trello', 'Power-Ups et intégrations', '15:10', 'vBvPzE2x-4o', 5),
  ('pmt-l6', 'project-management-trello', 'Conclusion et certification', '04:50', '9o4v0GjE49o', 6),

  ('fac-l1', 'financial-analyst-course', 'Introduction à l''analyse financière', '06:30', '9o4v0GjE49o', 1),
  ('fac-l2', 'financial-analyst-course', 'Les états financiers expliqués', '18:20', 'vBvPzE2x-4o', 2),
  ('fac-l3', 'financial-analyst-course', 'Modélisation Excel avancée', '22:10', '4bZJ_a6w23M', 3),
  ('fac-l4', 'financial-analyst-course', 'Valorisation d''entreprise', '19:45', 'TPrnSACiTJ4', 4),
  ('fac-l5', 'financial-analyst-course', 'Analyse de ratios', '14:30', '9o4v0GjE49o', 5),

  ('st-l1', 'sales-training', 'La psychologie de la vente', '10:15', '4bZJ_a6w23M', 1),
  ('st-l2', 'sales-training', 'Prospection B2B efficace', '16:40', 'vBvPzE2x-4o', 2),
  ('st-l3', 'sales-training', 'Techniques de closing', '13:25', '9o4v0GjE49o', 3),
  ('st-l4', 'sales-training', 'Négociation avancée', '20:50', 'TPrnSACiTJ4', 4),

  ('bc-l1', 'blender-creator', 'Installation et prise en main', '08:30', 'TPrnSACiTJ4', 1),
  ('bc-l2', 'blender-creator', 'Modélisation 3D de base', '25:15', 'vBvPzE2x-4o', 2),
  ('bc-l3', 'blender-creator', 'Textures et matériaux', '18:40', '9o4v0GjE49o', 3),
  ('bc-l4', 'blender-creator', 'Éclairage et rendu', '22:10', '4bZJ_a6w23M', 4),
  ('bc-l5', 'blender-creator', 'Animation de personnages', '30:00', 'TPrnSACiTJ4', 5),
  ('bc-l6', 'blender-creator', 'Rendu photoréaliste', '15:20', 'vBvPzE2x-4o', 6)
ON CONFLICT (id) DO NOTHING;
