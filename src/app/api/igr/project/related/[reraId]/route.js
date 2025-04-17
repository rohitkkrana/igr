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

    // Get RERA ID from params
    const reraId = params.reraId;
    if (!reraId) {
      return NextResponse.json(
        { success: false, error: 'RERA ID is required' },
        { status: 400 }
      );
    }

    // Fetch related projects with all necessary fields
    const sql = `
      SELECT 
        projectreraid,
        pid,
        documentno,
        documentname,
        registrationdate,
        propertydescription,
        buildingtype,
        buildingname,
        wing,
        floorno,
        unitno,
        shopno,
        marketprice,
        registrationfees,
        bharlele_mudrank_shulkhor_stamp_duty_paid,
        sellername,
        sellertype,
        buyername,
        buyertype,
        buyeraddress,
        buyerpannumber,
        projectname,
        state,
        city,
        micromarket,
        projectaddress,
        villagename,
        ctsno,
        documenttype,
        deedsubcategory,
        dhcfeesordocumenthandlingcharges,
        levy,
        chargeable_area,
        compensation,
        carpetarea,
        selleraddress,
        sellerpincode,
        sellerage,
        buyerpincode,
        buyerage,
        cinseller,
        cinbuyer,
        cinsellercompanytype,
        cinbuyercompanytype
      FROM tbl_maharashtra_igr 
      WHERE projectreraid = ?
      ORDER BY registrationdate DESC
    `;

    const results = await query(sql, [reraId]);

    if (!results || results.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No related transactions found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: results
    });

  } catch (error) {
    console.error('Error fetching related transactions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch related transactions' },
      { status: 500 }
    );
  }
} 