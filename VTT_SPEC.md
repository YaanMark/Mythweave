# Especificação Funcional --- VTT 2D e 3D para RPG

**Versão:** 1.0\
**Status:** Documento inicial de requisitos\
**Objetivo:** servir como base para elaborar prompts de desenvolvimento,
especificações técnicas e um roadmap incremental para um Virtual
Tabletop (VTT) completo.

------------------------------------------------------------------------

## 1. Visão do produto

Desenvolver uma plataforma de mesa virtual para jogar RPG de mesa
online, com suporte a tabuleiros 2D, cenários 3D e, como objetivo de
longo prazo, cenas híbridas. A plataforma deve atender mestres e
jogadores, permitindo preparar campanhas, criar mapas, administrar
personagens, executar regras, conduzir combates, compartilhar
informações e sincronizar partidas em tempo real.

O produto deve ser modular, extensível, seguro, persistente e preparado
para suportar diferentes sistemas de RPG sem obrigar todos a utilizar a
mesma ficha ou as mesmas regras.

### 1.1 Princípios fundamentais

1.  **Servidor autoritativo:** ações importantes são validadas pelo
    servidor. O cliente não decide sozinho resultados de combate,
    permissões ou alterações persistentes.
2.  **Separação entre lógica e visualização:** personagens, itens, cenas
    e regras são dados lógicos independentes de sua representação
    visual.
3.  **2D e 3D integrados:** ambos devem reutilizar, sempre que possível,
    o mesmo modelo de dados, permissões, personagens e infraestrutura de
    sessão.
4.  **Modularidade:** módulos devem possuir limites claros e interfaces
    bem definidas.
5.  **Persistência confiável:** dados importantes devem sobreviver a
    desconexões, reinicializações e atualizações.
6.  **Extensibilidade:** novos sistemas de regras e funcionalidades
    devem poder ser adicionados sem reescrever o núcleo.
7.  **Desenvolvimento incremental:** cada etapa deve ser
    compilável/executável, testável e possuir critérios de aceitação.
8.  **Segurança por padrão:** permissões são verificadas no servidor;
    segredos do mestre não podem ser enviados a usuários não
    autorizados.
9.  **Acessibilidade e usabilidade:** ferramentas frequentes devem ser
    intuitivas e configuráveis.
10. **Licenciamento responsável:** conteúdos importados ou distribuídos
    devem respeitar direitos autorais, licenças e permissões.

### 1.2 Público e papéis

-   **Visitante:** pode visualizar apenas conteúdo público autorizado.
-   **Usuário:** possui conta e preferências.
-   **Mestre/GM:** cria e administra campanhas, cenas, encontros e
    conteúdo.
-   **Co-mestre/assistente:** recebe permissões administrativas
    configuráveis.
-   **Jogador:** controla os personagens que lhe foram atribuídos.
-   **Administrador da plataforma:** gerencia operação, segurança e
    moderação, sem acesso desnecessário ao conteúdo privado das
    campanhas.

As permissões devem ser configuráveis por campanha e, quando necessário,
por objeto.

------------------------------------------------------------------------

## 2. Contas, autenticação e usuários

### Funcionalidades

-   Cadastro, login e logout.
-   Recuperação e redefinição de senha.
-   Verificação de e-mail, se houver contas por e-mail.
-   Perfil com nome de exibição, avatar e preferências.
-   Gestão de sessões e dispositivos conectados.
-   Encerramento remoto de sessões.
-   Lista de amigos/contatos, opcional.
-   Convites para campanhas.
-   Bloqueio, denúncia e moderação de usuários.
-   Preferências de idioma, acessibilidade, áudio, câmera e interface.
-   Exclusão de conta e tratamento de dados pessoais conforme a política
    de privacidade.
-   Proteção contra tentativas abusivas de login e requisições
    automatizadas.

### Critérios de aceitação

-   Usuários não autenticados não podem acessar campanhas privadas.
-   A recuperação de conta não revela se um endereço está cadastrado.
-   Encerrar uma sessão invalida o acesso correspondente.
-   O servidor verifica a identidade e a autorização em toda operação
    protegida.

------------------------------------------------------------------------

## 3. Campanhas, salas e sessões

### 3.1 Campanhas

-   Criar, editar, duplicar, arquivar e excluir campanhas.
-   Nome, descrição, imagem de capa, sistema de RPG e configurações.
-   Definir mestre, co-mestres e jogadores.
-   Convidar e remover participantes.
-   Configurar permissões por papel.
-   Organizar cenas, mapas, personagens, NPCs, itens, documentos e
    encontros.
-   Armazenar anotações privadas do mestre e informações compartilhadas.
-   Histórico de sessões, resumos e calendário.
-   Exportação e importação da campanha.
-   Backups e restauração.
-   Versionamento de dados e migrações de esquema.

### 3.2 Salas e sessões de jogo

-   Criar e entrar em uma sala por convite ou código.
-   Lista de participantes conectados.
-   Indicador de conexão e reconexão.
-   Sincronização de cena, tokens, objetos, chat e estado do combate.
-   Troca de cena pelo mestre.
-   Pausar ou encerrar a sessão.
-   Reconectar após queda de rede.
-   Recuperar o estado persistido depois de atualizar a página ou
    reiniciar o cliente.
