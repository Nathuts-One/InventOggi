export const initialData = {
  categories: [
    { id: 1, name: 'Açai' },
    { id: 2, name: 'Clássicos' },
    { id: 3, name: 'Giratto' },
    { id: 4, name: 'Delícia' },
    { id: 5, name: 'Especial' },
    { id: 6, name: 'Fazenda' },
    { id: 7, name: 'Festa' },
    { id: 8, name: 'Frutos' },
    { id: 9, name: 'Hello Kitty' },
    { id: 10, name: 'Duo' },
    { id: 11, name: 'Zero' },
    { id: 12, name: 'Duetto' },
    { id: 13, name: 'Seleções' },
    { id: 14, name: 'Tradicional' },
    { id: 15, name: 'Sensa' },
    { id: 16, name: 'Top Sundae' },
    { id: 17, name: 'Disney' },
    { id: 19, name: 'Regionais' },
    { id: 18, name: 'Espaços Vazios' },
  ],
  products: [
    // Açai
    { id: 1, name: 'ACAI BANANA', type: 'Pote 180ml', categoryId: 1, count: 0 },
    { id: 2, name: 'ACAI GUARANA', type: 'Pote 180ml', categoryId: 1, count: 0 },
    { id: 3, name: 'ACAI', type: 'Pote 1,5L', categoryId: 1, count: 0 },

    // Clássicos
    { id: 4, name: 'BRIGADEIRO', type: 'Picolé', categoryId: 2, count: 0 },
    { id: 5, name: 'BOMBOM NO PALITO', type: 'Picolé', categoryId: 2, count: 0 },

    // Giratto
    { id: 6, name: 'CROCANTE', type: 'Cone', categoryId: 3, count: 0 },
    { id: 7, name: 'AVELÃ TRUFADO', type: 'Cone', categoryId: 3, count: 0 },
    { id: 8, name: 'LEITE TRUFADO', type: 'Cone', categoryId: 3, count: 0 },

    // Delícia
    { id: 9, name: 'ABAC.VINHO', type: 'Picolé', categoryId: 4, count: 0 },
    { id: 10, name: 'MOUS.MARAC.', type: 'Picolé', categoryId: 4, count: 0 },
    { id: 11, name: 'CHOCOLATE', type: 'Picolé', categoryId: 4, count: 0 },
    { id: 12, name: 'TORTA DE LIMAO', type: 'Picolé', categoryId: 4, count: 0 },
    { id: 13, name: 'QUEIJO C/GOIAB.', type: 'Picolé', categoryId: 4, count: 0 },
    { id: 14, name: 'BEIJINHO', type: 'Picolé', categoryId: 4, count: 0 },
    { id: 15, name: 'COOKIES', type: 'Picolé', categoryId: 4, count: 0 },
    { id: 16, name: 'YOG. FRUTAS VERM', type: 'Picolé', categoryId: 4, count: 0 },
    { id: 17, name: 'TORTA DE LIMAO', type: 'Pote 2L', categoryId: 4, count: 0 },
    { id: 18, name: 'PAMONHA', type: 'Pote 2L', categoryId: 4, count: 0 },

    // Especial
    { id: 19, name: 'PANETONE', type: 'Picolé', categoryId: 5, count: 0 },

    // Fazenda
    { id: 20, name: 'DOCE DE LEITE', type: 'Picolé', categoryId: 6, count: 0 },
    { id: 21, name: 'MILHO VERDE', type: 'Picolé', categoryId: 6, count: 0 },
    { id: 22, name: 'AMENDOIM', type: 'Picolé', categoryId: 6, count: 0 },
    { id: 23, name: 'COCO BRANCO', type: 'Picolé', categoryId: 6, count: 0 },
    { id: 24, name: 'COCO QUEIM.', type: 'Picolé', categoryId: 6, count: 0 },
    { id: 25, name: 'MORANGO', type: 'Picolé', categoryId: 6, count: 0 },

    // Festa
    { id: 26, name: 'MELANCIA', type: 'Picolé', categoryId: 7, count: 0 },
    { id: 27, name: 'FRT. VERMELHAS', type: 'Picolé', categoryId: 7, count: 0 },
    { id: 28, name: 'LT. CONDENSADO', type: 'Picolé', categoryId: 7, count: 0 },
    { id: 29, name: 'ACHOCOLATADO', type: 'Picolé', categoryId: 7, count: 0 },
    { id: 30, name: 'IOGURTE', type: 'Picolé', categoryId: 7, count: 0 },

    // Frutos
    { id: 31, name: 'ACAI', type: 'Picolé', categoryId: 8, count: 0 },
    { id: 32, name: 'LIMAO', type: 'Picolé', categoryId: 8, count: 0 },
    { id: 33, name: 'MARACUJA', type: 'Picolé', categoryId: 8, count: 0 },
    { id: 34, name: 'UVA', type: 'Picolé', categoryId: 8, count: 0 },
    { id: 35, name: 'MORANGO AGUA', type: 'Picolé', categoryId: 8, count: 0 },
    { id: 36, name: 'ABACAXI', type: 'Picolé', categoryId: 8, count: 0 },
    { id: 89, name: 'MANGA', type: 'Picolé', categoryId: 8, count: 0 },
    { id: 90, name: 'GOIABA', type: 'Picolé', categoryId: 8, count: 0 },

    // Hello Kitty
    { id: 37, name: 'TUTTI FRUTTI', type: 'Picolé', categoryId: 9, count: 0 },
    { id: 38, name: 'GROSELHA', type: 'Picolé', categoryId: 9, count: 0 },
    { id: 39, name: 'PINTA LINGUA', type: 'Picolé', categoryId: 9, count: 0 },
    { id: 40, name: 'KIWI', type: 'Picolé', categoryId: 9, count: 0 },

    // Duo
    { id: 41, name: 'CHOCOLATE', type: 'Pote 1,5L', categoryId: 10, count: 0 },
    { id: 42, name: 'MORANGO', type: 'Pote 1,5L', categoryId: 10, count: 0 },

    // Zero
    { id: 43, name: 'NAPOLITANO', type: 'Pote 1,5L', categoryId: 11, count: 0 },
    { id: 44, name: 'AMENDOIM', type: 'Picolé', categoryId: 11, count: 0 },
    { id: 45, name: 'CHOCOLATE', type: 'Picolé', categoryId: 11, count: 0 },
    { id: 46, name: 'LIMAO', type: 'Picolé', categoryId: 11, count: 0 },
    { id: 47, name: 'UVA', type: 'Picolé', categoryId: 11, count: 0 },
    { id: 48, name: 'COCO', type: 'Picolé', categoryId: 11, count: 0 },
    { id: 49, name: 'MILHO VERDE', type: 'Picolé', categoryId: 11, count: 0 },
    { id: 50, name: 'ACAI', type: 'Picolé', categoryId: 11, count: 0 },

    // Duetto
    { id: 51, name: 'CHOC. TRUFADO', type: 'Pote 2L', categoryId: 12, count: 0 },
    { id: 52, name: 'MOUS. MARACUJA', type: 'Pote 2L', categoryId: 12, count: 0 },
    { id: 53, name: 'CHURROS DUETTO', type: 'Pote 2L', categoryId: 12, count: 0 },
    { id: 54, name: 'IOG. C/ FRUTAS VERM', type: 'Pote 2L', categoryId: 12, count: 0 },
    { id: 55, name: 'LEITINHO TRUFADO', type: 'Pote 2L', categoryId: 12, count: 0 },

    // Seleções
    { id: 56, name: 'CARIOCA', type: 'Pote 2L', categoryId: 13, count: 0 },
    { id: 57, name: 'FLOCOS', type: 'Pote 2L', categoryId: 13, count: 0 },
    { id: 58, name: 'COCO', type: 'Pote 2L', categoryId: 13, count: 0 },
    { id: 59, name: 'PASSAS AO RUM', type: 'Pote 2L', categoryId: 13, count: 0 },
    { id: 60, name: 'CHOCOLATE', type: 'Pote 2L', categoryId: 13, count: 0 },

    // Tradicional
    { id: 61, name: 'CREME', type: 'Pote 2L', categoryId: 14, count: 0 },
    { id: 62, name: 'MORANGO', type: 'Pote 2L', categoryId: 14, count: 0 },
    { id: 63, name: 'NAPOLITANO', type: 'Pote 2L', categoryId: 14, count: 0 },

    // Sensa
    { id: 64, name: 'CLÁSSICO', type: 'Picolé', categoryId: 15, count: 0 },
    { id: 65, name: 'CHOC. BRANCO', type: 'Picolé', categoryId: 15, count: 0 },
    { id: 66, name: 'MENTAI', type: 'Picolé', categoryId: 15, count: 0 },
    { id: 67, name: 'AMENDOIM', type: 'Picolé', categoryId: 15, count: 0 },
    { id: 68, name: 'BRIGADEIRO', type: 'Picolé', categoryId: 15, count: 0 },
    { id: 69, name: 'FRUTAS VERMELHAS', type: 'Picolé', categoryId: 15, count: 0 },
    { id: 70, name: 'DOCE DE LEITE', type: 'Picolé', categoryId: 15, count: 0 },
    { id: 71, name: 'MEIO AMARGO', type: 'Picolé', categoryId: 15, count: 0 },
    { id: 72, name: 'CLÁSSICO', type: 'Bombom', categoryId: 15, count: 0 },
    { id: 73, name: 'AÇAI', type: 'Bombom', categoryId: 15, count: 0 },

    // Top Sundae
    { id: 74, name: 'CHOCOLATE', type: 'Copo', categoryId: 16, count: 0 },
    { id: 75, name: 'MORANGO', type: 'Copo', categoryId: 16, count: 0 },
    { id: 76, name: 'DOCE DE LEITE', type: 'Copo', categoryId: 16, count: 0 },

    // Disney
    { id: 77, name: 'MICKEY', type: 'Picolé', categoryId: 17, count: 0 },
    { id: 78, name: 'MINNIE', type: 'Picolé', categoryId: 17, count: 0 },
    { id: 79, name: 'ARIEL', type: 'Picolé', categoryId: 17, count: 0 },
    { id: 80, name: 'JESSIE', type: 'Picolé', categoryId: 17, count: 0 },
    { id: 81, name: 'GWEN STACE', type: 'Picolé', categoryId: 17, count: 0 },
    { id: 82, name: 'HOMEM ARANHA', type: 'Picolé', categoryId: 17, count: 0 },

    // Regionais
    { id: 91, name: 'TAPIOCA', type: 'Picolé', categoryId: 19, count: 0 },
    { id: 92, name: 'GRAVIOLA', type: 'Picolé', categoryId: 19, count: 0 },
    { id: 93, name: 'CAJÁ', type: 'Picolé', categoryId: 19, count: 0 },
    { id: 94, name: 'CAJU', type: 'Picolé', categoryId: 19, count: 0 },
    { id: 95, name: 'CUPUAÇU', type: 'Picolé', categoryId: 19, count: 0 },

    // Espaços Vazios
    { id: 83, name: 'Caixa Vazia', type: 'Picolé', categoryId: 18, count: 0 },
    { id: 84, name: 'Caixa Vazia', type: 'Pote 2L', categoryId: 18, count: 0 },
    { id: 85, name: 'Caixa Vazia', type: 'Pote 1,5L', categoryId: 18, count: 0 },
    { id: 86, name: 'Caixa Vazia', type: 'Cone', categoryId: 18, count: 0 },
    { id: 87, name: 'Caixa Vazia', type: 'Copo', categoryId: 18, count: 0 },
    { id: 88, name: 'Caixa Vazia', type: 'Bombom', categoryId: 18, count: 0 },
  ],
}
