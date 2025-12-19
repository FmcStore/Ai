export default async function handler(req, res) {
    // 1. Proteksi: Hanya izinkan metode GET
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Metode tidak diizinkan' });
    }

    const { query, webSearch, chatId } = req.query;

    if (!query) {
        return res.status(400).json({ error: "Query kosong" });
    }

    try {
        // 2. Sembunyikan API utama di variabel ini
        const targetUrl = new URL('https://api.fmcstore.web.id/api/ai/quillbot');
        targetUrl.searchParams.append('query', query);
        targetUrl.searchParams.append('webSearch', webSearch || 'false');
        if (chatId) targetUrl.searchParams.append('chatId', chatId);

        const response = await fetch(targetUrl.toString(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Vercel Serverless)'
            }
        });

        const data = await response.json();

        // 3. Kirim data ke frontend tanpa membocorkan URL asli
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ error: "Gagal memproses permintaan ke API pusat" });
    }
}
