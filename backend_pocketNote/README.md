# EventManagement Backend Project 

## Prerequisites  
Before setting up the project, make sure you have the following installed:  
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)  
- [MongoDB](https://www.mongodb.com/) (For database storage)  
- [Git](https://git-scm.com/) (For version control)  

---
## Create a .env file in root directory with these variables:
### MongoDB Configuration
- DATABASE=database_connection_string
- DATABASE_PASSWORD=
- JWT_KEY=
- PORT=

## 📦 Install Dependencies

Run the following command inside the project folder:
```
npm install
```
This will install all required packages listed in `package.json`.


## 📜  Project Structure

```
`/spark-backend
│── /server        # Database & Server Configurations
│── /models        # Mongoose Models
│── /routes        # API Routes
│── /controller    # Business Logic for Routes
│── /middleware    # request verification 
│── .env           # Environment Variables (Not to be committed)
│── App.js         # Main Entry Point
│── package.json   # Dependencies & Scripts` 
```

## ✅ Deployment (Optional)

To deploy on **Render/Vercel/Heroku**, set up environment variables in their dashboard and push the code.