-   Controle de operações concorrentes para evitar sobrescrever
    alterações.
-   Mensagens de erro claras quando uma operação não puder ser
    concluída.

### Critérios de aceitação

-   Dois ou mais participantes autorizados veem as alterações
    compartilhadas.
-   Um jogador que se reconecta recebe o estado atual da sessão.
-   Uma alteração inválida ou não autorizada é rejeitada pelo servidor.
-   A sessão não depende do navegador de um único jogador para preservar
    dados persistentes.

------------------------------------------------------------------------

## 4. Tabuleiro 2D

### 4.1 Mapas e cenas

-   Importar imagens PNG, JPG/JPEG e WebP.
-   Criar cenas, renomear, duplicar, arquivar e excluir.
-   Zoom, pan e centralização da câmera.
-   Ajustar escala e dimensões do mapa.
-   Grade quadrada, hexagonal e modo sem grade.
-   Configuração do tamanho de célula e da escala do mundo.
-   Alinhar a grade à imagem.
-   Camadas separadas para fundo, terreno, objetos, tokens, desenhos,
    paredes, iluminação e efeitos.
-   Ordenar, ocultar, bloquear e renomear camadas.
-   Salvamento automático e indicação de estado salvo.
-   Modelos de cena e duplicação.
-   Limites e validação de tamanho de arquivo.

### 4.2 Tokens

-   Criar tokens a partir de imagens ou entidades existentes.
-   Mover, girar, redimensionar, duplicar e excluir.
-   Seleção individual e múltipla.
-   Arrastar e soltar.
-   Definir nome, imagem, tamanho, orientação e elevação lógica, quando
    aplicável.
-   Vincular token a personagem, NPC, criatura ou objeto.
-   Barra de vida, recursos e indicadores de condições.
-   Nome e informações configuráveis.
-   Controle de proprietário e usuários autorizados a mover.
-   Visibilidade pública, restrita ao mestre ou limitada por permissões.
-   Travas de movimento e seleção.
-   Marcadores e anotações.
-   Representação visual separada dos dados da entidade.

### 4.3 Desenho e anotações

-   Caneta, linha, seta, retângulo, círculo e polígono.
-   Cores, espessura e transparência.
-   Medidas e marcações.
-   Áreas de efeito.
-   Desenhos temporários e permanentes.
-   Permissões para desenhar e apagar.
-   Ferramentas de anotação do mestre.
-   Desfazer/refazer, quando viável.

### 4.4 Medição e movimento

-   Medir distância entre pontos e tokens.
-   Mostrar caminho e distância total.
-   Movimento livre ou limitado por grade.
-   Regras de distância diagonal configuráveis.
-   Alcance de armas e habilidades.
-   Rotas e custos de movimento.
-   Custos de terreno configuráveis.
-   Restrições por paredes e obstáculos.
-   Permitir ao mestre ignorar restrições.
-   Unidade configurável, como metros ou pés.
-   Registro opcional de movimento durante o combate.

### Critérios de aceitação

-   Tokens permanecem alinhados à escala e grade configuradas.
-   Alterações são sincronizadas com participantes autorizados.
-   O cliente não pode movimentar tokens que não controla, salvo
    permissão explícita do mestre.
-   O estado de cena é salvo e recuperado corretamente.

------------------------------------------------------------------------

## 5. Tabuleiro 3D

### 5.1 Editor e construção de cenário

-   Criar cenas 3D.
-   Adicionar, mover, girar, redimensionar, duplicar e excluir objetos.
-   Construção modular com pisos, paredes, portas, janelas, escadas,
    rampas e plataformas.
-   Inserção de terrenos, construções, móveis, árvores, rochas,
    vegetação e decoração.
-   Agrupar e desagrupar objetos.
-   Hierarquia de objetos e coleções.
-   Snap a grade e alinhamento opcional.
-   Controle de transformações.
-   Múltiplos andares e níveis de altura.
-   Materiais e texturas.
-   Biblioteca de prefabs/conjuntos reutilizáveis.
-   Salvar e reutilizar composições.
-   Importar modelos em formatos definidos pelo projeto, com validação
    de segurança e compatibilidade.
-   Pré-visualização de assets antes da inserção.
-   Limites de complexidade para evitar cenas excessivamente pesadas.

### 5.2 Câmera e navegação

-   Pan, zoom e rotação.
-   Câmera livre e câmera focada em personagem/objeto.
-   Perspectiva e projeção ortográfica.
-   Centralizar e enquadrar seleção.
-   Controles configuráveis.
-   Alternar entre modo de edição e modo de jogo.
-   Opção para o mestre sugerir ou controlar o enquadramento dos
    jogadores, com regras explícitas.

### 5.3 Miniaturas 3D

-   Vincular modelo 3D a personagem, NPC ou criatura.
-   Mover, girar, redimensionar e orientar.
-   Animações opcionais.
-   Equipamentos visuais opcionais.
-   Indicadores de seleção, vida e condições.
-   Propriedade e permissões.
-   Trocar modelo sem perder dados da entidade.
-   Usar a mesma entidade lógica em representação 2D ou 3D.

