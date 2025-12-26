import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chatbot-container">
      <!-- Floating Chat Button -->
      <button
        class="chat-toggle-btn glass-card"
        (click)="toggleChat()"
        [class.active]="isOpen">
        <span class="chat-icon" *ngIf="!isOpen">💬</span>
        <span class="close-icon" *ngIf="isOpen">✕</span>
        <span class="notification-badge" *ngIf="!isOpen && hasUnreadMessages">1</span>
      </button>

      <!-- Chat Window -->
      <div class="chat-window glass-card" [class.open]="isOpen">
        <!-- Chat Header -->
        <div class="chat-header">
          <div class="bot-info">
            <div class="bot-avatar">🤖</div>
            <div class="bot-details">
              <h3>Portfolio Assistant</h3>
              <p class="status">
                <span class="status-dot"></span>
                Online
              </p>
            </div>
          </div>
          <button class="minimize-btn" (click)="toggleChat()">−</button>
        </div>

        <!-- Chat Messages -->
        <div class="chat-messages" #messagesContainer>
          <div *ngFor="let message of messages"
               class="message-wrapper"
               [class.user-message]="message.isUser"
               [class.bot-message]="!message.isUser">
            <div class="message">
              <div class="message-avatar" *ngIf="!message.isUser">🤖</div>
              <div class="message-content">
                <p>{{ message.text }}</p>
                <span class="message-time">{{ formatTime(message.timestamp) }}</span>
              </div>
              <div class="message-avatar" *ngIf="message.isUser">👤</div>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div class="typing-indicator" *ngIf="isTyping">
            <div class="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions" *ngIf="messages.length === 1">
          <button
            *ngFor="let action of quickActions"
            class="quick-action-btn"
            (click)="sendQuickAction(action)">
            {{ action }}
          </button>
        </div>

        <!-- Chat Input -->
        <div class="chat-input-container">
          <input
            type="text"
            class="chat-input"
            [(ngModel)]="userInput"
            (keyup.enter)="sendMessage()"
            placeholder="Ask me anything about Zubair..."
            [disabled]="isTyping">
          <button
            class="send-btn"
            (click)="sendMessage()"
            [disabled]="!userInput.trim() || isTyping">
            <span class="send-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chatbot-container {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 9999;
    }

    .chat-toggle-btn {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      transition: all 0.3s ease;
      position: relative;
      box-shadow: 0 4px 20px rgba(79, 172, 254, 0.4);
    }

    .chat-toggle-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 30px rgba(79, 172, 254, 0.6);
    }

    .chat-toggle-btn.active {
      background: var(--accent-gradient);
    }

    .notification-badge {
      position: absolute;
      top: 5px;
      right: 5px;
      background: #ef4444;
      color: white;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
    }

    .chat-window {
      position: fixed;
      bottom: 100px;
      right: 2rem;
      width: 380px;
      height: 550px;
      display: flex;
      flex-direction: column;
      transform: scale(0);
      transform-origin: bottom right;
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
    }

    .chat-window.open {
      transform: scale(1);
      opacity: 1;
    }

    .chat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem;
      border-bottom: 1px solid var(--glass-border);
      background: rgba(255, 255, 255, 0.05);
    }

    .bot-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .bot-avatar {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: var(--accent-gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    .bot-details h3 {
      margin: 0;
      font-size: 1rem;
      color: var(--text-primary);
      font-weight: 600;
    }

    .status {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0;
      font-size: 0.85rem;
      color: var(--text-secondary);
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #4ade80;
      animation: pulse 2s ease-in-out infinite;
    }

    .minimize-btn {
      background: none;
      border: none;
      color: var(--text-secondary);
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.25rem 0.5rem;
      border-radius: 5px;
      transition: all 0.3s ease;
    }

    .minimize-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--text-primary);
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .chat-messages::-webkit-scrollbar {
      width: 6px;
    }

    .chat-messages::-webkit-scrollbar-thumb {
      background: var(--accent-gradient);
      border-radius: 10px;
    }

    .message-wrapper {
      display: flex;
      animation: fadeInUp 0.3s ease-out;
    }

    .message {
      display: flex;
      gap: 0.5rem;
      max-width: 85%;
    }

    .user-message {
      justify-content: flex-end;
    }

    .user-message .message {
      flex-direction: row-reverse;
    }

    .message-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--accent-gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      flex-shrink: 0;
    }

    .message-content {
      background: rgba(255, 255, 255, 0.1);
      padding: 0.75rem 1rem;
      border-radius: 15px;
      backdrop-filter: blur(10px);
    }

    .user-message .message-content {
      background: var(--accent-gradient);
    }

    .message-content p {
      margin: 0;
      color: var(--text-primary);
      line-height: 1.5;
      font-size: 0.95rem;
    }

    .message-time {
      display: block;
      font-size: 0.7rem;
      color: var(--text-muted);
      margin-top: 0.25rem;
    }

    .typing-indicator {
      display: flex;
      gap: 0.5rem;
      padding-left: 2.5rem;
    }

    .typing-dots {
      background: rgba(255, 255, 255, 0.1);
      padding: 0.75rem 1rem;
      border-radius: 15px;
      display: flex;
      gap: 0.3rem;
    }

    .typing-dots span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--text-secondary);
      animation: typing 1.4s infinite;
    }

    .typing-dots span:nth-child(2) {
      animation-delay: 0.2s;
    }

    .typing-dots span:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes typing {
      0%, 60%, 100% {
        transform: translateY(0);
        opacity: 0.7;
      }
      30% {
        transform: translateY(-10px);
        opacity: 1;
      }
    }

    .quick-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      padding: 0 1rem 1rem;
    }

    .quick-action-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--glass-border);
      color: var(--text-secondary);
      padding: 0.5rem 1rem;
      border-radius: 20px;
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.3s ease;
    }

    .quick-action-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--text-primary);
      border-color: rgba(79, 172, 254, 0.5);
    }

    .chat-input-container {
      display: flex;
      gap: 0.5rem;
      padding: 1rem;
      border-top: 1px solid var(--glass-border);
      background: rgba(255, 255, 255, 0.05);
    }

    .chat-input {
      flex: 1;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid var(--glass-border);
      border-radius: 25px;
      padding: 0.75rem 1rem;
      color: var(--text-primary);
      font-size: 0.95rem;
      outline: none;
      transition: all 0.3s ease;
    }

    .chat-input:focus {
      border-color: rgba(79, 172, 254, 0.5);
      background: rgba(255, 255, 255, 0.15);
    }

    .chat-input::placeholder {
      color: var(--text-muted);
    }

    .send-btn {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: var(--accent-gradient);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      font-size: 1.5rem;
      color: white;
    }

    .send-btn:hover:not(:disabled) {
      transform: scale(1.1);
      box-shadow: 0 4px 15px rgba(79, 172, 254, 0.5);
    }

    .send-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Mobile Responsive */
    @media (max-width: 480px) {
      .chatbot-container {
        bottom: 1rem;
        right: 1rem;
      }

      .chat-window {
        width: calc(100vw - 2rem);
        right: 1rem;
        height: 500px;
      }

      .chat-toggle-btn {
        width: 55px;
        height: 55px;
      }
    }
  `]
})
export class ChatbotComponent {
  private http = inject(HttpClient);

  isOpen = false;
  messages: Message[] = [];
  userInput = '';
  isTyping = false;
  hasUnreadMessages = true;
  useAI = false; // Will be true if API key is valid

  quickActions = [
    'View Skills',
    'View Projects',
    'Contact Info',
    'Download Resume'
  ];

  knowledgeBase: {[key: string]: string} = {
    'skills': 'Zubair is a Software Engineer with 5+ years of experience specializing in .NET backend development. His core skills include C#, ASP.NET Core, ASP.NET MVC, Entity Framework, SQL Server, PostgreSQL, Angular, JavaScript, Azure, Docker, and microservices architecture.',

    'projects': 'Zubair has worked on several major projects including:\n\n1. RemitNgo Money Transfer App - Leading backend development with .NET 8\n2. Agency Portal with Payment Gateway - Reduced transaction time by 40%\n3. ERP System for UK Agencies - Integrated 20+ APIs\n4. Merchant Payment Processing - Handling BDT 10M+ monthly\n5. Online Examination System - Built with .NET Core\n6. Online Attendance System - ASP.NET WebForms',

    'experience': 'Zubair currently works as a Senior Software Engineer at BRAC Saajan Exchange Limited (since Jan 2025). Previously, he worked as a Software Engineer at BRAC Saajan Exchange (Dec 2022 - Dec 2024), at Ajkerdeal.com (Dec 2019 - Nov 2022), and as an intern at Bdecom IT Limited (Apr 2019 - Sep 2019).',

    'contact': 'You can reach Zubair at:\n\n📧 Email: Zubairalam025@gmail.com\n📱 Phone: +880 1741 605193\n💻 GitHub: github.com/zubairalamsub\n🔗 LinkedIn: linkedin.com/in/zubairalamdev\n🏆 LeetCode: leetcode.com/zubairalam025\n📍 Location: Badda, Dhaka, Bangladesh',

    'education': 'Zubair holds a Bachelor of Science in Computer Science and Engineering from Stamford University Bangladesh (2019) with a CGPA of 3.34/4.00.',

    'fintech': 'Zubair specializes in fintech solutions with expertise in payment gateway integrations, secure API development for financial applications, KYC verification systems, open banking, and handling high-volume transaction processing. He has integrated multiple payment APIs including bKash and various banking services.',

    'technologies': 'Zubair works with a wide range of technologies:\n\n• Backend: .NET 8, ASP.NET Core, C#, Entity Framework\n• Frontend: Angular, AngularJS, JavaScript, jQuery\n• Databases: SQL Server, PostgreSQL, Redis\n• Cloud & DevOps: Azure, Docker, CI/CD\n• Tools: RabbitMQ, Elasticsearch, Hangfire, Git',

    'default': 'Hi! I\'m Zubair\'s portfolio assistant. I can help you learn about his skills, projects, experience, and contact information. What would you like to know?'
  };

  constructor() {
    this.initChat();
    // Check if API key is configured
    this.useAI = !!(environment.geminiApiKey &&
                    environment.geminiApiKey !== 'YOUR_GEMINI_API_KEY_HERE' &&
                    environment.geminiApiKey.length > 20);
  }

  initChat() {
    this.messages = [{
      text: 'Hello! 👋 I\'m Zubair\'s AI assistant. How can I help you learn more about his experience and skills?',
      isUser: false,
      timestamp: new Date()
    }];
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.hasUnreadMessages = false;
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMessage: Message = {
      text: this.userInput,
      isUser: true,
      timestamp: new Date()
    };

    this.messages.push(userMessage);
    const input = this.userInput;
    this.userInput = '';

    this.isTyping = true;
    setTimeout(() => this.scrollToBottom(), 100);

    if (this.useAI) {
      // Use Gemini AI API
      this.getAIResponse(input).then(response => {
        this.messages.push({
          text: response,
          isUser: false,
          timestamp: new Date()
        });
        this.isTyping = false;
        setTimeout(() => this.scrollToBottom(), 100);
      }).catch(error => {
        console.error('AI API Error:', error);
        // Fallback to keyword matching
        const response = this.generateResponse(input.toLowerCase());
        this.messages.push({
          text: response,
          isUser: false,
          timestamp: new Date()
        });
        this.isTyping = false;
        setTimeout(() => this.scrollToBottom(), 100);
      });
    } else {
      // Use keyword matching fallback
      setTimeout(() => {
        const response = this.generateResponse(input.toLowerCase());
        this.messages.push({
          text: response,
          isUser: false,
          timestamp: new Date()
        });
        this.isTyping = false;
        setTimeout(() => this.scrollToBottom(), 100);
      }, 1000 + Math.random() * 1000);
    }
  }

  sendQuickAction(action: string) {
    this.userInput = action;
    this.sendMessage();
  }

  async getAIResponse(userInput: string): Promise<string> {
    const apiKey = environment.geminiApiKey;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

    // Create context about Zubair for the AI
    const context = `You are an AI assistant for MD. Zubair Alam's portfolio website. Here's information about Zubair:

