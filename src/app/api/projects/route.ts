import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for demo purposes
// In production, you'd use a database like PostgreSQL, MongoDB, etc.
const projects: Record<string, any[]> = {};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('userEmail');

    if (!userEmail) {
      return NextResponse.json(
        { error: 'User email is required' },
        { status: 400 }
      );
    }

    // Get user's projects
    const userProjects = projects[userEmail] || [];
    
    return NextResponse.json({
      success: true,
      projects: userProjects
    });

  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('📥 POST /api/projects - Request received');
    
    const body = await request.json();
    console.log('📝 Request body:', body);
    
    const { userEmail, name, url } = body;

    if (!userEmail || !name || !url) {
      console.log('❌ Missing required fields:', { userEmail, name, url });
      return NextResponse.json(
        { error: 'User email, project name, and URL are required' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Initialize user's projects array if it doesn't exist
    if (!projects[userEmail]) {
      projects[userEmail] = [];
    }

    // Create new project
    const newProject = {
      id: Date.now().toString(),
      name,
      url,
      createdAt: new Date().toISOString(),
      lastAudit: null,
      score: 0,
      status: 'pending',
      issues: 0
    };

    // Add project to user's projects
    projects[userEmail].unshift(newProject);

    console.log('✅ Project added:', { userEmail, projectName: name, projectId: newProject.id });

    return NextResponse.json({
      success: true,
      project: newProject,
      message: 'Project added successfully'
    });

  } catch (error) {
    console.error('🚨 Error adding project:', error);
    return NextResponse.json(
      { error: 'Failed to add project' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('userEmail');
    const projectId = searchParams.get('projectId');

    if (!userEmail || !projectId) {
      return NextResponse.json(
        { error: 'User email and project ID are required' },
        { status: 400 }
      );
    }

    // Check if user exists and has projects
    if (!projects[userEmail]) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Find and remove the project
    const projectIndex = projects[userEmail].findIndex((p: any) => p.id === projectId);
    if (projectIndex === -1) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    const deletedProject = projects[userEmail].splice(projectIndex, 1)[0];

    console.log('✅ Project deleted:', { userEmail, projectName: deletedProject.name, projectId });

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
