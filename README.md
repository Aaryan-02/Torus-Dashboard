# Dynamic and Analytics Dashboard

This project is a dynamic dashboard application built with **React.js**, **Redux**, **TypeScript**, and **API integration** using **Redux Thunk**. It includes two main sections: **User Management Dashboard** and **Analytics Dashboard**.

---

## Instructions to Run the Project

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   ```

2. **Install Dependencies**
   Navigate to the project folder and run the following command to install all the required dependencies:
   ```bash
   npm install
   ```

3. **Start the Application**
   Once the dependencies are installed, start the application using:
   ```bash
   npm start
   ```

   This will run the application in development mode at `http://localhost:3000`.

---

## List of Features Implemented

### 1. **User Management Dashboard**

- **Login Page**: Mock authentication using a mock API.
- **Dashboard**: Fetch and display a list of users in a table with actions:
  - View user details
  - Delete users
- **Search and Filter**: Filter users by name or email.
- **Pagination**: Pagination for the user list (5 users per page).

### 2. **Analytics Dashboard**

- **Overview Cards**:
  - **Total Users**: Displays the total count of fetched users.
  - **Active Users**: Shows active users based on a field like "status".
  - **Deleted Users**: Tracks the count of deleted users during the session.

- **Charts Section**:
  - **User Registration Trend**: A line chart showing user registrations over the past 6 months (mock data).
  - **Active vs Inactive Users**: A pie chart comparing active and inactive users.
  - **Users by Region**: A bar chart or map displaying user distribution by regions (mock region data).

- **Filters for Analytics**:
  - Allows filtering of analytics by date range and region.

### 3. **Responsive Design**
- The analytics dashboard is fully responsive and mobile-friendly.

---

### Technologies Used:
- **React.js**
- **Redux (with Redux Thunk)**
- **TypeScript**
- **API Integration** (Mock API)
- **Chart.js** (for visualizations)
- **Material-UI** (for UI components)

---

This is a basic yet functional dashboard designed to manage users and visualize analytics data with filters and responsive design. Feel free to contribute or modify the project as needed!
