document.addEventListener('click', (event) => {
  if (event.target.dataset.type == 'remove') {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest('li').remove();
    });
  }

  if (event.target.dataset.type == 'change') {
    const id = event.target.dataset.id;
    const newName = prompt('Введите новое название');

    newName ? changeName(newName, id) : '';
  }
});

async function changeName(newTitle, id) {
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: newTitle }),
  });
}

async function remove(id) {
  await fetch(`/${id}`, {
    method: 'DELETE',
  });
}