### 5.4 Colisões e interação espacial

-   Colisões entre entidades e objetos relevantes.
-   Bloqueio de movimento por paredes.
-   Escadas, rampas, plataformas e elevação.
-   Portas e objetos interativos.
-   Quedas, se o sistema de regras utilizar essa mecânica.
-   Detecção de obstáculos.
-   Interação com objetos por clique ou seleção.
-   Física simplificada para elementos de jogo, sem exigir simulação
    física completa de todos os objetos.

### 5.5 Desempenho 3D

-   Carregamento sob demanda.
-   Cache de modelos e texturas.
-   Instanciamento de objetos repetidos.
-   Níveis de detalhe (LOD), quando aplicável.
-   Limites de resolução e tamanho de recursos.
-   Gerenciamento de memória.
-   Indicadores de carregamento.
-   Tratamento de falhas ao carregar assets.
-   Opções de qualidade gráfica.

### Critérios de aceitação

-   Vários jogadores podem observar e movimentar miniaturas autorizadas
    no mesmo cenário.
-   Transformações persistem e são sincronizadas.
-   Uma miniatura pode trocar de modelo sem perder ficha, inventário ou
    permissões.
-   Cenas dentro dos limites definidos mantêm desempenho aceitável em
    equipamentos-alvo.

------------------------------------------------------------------------

## 6. Integração entre 2D e 3D

-   Modelo de dados compartilhado para campanhas, cenas, entidades e
    permissões.
-   Adaptadores de renderização independentes para 2D e 3D.
-   Entidade lógica independente da representação visual.
-   Cenas exclusivamente 2D, exclusivamente 3D e, como objetivo
    avançado, cenas híbridas.
-   Troca de representação visual de personagens sem duplicar a ficha.
-   Reutilização de itens, habilidades, estados e dados de combate.
-   Não exigir conversão automática perfeita de qualquer mapa 2D em
    cenário 3D.
-   Definir claramente quais propriedades são comuns e quais são
    específicas de cada renderizador.

------------------------------------------------------------------------

## 7. Personagens e fichas

### 7.1 Criação e gerenciamento

-   Criar, editar, duplicar e arquivar personagens.
-   Nome, retrato, aparência, história e personalidade.
-   Vincular personagem a uma campanha.
-   Escolher opções definidas pelo sistema de regras:
    ancestralidade/espécie, classe, origem, profissão ou arquétipo.
-   Distribuir atributos.
-   Selecionar perícias, habilidades e equipamentos iniciais.
-   Importar e exportar fichas em formatos suportados.
-   Histórico de evolução.
-   Controle de proprietário e permissões.

### 7.2 Ficha dinâmica

-   Atributos primários e derivados.
-   Nível, experiência e progressão.
-   Vida, magia, energia e outros recursos.
-   Defesa, resistências e vulnerabilidades.
-   Perícias e proficiências.
-   Habilidades ativas e passivas.
-   Condições e efeitos temporários.
-   Equipamentos e modificadores.
-   Campos personalizados.
-   Fórmulas configuráveis pelo sistema de regras.
-   Atualização automática dos valores derivados.
-   Histórico de alterações importantes.

### 7.3 Evolução

-   Experiência e níveis.
-   Progressão narrativa ou por marcos.
-   Distribuição de pontos.
-   Desbloqueio de habilidades.
-   Classes, subclasses e multiclasse quando aplicáveis.
-   Árvores de talentos.
-   Requisitos e pré-requisitos.
-   Regras configuráveis pelo sistema ativo.
-   Possibilidade de o mestre conceder ou corrigir progressão
    manualmente.

### 7.4 Privacidade da ficha

-   Campos públicos, privados para o proprietário ou visíveis apenas ao
    mestre.
-   Permissões específicas para visualizar e editar.
-   Segredos não devem ser enviados ao cliente sem autorização.
-   Auditoria de alterações administrativas relevantes.

------------------------------------------------------------------------

## 8. Motor de regras extensível

### 8.1 Dados e fórmulas

-   Dados poliédricos, como d4, d6, d8, d10, d12, d20 e d100.
-   Rolagens de múltiplos dados.
-   Modificadores.
-   Vantagem/desvantagem quando suportadas.
-   Manter/remover maiores ou menores resultados.
-   Testes de atributo, perícia e testes opostos.
-   Dificuldades configuráveis.
-   Sucessos e falhas críticos configuráveis.
-   Fórmulas personalizadas com parser seguro.
-   Registro dos dados rolados, modificadores e resultado final.
-   Resultados públicos, privados para o mestre ou privados para um
    usuário, conforme configuração.

### 8.2 Definições do sistema

-   Atributos.
-   Perícias.
-   Classes e subclasses.
-   Habilidades.
-   Condições.
-   Equipamentos.
-   Tipos de dano.
-   Resistências e vulnerabilidades.
-   Recursos consumíveis.
-   Progressão.
-   Regras de combate.
-   Fórmulas de valores derivados.
-   Regras de descanso e recuperação, se aplicáveis.

### 8.3 Configuração e extensões

