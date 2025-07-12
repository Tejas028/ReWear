from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import os
import bcrypt
from datetime import datetime
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = '8f7c1c2be9c8b148b7d9c4c7f6e2c10f6c83b2c1d0b177cfb8e1b2c9f9f49a9e'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///rewear.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'static/uploads'

# Custom Jinja filter for JSON parsing
@app.template_filter('from_json')
def from_json_filter(value):
    if value:
        try:
            return json.loads(value)
        except:
            return []
    return []

# Ensure upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Database Models
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    points = db.Column(db.Integer, default=100)
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    items = db.relationship('Item', backref='owner', lazy=True)
    swap_requests_sent = db.relationship('SwapRequest', foreign_keys='SwapRequest.requester_id', backref='requester', lazy=True)
    swap_requests_received = db.relationship('SwapRequest', foreign_keys='SwapRequest.item_owner_id', backref='item_owner', lazy=True)

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    item_type = db.Column(db.String(50), nullable=False)
    size = db.Column(db.String(20), nullable=False)
    condition = db.Column(db.String(50), nullable=False)
    tags = db.Column(db.String(200))
    images = db.Column(db.Text)  # JSON string of image paths
    points_value = db.Column(db.Integer, default=50)
    is_available = db.Column(db.Boolean, default=True)
    is_approved = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class SwapRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    requester_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    item_owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, accepted, rejected, completed
    message = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    item = db.relationship('Item', backref='swap_requests')

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Routes
@app.route('/')
def index():
    featured_items = Item.query.filter_by(is_available=True, is_approved=True).limit(6).all()
    return render_template('index.html', featured_items=featured_items)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        name = request.form['name']
        
        if User.query.filter_by(email=email).first():
            flash('Email already registered')
            return redirect(url_for('register'))
        
        password_hash = generate_password_hash(password)
        user = User(email=email, password_hash=password_hash, name=name)
        db.session.add(user)
        db.session.commit()
        
        flash('Registration successful! Please login.')
        return redirect(url_for('login'))
    
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()
        
        if user and check_password_hash(user.password_hash, password):
            login_user(user)
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid email or password')
    
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/dashboard')
@login_required
def dashboard():
    user_items = Item.query.filter_by(user_id=current_user.id).all()
    pending_requests = SwapRequest.query.filter_by(item_owner_id=current_user.id, status='pending').all()
    sent_requests = SwapRequest.query.filter_by(requester_id=current_user.id).all()
    
    return render_template('dashboard.html', 
                         user_items=user_items, 
                         pending_requests=pending_requests,
                         sent_requests=sent_requests)

@app.route('/browse')
def browse():
    category = request.args.get('category', '')
    search = request.args.get('search', '')
    
    query = Item.query.filter_by(is_available=True, is_approved=True)
    
    if category:
        query = query.filter_by(category=category)
    
    if search:
        query = query.filter(Item.title.contains(search) | Item.description.contains(search))
    
    items = query.order_by(Item.created_at.desc()).all()
    return render_template('browse.html', items=items, category=category, search=search)

@app.route('/item/<int:item_id>')
def item_detail(item_id):
    item = Item.query.get_or_404(item_id)
    return render_template('item_detail.html', item=item)

@app.route('/add_item', methods=['GET', 'POST'])
@login_required
def add_item():
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        category = request.form['category']
        item_type = request.form['item_type']
        size = request.form['size']
        condition = request.form['condition']
        tags = request.form['tags']
        points_value = int(request.form['points_value'])
        
        # Handle image uploads
        images = []
        if 'images' in request.files:
            files = request.files.getlist('images')
            for file in files:
                if file and file.filename:
                    filename = secure_filename(file.filename)
                    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
                    filename = f"{timestamp}_{filename}"
                    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                    images.append(f"uploads/{filename}")
        
        item = Item(
            title=title,
            description=description,
            category=category,
            item_type=item_type,
            size=size,
            condition=condition,
            tags=tags,
            points_value=points_value,
            images=json.dumps(images),
            user_id=current_user.id
        )
        
        db.session.add(item)
        db.session.commit()
        
        flash('Item added successfully! It will be reviewed by admin.')
        return redirect(url_for('dashboard'))
    
    return render_template('add_item.html')

