import os
from supabase import create_client, Client

# Get Supabase credentials from environment variables
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

# Create Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

def get_supabase_client() -> Client:
    """
    Returns the Supabase client instance
    """
    return supabase

# Database operations for scan records
def save_scan_record(user_id: str, image_url: str, prediction: str, confidence: float):
    """
    Save a scan record to the database
    """
    data = {
        "user_id": user_id,
        "image_url": image_url,
        "prediction": prediction,
        "confidence": confidence
    }
    
    result = supabase.table("scan_records").insert(data).execute()
    return result.data[0] if result.data else None

def get_user_scan_records(user_id: str):
    """
    Get all scan records for a user
    """
    result = supabase.table("scan_records").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
    return result.data

def delete_scan_record(record_id: str):
    """
    Delete a scan record by ID
    """
    result = supabase.table("scan_records").delete().eq("id", record_id).execute()
    return result.data