-   Criar sistemas de regras como pacotes versionados.
-   Editor visual para opções comuns.
-   Validar dependências e referências.
-   Exportar e importar configurações.
-   Permitir extensões programáveis em etapa avançada.
-   Isolar código de terceiros e limitar permissões.
-   Versionar sistemas e fornecer migrações quando a estrutura mudar.
-   Não presumir que todos os RPGs usam classes, níveis, atributos ou
    combate por turnos.

### Critérios de aceitação

-   Um sistema de exemplo pode definir ficha, dados, atributos,
    habilidades e regras de combate sem alterar o núcleo da interface.
-   Fórmulas inválidas são rejeitadas com mensagens compreensíveis.
-   Fórmulas não executam código arbitrário.
-   Atualizações do sistema de regras não corrompem fichas existentes.

------------------------------------------------------------------------

## 9. Combate, turnos e efeitos

### 9.1 Iniciativa e fluxo de turnos

-   Rolagem e ordenação de iniciativa.
-   Controle de rodadas.
-   Identificação do turno atual.
-   Avançar e retroceder turnos com permissões.
-   Adicionar/remover participantes.
-   Pausar e encerrar combate.
-   Controle de ações, movimento, ações bônus e reações quando o sistema
    usar essas categorias.
-   Finalizar turno.
-   Registro de ações.
-   Controle manual pelo mestre para situações excepcionais.

### 9.2 Ataques e habilidades

-   Selecionar alvos.
-   Verificar alcance e requisitos.
-   Executar testes de ataque.
-   Calcular defesa e resultado.
-   Aplicar dano, cura, escudo e absorção.
-   Resistências, imunidades e vulnerabilidades.
-   Efeitos de área.
-   Dano ou cura contínuos.
-   Reações e contra-ataques.
-   Consumo de recursos.
-   Efeitos com duração.
-   Permitir automação ou resolução manual conforme as regras.

### 9.3 Condições

-   Catálogo configurável de condições.
-   Duração em rodadas, tempo ou condições de término.
-   Efeitos mecânicos e visuais.
-   Acumulação ou substituição de condições.
-   Resistência ou remoção.
-   Aplicação automática quando possível.
-   Ícones e descrições acessíveis.
-   Condições personalizadas por sistema.

### 9.4 Painel de combate

-   Ordem de iniciativa.
-   Vida e recursos conforme permissões.
-   Condições ativas.
-   Duração dos efeitos.
-   Alvos e alcance.
-   Registro de ações.
-   Morte, incapacitação ou estados equivalentes.
-   Estatísticas do encontro.
-   Controle rápido do mestre.

------------------------------------------------------------------------

## 10. Visibilidade, iluminação e exploração

### 10.1 Névoa de guerra

-   Ocultar regiões do mapa.
-   Revelar áreas manualmente.
-   Revelar ao redor de personagens.
-   Manter histórico de áreas exploradas.
-   Separar área atualmente visível de área já explorada.
-   Visibilidade individual ou compartilhada por grupo.
-   Ocultar salas, passagens e objetos.
-   Ferramentas do mestre para revelar, esconder e restaurar regiões.

### 10.2 Linha de visão

-   Obstáculos e paredes.
-   Portas abertas ou fechadas.
-   Alcance visual.
-   Escuridão e fontes de luz.
-   Visão especial definida pelo sistema.
-   Altura e elevação, especialmente no 3D.
-   Bloqueio de visão por geometria relevante.
-   Cálculo distinto para renderização 2D e 3D, mantendo regras
    consistentes quando aplicável.

### 10.3 Iluminação

-   Luzes estáticas e móveis.
-   Tochas, lanternas e fontes de luz ligadas a personagens.
-   Cor, intensidade e alcance.
-   Iluminação ambiente.
-   Sombras quando suportadas.
-   Ciclo de dia e noite, opcional.
-   Efeitos visuais de iluminação.
-   Separação entre aparência visual e autorização real de informação.

### 10.4 Segredos e armadilhas

-   Objetos visíveis apenas ao mestre ou a usuários autorizados.
-   Portas secretas.
-   Armadilhas ocultas.
-   Testes de percepção.
-   Descoberta e revelação de elementos.
-   Informações privadas por jogador.
-   Eventos acionados ao entrar em regiões.

------------------------------------------------------------------------

## 11. Inventário, itens e economia

### 11.1 Catálogo de itens

Cada item pode conter:

-   Identificador estável.
-   Nome e descrição.
-   Ícone, imagem ou modelo 3D.
-   Categoria e raridade.
-   Peso, quantidade e valor.
-   Propriedades.
-   Requisitos de uso.
-   Efeitos mecânicos.
-   Informações públicas e secretas.
-   Compatibilidade com espaços de equipamento.
-   Tags e filtros.

### 11.2 Inventário e equipamentos

-   Adicionar, remover, mover e dividir pilhas.
-   Equipar e desequipar.
-   Armas, armaduras, escudos, acessórios, roupas, consumíveis e
    ferramentas.
-   Limite de peso ou espaço, quando aplicável.
-   Atualização automática dos modificadores da ficha.
-   Inventários de personagens, NPCs, baús e lojas.
-   Registro de transações relevantes.

### 11.3 Interações e economia

