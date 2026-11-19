# Como contribuir

Obrigado pelo interesse na Central Acadêmica Open. O projeto está em desenvolvimento inicial e aceita sugestões, relatos de problemas, melhorias de acessibilidade, documentação e testes.

## Antes de começar

1. Consulte as issues existentes para evitar duplicidade.
2. Para alterações maiores, abra uma issue descrevendo o problema e a proposta.
3. Não publique dados pessoais, acadêmicos identificáveis, senhas ou segredos.
4. Mantenha a interface em português brasileiro e respeite acessibilidade e responsividade.

## Desenvolvimento local

Requer Python 3. Execute `python3 -m http.server 8000 --bind 127.0.0.1 --directory web` e abra `http://127.0.0.1:8000/app.html`.

Os testes de navegador rodam automaticamente em Pull Requests pelo GitHub Actions. Para executar localmente: instale Node.js 22, `npm install --no-save playwright@1.58.2`, `npx playwright install chromium`, inicie o servidor e execute `node tests/smoke.cjs`.

## Pull Requests

Abra uma branch para cada mudança, descreva o que foi alterado, os testes realizados e eventuais limitações. Não inclua dados reais de estudantes, professores ou pacientes. Mantenedores revisam as contribuições antes do merge.

## Conduta

Trate participantes com respeito e objetividade. Discordâncias técnicas devem ser discutidas com argumentos e evidências. Comportamento discriminatório, assédio e exposição de dados privados não são aceitos.
