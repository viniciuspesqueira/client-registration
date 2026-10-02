<h1>📋 Client Registration</h1>

🔗 **[View live application](https://crud.viniciuspesqueira.dev/)**

Client Registration is a web application that allows for the registration and management of clients. You can quickly and easily register your name, state, and age (optional).

<h2 id="layout">🎨 Layout</h2>

<div align="center">
  <img src="/public/images/mobile.png" alt="Mobile version" width="300px"> 
  <img src="/public/images/desktop.png" alt="Desktop version" width="600px">
</div>

<h2 id="technologies">💻 Technologies</h2>

- <a href="https://getbootstrap.com/">Bootstrap</a>
- <a href="https://expressjs.com/pt-br/">Express.js</a>
- <a href="https://www.mysql.com/">MySQL</a> 
- <a href="https://nodejs.org/en/">Node.js</a>
- <a href="https://ejs.co/">EJS</a>
- <a href="https://vercel.com/">Vercel</a> 

## 🚀 Running locally

**Requirements:** Node.js and a MySQL database.

```bash
git clone https://github.com/viniciuspesqueira/Client-Registration.git
cd Client-Registration
npm install
cp .env.example .env   # fill in your database credentials
npm run db:migrate     # creates the tables
npm start
```

Open http://localhost:3000

<h2 id="contribute">📫 Contribute</h2>

If you have a suggestion for this project, feel free to open a new issue describing your idea.  
If you find a bug on the website, please create a new branch and open a pull request. Follow the tutorial:

1. Fork this repository
2. `git clone https://github.com/YOUR-USER/Client-Registration.git`
3. `git checkout -b feature/NAME`
4. Commit following the commit pattern
5. `git push origin feature/NAME` 
6. Open a Pull Request explaining the problem solved or feature made, if exists, append screenshot of visual modifications and wait for the review!

<h3>Documentations that might help</h3>

[📝 How to create a Pull Request](https://www.atlassian.com/br/git/tutorials/making-a-pull-request)

[💾 Commit pattern](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)