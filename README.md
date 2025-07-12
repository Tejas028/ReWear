# ReWear - Community Clothing Exchange

A web-based platform that enables users to exchange unused clothing through direct swaps or a point-based redemption system. The goal is to promote sustainable fashion and reduce textile waste by encouraging users to reuse wearable garments instead of discarding them.

## Features

### User Authentication
- Email/password signup and login
- Secure password hashing
- User session management

### Landing Page
- Platform introduction and mission
- Featured items carousel
- Calls-to-action: "Start Swapping", "Browse Items", "List an Item"

### User Dashboard
- Profile details and points balance
- Uploaded items overview
- Ongoing and completed swaps list
- Pending swap requests management

### Item Management
- **Browse Items**: Search and filter by category, size, condition
- **Item Detail Page**: Image gallery, full description, swap/redeem options
- **Add New Item**: Upload images, enter details (title, description, category, type, size, condition, tags)

### Swap System
- **Direct Swaps**: Request swaps with other users
- **Points Redemption**: Redeem items using earned points
- **Swap Management**: Accept/reject swap requests

### Admin Panel
- Moderate and approve/reject item listings
- Remove inappropriate or spam items
- View all items and user statistics
- Lightweight admin panel for oversight

## Technology Stack

- **Backend**: Python Flask
- **Database**: SQLite (easily switchable to PostgreSQL/MySQL)
- **Frontend**: HTML5, Tailwind CSS
- **Authentication**: Flask-Login
- **File Upload**: Werkzeug
- **Icons**: Font Awesome

## Installation & Setup

### Prerequisites
- Python 3.7 or higher
- pip (Python package installer)

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

## Database Schema

### Users Table
- `id`: Primary key
- `email`: Unique email address
- `password_hash`: Hashed password
- `name`: User's full name
- `points`: Available points balance
- `is_admin`: Admin privileges flag
- `created_at`: Account creation timestamp

### Items Table
- `id`: Primary key
- `title`: Item title
- `description`: Detailed description
- `category`: Item category (Tops, Bottoms, Dresses, etc.)
- `item_type`: Specific type (Shirt, Jeans, etc.)
- `size`: Item size
- `condition`: Item condition (New, Good, Fair, etc.)
- `tags`: Comma-separated tags
- `images`: JSON array of image paths
- `points_value`: Points required for redemption
- `is_available`: Availability status
- `is_approved`: Admin approval status
- `user_id`: Foreign key to Users table
- `created_at`: Listing creation timestamp

### SwapRequests Table
- `id`: Primary key
- `requester_id`: User requesting the swap
- `item_owner_id`: Owner of the item
- `item_id`: Item being swapped
- `status`: Request status (pending, accepted, rejected, completed)
- `message`: Optional message from requester
- `created_at`: Request creation timestamp

## Usage Guide

### For Regular Users

1. **Registration**: Create an account to get started with 100 points
2. **Browse Items**: Explore available items by category or search
3. **List Items**: Upload photos and details of clothes you want to share
4. **Swap or Redeem**: Request direct swaps or redeem items with points
5. **Manage Requests**: Accept or reject incoming swap requests

### For Admins

1. **Access Admin Panel**: Login with admin credentials
2. **Review Items**: Approve or reject pending item listings
3. **Moderate Content**: Remove inappropriate items
4. **Monitor Activity**: View user and item statistics

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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions, please open an issue in the repository or contact the development team.

---

**ReWear** - Promoting sustainable fashion through community clothing exchange. 