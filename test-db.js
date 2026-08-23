const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://lieaxouonxcmektedaey.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpZWF4b3VvbnhjbWVrdGVkYWV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1MDE2NTcsImV4cCI6MjEwMzA3NzY1N30.thSm1036OYPTD4sfBF6-eJlk3Pc11SKCrNER4g-VfVE';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const testUser = {
    id: 100001,
    first_name: 'Alex',
    username: 'alex_test',
    category: 'dev',
    is_subscribed: true
  };

  console.log('Отправка тестовой записи в Supabase...');
  const { data, error } = await supabase.from('users').upsert(testUser, { onConflict: 'id' }).select();
  
  if (error) {
    console.error('Ошибка записи:', error);
  } else {
    console.log('Успешно записано в базу:', data);
  }
}

run();
