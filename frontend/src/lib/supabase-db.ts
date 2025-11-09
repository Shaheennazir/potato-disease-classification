import { supabase } from './supabase'

// Define types for our database tables
export interface ScanRecord {
  id?: string
  user_id: string
  image_url: string
  prediction: string
  confidence: number
  created_at?: string
}

export interface UserProfile {
  id?: string
  user_id: string
  full_name?: string
  avatar_url?: string
  created_at?: string
  updated_at?: string
}

// Database operations for scan records
export const saveScanRecord = async (record: Omit<ScanRecord, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('scan_records')
    .insert(record)
    .select()
    
  if (error) {
    console.error('Error saving scan record:', error)
    throw error
  }
  
  return data
}

export const getUserScanRecords = async (userId: string) => {
  const { data, error } = await supabase
    .from('scan_records')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    
  if (error) {
    console.error('Error fetching scan records:', error)
    throw error
  }
  
  return data
}

export const deleteScanRecord = async (id: string) => {
  const { error } = await supabase
    .from('scan_records')
    .delete()
    .eq('id', id)
    
  if (error) {
    console.error('Error deleting scan record:', error)
    throw error
  }
  
  return true
}

// Database operations for user profiles
export const createUserProfile = async (profile: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert(profile)
    .select()
    
  if (error) {
    console.error('Error creating user profile:', error)
    throw error
  }
  
  return data
}

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()
    
  if (error) {
    console.error('Error fetching user profile:', error)
    throw error
  }
  
  return data
}

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('user_id', userId)
    .select()
    
  if (error) {
    console.error('Error updating user profile:', error)
    throw error
  }
  
  return data
}