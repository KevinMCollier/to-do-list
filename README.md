# Todo App Backend 📝

## Overview
This is the backend of the **Todo App**, built using NestJS. It handles task management logic, including data storage, retrieval, and manipulation.

## Key Features
- REST API endpoints for task management.
- MongoDB integration for data persistence.

## Technologies Used
- NestJS
- MongoDB
- TypeScript
- Jest (for testing)

## Challenges and Solutions
- State Management: Used Context API and custom hooks to manage state, providing an abstraction layer facilitating future potential use of Redux.
- Date Filtering Logic: Implementing logic for various repeat statuses was challenging, but solved by developing a robust filtering mechanism that categorizes tasks based on due date and repeat status. This included intricate date calculations and conditional-logic to handle different scenarios.
- Database Schema: Initially considered separate tables for different types of todos (weekly, daily, spot). However, to reduce complexity, opted for a single model with an enum to represent the repeat status.

## Future Improvements
- User Motivation Integration: Planning to implement a feature that utilizes a user motivation attribute in the task model. This will involve integrating coaching from an AI (ChatGPT) to send motivational messages to users, encouraging task completion based on the task's nature and the user's motivation level.


## Setup and Installation
To set up the project on your local machine:
```bash
# Clone the repository
git clone https://github.com/KevinMCollier/to-do-list

# Navigate to the project directory
cd to-do-list

# Install dependencies
npm install

# Start the development server
npm run start:dev
```

## Running the App
To run the app:
```bash
# Development mode
npm run start

# Watch mode
npm run start:dev

# Production mode
npm run start:prod
```

## Testing the App
To test the app:
```bash
# Unit tests
npm run test
```

