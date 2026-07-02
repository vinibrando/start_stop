# Handover — Digital OEE / Smart Factory Prototype

## O que é este projeto

Protótipo estático (HTML/CSS/JS puro, sem build step, Tailwind via CDN) de um sistema de acompanhamento de produção ("Digital OEE / Smart Factory"). Não há backend — todos os dados vêm de arrays JS hardcoded no próprio arquivo (`UNITS`, `RESOURCES`, `WORK_ORDERS`, `PLANT_UNITS`, etc).

### Arquivos principais

- **`index.html`** — arquivo principal e único que deve ser usado a partir de agora. Contém:
  - **Production Overview**: cards de unidade, timeline/gantt de work orders.
  - **PWO Assignment**: tela de atribuição de Production Work Orders a Resources (3 colunas: PWO / Resources / Review & Confirm).
  - **Assignment v2**: variante experimental da tela acima, com drag-and-drop (ver seção própria abaixo).
  - **PWO Control Panel**: modal de controle de work order em andamento (pause/end/etc).
- **`line-monitoring-plant.html`** — dashboard "Plant Overview" (visão por unidade/linha, KPIs, Needs Attention, ATLAS Insights, causal codes).
- **`line-monitoring.html`** — tela de monitoramento de uma linha específica (não mexemos muito nela nesta sessão).
- ~~`production-work-order-v1.html`~~ — **apagado nesta sessão**. Era uma cópia desatualizada/duplicada da tela de PWO Assignment que causou confusão (mudanças feitas lá não apareciam quando o usuário testava pelo `index.html`). **Não recriar.** `index.html` é a fonte única de verdade agora.

### Preview local

Servido via `python -m http.server` na porta 8124, configurado em `.claude/launch.json` (nome `static-files-preview`). Também pode ser aberto direto via `file:///.../index.html`.

---

## Últimas alterações feitas (nesta sessão)

### `line-monitoring-plant.html` (Plant Overview)
- Redesenho completo do card "Needs Attention": mini-métricas (OEE/Scrap) com target, causal code destacado (azul = Planned Maintenance, roxo = Start/Stop) acima das métricas, sem cards de KPI pesados.
- Accordion de units com animação de abrir/fechar (`grid-template-rows` trick) e comportamento exclusivo (abrir um fecha o outro) — implementado sem re-render completo do DOM (só toggle de classe) para a transição funcionar.
- Linha AFA10 fixada como primeira no accordion da unidade AFA.
- Status "Blocked" (vermelho) para NFA1/PKG Bulk, sem usar âmbar em nível de linha.
- Scrollbars finas, sem setas, visíveis só no hover.
- Painel ATLAS Insights sem card colorido de fundo (texto livre + ícone sempre centralizado verticalmente), com leve sombra em vez de cor.
- Removida a linha "Shift 2 · Today, MTD · Updated 2 min ago · Auto-refresh on" do cabeçalho.

### `index.html` (PWO Assignment)
- **Modal PWO Control Panel**: removido o bloco "Next scheduled break" (HTML + CSS + JS) — estava mais atrapalhando que ajudando.
- **Ordem padronizada em todos os lugares**: sempre `SKU, Batch, PWO` (função `pwoLineHtml`/`pwoLineText`/`woInfo`).
- **Card de Resource**: mostra Current PWO e Next Assigned PWO com SKU/Batch/Material quando disponíveis (antes só mostrava o número do PWO).
- **Badge "+N"** ao lado do Next Assigned PWO quando o resource já tem mais de um PWO "empilhado" (tooltip mostra qual é o adicional). Estilo: fundo cinza claro (`#F0F1F3`), texto preto 80% opacidade, peso regular.
- **Assign flow**: se o resource não tinha Next Assigned PWO, o novo assign ocupa essa posição; se já tinha, o novo vira um "+1" (não sobrescreve).
- **Same/Different SKU chip** no card de PWO: só aparece depois que pelo menos 1 resource está selecionado, e **só quando todos os resources selecionados têm o mesmo SKU entre si** (evita comparação "banana com maçã"). Azul = Same SKU, âmbar = Different SKU. Substituiu o antigo chip de status (Released/Created), que ficou redundante e foi removido.
- **"Paper Changeover"**: quando o SKU do PWO bate com o SKU atual de produção do(s) resource(s) selecionado(s), aparece como check verde ✓ dentro de **Validation & Warnings** (mesmo padrão visual do "Different SKU" warning) — não mais como nota solta dentro do card.
- **Label "Target Date" → "Scheduled Changeover Date"** no painel de review.
- **Reordenação de colunas**: Resources agora é a primeira coluna (era Production Work Order), seguida de Production Work Order, depois Review & Confirm — feedback de usabilidade.
- **Tamanho do "X" dos painéis de filtro** (PWO Filters / Resource Filters) aumentado de 17px para 26px.
- **Títulos das colunas** (Production Work Order / Resources / Review & Confirm): 12px, preto puro (antes 11px cinza).

