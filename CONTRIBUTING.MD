# Contributing to KiddieGPT

🎉 First off, thank you for your interest in contributing to **KiddieGPT**!  
We welcome contributions that improve the project, whether it's fixing bugs, adding new features, improving documentation, or suggesting ideas.  



## 📋 How to Contribute

### 1. Fork & Clone
- Fork the repository to your GitHub account.  
- Clone your fork locally:
  ```bash
  git clone https://github.com/<your-username>/kiddiegpt.git
  cd kiddiegpt
2. Create a Branch
Use descriptive branch names:

bash
Copy code
git checkout -b fix-bug-navbar
# or
git checkout -b feature-add-darkmode
3. Install Dependencies
Make sure you have everything set up:

bash
Copy code
npm install
4. Set Up Environment Variables
Create a .env.local file in the project root:

env
Copy code
DATABASE_URL=your_postgresql_url
REPLICATE_API_TOKEN=your_replicate_api_key
GEMINI_API_KEY=your_gemini_api_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
5. Run the Project
bash
Copy code
npm run dev
Visit http://localhost:3000 to verify your changes.

6. Commit Changes
Follow Conventional Commits for commit messages:

bash
Copy code
git commit -m "fix(navbar): corrected navigation link for stories"
7. Push & Open PR
Push your branch and create a Pull Request (PR):

bash
Copy code
git push origin feature-add-darkmode
Then open a PR against the main branch on GitHub.

 Code Guidelines
TypeScript/React best practices

Keep UI accessible and kid-friendly

Use TailwindCSS utility classes consistently

Maintain clean, modular components (/app/_components/ or /components/ui/)

Write self-explanatory commit messages

🐛 Issues & Feature Requests
Check the Issues tab for existing bugs or features.

If reporting a bug, please include steps to reproduce.

If suggesting a feature, explain why it benefits KiddieGPT.

🤝 Community
Be respectful and inclusive.

Encourage creativity and open collaboration.

💡 Together, let’s make KiddieGPT a magical storytelling platform for kids! 