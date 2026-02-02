# Poll System Documentation

## Overview
A complete polling/survey system similar to the Volunteers page, where caretakers create polls and students respond. Caretakers can track responses and identify non-responders with printable reports.

## Features

### For Caretakers/Wardens:
1. **Create Polls** - Create surveys with custom questions and multiple options
2. **Track Responses** - View response statistics with percentages
3. **Monitor Non-Responders** - See list of students who haven't responded
4. **Print Reports** - Generate and print detailed non-responder reports with:
   - Total students count
   - Response count
   - Non-responder count
   - Response rate percentage
   - Student details (Name, Room, Mobile, Email)
5. **Close Polls** - Close polls to stop accepting responses

### For Students/Volunteers:
1. **View Polls** - See all available polls
2. **Respond to Polls** - Select one answer from multiple options
3. **Track Response Status** - See if you've already responded to a poll

## API Endpoints

### Polls API (`/api/polls`)

**GET /polls**
- Get all polls for the user's hostel
- Returns: Array of poll objects with responses

**POST /polls**
- Create a new poll
- Required fields: question, options (array), membersNeeded (optional)
- Optional fields: description, startDate, endDate
- Restricted to: Caretaker/Warden

**POST /polls/:id/respond**
- Submit a response to a poll
- Required fields: selectedOption, studentName, roomNo
- Returns: Updated poll object with new response

**GET /polls/:id/non-responders**
- Get list of students who haven't responded
- Returns: 
  - totalStudents: Total count
  - respondents: Number who responded
  - nonResponders: Array of student objects
  - nonResponderCount: Count of non-responders
- Restricted to: Caretaker/Warden

**POST /polls/:id/close**
- Close a poll (stop accepting responses)
- Restricted to: Caretaker/Warden

## Database Schema

### Poll Model
```javascript
{
  hostel: String,
  createdBy: String,        // Caretaker/Warden name
  createdById: String,      // Caretaker/Warden ID
  question: String,         // Poll question
  description: String,      // Optional description
  options: [String],        // Array of poll options
  responses: [{
    studentId: String,
    studentName: String,
    roomNo: String,
    userType: String,       // 'student' or 'volunteer'
    selectedOption: String,
    respondedAt: Date
  }],
  status: String,           // 'Open' or 'Closed'
  startDate: String,
  endDate: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Virtual Fields
- `responseCount`: Number of responses received
- `respondedStudentIds`: Array of IDs of students who responded

## Frontend Components

### Poll Component (`src/modules/Poll/index.jsx`)
Main component with:
- Poll creation form (caretaker only)
- Response form (students/volunteers)
- Response statistics display
- Non-responders modal with printable report
- Real-time data updates

### Features:
- State management for forms, responses, and modal
- Role-based UI rendering
- Print functionality for non-responder reports
- Response tracking and validation
- Live response count updates

## Usage Flow

### Caretaker:
1. Navigate to "Poll" page
2. Click "Create Poll"
3. Enter question, description (optional), and options
4. Set start/end dates (optional)
5. Click "Create Poll"
6. Monitor responses in real-time
7. Click "View Non-Responders" to see list of non-respondents
8. Click "Print Report" to generate printable report
9. Click "Close Poll" when done

### Student:
1. Navigate to "Poll" page
2. See all available polls
3. Click "Respond to Poll"
4. Select an answer
5. Click "Submit Response"
6. See confirmation badge

## Color Scheme
- Primary Color: --primary-color (#3C8DA1)
- Background: Almond-silk (#F7D3C0)
- Accent colors used for different button states

## Status
✅ Backend Model, Controller, Routes complete
✅ Frontend Component with all features
✅ Real-time response tracking
✅ Print functionality implemented
✅ Role-based access control
