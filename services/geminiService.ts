import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_API_KEY 
});

export const generateChatResponse = async (
  message: string, 
  history: string[]
): Promise<string> => {
  try {
    const systemPrompt = `
Bạn là một chuyên gia tư vấn (Sommelier/Lương y) về các loại rượu ngâm dược liệu cổ truyền Việt Nam của thương hiệu "Tam Tửu".
Phong cách trả lời: Lịch sự, chuyên nghiệp, am hiểu sâu sắc về y học cổ truyền.
Luôn nhắc: Uống rượu có trách nhiệm, sản phẩm không phải thuốc.
`;

    const model = "gemini-3-flash-preview";

    const fullPrompt = `
${systemPrompt}

Lịch sử:
${history.join("\n")}

Khách: ${message}
Chuyên gia:
`;

    const response = await ai.models.generateContent({
      model,
      contents: fullPrompt,
    });

    return response.text || "Xin lỗi, hệ thống đang bận.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Hệ thống đang bảo trì, vui lòng thử lại sau.";
  }
};
