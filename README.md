# Salesforce Validation Rule Manager

A full-stack web application that integrates with Salesforce using OAuth 2.0 and the Salesforce Tooling API to manage Validation Rules dynamically.

## Features

- Login with Salesforce using OAuth 2.0
- Fetch all Salesforce Validation Rules
- Display Validation Rule status (Active / Inactive)
- Enable or Disable Validation Rules
- Real-time Salesforce metadata update
- Full-stack integration using React and Spring Boot
- Live deployed application

---

## Tech Stack

### Frontend
- React (Vite)
- Axios
- JavaScript
- HTML/CSS

### Backend
- Spring Boot
- Java
- RestTemplate
- Apache HttpClient

### Salesforce
- Salesforce Developer Org
- Connected App
- OAuth 2.0
- Tooling API

---

## Architecture
React Frontend
       ↓
Spring Boot Backend
       ↓
Salesforce Tooling API

## OAuth Flow
User clicks Login with Salesforce
Salesforce authentication page opens
User grants access
Access token is generated
Frontend communicates with backend
Backend interacts with Salesforce Tooling API

## Functionalities
1. Login with Salesforce

Secure OAuth 2.0 authentication using Salesforce Connected App.

2. Fetch Validation Rules

Fetches all Validation Rules from Salesforce Account Object using Tooling API.

3. Toggle Validation Rules

Enable or disable validation rules directly from the web application.

4. Persist Changes

Changes are updated in Salesforce Org metadata.

## Salesforce Configuration
# Connected App
OAuth Enabled
Callback URL configured
API access enabled

# Validation Rules
Created multiple validation rules on Account Object such as:
Phone Required
Website Required
Revenue Validation
Name Required

## Live Deployment
# Frontend
    https://salesforce-validation-manager-nine.vercel.app
# Backend
  https://salesforce-backend-f15c.onrender.com

## GitHub Repository
https://github.com/vimlGit/salesforce-validation-manager

## Run Project Locally
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
mvn spring-boot:run


## Environment Setup
# Frontend
Update:
Salesforce Consumer Key
Redirect URI

# Backend
Configure:
CORS settings
Salesforce API endpoints

## Challenges Faced
Salesforce OAuth integration
CORS issues during deployment
PATCH request support in Spring Boot
Salesforce ValidationRule metadata updates
Deployment integration between frontend and backend
Learning Outcomes
Salesforce OAuth 2.0 Authentication
Salesforce Tooling API
Full-stack integration
Metadata management
Deployment using Vercel and Render

## Author
Vimlesh Singh
