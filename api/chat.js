export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { query, webSearch, chatId } = req.query;
    const TARGET_API = "https://api.fmcstore.web.id/api/ai/quillbot";
    
    try {
        let targetUrl = `${TARGET_API}?query=${encodeURIComponent(query)}&webSearch=${webSearch || 'false'}`;
        if (chatId && chatId !== 'null') targetUrl += `&chatId=${chatId}`;

        const apiResponse = await fetch(targetUrl);
        const data = await apiResponse.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Server Error' });
    }
}
