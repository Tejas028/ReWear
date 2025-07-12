# 👕 ReWear – Community Clothing Exchange

ReWear is a web-based platform that enables people to **exchange unused clothing** through **direct swaps** or a **point-based redemption system**. Our mission is to promote **sustainable fashion** and reduce **textile waste** by helping users give their clothes a second life.

Live Link - https://rewear-yuno.onrender.com
---

## 🌱 Why ReWear?

Every year, millions of tons of clothing end up in landfills. ReWear empowers users to:
- ♻️ Give garments a new home
- 💰 Save money while refreshing their wardrobe
- 🌍 Make eco-friendly fashion choices

---

## 🚀 Features at a Glance

### 👤 User Authentication
- Secure signup/login via email & password
- Passwords hashed using `Werkzeug`
- Session management via `Flask-Login`

### 🏠 Landing Page
- Mission-driven introduction
- Featured items carousel
- Clear CTAs: **Start Swapping**, **Browse Items**, **List an Item**

### 👛 User Dashboard
- View profile and points balance
- See listed items and swap history
- Manage incoming/outgoing swap requests

### 📦 Item Management
- **Browse Items**: Filter by category, size, condition
- **Item Detail View**: Photos, description, redemption/swap options
- **List Item**: Upload images and provide item details

### 🔁 Swap & Points System
- Request **direct swaps** with other users
- Redeem clothing using **earned points**
- Manage swap requests (accept/reject)

### 🛡️ Admin Panel
- Moderate item listings (approve/reject)
- Remove inappropriate content
- View platform-wide user & item stats

---

## 🛠️ Tech Stack

| Layer       | Tech Used                       |
|-------------|----------------------------------|
| Backend     | Python Flask                    |
| Frontend    | HTML5, Tailwind CSS             |
| Database    | SQLite (easy to switch to PostgreSQL/MySQL) |
| Auth        | Flask-Login                     |
| File Upload | Werkzeug                        |
| Icons       | Font Awesome                    |

---

## ⚙️ Getting Started

### 🔗 Clone the Repository

```bash
git clone https://github.com/your-username/rewear.git
cd rewear

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd rewear
```

### Step 2: Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Run the Application
```bash
python app.py
```

The application will be available at `http://localhost:5000`

## Default Admin Account

An admin account is automatically created with the following credentials:
- **Email**: admin@rewear.com
- **Password**: admin123

## 🗄️ Database Schema Overview

### 👤 `Users` Table
Stores user account and profile data.

| Field         | Description                       |
|---------------|-----------------------------------|
| `id`          | Primary key                       |
| `email`       | Unique email address              |
| `password_hash` | Securely hashed password        |
| `name`        | Full name of the user             |
| `points`      | User’s current points balance     |
| `is_admin`    | Boolean flag for admin privileges |
| `created_at`  | Timestamp of account creation     |

---

### 👕 `Items` Table
Details of clothing items listed by users.

| Field         | Description                                  |
|---------------|----------------------------------------------|
| `id`          | Primary key                                  |
| `title`       | Item name/title                              |
| `description` | Full description of the item                 |
| `category`    | General category (Tops, Bottoms, etc.)       |
| `item_type`   | Specific type (e.g., Shirt, Jeans)           |
| `size`        | Item size                                    |
| `condition`   | Condition (New, Good, Fair, etc.)            |
| `tags`        | Comma-separated descriptive tags             |
| `images`      | JSON array of image paths                    |
| `points_value`| Points required for redemption               |
| `is_available`| Item availability status                     |
| `is_approved` | Admin approval status                        |
| `user_id`     | Foreign key referencing the `Users` table    |
| `created_at`  | Timestamp of item listing                    |

---

### 🔁 `SwapRequests` Table
Handles swap and redemption request tracking.

| Field           | Description                                  |
|------------------|----------------------------------------------|
| `id`            | Primary key                                  |
| `requester_id`  | User requesting the swap                     |
| `item_owner_id` | Owner of the requested item                  |
| `item_id`       | The item involved in the swap                |
| `status`        | Swap status (`pending`, `accepted`, `rejected`, `completed`) |
| `message`       | Optional message from the requester          |
| `created_at`    | Timestamp of request creation                |

---

## 🧑‍💻 Usage Guide

### 🔄 For Regular Users
1. **Register** for an account — start with **100 free points**
2. **Browse items** based on category, size, or condition
3. **List clothes** you no longer wear to earn points
4. **Swap directly** with other users or **redeem items** using points
5. **Manage your dashboard** to track requests and your point balance

---

### 🔐 For Admins
1. Login with admin credentials at `/login`
2. Access the **Admin Panel**
3. Approve or reject pending item listings
4. Remove flagged or inappropriate content
5. Monitor user and item activity across the platform

## File Structure

```
rewear/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── templates/            # HTML templates
│   ├── base.html         # Base template with navigation
│   ├── index.html        # Landing page
│   ├── login.html        # Login page
│   ├── register.html     # Registration page
│   ├── dashboard.html    # User dashboard
│   ├── browse.html       # Item browsing page
│   ├── item_detail.html  # Individual item page
│   ├── add_item.html     # Add new item form
│   └── admin.html        # Admin panel
└── static/
    └── uploads/          # User uploaded images
```

## Configuration

### Environment Variables
You can customize the application by setting environment variables:

- `SECRET_KEY`: Flask secret key for session management
- `DATABASE_URL`: Database connection string
- `UPLOAD_FOLDER`: Path for file uploads

### Database Configuration
The application uses SQLite by default. To use a different database:

1. Update the `SQLALCHEMY_DATABASE_URI` in `app.py`
2. Install the appropriate database driver
3. Update `requirements.txt` if needed

## Security Features

- Password hashing using Werkzeug
- CSRF protection (can be enabled with Flask-WTF)
- Secure file upload handling
- Admin-only access to moderation features
- Input validation and sanitization

## Screenshots

User Interface
<img width="1900" height="913" alt="image" src="https://github.com/user-attachments/assets/310f76a5-2db9-40c6-9fb0-a79c94c3d8c1" />
<img width="1919" height="911" alt="image" src="https://github.com/user-attachments/assets/7ef3c7b0-29b9-4a51-8825-470465236e48" />
<img width="1919" height="905" alt="image" src="https://github.com/user-attachments/assets/3fd0ebe5-29a9-4ccf-a50b-cac52c3ae5cb" />
<img width="1919" height="910" alt="image" src="https://github.com/user-attachments/assets/496e4415-b209-4b99-818d-fc0a9b727189" />

Admin Panel

<img width="1919" height="907" alt="Screenshot 2025-07-12 173748" src="https://github.com/user-attachments/assets/33cfdf56-1e19-4999-a84e-8e70c95c60c9" />

<img width="1919" height="909" alt="image" src="https://github.com/user-attachments/assets/044b2828-313c-47a0-9306-2d6967c551c0" />

---

**ReWear** - Promoting sustainable fashion through community clothing exchange. 
