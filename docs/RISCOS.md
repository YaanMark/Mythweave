# RISCOS

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Vazamento de segredos (chaves, credenciais) | Baixa | Alto | Pre‑commit gitleaks, varredura no CI, .gitignore rigoroso. |
| Performance 3D (FPS baixa) | Média | Médio | Testes de carga local, fallback para 2D, otimizar texturas. |
| Reconexão perdendo estado | Média | Alto | Persistência em PostgreSQL, recuperação completa ao conectar. |
| Escalabilidade de salas (muitos usuários) | Baixa | Médio | Arquitetura baseada em salas isoladas; considerar CRDT/Redis em futuro. |
| Execução de código arbitrário via fórmula | Baixa | Alto | Parser próprio sem `eval`, whitelist de operadores, testes de segurança. |
| Falha ao iniciar Docker (ports ocupados) | Baixa | Médio | Documentar portas, usar `docker compose down` antes. |
| Dependências vulneráveis | Média | Médio | Dependabot enabled, auditoria de segurança no CI. |
