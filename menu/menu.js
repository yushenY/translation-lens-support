const tabs = [...document.querySelectorAll('nav button')];
tabs.forEach(button => button.addEventListener('click', () => {
  tabs.forEach(tab => { const selected = tab === button; tab.classList.toggle('active', selected); tab.setAttribute('aria-pressed', String(selected)); });
  document.querySelectorAll('article').forEach(dish => { dish.hidden = button.dataset.category !== 'all' && dish.dataset.kind !== button.dataset.category; });
  document.querySelector('.intro').scrollIntoView({block:'start'});
}));
let count = 0, total = 0;
const basket = document.querySelector('.basket'), reset = document.querySelector('#reset');
document.querySelectorAll('.add').forEach(button => button.addEventListener('click', () => {
  count++; total += Number(button.dataset.price);
  basket.hidden = reset.hidden = false;
  document.querySelector('#basketText').textContent = `已选 ${count} 份`;
  document.querySelector('#total').textContent = `¥${total}`;
  document.querySelector('#announcement').textContent = `已添加${button.dataset.name}`;
}));
reset.addEventListener('click', () => { count = total = 0; basket.hidden = reset.hidden = true; document.querySelector('#announcement').textContent = '已清空菜品'; });
