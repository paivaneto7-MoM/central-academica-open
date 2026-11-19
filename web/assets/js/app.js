/* Central Acadêmica Open — MVP 0.2. Sem bibliotecas ou comunicação de rede. */
(() => {
  'use strict';
  const KEY = 'central-academica-open:v0.1';
  const $ = id => document.getElementById(id);
  const blank = () => ({ disciplines: [], lessons: [], tasks: [] });
  let state = load();
  const filter = { disciplines: '', lessons: '', tasks: 'all' };
  function load() {
    try {
      const data = JSON.parse(localStorage.getItem(KEY));
      if (!data || typeof data !== 'object') return blank();
      const valid = key => Array.isArray(data[key]) ? data[key].filter(item => item && typeof item.id === 'string') : [];
      return { disciplines: valid('disciplines'), lessons: valid('lessons'), tasks: valid('tasks') };
    } catch { return blank(); }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); return true; }
    catch { announce('Não foi possível salvar. Verifique o armazenamento do navegador.'); return false; }
  }
  function announce(message) { $('feedback').textContent = message; }
  function el(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = String(text);
    if (className) node.className = className;
    return node;
  }
  function uid() { return crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2); }
  function dateLabel(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return '';
    const [year, month, day] = value.split('-');
    return day + '/' + month + '/' + year;
  }
  function action(label, handler, variant = 'secondary') {
    const button = el('button', label, variant);
    button.type = 'button'; button.addEventListener('click', handler); return button;
  }
  function renderList(id, items, makeItem, emptyMessage) {
    const list = $(id); list.replaceChildren();
    if (!items.length) { list.append(el('li', emptyMessage, 'empty')); return; }
    items.forEach(item => list.append(makeItem(item)));
  }
  function itemCard(title, subtitle, buttons, done = false) {
    const li = el('li', undefined, 'record' + (done ? ' done' : ''));
    li.append(el('div', title, 'record-title'));
    if (subtitle) li.append(el('small', subtitle));
    const actions = el('div', undefined, 'record-actions');
    buttons.forEach(button => actions.append(button));
    li.append(actions); return li;
  }
  function remove(key, id, question) {
    if (!confirm(question)) return;
    state[key] = state[key].filter(item => item.id !== id);
    if (key === 'disciplines') state.lessons = state.lessons.filter(item => item.disciplineId !== id);
    save(); render(); announce('Registro excluído.');
  }
  function render() {
    $('count-disc').textContent = state.disciplines.length;
    $('count-lessons').textContent = state.lessons.length;
    $('count-tasks').textContent = state.tasks.filter(task => !task.done).length;
    const select = $('lesson-disc'), current = select.value;
    select.replaceChildren();
    const placeholder = el('option', state.disciplines.length ? 'Selecione uma disciplina' : 'Cadastre uma disciplina primeiro');
    placeholder.value = ''; select.append(placeholder);
    state.disciplines.forEach(d => { const option = el('option', d.name); option.value = d.id; select.append(option); });
    if (state.disciplines.some(d => d.id === current)) select.value = current;
    $('form-lesson').querySelector('button[type="submit"]').disabled = !state.disciplines.length;
    const visibleDisciplines = state.disciplines.filter(d => (d.name + ' ' + (d.term || '')).toLocaleLowerCase('pt-BR').includes(filter.disciplines));
    renderList('disc-list', visibleDisciplines, d => itemCard(d.name, d.term || 'Período não informado', [
      action('Editar', () => editDiscipline(d)),
      action('Excluir', () => remove('disciplines', d.id, 'Excluir esta disciplina e todas as aulas vinculadas?'), 'danger')
    ]), 'Nenhuma disciplina cadastrada.');
    const lessons = [...state.lessons].sort((a,b) => a.date.localeCompare(b.date));
    renderList('lesson-list', lessons.filter(l => {
      const d = state.disciplines.find(x => x.id === l.disciplineId);
      return (l.title + ' ' + (d?.name || '')).toLocaleLowerCase('pt-BR').includes(filter.lessons);
    }), l => {
      const disc = state.disciplines.find(d => d.id === l.disciplineId);
      return itemCard(l.title, [disc ? disc.name : 'Disciplina não encontrada', dateLabel(l.date)].join(' · '), [
        action('Editar', () => editLesson(l)),
        action('Excluir', () => remove('lessons', l.id, 'Excluir esta aula?'), 'danger')
      ]);
    }, 'Nenhuma aula planejada.');
    const tasks = [...state.tasks].sort((a,b) => Number(a.done)-Number(b.done) || (a.date || '9999').localeCompare(b.date || '9999'));
    renderList('task-list', tasks.filter(t => filter.tasks === 'all' || (filter.tasks === 'done' ? t.done : !t.done)), t => itemCard(t.title, (t.date ? 'Prazo: ' + dateLabel(t.date) : 'Sem prazo') + (t.done ? ' · Concluída' : ''), [
      action('Editar', () => editTask(t)),
      action(t.done ? 'Reabrir' : 'Concluir', () => { t.done = !t.done; save(); render(); announce('Tarefa atualizada.'); }),
      action('Excluir', () => remove('tasks', t.id, 'Excluir esta tarefa?'), 'danger')
    ], t.done), 'Nenhuma tarefa cadastrada.');
  }
  // Editar sem modificar identificadores preserva os vínculos e a compatibilidade com os dados do MVP 0.1.
  function askText(message, value, limit) {
    const response = prompt(message, value);
    if (response === null) return null;
    const text = response.trim();
    if (!text || text.length > limit) { announce('Informe um texto válido de até ' + limit + ' caracteres.'); return null; }
    return text;
  }
  function askDate(message, value, optional = false) {
    const response = prompt(message + ' (AAAA-MM-DD)', value || '');
    if (response === null) return null;
    const date = response.trim();
    if (!date && optional) return '';
    if (!/^\\d{4}-\\d{2}-\\d{2}$/.test(date) || Number.isNaN(Date.parse(date)) || new Date(date + 'T12:00:00').toISOString().slice(0,10) !== date) {
      announce('Data inválida. Use AAAA-MM-DD.'); return null;
    }
    return date;
  }
  function editDiscipline(d) {
    const name = askText('Nome da disciplina:', d.name, 100);
    if (name === null) return;
    const term = prompt('Período letivo (opcional):', d.term || '');
    if (term === null) return;
    if (term.trim().length > 60) { announce('Período muito longo.'); return; }
    d.name = name; d.term = term.trim(); save(); render(); announce('Disciplina atualizada.');
  }
  function editLesson(l) {
    const title = askText('Tema da aula:', l.title, 120);
    if (title === null) return;
    const date = askDate('Data da aula', l.date);
    if (date === null) return;
    l.title = title; l.date = date; save(); render(); announce('Aula atualizada.');
  }
  function editTask(t) {
    const title = askText('Descrição da tarefa:', t.title, 140);
    if (title === null) return;
    const date = askDate('Prazo da tarefa', t.date, true);
    if (date === null) return;
    t.title = title; t.date = date; save(); render(); announce('Tarefa atualizada.');
  }
  $('filter-disc').addEventListener('input', event => { filter.disciplines = event.target.value.toLocaleLowerCase('pt-BR'); render(); });
  $('filter-lesson').addEventListener('input', event => { filter.lessons = event.target.value.toLocaleLowerCase('pt-BR'); render(); });
  $('filter-task').addEventListener('change', event => { filter.tasks = event.target.value; render(); });
  $('form-disc').addEventListener('submit', event => {
    event.preventDefault();
    const name = $('disc-name').value.trim(), term = $('disc-term').value.trim();
    if (!name) return;
    state.disciplines.push({ id: uid(), name, term }); save(); event.target.reset(); render(); announce('Disciplina adicionada.');
  });
  $('form-lesson').addEventListener('submit', event => {
    event.preventDefault();
    const disciplineId = $('lesson-disc').value, title = $('lesson-title').value.trim(), date = $('lesson-date').value;
    if (!state.disciplines.some(d => d.id === disciplineId) || !title || !date) return;
    state.lessons.push({ id: uid(), disciplineId, title, date }); save(); event.target.reset(); render(); announce('Aula planejada.');
  });
  $('form-task').addEventListener('submit', event => {
    event.preventDefault();
    const title = $('task-title').value.trim(), date = $('task-date').value;
    if (!title) return;
    state.tasks.push({ id: uid(), title, date, done: false }); save(); event.target.reset(); render(); announce('Tarefa adicionada.');
  });
  $('clear').addEventListener('click', () => {
    if (!confirm('Apagar definitivamente todas as disciplinas, aulas e tarefas deste navegador?')) return;
    state = blank(); save(); render(); announce('Todos os registros foram apagados.');
  });
  $('export').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify({ version: '0.1', exportedAt: new Date().toISOString(), ...state }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob), link = document.createElement('a');
    link.href = url; link.download = 'central-academica-open-dados.json'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000); announce('Exportação iniciada.');
  });
  render();
})();