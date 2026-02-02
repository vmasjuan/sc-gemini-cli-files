import pandas as pd
import glob
import os
import sys

def process_leads():
    # 1. Load Data
    files = glob.glob('lead-scan/*.csv')
    if not files:
        print("No CSV files found in lead-scan/")
        return

    dfs = []
    for f in files:
        try:
            dfs.append(pd.read_csv(f))
        except Exception as e:
            print(f"Error reading {f}: {e}")
    
    if not dfs:
        print("No data loaded.")
        return

    df = pd.concat(dfs, ignore_index=True)
    initial_count = len(df)
    print(f"Total Raw Records: {initial_count}")

    # 2. Validate Emails
    # Filter out missing or invalid emails (must have @ and .)
    # Using a simple regex for basic validation as per instruction
    # "contains an '@' symbol and a domain extension"
    
    # Drop NAs
    df_clean = df.dropna(subset=['Email']).copy()
    
    # Regex check
    valid_email_mask = df_clean['Email'].astype(str).str.contains(r'[^@]+@[^@]+\.[^@]+', regex=True)
    bad_records = df_clean[~valid_email_mask]
    df_clean = df_clean[valid_email_mask]
    
    dropped_count = initial_count - len(df_clean)
    print(f"Invalid Records Dropped: {dropped_count}")
    
    # 3. Type Conversion & Sorting
    df_clean['Timestamp'] = pd.to_datetime(df_clean['Timestamp'], errors='coerce')
    df_clean['Lead Score'] = pd.to_numeric(df_clean['Lead Score'], errors='coerce').fillna(0)
    
    # Sort by Email and Timestamp (descending) so the first record is the most recent
    df_clean = df_clean.sort_values(by=['Email', 'Timestamp'], ascending=[True, False])

    # 4. Conflict Resolution (Most Recent Contact Details)
    # We'll take the first record for each email for these columns
    contact_cols = ['Email', 'First Name', 'Last Name', 'Title', 'Company', 'Phone', 
                    'Address', 'City', 'State', 'Postal Code', 'Country']
    
    # Ensure all contact columns exist (just in case some file is weird)
    existing_contact_cols = [c for c in contact_cols if c in df_clean.columns]
    
    most_recent_contacts = df_clean.drop_duplicates(subset=['Email'], keep='first')[existing_contact_cols]

    # 5. Aggregation
    # Session ID: join unique
    # Notes: join all
    # Lead Score: max
    
    agg_funcs = {
        'Session ID': lambda x: ';'.join(sorted(set(x.dropna().astype(str)))),
        'Notes': lambda x: ' | '.join(x.dropna().astype(str)),
        'Lead Score': 'max'
    }
    
    grouped = df_clean.groupby('Email').agg(agg_funcs).reset_index()

    # 6. Merge
    final_df = pd.merge(most_recent_contacts, grouped, on='Email')

    # 7. Score & Segment
    def get_segment(score):
        if score > 75:
            return 'Hot'
        elif 40 <= score <= 75:
            return 'Warm'
        else:
            return 'Cold'

    final_df['Priority_Segment'] = final_df['Lead Score'].apply(get_segment)

    # 8. Stats
    print(f"Unique Leads: {len(final_df)}")
    print("Priority Segment Breakdown:")
    print(final_df['Priority_Segment'].value_counts())

    # 9. Save
    output_file = 'crm_import_ready.csv'
    final_df.to_csv(output_file, index=False)
    print(f"\nSuccessfully saved cleaned data to {output_file}")

if __name__ == "__main__":
    process_leads()
