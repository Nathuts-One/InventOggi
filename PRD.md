

# Documento de Requisitos de Produto (PRD) - InventoryFlow Sorveteria

**Versão:** 1.0 (MVP) | **Status:** To do | **Responsável:** Renato Santos

---

## 1. Visão Geral do Problema
O processo atual de levantamento de estoque e pedido de compra é **manual (analógico)**, realizado via cadernos. Isso gera:
* **Inconsistência de dados:** Erros de contagem e transcrição.
* **Ineficiência operacional:** Tempo elevado para consolidar o pedido.
* **Ruptura ou Excesso:** Pedidos baseados em percepção, não em dados reais, agravado por um ERP/PDV com inventário não confiável.

## 2. Objetivo do Produto
Desenvolver um **MVP (Mínimo Produto Viável)** focado em mobilidade para substituir o caderno, garantindo que a contagem física seja rápida, precisa e gere um relatório instantâneo para o setor de compras.

---

## 3. Público-Alvo
* Gerentes de loja e operadores de estoque de sorveterias.

---

## 4. Requisitos Funcionais (Escopo do MVP)

### RF01: Contagem por Incremeto/Decremento
O sistema deve permitir adicionar ou remover unidades (+1/-1) através de botões táteis otimizados para uso com uma única mão.

### RF02: CRUD Categorias  
Adicionar, Editar, Excluir Categorias.
Form: Nome da Categoria

### RF03: CRUD Produtos  
Adicionar, Editar, Excluir Categorias.
Form: Nome da Categoria

### RF04: Agrupamento por Categorias
Os produtos devem ser organizados em "Linhas" (categorias colapsáveis) para evitar poluição visual e acelerar a navegação.

### RF05: Busca com Auto-complete e Reset
* Filtro de busca em tempo real que expande categorias automaticamente ao encontrar um termo.
* Botão de limpeza rápida ("X") para retornar ao estado original da lista.

### RF06: Gestão de Espaços Vazios (Logística)
O item "Caixas Vazias" deve ser tratado como um SKU de contagem prioritária para determinar o volume de reposição imediata.

### RF07: Relatórios e Exportação
Geração de um relatório contendo a data, hora, o levantamento detalhado e o total geral. O relatório deve ser gerado em uma outra tela formatado como um relatório e com as opções de imprimir PDF ou enviar por whatsapp.

### RF08: Persistência de Dados Offline
Os dados de contagem devem ser salvos localmente (`LocalStorage`) para que não se percam caso a aplicação seja fechada ou ocorra queda de conexão.

---

## 5. Requisitos Não Funcionais

* **Usabilidade:** Interface *Mobile-First* com botões de ação situados na zona de alcance do polegar.
* **Performance:** Renderização instantânea sem necessidade de carregamento de páginas (SPA - Single Page Application).
* **Compatibilidade:** Funcionar em navegadores modernos (Chrome/Safari) sem instalação de pacotes.

---

## 6. Arquitetura Técnica

| Componente | Tecnologia |
| :--- | :--- |
| **Frontend** | React + Vite / Shadcn UI + Tailwind CSS (Styling) / Vanilla JS (Lógica) |
| **Armazenamento** | Browser LocalStorage |
| **Distribuição** | Web App / PWA (Progressive Web App) |
| **Banco de Dados** | Supabase |
| **Versionamento** | Github |
| **Hospedagem** | Vercel  |

---

## 7. Roadmap de Evolução (Próximas Fases)

### Fase 2: Inteligência e Previsão
* **Sugestão de Compra:** Implementar lógica de "Estoque Mínimo" vs "Estoque Atual" para gerar quantidades sugeridas automaticamente.
* **Dashboard de Histórico:** Salvar contagens passadas para análise de giro de estoque por sabor.

### Fase 3: Integração e Automação
* **Visão Computacional:** Módulo de foto para contagem automática de pilhas de caixas.
* **API Integration:** Sincronização automática com o ERP (caso o acesso seja liberado) ou exportação em .CSV para upload manual.

---

## 8. Critérios de Sucesso
1.  Redução do tempo de levantamento de estoque em pelo menos 50%.
2.  Eliminação completa do uso de papel no processo de conferência.
3.  Zero perda de dados durante a contagem por fechamento acidental da aplicação.

---