import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  current: boolean;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section experience-section">
      <div class="container">
        <div class="section-header fade-in-up">
          <h2 class="section-title">
            <span class="gradient-text">Work Experience</span>
          </h2>
          <p class="section-subtitle">
            My professional journey and career highlights
          </p>
        </div>

        <div class="experience-content">
          <!-- Timeline -->
          <div class="timeline">
            <div *ngFor="let exp of experiences; let i = index"
                 class="timeline-item fade-in-up"
                 [style.animation-delay]="(i * 0.1) + 's'">
              <div class="timeline-marker">
                <div class="marker-dot" [class.current]="exp.current"></div>
                <div class="marker-line" *ngIf="i < experiences.length - 1"></div>
              </div>

              <div class="timeline-content glass-card">
                <div class="experience-header">
                  <div>
                    <h3 class="experience-title">{{ exp.title }}</h3>
                    <p class="experience-company">{{ exp.company }}</p>
                  </div>
                  <div class="experience-period">
                    <span class="period-badge" [class.current-badge]="exp.current">
                      {{ exp.period }}
                    </span>
                  </div>
                </div>

                <ul class="experience-description">
                  <li *ngFor="let point of exp.description">{{ point }}</li>
                </ul>

                <div *ngIf="exp.current" class="current-indicator">
                  <span class="pulse-dot"></span>
                  Currently Working Here
                </div>
              </div>
            </div>
          </div>

          <!-- Resume Download Section -->
          <div class="resume-section fade-in-up" style="animation-delay: 0.4s">
            <div class="glass-card resume-card">
              <div class="resume-icon">📄</div>
              <h3 class="resume-title">Download Full Resume</h3>
              <p class="resume-description">
                Get my complete resume with detailed work history, education, and certifications
              </p>
              <a href="assets/Md_Zubair_Alam(5yrs).pdf" download class="btn-gradient download-btn">
                <span>Download Resume</span>
                <span class="download-icon">⬇</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .experience-section {
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

    .experience-content {
      max-width: 900px;
      margin: 0 auto;
    }

    .timeline {
      position: relative;
      padding: 2rem 0;
    }

    .timeline-item {
      display: grid;
      grid-template-columns: 40px 1fr;
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .timeline-item:last-child {
      margin-bottom: 0;
    }

    .timeline-marker {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }

    .marker-dot {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--accent-gradient);
      box-shadow: 0 0 20px rgba(79, 172, 254, 0.6);
      position: relative;
      z-index: 2;
    }

    .marker-dot.current {
      width: 24px;
      height: 24px;
      animation: pulse-ring 2s ease-out infinite;
    }

    @keyframes pulse-ring {
      0% {
        box-shadow: 0 0 0 0 rgba(79, 172, 254, 0.7);
      }
      70% {
        box-shadow: 0 0 0 15px rgba(79, 172, 254, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(79, 172, 254, 0);
      }
    }

    .marker-line {
      width: 2px;
      flex: 1;
      background: linear-gradient(180deg,
        rgba(79, 172, 254, 0.5),
        rgba(79, 172, 254, 0.1));
      margin-top: 0.5rem;
    }

    .timeline-content {
      padding: 2rem;
    }

    .experience-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.5rem;
      gap: 1rem;
    }

    .experience-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .experience-company {
      font-size: 1.1rem;
      color: var(--text-secondary);
      font-weight: 500;
    }

    .experience-period {
      flex-shrink: 0;
    }

    .period-badge {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid var(--glass-border);
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--text-secondary);
    }

    .period-badge.current-badge {
      background: var(--accent-gradient);
      color: var(--text-primary);
      border-color: transparent;
    }

    .experience-description {
      list-style: none;
      padding-left: 0;
    }

    .experience-description li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.75rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .experience-description li::before {
      content: '▹';
      position: absolute;
      left: 0;
      color: #4facfe;
      font-weight: bold;
    }

    .current-indicator {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--glass-border);
      color: #4ade80;
      font-weight: 500;
      font-size: 0.9rem;
    }

    .pulse-dot {
      width: 10px;
      height: 10px;
      background: #4ade80;
      border-radius: 50%;
      animation: pulse 2s ease-in-out infinite;
    }

    .resume-section {
      margin-top: 4rem;
    }

    .resume-card {
      text-align: center;
      padding: 3rem 2rem;
    }

    .resume-icon {
      font-size: 4rem;
      margin-bottom: 1.5rem;
      filter: drop-shadow(0 0 20px rgba(79, 172, 254, 0.5));
    }

    .resume-title {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }

    .resume-description {
      color: var(--text-secondary);
      margin-bottom: 2rem;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }

    .download-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.1rem;
    }

    .download-icon {
      font-size: 1.2rem;
      transition: transform 0.3s ease;
    }

    .download-btn:hover .download-icon {
      transform: translateY(3px);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .section-title {
        font-size: 2.5rem;
      }

      .timeline-item {
        grid-template-columns: 30px 1fr;
        gap: 1rem;
      }

      .experience-header {
        flex-direction: column;
      }

      .experience-title {
        font-size: 1.25rem;
      }

      .resume-card {
        padding: 2rem 1.5rem;
      }

      .resume-title {
        font-size: 1.5rem;
      }
    }

    @media (max-width: 640px) {
      .section-title {
        font-size: 2rem;
      }
    }
  `]
})
export class ExperienceComponent {
  experiences: Experience[] = [
    {
      title: 'Senior Software Engineer',
      company: 'BRAC Saajan Exchange Limited',
      period: 'Jan 2025 - Present',
      description: [
        'Lead backend development for RemitNgo money transfer application using .NET 8 and SQL Server',
        'Implement customer onboarding, KYC verification, open banking, and liveness checks',
        'Design RESTful APIs for integration with 15+ third-party services for secure global transactions',
        'Collaborate with global partners to ensure successful API integrations and resolve technical challenges',
        'Develop Agency Portal backend with integrated payment gateways, reducing transaction processing time by 40%',
        'Mentor developers on coding standards, best practices, and architectural patterns'
      ],
      current: true
    },
    {
      title: 'Software Engineer',
      company: 'BRAC Saajan Exchange Limited',
      period: 'Dec 2022 - Dec 2024',
      description: [
        'Developed and maintained ERP systems for UK-based agencies using ASP.NET WebForms',
        'Integrated 20+ third-party APIs including banking services to enhance system functionality',
        'Managed large-scale data processing for PEP and sanction screening ensuring regulatory compliance',
        'Implemented process automation using Hangfire, reducing manual workload by 40%',
        'Optimized SQL queries, stored procedures, and triggers to enhance database performance'
      ],
      current: false
    },
    {
      title: 'Software Engineer',
      company: 'Ajkerdeal.com',
      period: 'Dec 2019 - Nov 2022',
      description: [
        'Enhanced accounting system using ASP.NET MVC and SQL Server, reducing month-end closing time',
        'Automated payment processing for 2,000+ merchants integrating bKash and banking APIs, processing BDT 10M+ monthly',
        'Built RESTful APIs for mobile and web applications with third-party service integrations',
        'Developed admin portal using ASP.NET WebForms, AngularJS, and SQL Server',
        'Created reports using SQL Server and Crystal Reports for business insights'
      ],
      current: false
    },
    {
      title: 'Software Engineer (Intern)',
      company: 'Bdecom IT Limited',
      period: 'Apr 2019 - Sep 2019',
      description: [
        'Contributed to ERP project development by implementing new features using ASP.NET',
        'Developed SQL queries and stored procedures to enhance data management',
        'Gained hands-on experience in full software development lifecycle'
      ],
      current: false
    }
  ];
}