-   Saque de criaturas e baús.
-   Troca de itens entre personagens.
-   Compra e venda.
-   Moedas configuráveis.
-   Recompensas e tabelas de tesouro.
-   Cofres e armazenamento.
-   Fabricação/crafting como extensão futura.
-   Validação de propriedade para impedir duplicação ou remoção não
    autorizada.

------------------------------------------------------------------------

## 12. NPCs, criaturas e encontros

-   Fichas de NPCs e monstros.
-   Atributos, habilidades, recursos e condições.
-   Aparência em 2D e 3D.
-   Inventário e recompensas.
-   Agrupar criaturas.
-   Criar encontros reutilizáveis.
-   Definir mapa, posições iniciais e participantes.
-   Preparar iniciativa e configurações de combate.
-   Tabelas de encontros aleatórios.
-   Relacionamentos, facções, objetivos e notas privadas.
-   Controle manual ou automação limitada.
-   Comportamentos automatizados simples como recurso avançado.
-   Segredos do mestre protegidos por permissões.

------------------------------------------------------------------------

## 13. Ferramentas narrativas e gerenciamento de campanha

-   Diário do mestre.
-   Diário individual dos jogadores.
-   Notas públicas e privadas.
-   Registro de NPCs, facções, localidades e objetos importantes.
-   Missões, objetivos e pistas.
-   Linha do tempo e calendário.
-   Resumo de sessões.
-   Documentos e handouts.
-   Imagens e mapas revelados.
-   Segredos e informações por jogador.
-   Links entre notas, personagens, itens e localidades.
-   Modelos de sessão.
-   Histórico de acontecimentos relevantes.

------------------------------------------------------------------------

## 14. Mundo, localidades e viagens

Como módulo opcional de campanha avançada:

-   Mapa mundial e mapas regionais.
-   Continentes, regiões, cidades e pontos de interesse.
-   Hierarquia de localidades.
-   Abrir uma cena ou mapa associado a uma localidade.
-   Rotas e viagens.
-   Distância e duração de jornadas.
-   Calendário do mundo.
-   Clima, estações e passagem de tempo.
-   Regiões descobertas por personagem ou grupo.
-   Notas e eventos vinculados a lugares.
-   Controle de informações conhecidas e desconhecidas.

------------------------------------------------------------------------

## 15. Chat, voz, vídeo e áudio

### 15.1 Chat

-   Mensagens públicas e privadas.
-   Mensagens exclusivas para o mestre.
-   Mensagens diretas entre jogadores, conforme permissões.
-   Formatação básica.
-   Rolagens de dados integradas.
-   Referências a personagens, itens e cenas.
-   Histórico de mensagens.
-   Registro de eventos relevantes.
-   Controle de spam e moderação.
-   Mensagens privadas não podem ser transmitidas a usuários não
    autorizados.

### 15.2 Voz e vídeo

-   Comunicação por voz.
-   Vídeo opcional.
-   Compartilhamento de tela, se permitido.
-   Controle de microfone e câmera.
-   Indicador de quem está falando.
-   Opções de qualidade.
-   Reconexão e tratamento de falhas.
-   Integração com serviço especializado pode ser preferida a
    desenvolver toda a infraestrutura internamente.

### 15.3 Música e efeitos sonoros

-   Playlists.
-   Música ambiente e de combate.
-   Efeitos sonoros.
-   Controle de volume por categoria.
-   Reprodução sincronizada.
-   Troca de trilha pelo mestre.
-   Sons disparados por eventos.
-   Sons privados ou específicos de cena quando autorizados.
-   Controle de reprodução e permissões.

------------------------------------------------------------------------

## 16. Editor de conteúdo e biblioteca de assets

-   Biblioteca de mapas, tokens, retratos, modelos 3D, materiais,
    texturas, efeitos e áudio.
-   Catálogo de itens, habilidades, criaturas e encontros.
-   Busca, filtros, tags e favoritos.
-   Pastas e coleções.
-   Pré-visualização.
-   Importação e exportação de conteúdo.
-   Validação de formato e tamanho.
-   Recursos reutilizáveis entre campanhas.
-   Metadados de origem e licença.
-   Controle de acesso aos assets.
-   Cache e carregamento sob demanda.
-   Evitar distribuição de conteúdo sem autorização ou licença
    apropriada.

------------------------------------------------------------------------

## 17. Automação, macros, eventos e extensões

### 17.1 Macros

-   Criar ações para automatizar tarefas repetitivas.
-   Executar rolagens, aplicar efeitos e atualizar dados autorizados.
-   Iniciar encontros.
-   Alterar iluminação ou visibilidade.
-   Revelar áreas.
-   Criar objetos.
-   Executar sequências narrativas.
-   Interface para executar macros permitidas.
-   Permissões explícitas e limites de execução.

### 17.2 Eventos e gatilhos

Eventos possíveis:

-   Personagem entra em uma região.

-   Porta é aberta.

-   Criatura é derrotada.

-   Turno começa ou termina.

-   Item é utilizado.

-   Objetivo é concluído.

-   Jogador interage com objeto.

-   Condições para disparar evento.

-   Ações executadas pelo evento.

-   Evitar ciclos infinitos.

-   Registro e diagnóstico de falhas.

-   Permissões para editar e executar gatilhos.

### 17.3 API e plugins

