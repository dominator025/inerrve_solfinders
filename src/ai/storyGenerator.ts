import { callGemini, isAIDemoMode } from './gemini';

interface StoryInput {
    craftType: string;
    location: string;
    materials: string;
    inspiration: string;
    artisanName?: string;
}

interface StoryOutput {
    story: string;
    productDescription: string;
    marketingCaption: string;
}

const DEMO_STORIES: Record<string, StoryOutput> = {
    default: {
        story: `In the heart of India, where ancient traditions meet the morning sun, a master artisan carries forward a legacy that spans generations. Every creation begins with a whisper of inspiration — drawn from the colors of the landscape, the rhythm of daily life, and the sacred stories passed down through centuries.\n\nThe workshop comes alive at dawn, as skilled hands transform raw materials into objects of extraordinary beauty. Each piece is not merely a product but a poem written in the language of craft — carrying within it the warmth of human touch, the patience of countless hours, and the pride of a cultural heritage that refuses to be forgotten.\n\nThis is more than craftsmanship; it is a living testament to India's artistic soul, a bridge between the ancient and the modern, inviting the world to appreciate the beauty of the handmade.`,
        productDescription: `Handcrafted with meticulous attention to detail, this exquisite piece represents the finest traditions of Indian artisanship. Made using time-honored techniques and premium natural materials, each item is unique — bearing the distinctive marks of its creator's skilled hands. A perfect blend of traditional aesthetics and contemporary appeal, this piece brings authentic Indian heritage into your living space. Ideal for collectors, cultural enthusiasts, and anyone who appreciates the irreplaceable value of handmade artistry.`,
        marketingCaption: `✨ Every handmade piece tells a story of heritage, patience, and love. Discover authentic Indian craftsmanship that connects you to centuries of tradition. 🇮🇳\n\n🛍️ Shop now and bring home a piece of India's artistic legacy.\n\n#Handmade #IndianCrafts #ArtisanMade #CulturalHeritage #SupportArtisans #MadeInIndia #CraftConnect`,
    },
};

export async function generateCraftStory(input: StoryInput): Promise<StoryOutput> {
    if (isAIDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 2000));

        const story = `In the vibrant land of ${input.location}, where tradition weaves itself into everyday life, the art of ${input.craftType.toLowerCase()} has been a cherished tradition for centuries. ${input.artisanName ? `${input.artisanName}, a` : 'A'} master artisan carries forward this legacy with unwavering devotion.\n\nWorking with ${input.materials || 'natural materials sourced from the local earth'}, each creation is born from a deep connection to the land and its people. The inspiration drawn from ${input.inspiration || 'the rich cultural tapestry of the region'} breathes life into every piece.\n\nEvery item crafted in this workshop tells a story — of patience, of skill passed from one generation to the next, and of an unbreakable bond between the artisan and their craft. ${input.craftType} from ${input.location} is not just an art form; it is the heartbeat of a community, a celebration of identity, and a gift to the world.\n\nWhen you hold one of these pieces, you hold centuries of wisdom, love, and cultural pride in your hands.`;

        const productDescription = `Exquisite handcrafted ${input.craftType.toLowerCase()} piece from ${input.location}, made using traditional techniques and ${input.materials || 'premium natural materials'}. Each item is uniquely crafted by skilled artisans who have perfected their art over generations. This piece beautifully captures the essence of ${input.location}'s rich artistic heritage, making it a perfect addition to any collection or a meaningful gift that celebrates India's cultural legacy.`;

        const marketingCaption = `✨ From the heart of ${input.location} — authentic handcrafted ${input.craftType.toLowerCase()} that carries centuries of tradition in every detail. 🇮🇳\n\nMade with ${input.materials || 'natural materials'} by master artisans who pour their soul into every creation.\n\n🛍️ Own a piece of heritage. Shop now!\n\n#${input.craftType.replace(/\s/g, '')} #${input.location.replace(/\s/g, '')} #Handmade #IndianCrafts #ArtisanMade #CraftConnect`;

        return { story, productDescription, marketingCaption };
    }

    const prompt = `You are a cultural storytelling expert for Indian handmade crafts. Generate content for an artisan's profile:

Craft Type: ${input.craftType}
Location: ${input.location}
Materials Used: ${input.materials}
Inspiration: ${input.inspiration}
${input.artisanName ? `Artisan Name: ${input.artisanName}` : ''}

Generate the following in JSON format:
1. "story": An emotional, compelling cultural story about this craft (3-4 paragraphs, rich with cultural details)
2. "productDescription": A professional product description (1 paragraph, SEO-friendly)
3. "marketingCaption": A social media marketing caption with emojis and hashtags

Return ONLY valid JSON.`;

    const response = await callGemini(prompt);

    try {
        const parsed = JSON.parse(response);
        return {
            story: parsed.story || DEMO_STORIES.default.story,
            productDescription: parsed.productDescription || DEMO_STORIES.default.productDescription,
            marketingCaption: parsed.marketingCaption || DEMO_STORIES.default.marketingCaption,
        };
    } catch {
        return DEMO_STORIES.default;
    }
}