Name: MD. Zubair Alam
Title: Software Engineer | .NET
Experience: 5+ years specializing in .NET backend development and fintech solutions

SKILLS:
- Languages: C#, JavaScript, SQL
- Frameworks: .NET Framework, ASP.NET, ASP.NET Core, Entity Framework, Angular, AngularJS, jQuery
- Databases: SQL Server, PostgreSQL, LINQ, ADO.NET, Dapper, Redis, Elasticsearch
- Architecture: Microservices, MVC, Clean Architecture, Repository Pattern
- Security: OAuth 2.0, JWT, Basic Authentication, Data Encryption
- DevOps/Cloud: Azure, Docker, CI/CD Pipelines, Git
- Tools: RabbitMQ, Redis, Elasticsearch, Hangfire, RDLC, Crystal Reports

CURRENT POSITION:
Senior Software Engineer at BRAC Saajan Exchange Limited (Jan 2025 - Present)
- Leading backend development for RemitNgo money transfer application using .NET 8
- Implementing KYC verification, open banking, and liveness checks
- Integrating 15+ third-party services for secure global transactions
- Developed Agency Portal with payment gateways (40% faster transaction processing)

PREVIOUS EXPERIENCE:
1. Software Engineer at BRAC Saajan Exchange Limited (Dec 2022 - Dec 2024)
   - Developed ERP systems for UK-based agencies
   - Integrated 20+ third-party APIs including banking services
   - Managed PEP and sanction screening for regulatory compliance

