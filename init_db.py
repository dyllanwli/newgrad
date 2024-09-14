import pandas as pd
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
from api.models.job import JobCreate
from api.config import MONGODB_URL
from tqdm import tqdm

async def init_db():
    # Read the CSV file
    df = pd.read_csv('data/2025.csv')

    # Create a MongoDB client
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client["newgrad"]

    # Convert DataFrame to list of dictionaries
    jobs = df.to_dict(orient='records')

    # Insert jobs into the database
    for job in tqdm(jobs):
        locations = [loc.strip() for loc in job['locations'].split(';')]
        locations_list = []
        for loc in locations:
            state = loc.split(',')[-1].strip()
            city = loc.split(',')[0].strip()
            locations_list.append({"state": state, "city": city})
        job_create = JobCreate(
            position=job['role'],
            company=job['company'],
            locations=locations_list,
            not_sponsor=None,
            us_citizen=None,
            views=0,
            date_posted=job['date_posted'],
            description="",
            expired=False,
            apply_link=job['apply_url'],
            min_salary=None,
            max_salary=None
        )
        await db.jobs.insert_one(job_create.dict())

    print("Database initialized with job data.")

if __name__ == "__main__":
    asyncio.run(init_db())