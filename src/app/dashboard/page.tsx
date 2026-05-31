"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Plus, 
  Globe, 
  Search, 
  BarChart3, 
  Settings, 
  Trash2,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { isLoggedIn, logout, getUserEmail } from '@/lib/auth';

interface Project {
  id: string;
  name: string;
  url: string;
  lastAudit: string;
  score: number;
  status: 'healthy' | 'warning' | 'critical';
  issues: number;
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProjectUrl, setNewProjectUrl] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [isAddingProject, setIsAddingProject] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.href = '/login';
      return;
    }
    
    // Load user's projects
    loadProjects();
  }, []);

  // Debug: Track projects state changes
  useEffect(() => {
    console.log('🔄 Projects state changed:', projects);
  }, [projects]);

  const loadProjects = async () => {
    try {
      const userEmail = getUserEmail();
      if (!userEmail) {
        console.error('No user email found');
        return;
      }

      const response = await fetch(`/api/projects?userEmail=${encodeURIComponent(userEmail)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      
      if (data.success) {
        setProjects(data.projects || []);
      } else {
        console.error('API returned error:', data.error);
      }
    } catch (error) {
      console.error('Failed to load projects:', error);
      // Fallback to empty array if API fails
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProject = async () => {
    if (!newProjectUrl.trim() || !newProjectName.trim()) return;
    
    setIsAddingProject(true);
    
    try {
      const userEmail = getUserEmail();
      if (!userEmail) {
        throw new Error('User not logged in');
      }

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail,
          name: newProjectName,
          url: newProjectUrl
        }),
      });

      console.log('📡 API Response status:', response.status);
      console.log('📡 API Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('❌ Error response text:', errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: errorText || 'Failed to add project' };
        }
        
        throw new Error(errorData.error || 'Failed to add project');
      }

      const responseText = await response.text();
      console.log('✅ Response text:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ JSON parse error:', parseError);
        throw new Error('Invalid response from server');
      }
      
      if (data.success) {
        // Add the new project to the local state
        const newProject = {
          ...data.project,
          lastAudit: 'Just now',
          score: 0,
          status: 'healthy' as const,
          issues: 0
        };
        
        console.log('🆕 Adding project to state:', newProject);
        console.log('📋 Current projects before adding:', projects);
        
        setProjects([newProject, ...projects]);
        setNewProjectUrl('');
        setNewProjectName('');
        setShowAddProject(false);
        
        console.log('✅ Project saved successfully:', data.project);
        console.log('📋 Projects after adding:', [newProject, ...projects]);
        
        // Trigger initial audit after a short delay
        setTimeout(() => {
          console.log('🔍 Starting audit for project:', newProject.id);
          runAudit(newProject.id);
        }, 1000);
      } else {
        throw new Error(data.error || 'Failed to add project');
      }
    } catch (error) {
      console.error('Failed to add project:', error);
      alert(`Failed to add project: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsAddingProject(false);
    }
  };

  const runAudit = async (projectId: string) => {
    try {
      console.log('🔍 Running audit for project:', projectId);
      
      // Mock audit - replace with actual API call
      const scores = [85, 92, 78, 95, 88];
      const statuses: ('healthy' | 'warning' | 'critical')[] = ['healthy', 'warning', 'critical'];
      const randomScore = scores[Math.floor(Math.random() * scores.length)];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      console.log('📊 Audit results:', { score: randomScore, status: randomStatus });
      
      // Use functional update to avoid stale state
      setProjects(currentProjects => {
        console.log('📋 Current projects before audit (functional):', currentProjects);
        const updatedProjects = currentProjects.map(project => 
          project.id === projectId 
            ? { 
                ...project, 
                score: randomScore, 
                status: randomStatus,
                lastAudit: 'Just now',
                issues: Math.floor(Math.random() * 30)
              }
            : project
        );
        console.log('📋 Projects after audit (functional):', updatedProjects);
        return updatedProjects;
      });
    } catch (error) {
      console.error('Audit failed:', error);
      alert('Audit failed. Please try again.');
    }
  };

  const deleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const userEmail = getUserEmail();
      if (!userEmail) {
        throw new Error('User not logged in');
      }

      const response = await fetch(`/api/projects?userEmail=${encodeURIComponent(userEmail)}&projectId=${projectId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete project');
      }

      const data = await response.json();
      
      if (data.success) {
        // Remove project from local state
        setProjects(projects.filter(project => project.id !== projectId));
        console.log('✅ Project deleted successfully:', projectId);
      } else {
        throw new Error(data.error || 'Failed to delete project');
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
      alert(`Failed to delete project: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'critical':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800';
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-light">Your Projects</h1>
              <span className="text-sm text-muted-foreground">
                {projects.length} {projects.length === 1 ? 'project' : 'projects'}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowAddProject(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Add Project Modal */}
      {showAddProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <Card className="w-full max-w-md bg-card border-border">
            <div className="p-6">
              <h2 className="text-xl font-light mb-6">Add New Project</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Project Name</label>
                  <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:border-primary bg-background text-foreground"
                    placeholder="My Awesome Website"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Website URL</label>
                  <input
                    type="url"
                    value={newProjectUrl}
                    onChange={(e) => setNewProjectUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:border-primary bg-background text-foreground"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={handleAddProject}
                  disabled={!newProjectUrl.trim() || !newProjectName.trim() || isAddingProject}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isAddingProject ? 'Adding...' : 'Add Project'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAddProject(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {projects.length === 0 ? (
          // Empty State
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-primary" />
            </div>
            
            <h2 className="text-2xl font-light mb-4">No projects yet</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Add your first website to start monitoring its health and performance with WebKit.
            </p>
            
            <Button
              onClick={() => setShowAddProject(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Project
            </Button>
          </div>
        ) : (
          // Projects Grid
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="bg-card border-border hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-lg mb-1 truncate">{project.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Globe className="w-3 h-3" />
                        <span className="truncate">{project.url}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(project.url, '_blank')}
                        className="h-8 w-8 p-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteProject(project.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    {getStatusIcon(project.status)}
                    <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(project.status)}`}>
                      {project.status === 'healthy' ? 'Healthy' : project.status === 'warning' ? 'Needs Attention' : 'Critical Issues'}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Health Score</span>
                      <span className={`text-lg font-bold ${getScoreColor(project.score)}`}>
                        {project.score}
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          project.score >= 80 ? 'bg-green-500' : 
                          project.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${project.score}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Issues</div>
                      <div className="font-medium">{project.issues}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Last Audit</div>
                      <div className="font-medium">{project.lastAudit}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => runAudit(project.id)}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Search className="w-3 h-3 mr-1" />
                      Run Audit
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <BarChart3 className="w-3 h-3 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