-   API documentada.
-   Eventos públicos e interfaces estáveis.
-   Manifesto e versão de extensões.
-   Compatibilidade declarada.
-   Permissões solicitadas por extensão.
-   Isolamento de código de terceiros.
-   Limites de recursos e execução.
-   Gestão de instalação, atualização e remoção.
-   Extensões para sistemas de regras, fichas, combate, efeitos visuais
    e integrações.
-   Não permitir execução irrestrita de código de terceiros no servidor
    principal.

------------------------------------------------------------------------

## 18. Recursos opcionais de inteligência artificial

-   Assistência para rascunhos de NPCs.
-   Descrições de lugares.
-   Sugestões de encontros.
-   Organização de notas.
-   Resumos de sessões.
-   Rascunhos de missões.
-   Pesquisa em documentos autorizados da campanha.
-   Revisão pelo mestre antes de publicar conteúdo.
-   Configurações de privacidade e consentimento.
-   Custos e limites de uso explícitos.
-   O VTT deve funcionar normalmente sem recursos de IA.

------------------------------------------------------------------------

## 19. Administração, segurança e confiabilidade

### 19.1 Persistência e recuperação

-   Salvamento automático.
-   Persistência de campanhas, cenas e personagens.
-   Backups programados.
-   Restauração testada.
-   Exportação e importação.
-   Migrações de banco de dados.
-   Versionamento de estruturas.
-   Recuperação após falhas.
-   Tratamento de gravações concorrentes.
-   Separar estado transitório de sessão dos dados persistentes.

### 19.2 Segurança

-   Autenticação e autorização no servidor.
-   Validação de todas as ações importantes.
-   Permissões por campanha, papel e objeto.
-   Segredos não são enviados a clientes sem autorização.
-   Proteção contra abuso de requisições.
-   Validação de uploads e arquivos.
-   Limites de tamanho, formato e complexidade.
-   Proteção de sessões e credenciais.
-   Registro de ações administrativas relevantes.
-   Isolamento de extensões e macros.
-   Política de privacidade e retenção de dados.
-   Exclusão e exportação de dados conforme requisitos aplicáveis.

### 19.3 Observabilidade

-   Logs estruturados.
-   Rastreamento de erros.
-   Métricas de latência e consumo.
-   Monitoramento de conexões.
-   Diagnóstico de problemas de sincronização.
-   Alertas operacionais.
-   Não registrar senhas, tokens secretos ou conteúdo privado
    desnecessário nos logs.

### 19.4 Desempenho e estabilidade

-   Testes com múltiplos usuários.
-   Reconexão automática.
-   Tratamento de conexão instável.
-   Limites de tamanho e complexidade de cena.
-   Carregamento progressivo.
-   Otimização de renderização.
-   Gestão de memória.
-   Cache.
-   Mensagens de erro claras.
-   Compatibilidade com navegadores e dispositivos definidos como alvo.

------------------------------------------------------------------------

## 20. Interface, acessibilidade e experiência do usuário

-   Layout adaptável às resoluções suportadas.
-   Atalhos de teclado.
-   Preferências de câmera e controles.
-   Escala da interface.
-   Contraste e legibilidade.
-   Indicadores visuais e sonoros.
-   Tutoriais e ajuda contextual.
-   Estados de carregamento e salvamento.
-   Confirmação para ações destrutivas.
-   Desfazer/refazer em editores quando viável.
-   Navegação consistente entre campanha, cena, ficha e biblioteca.
-   Mensagens de validação compreensíveis.
-   Suporte a localização/tradução.
-   Interface que distingue claramente modo de edição e modo de jogo.

------------------------------------------------------------------------

## 21. Arquitetura técnica sugerida

Esta é uma proposta inicial, não uma obrigação. A escolha final deve ser
validada por um protótipo técnico.

### Stack candidata

-   **Frontend:** React + TypeScript.
-   **Renderização 2D:** PixiJS.
-   **Renderização 3D:** Three.js.
-   **Backend:** Node.js + TypeScript.
-   **Comunicação em tempo real:** WebSocket.
-   **Banco relacional:** PostgreSQL.
-   **Armazenamento de assets:** armazenamento de objetos compatível com
    S3.
-   **Cache/coordenação:** Redis somente quando houver necessidade
    comprovada.
-   **Testes:** ferramenta de testes unitários e de integração, mais
    testes de navegador ponta a ponta.
-   **Implantação:** Docker e pipeline de integração contínua.

### Princípios de arquitetura

-   Começar com monólito modular, evitando microserviços prematuros.
-   Separar interface, domínio, persistência, transporte em tempo real e
    renderizadores.
-   Criar contratos tipados entre módulos.
-   Manter o servidor como autoridade do estado compartilhado.
-   Usar identificadores estáveis para entidades.
-   Versionar formatos de dados.
-   Centralizar autorização e validação.
-   Não misturar lógica de regras diretamente com componentes visuais.
-   Não acoplar personagens a tokens ou modelos 3D.
-   Definir limites de responsabilidade para plugins.
-   Documentar decisões arquiteturais relevantes.

### Módulos de alto nível

