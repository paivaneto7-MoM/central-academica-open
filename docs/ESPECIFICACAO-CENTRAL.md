# Especificação de evolução — Central Acadêmica Open

Documento de planejamento baseado no comando mestre fornecido pelo mantenedor em 19/11/2026.

## Auditoria do estado atual

- Aplicação **web estática**, hospedável em GitHub Pages, não aplicativo Android nativo.
- Persistência local em `localStorage` sob chaves distintas: `central-academica-open:v0.1`, `central-academica-open:modules-v1` e `central-academica-open:notices-v1`.
- Não há banco de dados remoto, migrações SQL, autenticação, controle de acesso institucional, notificações push, sincronização automática ou conexão com Google.
- Os dados locais existentes são preservados: não há migração destrutiva, exclusão de registros nem alteração de planilhas oficiais.
- Interface em português brasileiro; calendário apresenta datas no contexto de `America/Sao_Paulo`.
- **Não inserir dados identificáveis de estudantes, notas, faltas, pacientes ou documentos privados** nesta demonstração pública.

## Implementado

- Dashboard docente, disciplinas, aulas e tarefas locais.
- Agenda, avaliações, atividades e biblioteca de links.
- Calendário mensal/semanal/diário de registros locais, detalhes em modal.
- Avisos locais de eventos vencidos, do dia ou dos próximos sete dias; conclusão e reabertura do aviso sem alterar o registro original.
- Assistente Virtual **local e determinístico** para resumos de agenda, avisos, avaliações, materiais e estado da pesquisa; não é IA generativa.
- Menu lateral por botão e gesto horizontal, navegação inferior e acessibilidade básica.
- Exportação de registros JSON dos módulos e testes automatizados de navegador.

## Parcialmente implementado

- Agenda: não inclui recorrência, importação de calendário ou detecção completa de conflitos.
- Avisos: não incluem push, serviço em segundo plano ou lembretes semanais fora do aplicativo.
- Área de materiais: referências por link HTTPS, sem upload de documentos ou gestão real de arquivos.
- Assistente Virtual: resumos locais; não interpreta linguagem livre, não pesquisa na internet e não acessa dados privados.
- Backup: exportação dos módulos, sem restauração integrada e sem backup centralizado.
- Identidade visual: aproximação à referência, sujeita a revisão visual real em dispositivos.

## Dependente de autorização e infraestrutura privada

- Autenticação e autorização por papéis; hospedagem privada e backend protegido.
- Cadastro de alunos, notas, faltas, estágios, avaliações individuais e histórico auditável.
- Google Drive, Sheets, Gmail e Calendar com OAuth e escopos mínimos.
- Correção assistida, rubricas e aprovação de notas com confirmação humana.
- Sincronização de arquivos e registro de origem, versão e última atualização.
- Notificações em segundo plano e armazenamento seguro de dados pessoais.

## Indisponível na versão pública

- Consulta de notas/faltas reais, dados institucionais, e-mails e planilhas.
- Assistente de IA conectado a informações acadêmicas.
- Afirmação de conformidade plena com LGPD sem análise jurídica, técnica e operacional.

## Planejado

1. Melhorar qualidade visual, testes de acessibilidade e integração da navegação.
2. Adicionar detecção de conflitos, agenda de estágio e tipos de evento.
3. Definir arquitetura privada autenticada antes de qualquer dado de estudante.
4. Implementar importação validada, histórico, backup/restauração e auditoria.
5. Conectar serviços externos somente após consentimento, avaliação de escopos e segurança.

## Regras de implementação

- Não criar dados fictícios, notas, faltas ou atribuições presumidas.
- Zero permanece zero; vazio deve ser identificado como não informado.
- Não consolidar faltas sem regra oficial.
- Manter professor, campo, grupo, data, origem e célula quando fornecidos pela fonte autorizada.
- Nunca escrever em fonte oficial ou enviar comunicação sem confirmação expressa.
- Toda funcionalidade só é considerada validada após teste correspondente.
