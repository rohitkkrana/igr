import pool from './db';

export async function getUserPermissions(userId) {
    try {
        const [permissions] = await pool.query(`
            SELECT DISTINCT p.name, p.module
            FROM permissions p
            JOIN role_permissions rp ON p.id = rp.permission_id
            JOIN users u ON u.role_id = rp.role_id
            WHERE u.id = ?
        `, [userId]);

        return permissions;
    } catch (error) {
        console.error('Error fetching user permissions:', error);
        return [];
    }
}

export async function hasPermission(userId, permissionName) {
    try {
        const [result] = await pool.query(`
            SELECT COUNT(*) as count
            FROM permissions p
            JOIN role_permissions rp ON p.id = rp.permission_id
            JOIN users u ON u.role_id = rp.role_id
            WHERE u.id = ? AND p.name = ?
        `, [userId, permissionName]);

        return result[0].count > 0;
    } catch (error) {
        console.error('Error checking permission:', error);
        return false;
    }
}

export async function hasModulePermission(userId, module) {
    try {
        const [result] = await pool.query(`
            SELECT COUNT(*) as count
            FROM permissions p
            JOIN role_permissions rp ON p.id = rp.permission_id
            JOIN users u ON u.role_id = rp.role_id
            WHERE u.id = ? AND p.module = ?
        `, [userId, module]);

        return result[0].count > 0;
    } catch (error) {
        console.error('Error checking module permission:', error);
        return false;
    }
} 