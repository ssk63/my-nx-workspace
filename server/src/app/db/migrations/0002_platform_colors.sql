CREATE TABLE IF NOT EXISTS platform_colors (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default colors
INSERT INTO platform_colors (key, value) VALUES
  ('primary', '#D35C36'),
  ('primaryLight', '#ED7D5A'),
  ('secondary', '#4B7B82'),
  ('secondaryLight', '#F3F7F7')
ON CONFLICT (key) DO NOTHING; 