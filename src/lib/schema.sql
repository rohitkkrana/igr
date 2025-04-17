-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create permissions table
CREATE TABLE IF NOT EXISTS permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    module VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create role_permissions table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS role_permissions (
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- Create users table with role_id
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
);

-- Insert default roles
INSERT INTO roles (name, description) VALUES
('admin', 'Administrator with full access'),
('manager', 'Manager with elevated access'),
('employee', 'Employee with limited access'),
('user', 'Regular user with basic access')
ON DUPLICATE KEY UPDATE description = VALUES(description);

-- Insert default permissions for different modules
INSERT INTO permissions (name, description, module) VALUES
-- Dashboard permissions
('view_dashboard', 'Can view dashboard', 'dashboard'),
('edit_dashboard', 'Can edit dashboard settings', 'dashboard'),

-- User management permissions
('view_users', 'Can view users', 'users'),
('create_users', 'Can create new users', 'users'),
('edit_users', 'Can edit existing users', 'users'),
('delete_users', 'Can delete users', 'users'),

-- Role management permissions
('view_roles', 'Can view roles', 'roles'),
('create_roles', 'Can create new roles', 'roles'),
('edit_roles', 'Can edit existing roles', 'roles'),
('delete_roles', 'Can delete roles', 'roles'),

-- Project permissions
('view_projects', 'Can view projects', 'projects'),
('create_projects', 'Can create new projects', 'projects'),
('edit_projects', 'Can edit existing projects', 'projects'),
('delete_projects', 'Can delete projects', 'projects'),

-- Report permissions
('view_reports', 'Can view reports', 'reports'),
('generate_reports', 'Can generate reports', 'reports'),
('export_reports', 'Can export reports', 'reports')
ON DUPLICATE KEY UPDATE description = VALUES(description);

-- Assign permissions to roles
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'admin'
ON DUPLICATE KEY UPDATE role_id = VALUES(role_id);

-- Insert default admin user (password: admin123)
INSERT INTO users (name, email, password, role_id)
SELECT 'Admin', 'admin@example.com', '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iq.IX1ZJ3qK2', id
FROM roles
WHERE name = 'admin'
ON DUPLICATE KEY UPDATE role_id = (SELECT id FROM roles WHERE name = 'admin'); 