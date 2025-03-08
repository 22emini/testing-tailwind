import Contact from "../../(models)/Contact";
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";

export const maxDuration = 60; // Set maximum duration to 60 seconds (Vercel Hobby plan limit)

export async function GET() {
    try {
        await dbConnect();
        // Only fetch necessary fields and limit the number of results if needed
        const contacts = await Contact.find({})
            .select('name email phone createdAt')
            .sort({ createdAt: -1 })
            .limit(100)  // Add a reasonable limit to prevent timeout
            .lean()  // Convert to plain JavaScript objects
            .exec();
        
        return NextResponse.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch contacts' },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        await dbConnect();
        
        const body = await req.json();
        console.log('Received request body:', body);
        
        const contactData = body;
        
        if (!contactData) {
            return NextResponse.json(
                { error: 'No contact data provided' },
                { status: 400 }
            );
        }

        const requiredFields = ['name', 'phone', 'email'];
        const missingFields = requiredFields.filter(field => !contactData[field]);
        
        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: `Missing required fields: ${missingFields.join(', ')}` },
                { status: 400 }
            );
        }

        const contact = await Contact.create(contactData);

        return NextResponse.json(
            { message: "Contact created", contact },
            { status: 201 }
        );
    } catch (err) {
        console.error('Error in API route:', err);
        return NextResponse.json(
            { error: 'Failed to create contact' },
            { status: 500 }
        );
    }
}
