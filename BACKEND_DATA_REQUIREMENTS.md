# Backend Data Requirements - Complete Analysis

This document outlines all the data types that need to be connected to the backend based on a comprehensive review of all components in the application.

---

## 1. **DASHBOARD MODULE**

### Dashboard Component (`Dashboard.jsx`)
- **Stats Cards Data:**
  - Total Leads (count, percentage change, delta)
  - Active Leads (count, percentage change, delta)
  - Subscriptions (count, percentage change, delta)
  - Additional leads metric (count, percentage change, delta)

- **Revenue Chart Data** (`RevenueChart.jsx`):
  - Monthly revenue data (profit/loss per month)
  - Total revenue amount
  - Growth percentage
  - Profit values by month
  - Loss values by month

- **Recent Activity Table Data**:
  - Customer name, email, avatar
  - Status (Member, Signed Up, etc.)
  - Customer ID
  - Timestamp (time ago)
  - Plan/amount

---

## 2. **LEADS MODULE**

### Leads Component (`Leads.jsx`)
- **Lead Data Structure:**
  ```javascript
  {
    id: number,
    name: string,
    phone: string,
    email: string,
    status: "New" | "Open" | "In Progress" | "Open Deal",
    time: string (timestamp),
    // Additional fields from LeadDetailsModal:
    city: string,
    pinCode: string,
    monthlyElectricalBill: number,
    address: string
  }
  ```

- **Lead Status Columns:**
  - Count per status (New, Open, In Progress, Open Deal)
  - Status metadata (colors, badges)

- **Lead History/Related Leads:**
  - Historical timeline of lead interactions
  - Previous status changes
  - Activity log per lead

### Lead Details Modal (`LeadDetailsModal.jsx`)
- Lead history/activity log
- Status change history
- Contact information updates
- Location data (city, pin code)
- Billing information

---

## 3. **CLIENT MODULE**

### Client Component (`Client.jsx`)
- **Client Profile Data:**
  ```javascript
  {
    id: number,
    name: string,
    phone: string,
    email: string,
    avatar: string (URL or base64),
    status: "Active" | "Pending" | "Cancelled",
    subscriptionPlan: "Free Starter Tier" | "Basic Plan" | "Growth Plan" | "Verified Leads Plan" | "Enterprise Plan",
    planType: "Monthly" | "Yearly",
    systemDetails: {
      capacity: string (e.g., "4.8 kW"),
      panels: string (e.g., "12 panels")
    },
    price: string (e.g., "₹9,999 /mo." or "₹143,988 /yr."),
    nextBilling: string (date),
    started: string (date),
    project: {
      address: string,
      plan: string,
      companyAddress: string,
      city: string,
      companyName: string,
      totalLeads: number | string
    }
  }
  ```

- **Client List Data (`ClientsList.jsx`):**
  - All clients with pagination support
  - Status filtering (All, Active, Pending, Cancelled)
  - Search functionality
  - Export capabilities (CSV, Excel, PDF)
  - Client creation with full profile data
  - Profile picture upload (file upload or URL)

- **Subscription Plans Reference:**
  - Free Starter Tier: ₹0
  - Basic Plan: ₹9,999 /100 Leads
  - Growth Plan: ₹11,999 /150 Leads
  - Verified Leads Plan: ₹15,999 /100 Leads
  - Enterprise Plan: Custom Pricing /lead

- **Next Steps Data:**
  - Scheduled site visits (date, time)
  - Follow-up tasks (due dates, descriptions)
  - Task status (completed, pending)

---

## 4. **REVENUE MODULE**

### Revenue Component (`Revenue.jsx`)
- **Revenue Statistics:**
  - Total Revenue (amount, percentage change, delta)
  - Total Leads (count, percentage change, delta)
  - Total Visitors (count, percentage change, delta)
  - Net Profit (amount, percentage change, delta)

- **City Donut Chart Data** (`CityDonutChart.jsx`):
  ```javascript
  {
    name: string (city name),
    value: number (percentage or count),
    color: string (hex color)
  }
  ```
  - Income increase percentage
  - City-wise revenue distribution

- **Monthly Bar Chart Data** (`MonthlyBarChart.jsx`):
  - Monthly revenue values (Jan-Dec)
  - Revenue trends over months

---

## 5. **REPORTS & ANALYTICS MODULE**

### ReportsAnalytic Component (`ReportsAnalytic.jsx`)
- **Overall Leads Chart** (`OverallLeadsChart.jsx`):
  - Current week leads data (date, value)
  - Last week leads data (date, value)
  - Growth percentage (28%↑)
  - Daily leads count

- **New Leads Chart:**
  - New leads data points
  - Time-based lead generation

- **Leads Per Week:**
  - Weekly lead counts
  - Week-over-week comparison

- **Recent Leads History:**
  - Latest lead activities
  - Customer information
  - Status changes
  - Timestamps

---

## 6. **SUBSCRIPTION PLANS MODULE**