@app.route('/swap_request', methods=['POST'])
@login_required
def swap_request():
    item_id = request.form['item_id']
    message = request.form.get('message', '')
    
    item = Item.query.get_or_404(item_id)
    
    if item.user_id == current_user.id:
        flash('You cannot request a swap for your own item')
        return redirect(url_for('item_detail', item_id=item_id))
    
    if not item.is_available:
        flash('This item is not available for swapping')
        return redirect(url_for('item_detail', item_id=item_id))
    
    # Check if request already exists
    existing_request = SwapRequest.query.filter_by(
        requester_id=current_user.id,
        item_id=item_id,
        status='pending'
    ).first()
    
    if existing_request:
        flash('You have already sent a swap request for this item')
        return redirect(url_for('item_detail', item_id=item_id))
    
    swap_request = SwapRequest(
        requester_id=current_user.id,
        item_owner_id=item.user_id,
        item_id=item_id,
        message=message
    )
    
    db.session.add(swap_request)
    db.session.commit()
    
    flash('Swap request sent successfully!')
    return redirect(url_for('item_detail', item_id=item_id))

@app.route('/redeem_points', methods=['POST'])
@login_required
def redeem_points():
    item_id = request.form['item_id']
    item = Item.query.get_or_404(item_id)
    
    if item.user_id == current_user.id:
        flash('You cannot redeem your own item')
        return redirect(url_for('item_detail', item_id=item_id))
    
    if not item.is_available:
        flash('This item is not available')
        return redirect(url_for('item_detail', item_id=item_id))
    
    if current_user.points < item.points_value:
        flash('Insufficient points to redeem this item')
        return redirect(url_for('item_detail', item_id=item_id))
    
    # Process the redemption
    current_user.points -= item.points_value
    item.owner.points += item.points_value
    item.is_available = False
    
    # Create a completed swap request
    swap_request = SwapRequest(
        requester_id=current_user.id,
        item_owner_id=item.user_id,
        item_id=item_id,
        status='completed',
        message='Redeemed with points'
    )
    
    db.session.add(swap_request)
    db.session.commit()
    
    flash(f'Item redeemed successfully! {item.points_value} points deducted.')
    return redirect(url_for('dashboard'))

@app.route('/handle_swap_request', methods=['POST'])
@login_required
def handle_swap_request():
    request_id = request.form['request_id']
    action = request.form['action']
    
    swap_request = SwapRequest.query.get_or_404(request_id)
    
    if swap_request.item_owner_id != current_user.id:
        flash('Unauthorized action')
        return redirect(url_for('dashboard'))
    
    if action == 'accept':
        swap_request.status = 'accepted'
        swap_request.item.is_available = False
        flash('Swap request accepted!')
    elif action == 'reject':
        swap_request.status = 'rejected'
        flash('Swap request rejected.')
    
    db.session.commit()
    return redirect(url_for('dashboard'))

# Admin routes
@app.route('/admin')
@login_required
def admin_panel():
    if not current_user.is_admin:
        flash('Access denied')
        return redirect(url_for('dashboard'))
    
    pending_items = Item.query.filter_by(is_approved=False).all()
    all_items = Item.query.all()
    
    return render_template('admin.html', pending_items=pending_items, all_items=all_items)

@app.route('/admin/approve_item', methods=['POST'])
@login_required
def approve_item():
    if not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
    
    item_id = request.form['item_id']
    action = request.form['action']
    
    item = Item.query.get_or_404(item_id)
    
    if action == 'approve':
        item.is_approved = True
        flash('Item approved successfully!')
    elif action == 'reject':
        db.session.delete(item)
        flash('Item rejected and removed.')
    
    db.session.commit()
    return redirect(url_for('admin_panel'))

@app.route('/admin/delete_item', methods=['POST'])
@login_required
def delete_item():
    if not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
    
    item_id = request.form['item_id']
    item = Item.query.get_or_404(item_id)
    
    db.session.delete(item)
    db.session.commit()
    
    flash('Item deleted successfully!')
    return redirect(url_for('admin_panel'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
        # Create admin user if not exists
        admin = User.query.filter_by(email='admin@rewear.com').first()
        if not admin:
            admin = User(
                email='admin@rewear.com',
                password_hash=generate_password_hash('admin123'),
                name='Admin',
                is_admin=True,
                points=1000
            )
            db.session.add(admin)
            db.session.commit()
    
    app.run(debug=True, host='0.0.0.0', port=5001) 