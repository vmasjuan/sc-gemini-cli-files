from flask import Flask, render_template, jsonify
import pandas as pd
import os

app = Flask(__name__)

DATA_FILE = 'crm_import_ready.csv'

def load_data():
    if not os.path.exists(DATA_FILE):
        return pd.DataFrame() # Return empty if no file
    return pd.read_csv(DATA_FILE)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/data')
def get_data():
    df = load_data()
    if df.empty:
        return jsonify({'error': 'No data found'})

    # Metrics
    total_leads = len(df)
    segments = df['Priority_Segment'].value_counts().to_dict()
    
    # Top 5 Companies
    top_companies = df['Company'].value_counts().head(5).to_dict()
    
    # Top Countries
    top_countries = df['Country'].value_counts().head(10).to_dict()

    # Full Data for Table (convert to list of dicts)
    # We'll limit the table data sent to avoid huge payloads if necessary, 
    # but for 5k records it's probably fine to send all for client-side search.
    # We will send a subset of columns for the table to keep it light.
    table_cols = ['Email', 'First Name', 'Last Name', 'Company', 'Title', 'Country', 'Priority_Segment', 'Lead Score']
    table_data = df[table_cols].fillna('').to_dict(orient='records')

    return jsonify({
        'metrics': {
            'total': total_leads,
            'segments': segments,
            'top_companies': top_companies,
            'top_countries': top_countries
        },
        'leads': table_data
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
