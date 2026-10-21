const tabs = [...document.querySelectorAll('nav button')];
function selectCategory(button) {
  tabs.forEach(tab => { const selected = tab === button; tab.classList.toggle('active', selected); tab.setAttribute('aria-pressed', String(selected)); });
  document.querySelectorAll('article').forEach(dish => { dish.hidden = button.dataset.category !== 'all' && dish.dataset.kind !== button.dataset.category; });
  document.querySelector('.intro').scrollIntoView({block:'start'});
  button.scrollIntoView({block:'nearest', inline:'nearest'});
}
tabs.forEach(button => button.addEventListener('click', () => selectCategory(button)));
let start = null;
const dishes = document.querySelector('#dishes');
dishes.addEventListener('touchstart', e => { start = e.touches.length === 1 ? {x:e.touches[0].clientX,y:e.touches[0].clientY} : null; }, {passive:true});
dishes.addEventListener('touchend', e => {
  if (!start || !e.changedTouches.length) return;
  const dx=e.changedTouches[0].clientX-start.x, dy=e.changedTouches[0].clientY-start.y; start=null;
  if (Math.abs(dx)<70 || Math.abs(dx)<Math.abs(dy)*1.8) return;
  const index=tabs.findIndex(t=>t.classList.contains('active'));
  const next=Math.max(0,Math.min(tabs.length-1,index+(dx<0?1:-1)));
  if(next!==index) selectCategory(tabs[next]);
}, {passive:true});
dishes.addEventListener('touchcancel',()=>{start=null;},{passive:true});
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
