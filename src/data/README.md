# Dummy Data for Testing

This directory contains comprehensive dummy data for testing all modules of the application.

## File Structure

- `dummyData.js` - Contains all mock data for testing

## Usage

### Import All Data
```javascript
import dummyData from './data/dummyData';

// Access specific data
const clients = dummyData.clients;
const leads = dummyData.leads;
```

### Import Specific Data
```javascript
import { 
  dummyClients, 
  dummyLeads, 
  dummyDashboardStats,
  dummyRevenueChartData 
} from './data/dummyData';
```

## Available Data Sets

### 1. **Clients** (`dummyClients`)
- 8 sample clients with complete profile data
- Includes all subscription plans (Free Starter Tier, Basic Plan, Growth Plan, Verified Leads Plan, Enterprise Plan)
- Mix of Active, Pending, and Cancelled statuses
- Monthly and Yearly billing cycles

### 2. **Leads** (`dummyLeads`)
- 20 sample leads across all statuses (New, Open, In Progress, Open Deal)
- Includes contact information, location data, and billing information

### 3. **Dashboard Stats** (`dummyDashboardStats`)
- Total Leads, Active Leads, Subscriptions, Revenue
- Includes percentage changes and delta indicators

### 4. **Revenue Chart Data** (`dummyRevenueChartData`)
- Monthly profit/loss data for 12 months
- Total revenue and growth percentage

### 5. **Recent Activity** (`dummyRecentActivity`)
- 5 recent customer activities
- Includes customer info, status, and plan details

### 6. **City Donut Chart Data** (`dummyCityDonutData`)
- City-wise revenue distribution
- 6 cities with percentages and colors

### 7. **Monthly Bar Chart Data** (`dummyMonthlyBarData`)
- 12 months of revenue data

### 8. **Reports & Analytics Data**
- `dummyOverallLeadsData` - Current and last week leads comparison
- `dummyNewLeadsData` - Daily new leads for a week
- `dummyLeadsPerWeek` - Weekly leads aggregation
- `dummyRecentLeadsHistory` - Recent lead activities

### 9. **Users & Roles** (`dummyUsers`)
- 5 sample users with different roles (Administrator, Sales, Technician)
- Mix of Active and Inactive statuses

### 10. **Maintenance Tickets** (`dummyTickets`)
- 6 sample tickets with different priorities and statuses

### 11. **Payments** (`dummyPayments`)
- Sample payment transactions
- Different payment methods (credit card, bank transfer)

### 12. **Client Next Steps** (`dummyNextSteps`)
- Sample next steps/tasks for clients
- Includes scheduled visits and follow-ups

### 13. **Revenue Stats** (`dummyRevenueStats`)
- Total Revenue, Total Leads, Total Visitors, Net Profit
- With percentage changes

### 14. **Subscription Plans** (`dummySubscriptionPlans`)
- All 5 subscription plans with features and pricing

### 15. **Profile** (`dummyProfile`)
- Sample user profile data

## Example Usage in Components

### Example 1: Using in ClientsList Component
```javascript
import { dummyClients } from '../data/dummyData';

const ClientsList = () => {
  const [clients, setClients] = useState(dummyClients);
  // ... rest of component
};
```

### Example 2: Using in Dashboard Component
```javascript
import { dummyDashboardStats, dummyRevenueChartData } from '../data/dummyData';

const Dashboard = () => {
  const stats = dummyDashboardStats;
  const revenueData = dummyRevenueChartData;
  // ... rest of component
};
```

### Example 3: Using in Leads Component
```javascript
import { dummyLeads } from '../data/dummyData';

const Leads = () => {
  const [leads, setLeads] = useState(dummyLeads);
  // ... rest of component
};
```

## Data Structure Details

All data structures match the requirements defined in `BACKEND_DATA_REQUIREMENTS.md`. Each data set includes:

- Proper field names matching the backend API structure
- Realistic sample values
- Various statuses and states for comprehensive testing
- Relationships between data (e.g., client IDs, lead statuses)

## Notes

- All dates are in a format that can be easily parsed
- Phone numbers follow Indian format (10 digits)
- Email addresses are realistic but dummy
- Avatar URLs use randomuser.me service for profile pictures
- Currency is in Indian Rupees (₹)
- All IDs are sequential for easy testing

## Updating Data

To add more test data:
1. Open `dummyData.js`
2. Find the relevant data array/object
3. Add new entries following the same structure
4. Export the updated data

## Integration with Backend

When the backend is ready:
1. Replace imports from `dummyData.js` with API calls
2. Keep `dummyData.js` for development/testing purposes
3. Use dummy data as fallback when API is unavailable

