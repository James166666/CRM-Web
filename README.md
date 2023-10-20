# MyCircle: Your Personal CRM

Welcome to MyCircle, a user-friendly Personal CRM built with Django and React.js. With MyCircle, you can manage your contacts, track interactions, and never miss a follow-up.

## Features

- **Contact Management**: Seamlessly add, edit, and delete contacts.
- **Interaction Tracking**: Keep a log of all your interactions - meetings, calls, emails, and more.
- **Calendar Integration**: Set reminders for follow-ups or important dates on your personal calendar.
- **Task Management**: Use the Trello-like board to manage notes and prioritize tasks.
- **Responsive UI**: Enjoy a modern and responsive interface built with React.js.

## Prerequisites

Ensure you have the following installed on your local machine:

- Python (3.8 or newer)
- Node.js (14.0 or newer)
- npm

## Setup & Installation

### Frond-end (Javascript)

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/ITProject-Thu-12pm/CRM-Web.git
   ```

2. Navigate to the project directory:

   ```bash
   cd CRM-Web
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Run the application locally:

   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Backend (Django)

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create a virtual environment:

   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:

   - On Windows: `venv\Scripts\activate`
   - On macOS and Linux: `source venv/bin/activate`

4. Install the required packages:

   ```bash
   pip install -r requirements.txt
   ```

5. Run migrations:

   ```bash
   python manage.py migrate
   ```

6. Start the Django server:

   ```bash
   python manage.py runserver	
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` to access the frontend.
2. The backend API can be accessed at `http://localhost:8000`.

## Contributing

We welcome contributions! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the [License Name] license. 