2. Software Engineer at Ajkerdeal.com (Dec 2019 - Nov 2022)
   - Automated payment processing for 2,000+ merchants (BDT 10M+ monthly)
   - Integrated bKash and banking APIs
   - Built RESTful APIs for mobile and web applications

3. Software Engineer Intern at Bdecom IT Limited (Apr 2019 - Sep 2019)

EDUCATION:
BSc in Computer Science and Engineering
Stamford University Bangladesh (2019) - CGPA: 3.34/4.00

CONTACT:
Email: Zubairalam025@gmail.com
Phone: +880 1741 605193
GitHub: github.com/zubairalamsub
LinkedIn: linkedin.com/in/zubairalamdev
LeetCode: leetcode.com/zubairalam025
Location: Badda, Dhaka, Bangladesh

PROJECTS:
- RemitNgo Money Transfer App (.NET 8, SQL Server)
- Agency Portal with Payment Gateway (ASP.NET Core)
- ERP System for UK Agencies (ASP.NET WebForms)
- Merchant Payment Processing System (ASP.NET MVC)
- Online Examination System (.NET Core)
- Online Attendance System (ASP.NET WebForms)

Answer the following question concisely and professionally. Keep responses under 150 words unless more detail is specifically requested:

User Question: ${userInput}`;

    const requestBody = {
      contents: [{
        parts: [{
          text: context
        }]
      }]
    };

    try {
      const response = await this.http.post<any>(apiUrl, requestBody, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).toPromise();

      if (response && response.candidates && response.candidates[0]) {
        const aiResponse = response.candidates[0].content.parts[0].text;
        return aiResponse;
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }

  generateResponse(input: string): string {
    // Check for greetings
    if (input.match(/\b(hi|hello|hey|greetings)\b/)) {
      return 'Hello! 👋 How can I help you today? Feel free to ask about Zubair\'s skills, projects, experience, or contact information.';
    }

    // Check for skills-related queries
    if (input.match(/\b(skill|technology|tech stack|expertise|programming|language)\b/)) {
      return this.knowledgeBase['skills'];
    }

    // Check for projects
    if (input.match(/\b(project|work|portfolio|built|developed)\b/)) {
      return this.knowledgeBase['projects'];
    }

    // Check for experience
    if (input.match(/\b(experience|job|work history|career|company)\b/)) {
      return this.knowledgeBase['experience'];
    }

    // Check for contact
    if (input.match(/\b(contact|email|phone|reach|connect|linkedin|github)\b/)) {
      return this.knowledgeBase['contact'];
    }

    // Check for education
    if (input.match(/\b(education|university|degree|study|studied)\b/)) {
      return this.knowledgeBase['education'];
    }

    // Check for fintech
    if (input.match(/\b(fintech|payment|banking|finance|transaction)\b/)) {
      return this.knowledgeBase['fintech'];
    }

    // Check for technologies
    if (input.match(/\b(\.net|c#|angular|sql|azure|docker)\b/)) {
      return this.knowledgeBase['technologies'];
    }

    // Check for resume download
    if (input.match(/\b(resume|cv|download)\b/)) {
      return 'You can download Zubair\'s resume from the Experience section of this portfolio. Just scroll down to the Experience section and click the "Download Resume" button!';
    }

    // Default response
    return 'I can help you with information about Zubair\'s skills, projects, experience, education, and contact details. What would you like to know?';
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  scrollToBottom() {
    // Scroll will be handled by browser automatically
  }
}
