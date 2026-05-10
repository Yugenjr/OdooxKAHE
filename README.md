# Traveloop — Smart Travel Planning Platform

Traveloop is a modern travel planning web application designed to help users discover destinations, manage trips, track budgets, and organize travel experiences with a beautiful interactive UI.

Built using React, TypeScript, Tailwind CSS, Framer Motion, and Vite, Traveloop provides a smooth and premium user experience for travel enthusiasts.

---

#  Features

##  Trip Management

* Create new trips
* Edit existing trips
* Delete trips
* View trip details
* Filter trips by status
* Beautiful animated trip cards

##  City Explorer

* Search cities dynamically
* Filter cities by budget
* Add cities to trips
* Indian city support
* Tamil Nadu destinations included
* Interactive city detail modal
* Estimated budget calculations in Indian Rupees

##  Budget Planner

* Budget breakdown by category
* Expense tracking
* Add/Edit/Delete budgets
* Progress bars and analytics
* Budget alerts
* Indian currency formatting
* Expense distribution visualization

##  Premium UI/UX

* Glassmorphism design
* Responsive layout
* Smooth animations using Framer Motion
* Modern gradients and shadows
* Mobile-friendly design
* Dark futuristic theme

---

#  Tech Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Framer Motion
* Lucide React Icons

## State Management

* React Hooks
* Zustand Store

## Routing

* React Router DOM

---

#  Project Structure

```bash
src/
│
├── components/
├── modules/
│   ├── trips/
│   ├── budgets/
│   ├── city-search/
│   └── dashboard/
│
├── store/
├── routes/
├── assets/
└── utils/
```

---

#  Installation

## 1️ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

---

## 2️ Move into Project Folder

```bash
cd OdooxKAHE/frontend
```

---

## 3️ Install Dependencies

```bash
npm install
```

---

## 4️ Run Development Server

```bash
npm run dev
```

---

## 5️ Open Browser

```bash
http://localhost:5173
```

---

#  Main Modules

##  Dashboard

Central hub for managing all travel-related activities.

##  My Trips

Users can:

* Add trips
* Edit trips
* Delete trips
* Track upcoming and completed journeys

##  City Search

Users can:

* Discover destinations
* Compare budgets
* Search Indian cities
* Add destinations to trips

##  Budget Planner

Users can:

* Monitor travel expenses
* Compare spending vs budget
* Track category-wise spending

---

# 🇮🇳 Indian Currency Support

The project uses Indian Rupee formatting throughout the application.

Example:

```ts
₹25,000
₹1,20,000
₹2,50,000
```

Currency formatting is handled using:

```ts
amount.toLocaleString('en-IN')
```

---

#  Future Improvements

* Authentication system
* AI-based itinerary generator
* Hotel booking integration
* Weather API integration
* Flight price prediction
* Travel chat assistant
* Real-time collaboration
* Map integration
* Expense analytics dashboard

---

# Learning Outcomes

This project demonstrates:

* React component architecture
* TypeScript interfaces
* CRUD operations
* State management
* Dynamic filtering
* Responsive UI design
* Modal implementation
* Form handling
* Animation integration
* Reusable components

---


#  License

This project is created for educational and development purposes.

---

#  Traveloop

"Plan smarter. Travel better. Explore endlessly."
