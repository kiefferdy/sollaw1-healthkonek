import Link from "next/link";
import {
    ArrowRight,
    Video,
    CalendarDays,
    FileText,
    Pill,
    ThermometerSun,
    Star,
} from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navigation */}
            <header className="sticky top-0 z-50 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <div className="text-xl font-bold text-primary">
                                HealthKonek
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center space-x-6">
                            <Link
                                href="#features"
                                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                            >
                                Features
                            </Link>
                            <Link
                                href="#how-it-works"
                                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                            >
                                How It Works
                            </Link>
                            <Link
                                href="#testimonials"
                                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                            >
                                Testimonials
                            </Link>
                            <Link
                                href="#pricing"
                                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                            >
                                Pricing
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/login"
                                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-20 pb-16 md:pt-28 md:pb-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                            <span className="block">
                                Healthcare at your fingertips
                            </span>
                            <span className="block text-primary mt-2">
                                Anytime, Anywhere
                            </span>
                        </h1>
                        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Connect with healthcare professionals, manage your
                            health records, and access medical services from the
                            comfort of your home. HealthKonek brings quality
                            healthcare to all Filipinos, especially those in
                            remote areas.
                        </p>
                        <div className="mt-10 flex justify-center gap-4">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-primary rounded-lg shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                                Get Started
                                <ArrowRight
                                    className="ml-2 h-5 w-5"
                                    aria-hidden="true"
                                />
                            </Link>
                            <Link
                                href="#how-it-works"
                                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-primary bg-white border border-primary-100 rounded-lg hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section
                id="features"
                className="py-16 md:py-24 bg-white dark:bg-gray-900"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Key Features
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            HealthKonek offers a comprehensive suite of
                            telehealth solutions to make healthcare accessible,
                            affordable, and convenient.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary mb-4">
                                <Video className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Video Consultations
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Connect with healthcare providers through secure
                                video calls from the comfort of your home. Get
                                diagnosed, receive treatment plans, and follow
                                up on your health concerns.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary mb-4">
                                <CalendarDays className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Appointment Scheduling
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Easily book appointments with doctors and
                                specialists. Our system helps you find the right
                                healthcare provider based on your needs and
                                availability.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary mb-4">
                                <FileText className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Digital Health Records
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Securely store and access your medical history,
                                lab results, prescriptions, and doctor's notes
                                all in one place. Share with healthcare
                                providers as needed.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary mb-4">
                                <Pill className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                E-Prescriptions & Delivery
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Receive prescriptions electronically and order
                                medications for delivery directly to your
                                doorstep. Set up reminders to never miss a dose.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary mb-4">
                                <ThermometerSun className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                AI Symptom Checker
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Use our AI-powered symptom checker to get
                                preliminary insights about your health concerns.
                                Receive guidance on whether you should consult a
                                doctor.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Lab Results & Interpretation
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Request laboratory tests and receive results
                                directly through the app. Get help understanding
                                your results with plain-language explanations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section
                id="how-it-works"
                className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            How It Works
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Using HealthKonek is simple and straightforward.
                            Follow these steps to get started with quality
                            healthcare services.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {/* Steps */}
                            <div className="hidden md:block absolute left-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                            <div className="space-y-16">
                                {/* Step 1 */}
                                <div className="relative">
                                    <div className="md:flex items-center">
                                        <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
                                            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
                                                <div className="flex items-center mb-4">
                                                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white text-sm font-medium">
                                                        1
                                                    </span>
                                                    <h3 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                                                        Create Your Account
                                                    </h3>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-300">
                                                    Sign up with your email or
                                                    phone number. Complete your
                                                    profile with basic
                                                    information and health
                                                    history to personalize your
                                                    experience.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="hidden md:block absolute left-1/2 top-6 -ml-3">
                                            <div className="w-6 h-6 rounded-full bg-primary border-4 border-white dark:border-gray-800"></div>
                                        </div>
                                        <div className="md:w-1/2 md:pl-8"></div>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="relative">
                                    <div className="md:flex items-center">
                                        <div className="md:w-1/2 md:pr-8"></div>
                                        <div className="hidden md:block absolute left-1/2 top-6 -ml-3">
                                            <div className="w-6 h-6 rounded-full bg-primary border-4 border-white dark:border-gray-800"></div>
                                        </div>
                                        <div className="md:w-1/2 md:pl-8">
                                            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
                                                <div className="flex items-center mb-4">
                                                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white text-sm font-medium">
                                                        2
                                                    </span>
                                                    <h3 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                                                        Find a Healthcare
                                                        Provider
                                                    </h3>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-300">
                                                    Browse our network of
                                                    qualified doctors and
                                                    specialists. Filter by
                                                    specialty, languages spoken,
                                                    or availability to find the
                                                    perfect match.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="relative">
                                    <div className="md:flex items-center">
                                        <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
                                            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
                                                <div className="flex items-center mb-4">
                                                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white text-sm font-medium">
                                                        3
                                                    </span>
                                                    <h3 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                                                        Book Your Appointment
                                                    </h3>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-300">
                                                    Schedule a virtual
                                                    consultation at a time that
                                                    works for you. Add details
                                                    about your symptoms or
                                                    concerns to help your doctor
                                                    prepare.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="hidden md:block absolute left-1/2 top-6 -ml-3">
                                            <div className="w-6 h-6 rounded-full bg-primary border-4 border-white dark:border-gray-800"></div>
                                        </div>
                                        <div className="md:w-1/2 md:pl-8"></div>
                                    </div>
                                </div>

                                {/* Step 4 */}
                                <div className="relative">
                                    <div className="md:flex items-center">
                                        <div className="md:w-1/2 md:pr-8"></div>
                                        <div className="hidden md:block absolute left-1/2 top-6 -ml-3">
                                            <div className="w-6 h-6 rounded-full bg-primary border-4 border-white dark:border-gray-800"></div>
                                        </div>
                                        <div className="md:w-1/2 md:pl-8">
                                            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
                                                <div className="flex items-center mb-4">
                                                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white text-sm font-medium">
                                                        4
                                                    </span>
                                                    <h3 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                                                        Consult & Receive Care
                                                    </h3>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-300">
                                                    Connect with your doctor
                                                    through a secure video call.
                                                    Discuss your health
                                                    concerns, receive diagnoses,
                                                    prescriptions, and follow-up
                                                    instructions.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 5 */}
                                <div className="relative">
                                    <div className="md:flex items-center">
                                        <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
                                            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
                                                <div className="flex items-center mb-4">
                                                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white text-sm font-medium">
                                                        5
                                                    </span>
                                                    <h3 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                                                        Manage Your Health
                                                    </h3>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-300">
                                                    Access your health records,
                                                    order medications, schedule
                                                    follow-ups, and track your
                                                    progress all through the
                                                    HealthKonek app.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="hidden md:block absolute left-1/2 top-6 -ml-3">
                                            <div className="w-6 h-6 rounded-full bg-primary border-4 border-white dark:border-gray-800"></div>
                                        </div>
                                        <div className="md:w-1/2 md:pl-8"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section
                id="testimonials"
                className="py-16 md:py-24 bg-white dark:bg-gray-900"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            What Our Users Say
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            HealthKonek has helped thousands of Filipinos get
                            the healthcare they need. Here's what some of them
                            have to say.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                            <div className="flex items-center mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className="h-5 w-5 text-yellow-400 fill-current"
                                    />
                                ))}
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-6">
                                "As someone living in a remote area of Palawan,
                                HealthKonek has been a lifesaver. I can now
                                consult with specialists without traveling for
                                hours. The doctors are professional and the app
                                is very easy to use!"
                            </p>
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                                        <span className="text-gray-600 dark:text-gray-200 font-medium">
                                            MR
                                        </span>
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        Maria Reyes
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Palawan
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                            <div className="flex items-center mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className="h-5 w-5 text-yellow-400 fill-current"
                                    />
                                ))}
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-6">
                                "With my busy schedule, I couldn't find time to
                                visit the doctor for my regular check-ups.
                                HealthKonek lets me talk to my doctor during my
                                lunch break without having to leave the office.
                                The prescription delivery is also very
                                convenient!"
                            </p>
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                                        <span className="text-gray-600 dark:text-gray-200 font-medium">
                                            JD
                                        </span>
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        Juan Dela Cruz
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Manila
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                            <div className="flex items-center mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className="h-5 w-5 text-yellow-400 fill-current"
                                    />
                                ))}
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-6">
                                "I manage my mother's diabetes, and HealthKonek
                                has made it so much easier. We can track her
                                blood sugar levels, share them with her doctor,
                                and adjust medications without frequent hospital
                                visits. The reminders feature is particularly
                                helpful!"
                            </p>
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                                        <span className="text-gray-600 dark:text-gray-200 font-medium">
                                            AS
                                        </span>
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        Ana Santos
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Cebu
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-20 bg-primary">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white">
                            Ready to take control of your health?
                        </h2>
                        <p className="mt-4 text-lg text-white/90">
                            Join thousands of Filipinos who are already
                            benefiting from accessible, affordable, and
                            convenient healthcare with HealthKonek.
                        </p>
                        <div className="mt-10">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-primary bg-white rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                            >
                                Get Started Now
                                <ArrowRight
                                    className="ml-2 h-5 w-5"
                                    aria-hidden="true"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="text-xl font-bold mb-4">
                                HealthKonek
                            </div>
                            <p className="text-gray-400 text-sm">
                                Making quality healthcare accessible to all
                                Filipinos, anytime, anywhere.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-4">
                                Services
                            </h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li>
                                    <Link href="#" className="hover:text-white">
                                        Online Consultations
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-white">
                                        Medicine Delivery
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-white">
                                        Health Records
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-white">
                                        Symptom Checker
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-4">
                                Company
                            </h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li>
                                    <Link href="#" className="hover:text-white">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-white">
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-white">
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-white">
                                        Press
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-4">
                                Contact
                            </h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li>support@healthkonek.ph</li>
                                <li>+63 2 8888 8888</li>
                                <li>
                                    123 Bonifacio Global City
                                    <br />
                                    Taguig, Metro Manila
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-gray-700 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            &copy; {new Date().getFullYear()} HealthKonek. All
                            rights reserved.
                        </p>
                        <div className="mt-4 sm:mt-0 flex space-x-6">
                            <Link
                                href="#"
                                className="text-gray-400 hover:text-white"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-400 hover:text-white"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-400 hover:text-white"
                            >
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
