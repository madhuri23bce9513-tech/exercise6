# Q6 - MongoDB CRUD Operations

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB installed and running locally

### Steps to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start MongoDB** (if not running):
   ```bash
   mongod
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open browser:**  
   Visit `http://localhost:3000`

---

## Schema: `studentSchema`

| Field       | Type    | Required | Notes              |
|-------------|---------|----------|--------------------|
| name        | String  | ✅ Yes   | Trimmed            |
| rollNo      | Number  | ✅ Yes   | Unique             |
| branch      | String  | ✅ Yes   |                    |
| marks       | Number  | No       | Range: 0–100       |
| email       | String  | No       | Stored lowercase   |
| createdAt   | Date    | Auto     | Timestamps         |
| updatedAt   | Date    | Auto     | Timestamps         |

---

## API Endpoints

| Method | URL              | Operation  |
|--------|------------------|------------|
| POST   | /students        | CREATE     |
| GET    | /students        | READ ALL   |
| GET    | /students/:id    | READ ONE   |
| PUT    | /students/:id    | UPDATE     |
| DELETE | /students/:id    | DELETE     |

---

## Database
- **Database:** `studentDB`
- **Collection:** `students`
