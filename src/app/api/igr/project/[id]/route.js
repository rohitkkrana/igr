import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { query } from '@/lib/db';

export async function GET(request, { params }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get project ID from params
    const projectId = params.id;
    if (!projectId) {
      return NextResponse.json(
        { success: false, error: 'Project ID is required' },
        { status: 400 }
      );
    }

    // Fetch project details
    const sql = `
      SELECT * FROM tbl_maharashtra_igr 
      WHERE pid = ?
    `;

    const results = await query(sql, [projectId]);

    if (!results || results.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: results[0]
    });

  } catch (error) {
    console.error('Error fetching project details:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project details' },
      { status: 500 }
    );
  }
} 