# Central Acadêmica Open

A Central Acadêmica Open é um projeto de código aberto para apoiar o planejamento, a organização e a gestão de atividades docentes. A proposta é reunir em um só lugar as informações de trabalho que professores e coordenações acadêmicas usam ao longo do período letivo.

## Público-alvo

- Professores que precisam organizar turmas, planos de ensino e avaliações.
- Coordenadores acadêmicos que acompanham o planejamento e os prazos das equipes docentes.

## Funcionalidades planejadas

- Organizar disciplinas, turmas e períodos letivos.
- Elaborar planos de ensino e acompanhar o cronograma de aulas.
- Planejar atividades, avaliações e prazos.
- Consultar pendências e próximos compromissos em um painel docente.

## Estágio atual

O projeto está na fase de estruturação. O repositório contém uma página inicial estática em português brasileiro. A interface apresenta o projeto e seu estágio de desenvolvimento. Os fluxos de gestão docente, a autenticação e o armazenamento de dados estão previstos para etapas futuras. A versão inicial usa apenas conteúdo institucional e não inclui registros de estudantes ou professores.

## Como executar localmente

Na raiz do repositório, sirva a pasta `web/` com Python 3:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory web
```

Abra [http://127.0.0.1:8000](http://127.0.0.1:8000) no navegador.

## Estrutura do repositório

| Caminho | Finalidade |
| --- | --- |
| `web/index.html` | Página inicial da aplicação |
| `web/assets/css/main.css` | Estilos da interface |
| `LICENSE` | Licença do projeto |

## Licença

O projeto é distribuído sob a [licença MIT](LICENSE).

## MVP 0.1 — painel docente

Acesse `web/app.html` (ou clique no link da página inicial) para utilizar o painel experimental. É possível cadastrar disciplinas, planejar aulas, registrar tarefas, marcar tarefas como concluídas, excluir registros e exportar os dados em JSON. O armazenamento usa `localStorage` do navegador; não há sincronização, autenticação, importação ou recuperação automática. Não utilize dados pessoais ou sensíveis. Para testar, execute o servidor local descrito acima e abra `http://127.0.0.1:8000/app.html`.

## MVP 0.2 — edição e filtros

O painel em `web/app.html` agora permite editar disciplinas, aulas e tarefas, buscar disciplinas e aulas e filtrar tarefas por situação. Os dados existentes do MVP 0.1 permanecem no mesmo armazenamento local. A edição utiliza diálogos simples do navegador; uma interface de edição mais elaborada fica para versões futuras.

## Demonstração pública (GitHub Pages)

A implantação está configurada em `.github/workflows/pages.yml` para publicar a pasta `web/` a cada atualização da branch `main`. Para ativar pela primeira vez, o administrador deve abrir **Settings → Pages → Build and deployment → Source: GitHub Actions** no repositório. Após a execução bem-sucedida, a URL esperada é:

- https://paivaneto7-mom.github.io/central-academica-open/
- Painel: https://paivaneto7-mom.github.io/central-academica-open/app.html

O endereço só estará disponível após a publicação ser confirmada pelo GitHub. A aplicação não envia dados a servidores, mas os registros ficam no armazenamento local do navegador, sujeitos a perda por limpeza do dispositivo. **Não utilize informações pessoais ou sensíveis.**
