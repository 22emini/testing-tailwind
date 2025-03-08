import Contact from "../../(models)/Contact";
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";

export async function GET() {
    try {
        await dbConnect();
        const contacts = await Contact.find({}).sort({ createdAt: -1 });
        return NextResponse.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        // Connect to the database
        await dbConnect();
        
        const body = await req.json();
        console.log('Received request body:', body); // Debug log
        
        // Remove the formData nesting since we're sending the data directly
        const contactData = body;
        console.log('Contact data:', contactData); // Debug log
        
        if (!contactData) {
            throw new Error('No contact data provided');
        }

        // Ensure all required fields are present
        const requiredFields = ['name', 'phone', 'email'];
        const missingFields = requiredFields.filter(field => !contactData[field]);
        
        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        const contact = await Contact.create(contactData);
        console.log('Created contact:', contact); // Debug log

        return NextResponse.json(
            { message: "Contact created", contact },
            { status: 201 }
        );
    } catch (err) {
        console.error('Error in API route:', err);
        return NextResponse.json(
            { 
                error: err.message,
                details: err.toString()
            },
            { status: 500 }
        );
    }
}
