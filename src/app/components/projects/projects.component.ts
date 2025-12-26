import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link?: string;
  github?: string;
  featured: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section projects-section">
      <div class="container">
        <div class="section-header fade-in-up">
          <h2 class="section-title">
            <span class="gradient-text">Featured Projects</span>
          </h2>
          <p class="section-subtitle">
            A showcase of my recent work and personal projects
          </p>
        </div>

        <div class="projects-grid">
          <div *ngFor="let project of projects; let i = index"
               class="project-card glass-card fade-in-up"
               [style.animation-delay]="(i * 0.1) + 's'">
            <div class="project-image">
              <div class="project-placeholder">
                <span class="project-icon">{{ getProjectIcon(i) }}</span>
              </div>
              <div *ngIf="project.featured" class="featured-badge">
                ⭐ Featured
              </div>
            </div>

            <div class="project-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>

              <div class="project-tech">
                <span *ngFor="let tech of project.technologies" class="tech-tag">
                  {{ tech }}
                </span>
              </div>

              <div class="project-links">
                <a *ngIf="project.link" [href]="project.link" target="_blank" class="project-link">
                  <span>Live Demo</span>
                  <span class="link-icon">→</span>
                </a>
                <a *ngIf="project.github" [href]="project.github" target="_blank" class="project-link">
                  <span>GitHub</span>
                  <span class="link-icon">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects-section {
      background: transparent;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
      font-family: 'Space Grotesk', sans-serif;
    }

    .section-subtitle {
      font-size: 1.1rem;
      color: var(--text-secondary);
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .project-card {
      padding: 0;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
    }

    .project-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 60px 0 var(--shadow-color);
    }

    .project-image {
      position: relative;
      width: 100%;
      height: 250px;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .project-placeholder {
      font-size: 5rem;
      opacity: 0.6;
    }

    .project-icon {
      filter: drop-shadow(0 0 20px rgba(79, 172, 254, 0.5));
    }

    .featured-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: var(--accent-gradient);
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
    }

    .project-content {
      padding: 2rem;
    }

    .project-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }

    .project-description {
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .tech-tag {
      background: rgba(79, 172, 254, 0.2);
      color: var(--text-primary);
      padding: 0.4rem 0.8rem;
      border-radius: 15px;
      font-size: 0.85rem;
      font-weight: 500;
      border: 1px solid rgba(79, 172, 254, 0.3);
    }

    .project-links {
      display: flex;
      gap: 1rem;
    }

    .project-link {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--glass-border);
      border-radius: 10px;
      color: var(--text-primary);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .project-link:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(79, 172, 254, 0.5);
      transform: translateX(5px);
    }

    .link-icon {
      font-size: 1.2rem;
      transition: transform 0.3s ease;
    }

    .project-link:hover .link-icon {
      transform: translateX(3px);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }

      .section-title {
        font-size: 2.5rem;
      }
    }

    @media (max-width: 640px) {
      .section-title {
        font-size: 2rem;
      }

      .project-links {
        flex-direction: column;
      }
    }
  `]
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'RemitNgo Money Transfer Application',
      description: 'Leading backend development for RemitNgo money transfer app with customer onboarding, KYC verification, open banking, and liveness checks. Integration with 15+ third-party services for secure global transactions.',
      technologies: ['.NET 8', 'SQL Server', 'RESTful APIs', 'OAuth 2.0'],
      featured: true
    },
    {
      title: 'Agency Portal with Payment Gateway',
      description: 'Developed Agency Portal backend with integrated payment gateways, reducing transaction processing time by 40%. Handles secure payment processing and real-time transaction tracking.',
      technologies: ['ASP.NET Core', 'SQL Server', 'Payment APIs', 'JWT'],
      featured: true
    },
    {
      title: 'ERP System for UK Agencies',
      description: 'Developed and maintained comprehensive ERP systems for UK-based agencies. Integrated 20+ third-party APIs including banking services. Managed large-scale PEP and sanction screening for regulatory compliance.',
      technologies: ['ASP.NET WebForms', 'SQL Server', 'Hangfire', 'API Integration'],
      featured: true
    },
    {
      title: 'Merchant Payment Processing System',
      description: 'Automated payment processing for 2,000+ merchants integrating bKash and banking APIs. Processing BDT 10M+ monthly with real-time transaction tracking and reconciliation.',
      technologies: ['ASP.NET MVC', 'SQL Server', 'bKash API', 'Banking APIs'],
      featured: false
    },
    {
      title: 'Online Examination System',
      description: 'Comprehensive online examination platform with secure test delivery, automatic grading, and detailed analytics. Built with modern web technologies for scalability.',
      technologies: ['.NET Core', 'SQL Server', 'AngularJS', 'Entity Framework'],
      github: 'https://github.com/zubairalamsub',
      featured: false
    },
    {
      title: 'Online Attendance System',
      description: 'Automated attendance management system with real-time tracking, reporting, and integration capabilities. Streamlined workforce management for organizations.',
      technologies: ['ASP.NET WebForms', 'SQL Server', 'Crystal Reports', 'ADO.NET'],
      github: 'https://github.com/zubairalamsub',
      featured: false
    }
  ];

  getProjectIcon(index: number): string {
    const icons = ['💸', '💳', '🏢', '💰', '📝', '👥'];
    return icons[index] || '💼';
  }
}