### SubscriptionPlans Component (`SubscriptionPlans.jsx`)
- **Plan Data Structure:**
  ```javascript
  {
    id: number,
    name: string,
    price: string,
    leads: string,
    features: string[],
    highlight: boolean,
    tag: string (optional)
  }
  ```

- **Plans Needed:**
  - Free Starter Tier
  - Basic Plan
  - Growth Plan
  - Verified Leads Plan
  - Enterprise Plan

- **User Subscription Data:**
  - Current user's active plan
  - Subscription status
  - Lead quota/remaining leads
  - Subscription expiry date

---

## 7. **BILLING & PAYMENT MODULE**

### BillingPayment Component (`BillingPayment.jsx`)
- **Payment Data:**
  ```javascript
  {
    id: string (transaction ID),
    amount: number,
    date: date,
    method: "credit" | "bank" | "check" | "cash",
    status: "success" | "pending" | "failed",
    // Method-specific details:
    // For credit card:
    cardNumber: string (last 4 digits),
    cardHolderName: string,
    expiryDate: string,
    // For bank transfer:
    accountHolderName: string,
    bankName: string,
    accountNo: string (last 4 digits),
    ifscCode: string,
    // For check:
    checkNumber: string,
    checkDate: date
  }
  ```

- **Payment History:**
  - List of all transactions
  - Payment receipts
  - Invoice data

- **Coupon Codes:**
  - Valid coupon codes
  - Discount amounts
  - Expiry dates

---

## 8. **PROFILE MODULE**

### Profile Component (`Profile.jsx`)
- **User Profile Data:**
  ```javascript
  {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    jobTitle: string,
    city: string,
    companyName: string,
    companyAddress: string,
    bio: string,
    profileImage: string (URL or base64)
  }
  ```

- **Avatar/Image Upload:**
  - Profile picture storage
  - Image URL retrieval

---

## 9. **SETTINGS MODULE**

### General Settings (`GeneralSettings.jsx`)
- **Company Information:**
  ```javascript
  {
    companyName: string,
    businessType: string,
    businessAddress: string,
    phoneNumber: string,
    email: string,
    companyLogo: string (URL)
  }
  ```

- **Regional Settings:**
  - Timezone
  - Date format preference
  - Currency preference
  - Language preference

### My Profile Settings (`MyProfile.jsx`)
- User personal information (same as Profile module)
- Profile picture upload

### Security Settings (`Security.jsx`)
- Password change
- Two-factor authentication settings
- Security logs/activity

### Notifications Settings (`Notifications.jsx`)
- Notification preferences
- Email notification settings
- Push notification settings

### Integrations (`Integrations.jsx`)
- Third-party integrations
- API keys
- Integration status

---

## 10. **MAINTENANCE TICKETS MODULE**

### MaintenanceTickets Component (`MaintenanceTickets.jsx`)
- **Ticket Data Structure:**
  ```javascript
  {
    id: string (e.g., "TKT-001"),
    subject: string,
    customer: string,
    priority: "High" | "Medium" | "Low",
    status: "Scheduled" | "In Progress" | "Completed" | "Overdue" | "Open"
  }
  ```

- **Maintenance Schedule Data:**
  - Scheduled maintenance tasks
  - Maintenance dates
  - Technician assignments
  - Status tracking

- **Filters:**
  - Status filters
  - Priority filters

---

## 11. **USER & ROLE MANAGEMENT MODULE**

### UserAndRoles Component (`userAndRoles.jsx`)
- **User Data Structure:**
  ```javascript
  {
    id: number,
    name: string,
    email: string,
    role: "Administrator" | "Sales" | "Technician",
    status: "Active" | "Inactive"
  }
  ```

- **Role Management:**
  - Available roles list
  - Role permissions
  - User-role assignments

---

## 12. **CHART COMPONENTS DATA**

### Revenue Chart (`RevenueChart.jsx`)
- Monthly profit/loss data
- Total revenue calculations
- Growth metrics

### Overall Leads Chart (`OverallLeadsChart.jsx`)
- Daily leads data for current week
- Daily leads data for last week
- Week-over-week comparison

### City Donut Chart (`CityDonutChart.jsx`)
- City-wise revenue/lead distribution
- Percentage breakdown by city

### Monthly Bar Chart (`MonthlyBarChart.jsx`)
- Monthly aggregated revenue data
- 12 months of historical data

---

## **SUMMARY OF BACKEND ENDPOINTS NEEDED**

### Authentication & Authorization
- POST `/api/auth/login`
- POST `/api/auth/logout`
- GET `/api/auth/user`
- POST `/api/auth/refresh-token`

### Dashboard
- GET `/api/dashboard/stats` - Get dashboard statistics
- GET `/api/dashboard/revenue` - Get revenue chart data
- GET `/api/dashboard/recent-activity` - Get recent activity feed

