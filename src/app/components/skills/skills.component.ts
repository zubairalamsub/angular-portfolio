import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  level: number;
  category: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section skills-section">
      <div class="container">
        <div class="section-header fade-in-up">
          <h2 class="section-title">
            <span class="gradient-text">Skills & Technologies</span>
          </h2>
          <p class="section-subtitle">
            Tools and technologies I work with to build amazing applications
          </p>
        </div>

        <div class="skills-grid">
          <!-- Frontend Skills -->
          <div class="skill-category glass-card fade-in-up">
            <div class="category-header">
              <div class="category-icon">🎨</div>
              <h3 class="category-title">Frontend Development</h3>
            </div>
            <div class="skills-list">
              <div *ngFor="let skill of frontendSkills" class="skill-item">
                <div class="skill-info">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-percent">{{ skill.level }}%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" [style.width.%]="skill.level"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Backend Skills -->
          <div class="skill-category glass-card fade-in-up" style="animation-delay: 0.1s">
            <div class="category-header">
              <div class="category-icon">⚙️</div>
              <h3 class="category-title">Backend Development</h3>
            </div>
            <div class="skills-list">
              <div *ngFor="let skill of backendSkills" class="skill-item">
                <div class="skill-info">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-percent">{{ skill.level }}%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" [style.width.%]="skill.level"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- DevOps & Tools -->
          <div class="skill-category glass-card fade-in-up" style="animation-delay: 0.2s">
            <div class="category-header">
              <div class="category-icon">🚀</div>
              <h3 class="category-title">DevOps & Tools</h3>
            </div>
            <div class="skills-list">
              <div *ngFor="let skill of devopsSkills" class="skill-item">
                <div class="skill-info">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-percent">{{ skill.level }}%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" [style.width.%]="skill.level"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Database & Other -->
          <div class="skill-category glass-card fade-in-up" style="animation-delay: 0.3s">
            <div class="category-header">
              <div class="category-icon">💾</div>
              <h3 class="category-title">Database & Other</h3>
            </div>
            <div class="skills-list">
              <div *ngFor="let skill of databaseSkills" class="skill-item">
                <div class="skill-info">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-percent">{{ skill.level }}%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" [style.width.%]="skill.level"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .skills-section {
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

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

    .skill-category {
      padding: 2rem;
    }

    .category-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .category-icon {
      font-size: 2.5rem;
      filter: drop-shadow(0 0 10px rgba(79, 172, 254, 0.5));
    }

    .category-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .skills-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .skill-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .skill-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .skill-name {
      font-weight: 500;
      color: var(--text-primary);
    }

    .skill-percent {
      font-weight: 600;
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    .skill-bar {
      height: 8px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      overflow: hidden;
      position: relative;
    }

    .skill-progress {
      height: 100%;
      background: var(--accent-gradient);
      border-radius: 10px;
      transition: width 1s ease-out;
      box-shadow: 0 0 10px rgba(79, 172, 254, 0.5);
    }

    /* Responsive */
    @media (max-width: 968px) {
      .skills-grid {
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

      .category-icon {
        font-size: 2rem;
      }

      .category-title {
        font-size: 1.25rem;
      }
    }
  `]
})
export class SkillsComponent {
  frontendSkills: Skill[] = [
    { name: 'Angular', level: 88, category: 'frontend' },
    { name: 'AngularJS', level: 85, category: 'frontend' },
    { name: 'JavaScript', level: 90, category: 'frontend' },
    { name: 'jQuery', level: 82, category: 'frontend' },
    { name: 'ASP.NET WebForms', level: 85, category: 'frontend' },
    { name: 'HTML/CSS', level: 88, category: 'frontend' }
  ];

  backendSkills: Skill[] = [
    { name: 'C# / .NET', level: 92, category: 'backend' },
    { name: 'ASP.NET Core', level: 90, category: 'backend' },
    { name: 'ASP.NET MVC', level: 88, category: 'backend' },
    { name: 'Entity Framework', level: 87, category: 'backend' },
    { name: 'RESTful APIs', level: 90, category: 'backend' },
    { name: 'Microservices', level: 85, category: 'backend' }
  ];

  devopsSkills: Skill[] = [
    { name: 'Azure', level: 82, category: 'devops' },
    { name: 'Docker', level: 78, category: 'devops' },
    { name: 'CI/CD Pipelines', level: 80, category: 'devops' },
    { name: 'Git (GitHub/Bitbucket)', level: 88, category: 'devops' },
    { name: 'RabbitMQ', level: 75, category: 'devops' }
  ];

  databaseSkills: Skill[] = [
    { name: 'SQL Server', level: 92, category: 'database' },
    { name: 'PostgreSQL', level: 85, category: 'database' },
    { name: 'LINQ', level: 88, category: 'database' },
    { name: 'ADO.NET / Dapper', level: 85, category: 'database' },
    { name: 'Redis', level: 78, category: 'database' },
    { name: 'Elasticsearch', level: 75, category: 'database' }
  ];
}
