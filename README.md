# Security Project Sigma

A mini-project for the **Computer Security** course.

Live demo: [security-project-sigma.vercel.app](https://security-project-sigma.vercel.app/)

---

## Table of Contents

- [Overview](#overview)  
- [Motivation](#motivation)  
- [Features](#features)  
- [Architecture & Technology Stack](#architecture--technology-stack)  
- [Threat Model & Security Measures](#threat-model--security-measures)  
- [Usage](#usage)  
- [Setup & Installation](#setup--installation)  
- [Testing](#testing)  
- [Known Issues & Limitations](#known-issues--limitations)  
- [Future Work](#future-work)  
- [Team](#team)  
- [License](#license)

---

## Overview

`Security Project Sigma` is a web-application developed for the Computer Security course. It demonstrates security best practices in web development, including authentication, input validation, secure data handling, and protection from common web vulnerabilities.

---

## Motivation

The aim of this project is to:

- Apply theoretical concepts of computer security in a real application.  
- Demonstrate how to defend against common web-based attacks (e.g. SQL Injection, Cross-Site Scripting, Cross-Site Request Forgery, etc.).  
- Emphasize correct and secure coding practices.  

---

## Features

- User registration & login with secure password hashing.  
- Role-based access control (e.g., standard user & admin).  
- Input validation & sanitization for all user inputs.  
- Protection against common vulnerabilities:  
  - SQL Injection  
  - Cross-Site Scripting (XSS)  
  - Cross-Site Request Forgery (CSRF)  
  - Broken Authentication  
- HTTPS / TLS enforcement (if applicable).  
- Secure session management (e.g., secure cookies, session expiry).  
- Logging & monitoring of suspicious activities.

---

## Architecture & Technology Stack

| Component | Technology / Library / Tool |
|-----------|-------------------------------|
| Front-end | *(e.g. React / Vue / plain HTML + JS)* |
| Back-end | *(e.g. Node.js + Express / Python + Flask / etc.)* |
| Database | *(e.g. PostgreSQL / MySQL / MongoDB / SQLite)* |
| Authentication | *(e.g. JWT / OAuth2 / session-based)* |
| Deployment | Vercel / *(other hosting / cloud provider)* |

Include any other services / tools as used (e.g. for logging, auditing, encryption libraries, etc.).

---

## Threat Model & Security Measures

- **Assets**: user credentials, personal data, session tokens, etc.  
- **Adversaries**: remote attackers, user with malicious input, insider threats.  
- **Attack vectors & mitigations**:  
  | Threat / Attack | Mitigation Implemented |
  |------------------|-------------------------|
  | SQL Injection | Parameterized queries / ORM / input sanitization |
  | XSS | Escape or sanitize user input / Content Security Policy (CSP) |
  | CSRF | CSRF tokens / SameSite cookies |
  | Authentication attacks | Strong password policy, hashing (e.g., bcrypt / Argon2), account lockouts / rate limiting |
  | Sensitive data exposure | HTTPS, encrypt data at rest (if relevant), minimal privilege, secure storage of secrets |

---

## Usage

1. Visit the live site / local instance.  
2. Register a new account.  
3. Log in.  
4. Explore different features (e.g. user dashboard, admin panel, etc.).  
5. Try sending inputs that might be malicious (for testing purposes only) to observe security protection.

---

## Setup & Installation

**Prerequisites:**

- Node.js (version x.x.x)  
- npm / yarn  
- Database server (if applicable)  
- Any environment variables / secret keys (e.g. for database, JWT secret)

**Steps:**

```bash
git clone <this-repo-url>
cd security-project-sigma
npm install          # or yarn install
# set up environment variables, e.g.
#   DATABASE_URL, JWT_SECRET, NODE_ENV=development, etc.

# optionally initialize database
npm run migrate      # if migrations used
npm run seed         # if seed data

npm start            # or npm run dev
