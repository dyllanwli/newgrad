import pandas as pd
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
from api.models.job import JobCreate
from api.models.company import CompanyCreate
from api.config import MONGODB_URL
from tqdm import tqdm
from datetime import datetime


async def init_db():
    # Read the CSV file
    df = pd.read_csv("data/2025.csv")

    # Create a MongoDB client
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client["newgrad"]

    # Create a unique index on the company name
    await db.companies.create_index([("name", 1)], unique=True)

    # Convert DataFrame to list of dictionaries
    jobs = df.to_dict(orient="records")

    # Insert companies into the database
    companies = {}
    for job in jobs:
        company_name = job["company"]
        if company_name not in companies:
            companies[company_name] = CompanyCreate(name=company_name, views=0)
            try:
                await db.companies.insert_one(companies[company_name].dict())
            except Exception as e:
                print(f"Error inserting company {company_name}: {e}")

    # Insert jobs into the database
    for job in tqdm(jobs):
        locations = [loc.strip() for loc in job["locations"].split(";")]
        locations_list = []

        for loc in locations:
            state = loc.split(",")[-1].strip()
            city = loc.split(",")[0].strip()
            locations_list.append({"state": state, "city": city})

        company_instance = await db.companies.find_one({"name": job["company"]})
        date_posted_dt = datetime.strptime(job["date_posted"] + " 2024", "%b %d %Y")
        timestamp = date_posted_dt.timestamp()
        job_create = JobCreate(
            position=job["role"],
            company_id= str(company_instance["_id"]),
            company_name = str(company_instance["name"]),
            locations=locations_list,
            not_sponsor=None,
            us_citizen=None,
            description="",
            expired=False,
            apply_link=job["apply_url"],
            min_salary=None,
            max_salary=None,
            created_at=timestamp,
        )
        await db.jobs.insert_one(job_create.dict())

    print("Database initialized with job and company data.")


if __name__ == "__main__":
    asyncio.run(init_db())
