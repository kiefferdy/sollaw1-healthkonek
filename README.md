# HealthKonek - Telehealth Application Frontend

HealthKonek is a modern, elegant, and intuitive telehealth application designed to provide quality healthcare to all Filipinos, especially those in rural or remote areas. This repository contains the frontend code for the HealthKonek application.

## Features

- **On-Demand Video Consultations & Appointment Scheduling**: Connect with healthcare providers remotely, reducing the need for travel.
- **Digital Health Records & Secure Data Storage**: Access your medical records anytime, anywhere.
- **AI-Driven Symptom Checkers & Personalized Treatment Recommendations**: Get early warnings and customized advice based on your symptoms.
- **Integration with Wearable Devices**: Track vital signs and activity levels for continuous health monitoring.
- **Laboratory Request Forms & Interpretation of Laboratory Results**: Easily manage and understand your lab tests.
- **Prescription Management & E-Prescription**: Streamline the process of issuing and managing prescriptions.
- **Online Pharmacy & Medication Delivery**: Purchase and receive medications directly at home.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [DaisyUI](https://daisyui.com/)
- **Icons**: [Lucide React](https://lucide.dev/), [Heroicons](https://heroicons.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Date Handling**: [date-fns](https://date-fns.org/), [React Calendar](https://www.npmjs.com/package/react-calendar)
- **UI Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Utilities**: [clsx](https://github.com/lukeed/clsx)

## Getting Started

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/healthkonek-frontend.git
cd healthkonek-frontend
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/
│   ├── components/     # Reusable components
│   │   ├── common/     # Common components used across pages
│   │   ├── features/   # Feature-specific components
│   │   ├── layout/     # Layout components
│   │   ├── sections/   # Section components for pages
│   │   └── ui/         # Basic UI components
│   │
│   ├── globals/        # Global styles
│   ├── routes/         # Page components organized by route
│   ├── utils/          # Utility functions
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
│
├── public/             # Static assets
│   └── images/         # Images
│
├── next.config.js      # Next.js configuration
├── package.json        # Project dependencies
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Available Pages

- **Home**: Landing page with information about the application
- **Dashboard**: Overview of the user's health information and quick actions
- **Appointments**: Schedule and manage appointments with healthcare providers
- **Health Records**: Access and manage personal health records
- **Messages**: Chat with healthcare providers
- **Pharmacy**: Order medications and view prescriptions
- **Lab Results**: View and interpret laboratory results
- **Symptom Checker**: AI-powered symptom assessment
- **Profile**: User profile management
- **Settings**: Application settings

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)

## Acknowledgements

- This project was created for SOLLAW1 at De La Salle University.
- Special thanks to all contributors and professors who provided guidance.

---

Made with ❤️ for the Filipino healthcare community