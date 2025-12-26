import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section about-section">
      <div class="container">
        <div class="about-grid">
          <!-- Profile Image -->
          <div class="profile-container fade-in-up">
            <div class="profile-card glass-card">
              <div class="profile-image-wrapper">
                <div class="profile-image">
                  <img src="assets/images/profile.jpeg" alt="MD. Zubair Alam" class="profile-photo">
                </div>
                <div class="status-indicator"></div>
              </div>
            </div>
          </div>

          <!-- About Content -->
          <div class="about-content fade-in-up">
            <div class="glass-card">
              <div class="greeting">
                <span class="wave">👋</span>
                <h3>Hello, I'm</h3>
              </div>
              <h1 class="name gradient-text">MD. Zubair Alam</h1>
              <h2 class="title">Software Engineer | .NET</h2>
              <p class="description">
                Software Engineer with <strong>5+ years of experience</strong> specializing in .NET backend
                development and fintech solutions. Expertise in developing scalable systems, integrating
                payment gateways, and implementing secure APIs for high-traffic applications.
              </p>
              <p class="description">
                Strong track record of leading cross-functional teams and delivering mission-critical
                financial applications. Passionate about clean architecture, microservices, and building
                robust enterprise solutions that drive business value.
              </p>

              <div class="highlights">
                <div class="highlight-item">
                  <span class="highlight-number gradient-text">5+</span>
                  <span class="highlight-label">Years Experience</span>
                </div>
                <div class="highlight-item">
                  <span class="highlight-number gradient-text">20+</span>
                  <span class="highlight-label">API Integrations</span>
                </div>
                <div class="highlight-item">
                  <span class="highlight-number gradient-text">40%</span>
                  <span class="highlight-label">Performance Boost</span>
                </div>
              </div>

              <div class="cta-buttons">
                <a href="#projects" class="btn-gradient">View My Work</a>
                <a href="#experience" class="btn-glass">Download Resume</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-section {
      padding-top: 100px;
    }

    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 3rem;
      align-items: center;
    }

    .profile-card {
      padding: 2rem;
      display: flex;
      justify-content: center;
    }

    .profile-image-wrapper {
      position: relative;
    }

    .profile-image {
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: var(--accent-gradient);
      padding: 8px;
      animation: float 6s ease-in-out infinite;
      overflow: hidden;
    }

    .profile-photo {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
      display: block;
    }

    .profile-placeholder {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: var(--dark-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .status-indicator {
      position: absolute;
      bottom: 20px;
      right: 20px;
      width: 24px;
      height: 24px;
      background: #4ade80;
      border-radius: 50%;
      border: 4px solid var(--dark-bg);
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .about-content {
      animation-delay: 0.2s;
    }

    .greeting {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .wave {
      font-size: 2rem;
      animation: wave 2s ease-in-out infinite;
      display: inline-block;
      transform-origin: 70% 70%;
    }

    @keyframes wave {
      0%, 100% { transform: rotate(0deg); }
      10%, 30% { transform: rotate(14deg); }
      20% { transform: rotate(-8deg); }
      40%, 60% { transform: rotate(0deg); }
    }

    .greeting h3 {
      font-size: 1.25rem;
      font-weight: 400;
      color: var(--text-secondary);
    }

    .name {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      font-family: 'Space Grotesk', sans-serif;
    }

    .title {
      font-size: 1.75rem;
      font-weight: 500;
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
    }

    .description {
      font-size: 1.1rem;
      line-height: 1.8;
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
    }

    .description strong {
      color: var(--text-primary);
      font-weight: 600;
    }

    .highlights {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin: 2rem 0;
      padding: 2rem 0;
      border-top: 1px solid var(--glass-border);
      border-bottom: 1px solid var(--glass-border);
    }

    .highlight-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .highlight-number {
      font-size: 2.5rem;
      font-weight: 700;
      font-family: 'Space Grotesk', sans-serif;
    }

    .highlight-label {
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-top: 0.5rem;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    /* Responsive */
    @media (max-width: 968px) {
      .about-grid {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .profile-image {
        width: 250px;
        height: 250px;
      }

      .profile-photo {
        width: 100%;
        height: 100%;
      }

      .name {
        font-size: 2.5rem;
      }

      .highlights {
        gap: 1rem;
      }

      .cta-buttons {
        justify-content: center;
        flex-wrap: wrap;
      }
    }

    @media (max-width: 640px) {
      .profile-image {
        width: 200px;
        height: 200px;
      }

      .profile-photo {
        width: 100%;
        height: 100%;
      }

      .name {
        font-size: 2rem;
      }

      .title {
        font-size: 1.25rem;
      }

      .highlights {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }
  `]
})
export class AboutComponent {}