1.  Identidade e acesso.
2.  Campanhas e sessões.
3.  Cenas e objetos.
4.  Renderizador 2D.
5.  Renderizador 3D.
6.  Personagens e entidades.
7.  Motor de regras.
8.  Combate e efeitos.
9.  Biblioteca de conteúdo.
10. Comunicação em tempo real.
11. Persistência e arquivos.
12. Extensões e automação.
13. Administração e observabilidade.

------------------------------------------------------------------------

## 22. Requisitos não funcionais

Os valores numéricos devem ser definidos após protótipos e testes. Os
requisitos abaixo devem ser mensuráveis na fase de planejamento técnico.

-   **Consistência:** todos os clientes autorizados convergem para o
    mesmo estado compartilhado.
-   **Segurança:** toda operação protegida é autorizada e validada no
    servidor.
-   **Disponibilidade:** definir objetivo de disponibilidade adequado ao
    modelo de hospedagem.
-   **Desempenho:** definir metas de latência, FPS, tempo de
    carregamento e tamanho máximo de cena.
-   **Escalabilidade:** definir número esperado de participantes por
    sala e sessões simultâneas.
-   **Recuperação:** definir frequência de backup e objetivos de
    recuperação de dados.
-   **Compatibilidade:** declarar navegadores, sistemas operacionais e
    hardware suportados.
-   **Manutenibilidade:** módulos testáveis e documentação de contratos.
-   **Acessibilidade:** estabelecer requisitos e testes de
    acessibilidade.
-   **Privacidade:** limitar coleta e exposição de dados.
-   **Observabilidade:** erros e falhas relevantes devem poder ser
    diagnosticados.
-   **Migração:** versões novas devem possuir estratégia para dados
    antigos.

------------------------------------------------------------------------

## 23. Roadmap recomendado

### Fase 0 --- Descoberta e protótipo técnico

-   Definir público-alvo, plataforma e hospedagem.
-   Escolher o primeiro sistema de RPG de referência.
-   Validar renderização 2D e 3D.
-   Testar comunicação em tempo real.
-   Definir modelo inicial de entidades.
-   Registrar decisões e riscos técnicos.

**Saída:** protótipo técnico e decisões arquiteturais documentadas.

### Fase 1 --- Fundação

-   Estrutura da aplicação.
-   Autenticação básica.
-   Campanhas e participantes.
-   Permissões.
-   Banco de dados.
-   Persistência inicial.
-   Sala de jogo mínima.

**Critério de conclusão:** criar campanha, convidar participante e
recuperar os dados após reconexão.

### Fase 2 --- Tabuleiro 2D multiplayer

-   Importação de mapa.
-   Grade.
-   Câmera.
-   Tokens.
-   Movimento.
-   Medição.
-   Camadas.
-   Chat e rolagens.
-   Sincronização.
-   Salvamento.

**Critério de conclusão:** vários usuários compartilham e alteram uma
cena 2D com persistência confiável.

### Fase 3 --- Personagens e primeiro sistema de regras

-   Fichas.
-   Atributos.
-   Dados e fórmulas.
-   Inventário.
-   Habilidades.
-   Combate.
-   Iniciativa.
-   Dano, cura e condições.

**Critério de conclusão:** realizar um encontro de RPG completo com o
primeiro sistema de regras.

### Fase 4 --- Ferramentas do mestre

-   NPCs e criaturas.
-   Encontros preparados.
-   Névoa de guerra.
-   Visibilidade e iluminação 2D.
-   Paredes e obstáculos.
-   Anotações privadas.
-   Biblioteca de conteúdo.

**Critério de conclusão:** preparar e conduzir uma cena de exploração
com segredos e combate.

### Fase 5 --- Tabuleiro 3D

-   Câmera.
-   Modelos e materiais.
-   Objetos e transformações.
-   Construção modular.
-   Miniaturas.
-   Movimento e colisões essenciais.
-   Iluminação.
-   Sincronização e persistência.

**Critério de conclusão:** vários jogadores compartilham um cenário 3D,
com alterações sincronizadas e persistentes.

### Fase 6 --- Expansão e extensibilidade

-   Sistemas de regras adicionais.
-   Editor visual de regras.
-   Voz e áudio.
-   Macros e eventos.
-   API de extensões.
-   Mundo e localidades.
-   Importação/exportação avançada.
-   Recursos opcionais de IA.

### Fase 7 --- Preparação para distribuição

-   Testes de carga.
-   Auditoria de segurança.
-   Backups e restauração.
-   Monitoramento.
-   Acessibilidade.
-   Documentação.
-   Implantação.
-   Política de privacidade e termos aplicáveis.
-   Compatibilidade e migração entre versões.

------------------------------------------------------------------------

## 24. Estratégia de testes

Cada módulo deve ter testes próprios e testes de integração.

### Testes unitários

-   Fórmulas de dados.
-   Cálculos de atributos.
-   Resolução de ataques.
-   Aplicação de condições.
-   Validação de permissões.
-   Conversões e validações de dados.

### Testes de integração

-   Persistência de campanha.
-   Salvamento e recuperação de cena.
-   Sincronização de eventos.
-   Operações simultâneas.
-   Atualização de ficha após equipamento.
-   Transição de turnos.
-   Importação e exportação.

### Testes ponta a ponta

