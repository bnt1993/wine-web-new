import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateChatResponse = async (message: string, history: string[]): Promise<string> => {
  try {
    const systemPrompt = `
      Bạn là một chuyên gia tư vấn (Sommelier/Lương y) về các loại rượu ngâm dược liệu cổ truyền Việt Nam của thương hiệu "Tam Tửu".
      Phong cách trả lời: Lịch sự, chuyên nghiệp, am hiểu sâu sắc về y học cổ truyền, sử dụng ngôn từ trang trọng nhưng gần gũi.
      Nhiệm vụ: Tư vấn cho khách hàng về công dụng, cách dùng, và gợi ý sản phẩm phù hợp (Đông trùng, Nhân sâm, Táo mèo, Chuối hột).
      Lưu ý: Luôn nhắc nhở khách hàng "Uống rượu có trách nhiệm" và sản phẩm không phải là thuốc.
      Nếu khách hỏi về giá, hãy gợi ý họ xem chi tiết trên danh mục sản phẩm.
    `;

    const model = 'gemini-3-flash-preview';
    
    // Combine history and current message for simple context context
    const fullPrompt = `${systemPrompt}\n\nLịch sử chat:\n${history.join('\n')}\n\nKhách hàng: ${message}\nChuyên gia:`;

    const response = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
    });

    return response.text || "Xin lỗi, hiện tại tôi đang bận pha chế. Vui lòng để lại tin nhắn sau.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Hệ thống tư vấn đang bảo trì. Quý khách vui lòng liên hệ hotline 1900 xxxx để được hỗ trợ nhanh nhất.";
  }
};