### Leads
- GET `/api/leads` - Get all leads (with filters, pagination)
- GET `/api/leads/:id` - Get single lead details
- POST `/api/leads` - Create new lead
- PUT `/api/leads/:id` - Update lead
- DELETE `/api/leads/:id` - Delete lead
- GET `/api/leads/:id/history` - Get lead history
- PUT `/api/leads/:id/status` - Update lead status

### Clients
- GET `/api/clients` - Get all clients (with filters: status, pagination, search)
- GET `/api/clients/:id` - Get client details
- POST `/api/clients` - Create client (with profile picture upload support)
- PUT `/api/clients/:id` - Update client
- DELETE `/api/clients/:id` - Delete client
- GET `/api/clients/:id/next-steps` - Get client next steps
- POST `/api/clients/:id/next-steps` - Create next step
- POST `/api/clients/:id/avatar` - Upload/update client profile picture
- GET `/api/clients/export` - Export clients (CSV, Excel, PDF formats)

### Revenue
- GET `/api/revenue/stats` - Get revenue statistics
- GET `/api/revenue/city-distribution` - Get city-wise distribution
- GET `/api/revenue/monthly` - Get monthly revenue data

### Reports & Analytics
- GET `/api/reports/overall-leads` - Get overall leads chart data
- GET `/api/reports/new-leads` - Get new leads data
- GET `/api/reports/leads-per-week` - Get weekly leads data
- GET `/api/reports/recent-history` - Get recent leads history

### Subscriptions
- GET `/api/subscriptions/plans` - Get all available plans
- GET `/api/subscriptions/current` - Get current user subscription
- POST `/api/subscriptions/choose-plan` - Choose/subscribe to a plan

### Payments
- GET `/api/payments` - Get payment history
- POST `/api/payments` - Process payment
- GET `/api/payments/:id/receipt` - Get payment receipt
- POST `/api/payments/validate-coupon` - Validate coupon code

### Profile
- GET `/api/profile` - Get user profile
- PUT `/api/profile` - Update profile
- POST `/api/profile/avatar` - Upload profile picture

### Settings
- GET `/api/settings/general` - Get general settings
- PUT `/api/settings/general` - Update general settings
- GET `/api/settings/security` - Get security settings
- PUT `/api/settings/security` - Update security settings
- GET `/api/settings/notifications` - Get notification settings
- PUT `/api/settings/notifications` - Update notification settings

### Maintenance Tickets
- GET `/api/tickets` - Get all tickets (with filters)
- POST `/api/tickets` - Create ticket
- PUT `/api/tickets/:id` - Update ticket
- GET `/api/maintenance` - Get maintenance schedule
- POST `/api/maintenance` - Schedule maintenance

### Users & Roles
- GET `/api/users` - Get all users (with filters, pagination)
- POST `/api/users` - Create user
- PUT `/api/users/:id` - Update user
- DELETE `/api/users/:id` - Delete user
- GET `/api/roles` - Get available roles

---

## **DATA MODELS SUMMARY**

### Lead Model
- id, name, phone, email, status, timestamp, city, pinCode, monthlyBill, address

### Client Model
- id, name, phone, email, avatar, status, subscriptionPlan, planType, systemDetails (capacity, panels), price, nextBilling, started, project details (address, plan, companyAddress, city, companyName, totalLeads)

### User Model
- id, name, email, role, status, profile information

### Subscription Model
- id, planId, userId, startDate, endDate, status, remainingLeads

### Payment Model
- id, userId, amount, date, method, status, transactionId, methodDetails

### Ticket Model
- id, subject, customer, priority, status, createdAt, updatedAt

### Company Settings Model
- companyName, businessType, address, phone, email, logo, timezone, dateFormat, currency, language

---

## **NOTES**

1. **Pagination:** Most list endpoints should support pagination (page, limit parameters)
2. **Filtering:** Many endpoints need filtering capabilities (status, date range, subscription plan, etc.)
3. **Sorting:** List endpoints should support sorting (by name, date, status, etc.)
4. **Search:** Search functionality needed for leads, clients, users (by name, email, phone, etc.)
5. **File Uploads:** Profile pictures, company logos need file upload endpoints (support both file upload and URL input for client avatars)
6. **Export:** CSV/Excel/PDF export endpoints needed for clients, leads, reports
7. **Real-time Updates:** Consider WebSocket for real-time lead updates, notifications
8. **Date Formatting:** All timestamps should be in ISO 8601 format, display dates in user-friendly format (e.g., "Nov 25, 2025")
9. **Authentication:** All endpoints (except auth) require authentication tokens
10. **Rate Limiting:** Implement rate limiting for API endpoints
11. **Subscription Plan Validation:** Ensure subscription plan names match available plans (Free Starter Tier, Basic Plan, Growth Plan, Verified Leads Plan, Enterprise Plan)
12. **Price Calculation:** Auto-calculate prices based on subscription plan and billing cycle (Monthly/Yearly). Yearly prices should be calculated as Monthly × 12

---

**Last Updated:** Based on comprehensive component review
**Total Components Analyzed:** 20+ components