-   Criar conta e campanha.
-   Convidar jogador.
-   Entrar em sala.
-   Carregar mapa.
-   Mover token.
-   Fazer rolagem.
-   Executar combate.
-   Desconectar e reconectar.
-   Confirmar persistência.
-   Verificar que jogadores não autorizados não acessam segredos.

### Testes de desempenho

-   Muitas entidades na cena.
-   Cenas 3D com níveis diferentes de complexidade.
-   Múltiplos participantes.
-   Rede instável.
-   Uploads grandes dentro dos limites.
-   Uso prolongado e consumo de memória.

------------------------------------------------------------------------

## 25. Definição de pronto para qualquer funcionalidade

Uma funcionalidade não deve ser considerada concluída apenas porque sua
interface existe.

Para ser considerada pronta, deve:

1.  Atender ao requisito documentado.
2.  Validar entradas.
3.  Respeitar as permissões.
4.  Persistir os dados necessários.
5.  Sincronizar corretamente quando for compartilhada.
6.  Apresentar erros compreensíveis.
7.  Ter testes relevantes.
8.  Não quebrar funcionalidades existentes.
9.  Ter documentação suficiente para manutenção.
10. Possuir critérios de aceitação verificados.

------------------------------------------------------------------------

## 26. Modelo para transformar este documento em prompts de implementação

Não peça a uma ferramenta de programação para implementar todo o
documento em uma única etapa. Use esta especificação como visão global e
gere prompts pequenos, verificáveis e incrementais.

### Modelo de prompt

> Você está trabalhando no projeto VTT 2D/3D descrito em `VTT_SPEC.md`.
>
> **Objetivo desta tarefa:** \[descrever uma única funcionalidade\].
>
> **Contexto:** \[informar os módulos existentes e decisões já
> tomadas\].
>
> **Requisitos funcionais:** - \[requisito 1\] - \[requisito 2\] -
> \[requisito 3\]
>
> **Restrições arquiteturais:** - Respeitar os limites entre módulos. -
> Não duplicar lógica já existente. - Validar operações no servidor. -
> Não expor dados privados a clientes não autorizados. - Não introduzir
> dependências sem justificar a necessidade. - Não implementar
> funcionalidades fora do escopo solicitado.
>
> **Critérios de aceitação:** - \[resultado observável 1\] - \[resultado
> observável 2\] - \[resultado observável 3\]
>
> **Testes obrigatórios:** - Testes unitários para a lógica nova. -
> Testes de integração para persistência e comunicação, quando
> aplicável. - Testes de regressão para funcionalidades afetadas.
>
> **Entrega esperada:** 1. Implementação funcional. 2. Testes
> executáveis. 3. Documentação atualizada. 4. Lista de arquivos
> alterados. 5. Comandos para executar e validar. 6. Limitações
> conhecidas.
>
> Antes de alterar o código, inspecione a estrutura existente e
> apresente um plano curto. Não substitua funcionalidades existentes nem
> faça uma reescrita ampla sem justificativa. Implemente somente o
> escopo acordado e informe os resultados reais dos testes, sem afirmar
> que testes foram executados quando não foram.

------------------------------------------------------------------------

## 27. Decisões ainda pendentes

Antes de congelar a arquitetura, responder:

1.  **Distribuição:** web, desktop ou ambas?
2.  **Cenas:** 2D e 3D separados inicialmente, híbridos desde o início
    ou ambos como objetivo?
3.  **Sistemas de regras:** um sistema próprio, um sistema existente ou
    vários sistemas configuráveis?
4.  **Editor 3D:** construção modular, edição livre ou ambas?
5.  **Hospedagem:** servidor do mestre, serviço hospedado ou ambos?
6.  **Objetivo:** uso pessoal, open source, comercial ou projeto que
    poderá seguir qualquer um desses caminhos?
7.  **Dispositivos:** desktop apenas inicialmente ou suporte a tablets e
    celulares?
8.  **Escala:** quantos jogadores por sala e quantas salas simultâneas
    são esperados?
9.  **Conteúdo:** assets criados pelo projeto, importados pelos usuários
    ou biblioteca compartilhada?
10. **Primeiro sistema de RPG:** qual será usado para validar o motor de
    regras?

As respostas podem alterar prioridades e escolhas técnicas, mas não
impedem começar pela fase de descoberta e prototipagem.

------------------------------------------------------------------------

## 28. Resultado esperado do projeto

O objetivo final é uma plataforma de RPG virtual que reúna:

-   Campanhas e sessões multiplayer.
-   Tabuleiros 2D e 3D.
-   Editor de mapas e cenários.
-   Tokens e miniaturas.
-   Personagens, fichas e inventários.
-   Motor de regras extensível.
-   Combate, dados e efeitos.
-   Iluminação, visibilidade e exploração.
-   NPCs, criaturas e encontros.
-   Chat, áudio e ferramentas narrativas.
-   Biblioteca de conteúdo.
-   Automação e extensões.
-   Persistência, segurança, backups e monitoramento.
-   Ferramentas de administração e distribuição.

A implementação deve ocorrer por etapas pequenas, com arquitetura
documentada, testes e critérios de aceitação. A lista de funcionalidades
é a visão de produto; o roadmap define a ordem de construção.
