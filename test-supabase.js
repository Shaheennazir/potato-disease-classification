// Simple test script to verify Supabase integration
// This script can be run in a browser console or Node.js environment

// For browser testing, include this in your HTML:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

// For Node.js, first install: npm install @supabase/supabase-js
// Then run: node test-supabase.js

// Replace with your actual Supabase credentials
const SUPABASE_URL = 'your_supabase_project_url';
const SUPABASE_ANON_KEY = 'your_supabase_anon_key';

// Initialize Supabase client
const { createClient } = require('@supabase/supabase-js'); // For Node.js
// const { createClient } = supabase; // For browser

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testSupabase() {
  console.log('Testing Supabase integration...');
  
  try {
    // Test authentication
    console.log('1. Testing authentication...');
    const { data: authData, error: authError } = await supabase.auth.getSession();
    if (authError) {
      console.log('Authentication error:', authError.message);
    } else {
      console.log('Authentication successful');
    }
    
    // Test database connection
    console.log('2. Testing database connection...');
    const { data: tableData, error: tableError } = await supabase
      .from('scan_records')
      .select('count')
      .limit(1);
      
    if (tableError) {
      console.log('Database connection error:', tableError.message);
    } else {
      console.log('Database connection successful');
    }
    
    console.log('Supabase integration test completed.');
  } catch (error) {
    console.error('Test failed with error:', error.message);
  }
}

// Run the test
testSupabase();