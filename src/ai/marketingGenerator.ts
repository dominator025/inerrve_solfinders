import { callGemini, isAIDemoMode } from './gemini';

interface MarketingInput {
    productName: string;
    craftType: string;
    platform: string;
    tone?: string;
}

interface MarketingOutput {
    caption: string;
    hashtags: string[];
    callToAction: string;
}

const DEMO_CAPTIONS: Record<string, (input: MarketingInput) => MarketingOutput> = {
    instagram: (input) => ({
        caption: `✨ Meet the magic of handmade ${input.craftType.toLowerCase()} ✨\n\nEvery ${input.productName} tells a story of ancient traditions, skilled hands, and boundless creativity. From the workshops of India's master artisans to your home — this is craftsmanship at its finest.\n\n🎨 Handcrafted with love\n🌿 Made from natural materials\n🇮🇳 Supporting local artisan communities\n\nTap the link in bio to shop this beauty! 🛍️`,
        hashtags: [
            `#${input.craftType.replace(/\s/g, '')}`, '#Handmade', '#IndianCrafts',
            '#ArtisanMade', '#SupportLocal', '#CulturalHeritage', '#MadeInIndia',
            '#HandmadeWithLove', '#TraditionalCrafts', '#CraftConnect',
            '#ShopHandmade', '#EthicalFashion',
        ],
        callToAction: '🛒 Shop now — Link in bio!',
    }),
    facebook: (input) => ({
        caption: `🎨 Discover the Beauty of Handmade ${input.craftType}\n\nOur ${input.productName} is more than just a product — it's a piece of India's rich cultural heritage, handcrafted by skilled artisans who have mastered their craft over generations.\n\n✅ 100% Handmade\n✅ Premium Natural Materials\n✅ Directly Supporting Artisan Communities\n✅ Each Piece is Unique\n\nBring home a piece of tradition and make a difference in an artisan's life. 💛`,
        hashtags: [
            `#${input.craftType.replace(/\s/g, '')}`, '#SupportArtisans',
            '#HandmadeInIndia', '#CulturalCrafts', '#ShopWithPurpose',
        ],
        callToAction: '🛍️ Order yours today — Click the link to shop!',
    }),
    twitter: (input) => ({
        caption: `Every ${input.productName} carries centuries of tradition 🇮🇳\n\nHandcrafted by India's master artisans, this ${input.craftType.toLowerCase()} piece is a celebration of heritage and human skill.\n\nSupport local. Shop handmade. 🤝`,
        hashtags: ['#Handmade', '#IndianCrafts', '#ArtisanMade', '#CraftConnect'],
        callToAction: 'Shop now 👉',
    }),
    whatsapp: (input) => ({
        caption: `🙏 Namaste!\n\nCheck out this beautiful handmade ${input.productName}! 🎨\n\nIt's made by talented Indian artisans using traditional ${input.craftType.toLowerCase()} techniques. Every piece is unique and tells a story of our rich cultural heritage.\n\n🌿 100% Handmade\n💝 Perfect as a gift\n🇮🇳 Made in India\n\nInterested? Reply to this message!`,
        hashtags: [],
        callToAction: 'Reply YES to order!',
    }),
};

export async function generateMarketingCaption(input: MarketingInput): Promise<MarketingOutput> {
    if (isAIDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const generator = DEMO_CAPTIONS[input.platform] || DEMO_CAPTIONS.instagram;
        return generator(input);
    }

    const prompt = `Generate a ${input.platform} marketing post for an Indian handmade craft product:

Product: ${input.productName}
Craft Type: ${input.craftType}
Platform: ${input.platform}
Tone: ${input.tone || 'warm, cultural, inspiring'}

Return JSON with:
1. "caption": Platform-optimized marketing caption with emojis
2. "hashtags": Array of relevant hashtags
3. "callToAction": A compelling call-to-action line

Return ONLY valid JSON.`;

    const response = await callGemini(prompt);

    try {
        return JSON.parse(response);
    } catch {
        const generator = DEMO_CAPTIONS[input.platform] || DEMO_CAPTIONS.instagram;
        return generator(input);
    }
}
