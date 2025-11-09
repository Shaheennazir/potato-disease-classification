import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL || 'your_supabase_project_url';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'your_supabase_anon_key';

// Create Supabase client with AsyncStorage session persistence
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Authentication functions
export const signUp = async (email, password) => {
  return await supabase.auth.signUp({
    email,
    password,
  });
};

export const signIn = async (email, password) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error getting user:', error);
    return null;
  }
  return data.user;
};

// Database functions for scan records
export const saveScanRecord = async (record) => {
  const { data, error } = await supabase
    .from('scan_records')
    .insert(record)
    .select();
    
  if (error) {
    console.error('Error saving scan record:', error);
    throw error;
  }
  
  return data;
};

export const getUserScanRecords = async (userId) => {
  const { data, error } = await supabase
    .from('scan_records')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching scan records:', error);
    throw error;
  }
  
  return data;
};

export const deleteScanRecord = async (id) => {
  const { error } = await supabase
    .from('scan_records')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting scan record:', error);
    throw error;
  }
  
  return true;
};