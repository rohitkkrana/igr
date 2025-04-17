import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get pagination and search parameters from URL
    const { searchParams: urlParams } = new URL(request.url);
    const page = parseInt(urlParams.get('page')) || 1;
    const limit = parseInt(urlParams.get('limit')) || 10;
    const offset = (page - 1) * limit;
    const search = urlParams.get('search') || '';

    // Build WHERE clause for search
    let whereClause = "WHERE TRIM(buyertype) = ?";
    let queryParams = ['Individual'];

    if (search) {
      whereClause += " AND (buildingname LIKE ? OR state LIKE ? OR city LIKE ?)";
      queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    // Get total count with search filters
    const [totalCount] = await query(`
      SELECT COUNT(*) as total
      FROM tbl_maharashtra_igr
      ${whereClause}
    `, queryParams);

    // Get project data with search filters and pagination
    const projectData = await query(`
      SELECT 
        pid,
        projectreraid,
        buildingname AS projectname,
        buyername,
        buyertype,
        city,
        micromarket,
        state,
        registrationdate,
        propertydescription,
        buildingname,
        wing,
        floorno,
        unitno
      FROM tbl_maharashtra_igr
      ${whereClause}
      ORDER BY registrationdate DESC
      LIMIT ? OFFSET ?
    `, [...queryParams, limit.toString(), offset.toString()]);

    return NextResponse.json({ 
      success: true,
      results: projectData,
      pagination: {
        total: totalCount.total,
        page,
        limit,
        totalPages: Math.ceil(totalCount.total / limit)
      }
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project data' },
      { status: 500 }
    );
  }
} 