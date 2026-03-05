import { callGemini, isAIDemoMode } from './gemini';

interface ProductDescInput {
    productName: string;
    category: string;
    materials: string;
    craftType?: string;
    artisanLocation?: string;
}

interface ProductDescOutput {
    description: string;
    seoKeywords: string[];
    shortDescription: string;
}

export async function generateProductDescription(input: ProductDescInput): Promise<ProductDescOutput> {
    if (isAIDemoMode) {
        await new Promise(resolve => setTimeout(resolve, 1500));

        return {
            description: `Discover the timeless beauty of this handcrafted ${input.productName}. Meticulously created by skilled artisans${input.artisanLocation ? ` from ${input.artisanLocation}` : ''}, this ${input.category} piece showcases the finest traditions of Indian craftsmanship. Made with ${input.materials || 'premium natural materials'}, each detail reflects hours of dedicated artistry and a deep connection to cultural heritage.\n\nThis piece is perfect for those who appreciate authentic handmade goods that tell a story. Whether as a centerpiece for your home, a thoughtful gift, or a collector's item, it brings warmth, character, and the irreplaceable charm of human touch to any space.\n\nEach item is one-of-a-kind, bearing the unique marks of its creator's hands — no two pieces are exactly alike.`,
            seoKeywords: [
                `handmade ${input.category}`,
                `Indian ${input.category}`,
                `artisan ${input.productName.toLowerCase()}`,
                'handcrafted India',
                `traditional ${input.craftType || input.category}`,
                'buy handmade online',
                'Indian handicrafts',
                'authentic crafts',
                `${input.artisanLocation || 'Indian'} artisan`,
                'cultural heritage crafts',
            ],
            shortDescription: `Handcrafted ${input.productName} — authentic ${input.category} made with traditional techniques and ${input.materials || 'natural materials'}.`,
        };
    }

    const prompt = `Generate product listing content for an Indian handmade craft:

Product: ${input.productName}
Category: ${input.category}
Materials: ${input.materials}
${input.craftType ? `Craft Type: ${input.craftType}` : ''}
${input.artisanLocation ? `Artisan Location: ${input.artisanLocation}` : ''}

Return JSON with:
1. "description": Detailed product description (2-3 paragraphs, emotionally engaging, SEO-friendly)
2. "seoKeywords": Array of 10 SEO keywords
3. "shortDescription": One-line product summary

Return ONLY valid JSON.`;

    const response = await callGemini(prompt);

    try {
        return JSON.parse(response);
    } catch {
        return {
            description: `Beautiful handcrafted ${input.productName}, made with care and tradition.`,
            seoKeywords: ['handmade', 'Indian crafts', input.category],
            shortDescription: `Handmade ${input.productName}`,
        };
    }
}
