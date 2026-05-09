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
    const sysMsg = `Eres un tutor de inglés personal de élite. 
    Tu objetivo es detectar por qué el usuario falló. 
    REGLA CRÍTICA: Si la respuesta del usuario es casi idéntica a la correcta (ej. solo cambia una mayúscula o un espacio), felicítalo primero pero menciona la sutil diferencia. 
    Si el error es gramatical, explica la regla de forma narrativa y amena. 
    Máximo 3 oraciones. Habla directamente al usuario.`;
    
    const userMsg = `Tema: ${topic}\nPregunta: ${question}\nRespuesta del usuario: ${userAnswer}\nRespuesta correcta: ${correctAnswer}\nExplica el error brevemente de forma humana.`;
    
    return await this.callGroq([
      { role: "system", content: sysMsg },
      { role: "user", content: userMsg }
    ]);
  },

  async explainLessonNarrative(topic, description, rules) {
    const sysMsg = "Eres un profesor de inglés entusiasta y experto en narrativa. Explica el tema gramatical de forma amena, como si estuvieras contando una historia o dando un consejo de vida. Usa un tono 'Premium' y profesional pero muy cercano. Estructura el texto en 2 o 3 párrafos cortos.";
    const userMsg = `Tema: ${topic}\nDescripción: ${description}\nReglas: ${JSON.stringify(rules)}\nGenera una explicación narrativa y profunda.`;
    
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
