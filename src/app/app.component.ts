import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    ChatbotComponent
  ],
  template: `
    <div class="portfolio-wrapper">
      <!-- Navigation -->
      <nav class="navbar">
        <div class="container">
          <div class="nav-content glass-card">
            <div class="logo">
              <span class="gradient-text">MD. Zubair Alam</span>
            </div>
            <ul class="nav-links">
              <li><a href="#about" class="nav-link">About</a></li>
              <li><a href="#skills" class="nav-link">Skills</a></li>
              <li><a href="#projects" class="nav-link">Projects</a></li>
              <li><a href="#experience" class="nav-link">Experience</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- Sections -->
      <app-about id="about"></app-about>
      <app-skills id="skills"></app-skills>
      <app-projects id="projects"></app-projects>
      <app-experience id="experience"></app-experience>

      <!-- Footer -->
      <footer class="footer">
        <div class="container">
          <div class="footer-content glass-card">
            <p>&copy; 2025 MD. Zubair Alam. Built with Angular & Glassmorphism</p>
            <div class="social-links">
              <a href="https://github.com/zubairalamsub" target="_blank" class="social-link">GitHub</a>
              <a href="https://linkedin.com/in/zubairalamdev" target="_blank" class="social-link">LinkedIn</a>
              <a href="https://leetcode.com/zubairalam025" target="_blank" class="social-link">LeetCode</a>
              <a href="mailto:Zubairalam025@gmail.com" class="social-link">Email</a>
            </div>
          </div>
        </div>
      </footer>

      <!-- AI Chatbot -->
      <app-chatbot></app-chatbot>
    </div>
  `,
  styles: [`
    .portfolio-wrapper {
      position: relative;
    }

    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      padding: 1rem 0;
      z-index: 1000;
      backdrop-filter: blur(10px);
    }

    .nav-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      font-family: 'Space Grotesk', sans-serif;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;
    }

    .nav-link {
      color: var(--text-secondary);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      position: relative;
    }

    .nav-link:hover {
      color: var(--text-primary);
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--accent-gradient);
      transition: width 0.3s ease;
    }

    .nav-link:hover::after {
      width: 100%;
    }

    .footer {
      padding: 2rem 0;
      margin-top: 4rem;
    }

    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2rem;
    }

    .footer-content p {
      color: var(--text-secondary);
    }

    .social-links {
      display: flex;
      gap: 1.5rem;
    }

    .social-link {
      color: var(--text-secondary);
      text-decoration: none;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .social-link:hover {
      color: var(--text-primary);
      transform: translateY(-2px);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .nav-content {
        flex-direction: column;
        gap: 1rem;
      }

      .nav-links {
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
      }

      .footer-content {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }
  `]
})
export class AppComponent {
  title = 'Zubair Alam Portfolio';
}
