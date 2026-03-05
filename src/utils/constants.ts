export const CRAFT_CATEGORIES = [
    { id: 'handloom', label: 'Handloom', icon: '🧵', color: '#C75B39' },
    { id: 'pottery', label: 'Pottery', icon: '🏺', color: '#E8A838' },
    { id: 'jewelry', label: 'Jewelry', icon: '💍', color: '#D4A853' },
    { id: 'woodcraft', label: 'Woodcraft', icon: '🪵', color: '#5C3D2E' },
    { id: 'painting', label: 'Painting', icon: '🎨', color: '#2D5F3B' },
    { id: 'metalwork', label: 'Metalwork', icon: '⚒️', color: '#7A5A4A' },
    { id: 'embroidery', label: 'Embroidery', icon: '🪡', color: '#B7472A' },
    { id: 'bamboo', label: 'Bamboo Craft', icon: '🎋', color: '#3D7F4F' },
] as const;

export const INDIAN_STATES = [
    'Rajasthan', 'Gujarat', 'West Bengal', 'Uttar Pradesh', 'Kashmir',
    'Tamil Nadu', 'Kerala', 'Madhya Pradesh', 'Odisha', 'Assam',
    'Bihar', 'Maharashtra', 'Karnataka', 'Andhra Pradesh', 'Manipur',
    'Nagaland', 'Telangana', 'Punjab', 'Himachal Pradesh', 'Jharkhand',
] as const;

export const SOCIAL_PLATFORMS = [
    { id: 'instagram', label: 'Instagram', icon: '📸' },
    { id: 'facebook', label: 'Facebook', icon: '📘' },
    { id: 'twitter', label: 'Twitter/X', icon: '🐦' },
    { id: 'whatsapp', label: 'WhatsApp', icon: '💬' },
] as const;

export const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी (Hindi)' },
    { code: 'bn', label: 'বাংলা (Bengali)' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
    { code: 'te', label: 'తెలుగు (Telugu)' },
    { code: 'mr', label: 'मराठी (Marathi)' },
    { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
    { code: 'ml', label: 'മലയാളം (Malayalam)' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
] as const;

export const HOW_IT_WORKS_STEPS = [
    {
        step: 1,
        title: 'Create Your Profile',
        description: 'Sign up as an artisan and share your craft story with the world.',
        icon: '✨',
    },
    {
        step: 2,
        title: 'AI-Powered Storytelling',
        description: 'Let AI help you craft compelling stories and descriptions for your products.',
        icon: '🤖',
    },
    {
        step: 3,
        title: 'List Your Products',
        description: 'Upload your handmade creations with auto-generated descriptions and SEO tags.',
        icon: '📦',
    },
    {
        step: 4,
        title: 'Reach Global Buyers',
        description: 'Connect with buyers worldwide who love authentic handmade crafts.',
        icon: '🌍',
    },
] as const;
