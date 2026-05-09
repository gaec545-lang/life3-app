// modules/ai_tutor.js
const AITutor = {
  apiKey: "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",
  model: "llama-3.1-8b-instant",

  async callGroq(messages) {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: this.model,
          messages: messages,
          temperature: 0.3,
          max_tokens: 150
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Groq API Error (${response.status}):`, errorData);
        return `Error del Tutor (${response.status}): ${errorData.error.message || response.statusText}`;
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (e) {
      console.error("Groq API Fetch Error:", e);
      return "Error de conexión: No se pudo contactar al servidor de Groq. Verifica tu internet.";
    }
  },

  async explainError(topic, question, userAnswer, correctAnswer) {
    const sysMsg = "Eres un profesor de inglés de alto nivel. Sé conciso, alentador y profesional. Explica en 1 o 2 oraciones (en español) por qué la respuesta del usuario es incorrecta y por qué la correcta lo es, basándote en la regla gramatical.";
    const userMsg = `Tema: ${topic}\nPregunta: ${question}\nRespuesta del usuario: ${userAnswer}\nRespuesta correcta: ${correctAnswer}\nExplica el error brevemente.`;
    
    return await this.callGroq([
      { role: "system", content: sysMsg },
      { role: "user", content: userMsg }
    ]);
  },

  async generateMoreExamples(topic, description, rulesText) {
    const sysMsg = "Eres un diseñador instruccional experto. Devuelve 3 ejemplos nuevos de la regla gramatical especificada en formato JSON estricto: [{\"en\": \"...\", \"es\": \"...\", \"highlight\": \"...\"}]. Solo devuelve el JSON, nada de texto extra.";
    const userMsg = `Genera 3 ejemplos originales de nivel B1 para el tema '${topic}'.\nContexto: ${description}\nReglas: ${rulesText}`;
    
    try {
      const responseText = await this.callGroq([
        { role: "system", content: sysMsg },
        { role: "user", content: userMsg }
      ]);
      return JSON.parse(responseText.match(/\[.*\]/s)[0]);
    } catch (e) {
      console.error("Parse Error from AI:", e);
      return [];
    }
  }
};
