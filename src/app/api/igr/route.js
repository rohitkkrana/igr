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

    // Get total count
    const [totalCount] = await query(`
        SELECT SUM(total) AS total 
        FROM (
          SELECT 
            CASE 
              WHEN projectreraid = '' OR projectreraid IS NULL THEN COUNT(*)  
              ELSE 1  
            END AS total  
          FROM tbl_maharashtra_igr  
          GROUP BY COALESCE(NULLIF(projectreraid, ''), 'No RERA ID')
        ) A
      `);

    // Get buyer type counts using GROUP BY
    const buyerTypeCounts = await query(`
      SELECT 
    type, 
    SUM(count) AS count
FROM (
    SELECT 
        TRIM(buyertype) AS type, 
        CASE 
            WHEN projectreraid = '' OR projectreraid IS NULL THEN COUNT(*)  
            ELSE 1  
        END AS count
    FROM tbl_maharashtra_igr  
    GROUP BY TRIM(buyertype), COALESCE(NULLIF(projectreraid, ''), 'No RERA ID')
) A 
GROUP BY type
    `);

    return NextResponse.json({ 
      success: true,
      total: totalCount.total,
      buyerTypes: buyerTypeCounts
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
} 