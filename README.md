# Rental Management System

A full-stack rental listing web app where users can sign up, create listings, upload images, and post reviews.

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- EJS + EJS-Mate
- Passport.js (local authentication)
- Cloudinary + Multer (image upload)
- Joi (request validation)
- Express Session + Connect Mongo + Connect Flash

## What You Can Do

- User signup, login, and logout
- Create, edit, and delete rental listings
- Upload listing images to Cloudinary
- Add and delete reviews on listings
- Owner/reviewer authorization checks
- Server-side validation for listings and reviews

## Clone and Run Locally

```bash
git clone https://github.com/luvkumar404/rental-management-system.git
cd rental-management-system
npm install
```

## MongoDB Atlas Setup

1. Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2. Create a new project and a cluster (free tier is enough).
3. Create a database user:
   - Go to **Database Access** -> **Add New Database User**
   - Save the username and password safely
4. Allow network access:
   - Go to **Network Access** -> **Add IP Address**
   - For development, you can use `0.0.0.0/0` (open to all IPs) or your current IP
5. Get connection string:
   - Click **Connect** -> **Drivers**
   - Copy the `mongodb+srv://...` URI
   - Replace `<password>` with your DB user password
6. Set the database name in the URI as `wanderlust`.

Create or update `.env` in the project root:

```env
ATLASDB_URL="mongodb+srv://<db_user>:<db_password>@<cluster-name>.mongodb.net/wanderlust?retryWrites=true&w=majority&appName=<app-name>"
# Optional local fallback
MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"
SECRET="replace-with-a-strong-secret"
CLOUD_NAME="your-cloudinary-cloud-name"
CLOUD_API_KEY="your-cloudinary-api-key"
CLOUD_API_SECRET="your-cloudinary-api-secret"
```

Start the app:

```bash
node app.js
```

The app runs at: `http://localhost:8080`

## Notes

- `ATLASDB_URL` is preferred for MongoDB connection.
- `MONGO_URL` is kept as fallback for local development.
- Cloudinary variables are required for image upload features.
- If Atlas fails to connect, recheck DB user/password and Network Access whitelist.
