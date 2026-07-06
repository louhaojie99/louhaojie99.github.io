(() => {
  if (document.body.dataset.type === 'music') return;
  if (window.matchMedia('(max-width: 768px)').matches) return;

  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/live2d-widget@3.1.4/lib/L2Dwidget.min.js';
  script.onload = () => {
    window.L2Dwidget.init({
      model: {
        jsonPath: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json'
      },
      display: {
        position: 'left',
        width: 150,
        height: 300
      },
      mobile: {
        show: false
      },
      log: false
    });
  };
  document.body.appendChild(script);
})();