### Nova aba: **Assignment v2** (teste de usabilidade)
- Mesma lógica/estado (`selectedWo`, `selectedResources`, `assignmentValidation()`, etc.) 100% reaproveitada da v1 — só a UI muda.
- Layout: Resources (esquerda) — Review & Confirm no centro — Production Work Order (direita).
- **Drag and drop real** (HTML5 Drag & Drop API): cards de Resource e PWO são arrastáveis; existem duas "dropzones" pontilhadas no topo do painel central (uma para Resource, outra para PWO).
- Slot de Resource é um **accordion fechado por padrão**: mostra sempre o último resource solto ali + badge "+N" se houver mais de um; clique expande a lista completa com botão de remover por item.
- Slot de PWO mostra SKU · Batch · PWO com botão de limpar.
- Metade inferior do painel central é a mesma área de Review & Confirm da v1 (reaproveita o HTML gerado por `renderReviewPanel()` — a função agora escreve em todos os elementos `.review-body` da página, não só um id fixo).

---

## Decisões / padrões estabelecidos (seguir daqui pra frente)

1. **`index.html` é o único arquivo de trabalho** para as telas de PWO Assignment / Overview / Control Panel. Não criar cópias/duplicatas.
2. **Ordem de exibição SKU → Batch → PWO** sempre que essas três infos aparecerem juntas.
3. **Cores de severidade em nível de linha**: binário verde/vermelho, nunca âmbar (âmbar é reservado para status de **unidade**, ex: "Attention").
4. **Causal codes**: azul `#001F9B` = Planned Maintenance, roxo `#7E57C2` = Start/Stop.
5. Ao adicionar um novo indicador/validação, seguir o padrão já existente em `assignmentValidation()` (arrays `blockers` / `warnings` / `passes`, cada item com `label`, `ok`, `text`) em vez de criar componentes soltos — garante que tudo apareça de forma consistente em "Validation & Warnings".
6. Funções de render que populam múltiplas telas (ex: `renderResources()`, `renderWOs()`, `renderReviewPanel()`) devem escrever em **todos os elementos que casam com o seletor/atributo compartilhado** (`[data-resource-list]`, `[data-wo-list]`, `.review-body`) — é assim que v1 e v2 continuam sincronizadas automaticamente sem duplicar lógica.

---

## Próximos passos sugeridos

- **Decidir entre v1 e v2** (ou manter as duas por mais tempo para teste A/B) — a v2 ainda não tem os painéis de filtro avançado (SKU, status, work center, etc.) que a v1 tem; só busca por texto. Se v2 for a escolhida, portar os filtros avançados para lá.
- Validar o fluxo de **Assign** (badge auth modal → confirmação) dentro da v2 — foi testado só até a etapa de review; o clique real em "ASSIGN" → modal de badge não foi verificado na v2 nesta sessão.
- Revisar a real necessidade/uso do arquivo `line-monitoring.html` (tela de linha individual) — não foi tocado nesta sessão, pode estar desatualizado em relação aos padrões novos (SKU/Batch/PWO order, causal codes, etc).
- Testar responsividade da v2 em telas menores — o layout de 3 colunas + dropzones pode ficar apertado abaixo de ~1280px.
- Considerar persistir a preferência de accordion aberto/fechado do slot de Resources (`v2ResSlotOpen`) por resource, não globalmente — hoje é uma flag única para a tela toda.
