// Active nav link highlighting based on current page
(function(){
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// Animated node-network background
(function(){
  const canvas = document.getElementById('netbg');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, nodes;
  const NODE_COUNT = 46;
  const LINK_DIST = 120;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  function init(){
    nodes = Array.from({length: NODE_COUNT}, () => ({
      x: Math.random()*w,
      y: Math.random()*h,
      vx: (Math.random()-0.5)*0.22,
      vy: (Math.random()-0.5)*0.22
    }));
  }
  function step(){
    ctx.clearRect(0,0,w,h);
    for(const n of nodes){
      n.x += n.vx; n.y += n.vy;
      if(n.x<0||n.x>w) n.vx*=-1;
      if(n.y<0||n.y>h) n.vy*=-1;
    }
    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<nodes.length;j++){
        const a=nodes[i], b=nodes[j];
        const dx=a.x-b.x, dy=a.y-b.y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<LINK_DIST){
          ctx.strokeStyle = `rgba(63,224,127,${0.13*(1-dist/LINK_DIST)})`;
          ctx.lineWidth=1;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
          ctx.stroke();
        }
      }
    }
    for(const n of nodes){
      ctx.fillStyle = 'rgba(79,168,255,0.55)';
      ctx.beginPath();
      ctx.arc(n.x,n.y,1.6,0,Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(step);
  }
  window.addEventListener('resize', resize);
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    resize(); init(); step();
  }
})();

// Hero role-cycling typing effect (only runs if #role-cycle exists)
(function(){
  const el = document.getElementById('role-cycle');
  if(!el) return;
  const roles = ['Software Engineer', 'Backend Developer', 'AI Integrator', 'FastAPI Specialist'];
  let idx = 0, char = 0, deleting = false;

  function tick(){
    const current = roles[idx];
    if(!deleting){
      char++;
      el.textContent = current.slice(0, char);
      if(char === current.length){
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      char--;
      el.textContent = current.slice(0, char);
      if(char === 0){
        deleting = false;
        idx = (idx+1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 40 : 70);
  }
  tick();
})();
