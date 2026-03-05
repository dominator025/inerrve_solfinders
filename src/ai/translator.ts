import { isAIDemoMode } from './gemini';

const TRANSLATION_API_KEY = import.meta.env.VITE_TRANSLATION_API_KEY || '';
const TRANSLATION_API_URL = 'https://translation.googleapis.com/language/translate/v2';

const DEMO_TRANSLATIONS: Record<string, Record<string, string>> = {
    hi: {
        'Welcome to CraftConnect AI': 'क्राफ्टकनेक्ट AI में आपका स्वागत है',
        'Empowering India\'s Artisans Through AI': 'AI के माध्यम से भारत के कारीगरों को सशक्त बनाना',
        'Discover Handmade Crafts': 'हस्तनिर्मित शिल्प खोजें',
        'Shop Now': 'अभी खरीदें',
        'Our Story': 'हमारी कहानी',
    },
    bn: {
        'Welcome to CraftConnect AI': 'ক্রাফ্টকানেক্ট AI-তে স্বাগতম',
        'Empowering India\'s Artisans Through AI': 'AI-এর মাধ্যমে ভারতের কারিগরদের ক্ষমতায়ন',
    },
    ta: {
        'Welcome to CraftConnect AI': 'CraftConnect AI-க்கு வரவேற்கிறோம்',
        'Empowering India\'s Artisans Through AI': 'AI மூலம் இந்தியாவின் கைவினைஞர்களை மேம்படுத்துதல்',
    },
};

export async function translateText(
    text: string,
    targetLang: string,
    sourceLang: string = 'en'
): Promise<string> {
    if (isAIDemoMode || !TRANSLATION_API_KEY) {
        await new Promise(resolve => setTimeout(resolve, 800));
        return DEMO_TRANSLATIONS[targetLang]?.[text] || `[${targetLang.toUpperCase()}] ${text}`;
    }

    try {
        const response = await fetch(`${TRANSLATION_API_URL}?key=${TRANSLATION_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                q: text,
                source: sourceLang,
                target: targetLang,
                format: 'text',
            }),
        });

        const data = await response.json();
        return data.data?.translations?.[0]?.translatedText || text;
    } catch (error) {
        console.error('Translation API error:', error);
        return text;
    }
}
