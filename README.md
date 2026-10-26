# Mythweave

> **Virtual Tabletop (VTT) 2D/3D) – protótipo técnico – fase 0**

Este repositório contém o protótipo técnico da fase 0 do projeto **Mythweave**, conforme a especificação `VTT_SPEC.md`. O objetivo é validar a stack (TypeScript, pnpm + Turborepo, React + Vite, PixiJS, Three.js, Fastify, WebSocket, PostgreSQL/Drizzle, Zod, Vitest, Playwright, Docker‑Compose) com um mínimo de código reutilizável.

## Pré‑requisitos
- **Node.js** LTS (>=18)
- **pnpm** (>=9)
- **Docker** + **docker‑compose**
- **Git** com credenciais configuradas para o GitHub (ex.: `gh auth login`).

## Comandos principais
```bash
# Instalação de dependências e geração do lockfile
pnpm install

# Iniciar os containers (PostgreSQL) e o servidor + web em modo dev
docker compose up -d          # sobe o PostgreSQL
pnpm dev                       # roda Fastify + Vite (monorepo)
```

## Fluxo Git
- Branch de trabalho: `fase-0/prototipo` (criada a partir de `main`).
- Commits devem seguir **Conventional Commits** (ex.: `feat: add xyz`).
- Cada commit é **pushado** imediatamente (`git push origin <branch>`).
- Hooks de pré‑commit (Husky) rodam lint, type‑check e varredura de segredos (gitleaks).

## Licença
MIT – veja o arquivo `LICENSE` (adicionei o cabeçalho).

## Estrutura do monorepo
```
mythweave/
├─ .gitignore
├─ package.json            # workspace root
├─ pnpm-workspace.yaml
├─ packages/
│  ├─ shared/            # tipos, schemas Zod, protocolo
│  ├─ server/            # Fastify, WS, persistência
│  └─ web/               # React + Vite, PixiJS & three‑fiber
└─ docs/
   ├─ adr/               # Architecture Decision Records
   ├─ RISCOS.md
   └─ RESULTADOS_PROTOTIPO.md
```
